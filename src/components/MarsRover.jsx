import React, { useEffect, useState } from "react"
import Modal from "./Modal"

const MarsRover = () => {
    const apiKey = process.env.REACT_APP_NASA_API_KEY
    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const photosPerPage = 12

    useEffect(() => {
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                // Sort photos by earth_date in descending order
                const sortedPhotos = data.photos.sort((a, b) => {
                    return new Date(b.earth_date) - new Date(a.earth_date)
                })
                setPhotos(sortedPhotos)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setLoading(false)
            })
    }, [apiKey])

    const closeModal = () => {
        setSelectedPhoto(null)
        document.body.style.overflow = 'auto'
    }

    const openModal = (photo) => {
        setSelectedPhoto(photo)
        document.body.style.overflow = 'hidden'
    }

    if (loading) {
        return (
            <div className="h-screen bg-black flex items-center justify-center">
                <div className="text-white text-2xl">
                    Loading Mars photos...
                </div>
            </div>
        )
    }

    // Calculate pagination
    const indexOfLastPhoto = currentPage * photosPerPage
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage
    const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto)
    const totalPages = Math.ceil(photos.length / photosPerPage)

    return (
        <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl text-white font-automn font-bold text-center mb-8">
                    Mars Rover Photos
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPhotos.map((photo) => (
                        <div
                            key={photo.id}
                            className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-transform duration-300"
                        >
                            <img
                                src={photo.img_src}
                                alt={`Mars Rover - ${photo.camera.full_name}`}
                                className="w-full h-64 object-cover cursor-pointer"
                                onClick={() => openModal(photo)}
                            />
                            <div className="p-4">
                                <h3 className="text-white font-automn text-lg mb-2">
                                    {photo.camera.full_name}
                                </h3>
                                <div className="text-gray-300 text-sm space-y-1">
                                    <p>Rover: {photo.rover.name}</p>
                                    <p>Earth Date: {photo.earth_date}</p>
                                    <p>Sol: {photo.sol}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedPhoto && (
                    <Modal 
                        photo={selectedPhoto} 
                        onClose={closeModal}
                    />
                )}

                {/* Pagination */}
                <div className="mt-8 flex justify-center gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 text-white">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MarsRover
