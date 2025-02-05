import React, { useEffect, useState } from "react"

const Apod = () => {
	const apiKey = process.env.REACT_APP_NASA_API_KEY
	const [photo, setPhoto] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
			.then((response) => response.json())
			.then((result) => {
				setPhoto(result)
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
				setLoading(false)
			})
	}, [apiKey])

	if (loading) {
		return (
			<div className="bg-black flex items-center justify-center">
				<div className="text-white text-2xl">
					Loading amazing space content...
				</div>
			</div>
		)
	}

	return (
		<div className="h-screen bg-black flex items-center justify-center p-6">
			<div className="bg-gray-900/50 backdrop-blur-sm rounded-lg w-full max-w-7xl overflow-hidden">
				<h1 className="text-2xl md:text-3xl text-white font-automn font-bold text-center py-4 px-6 border-b border-gray-700">
					{photo.title}
				</h1>

				<div className="flex flex-row p-6 gap-6">
					<div className="w-3/5">
						{photo.media_type === "video" ? (
							<iframe
								className="w-full aspect-video rounded-lg shadow-xl border-0 bg-black"
								src={photo.url}
								title={photo.title}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						) : (
							<img
								className="w-full h-full object-contain rounded-lg shadow-xl cursor-pointer hover:scale-[1.01] transition-transform duration-300"
								src={photo.hdurl}
								alt={photo.title}
								onClick={() => window.open(photo.url, "_blank")}
							/>
						)}
					</div>

					<div className="w-2/5 flex flex-col gap-4">
						<p className="text-white text-sm text-center border-b border-gray-700 pb-2">
							Date: {photo.date}
						</p>
						<div className="overflow-y-auto pr-2">
							<p className="text-sm md:text-base text-white font-automn leading-relaxed">
								{
									photo.explanation
								}
							</p>
							{photo.copyright && (
								<p className="text-gray-400 text-sm text-right mt-4">
									©{" "}
									{
										photo.copyright
									}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Apod
