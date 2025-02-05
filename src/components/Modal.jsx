import React from "react"

const Modal = ({ photo, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={e => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 text-white text-xl bg-gray-800/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700/50 transition-colors"
                    onClick={onClose}
                >
                    ×
                </button>
                <img
                    src={photo.img_src}
                    alt={`Mars Rover - ${photo.camera.full_name}`}
                    className="max-h-[80vh] object-contain rounded-lg"
                />
                <div className="mt-4 text-white text-center">
                    <h3 className="text-xl font-automn mb-2">
                        {photo.camera.full_name}
                    </h3>
                    <p className="text-gray-300">
                        Taken by {photo.rover.name} on {photo.earth_date} (Sol {photo.sol})
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Modal 