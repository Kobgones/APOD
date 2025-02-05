import React, { useEffect, useState } from "react"

const Asteroid = () => {
    const apiKey = process.env.REACT_APP_NASA_API_KEY
    const [asteroids, setAsteroids] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
    const [filterHazardous, setFilterHazardous] = useState('all') // 'all', 'hazardous', 'safe'

    useEffect(() => {
        fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${selectedDate}&api_key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                const allDates = Object.keys(data.near_earth_objects)
                const allAsteroids = allDates.flatMap(date => data.near_earth_objects[date])
                setAsteroids(allAsteroids)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setLoading(false)
            })
    }, [apiKey, selectedDate])

    const filteredAsteroids = asteroids.filter(asteroid => {
        if (filterHazardous === 'all') return true
        if (filterHazardous === 'hazardous') return asteroid.is_potentially_hazardous_asteroid
        return !asteroid.is_potentially_hazardous_asteroid
    })

    if (loading) {
        return (
            <div className="h-screen bg-black flex items-center justify-center">
                <div className="text-white text-2xl">
                    Loading asteroid data...
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-8 space-y-4">
                    <h1 className="text-3xl md:text-4xl text-white font-automn font-bold text-center">
                        Near Earth Asteroids
                    </h1>
                    <div className="flex gap-4 flex-wrap justify-center">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-gray-900/50 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
                        />
                        <select
                            value={filterHazardous}
                            onChange={(e) => setFilterHazardous(e.target.value)}
                            className="bg-gray-900/50 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
                        >
                            <option value="all">All Asteroids</option>
                            <option value="hazardous">Hazardous Only</option>
                            <option value="safe">Safe Only</option>
                        </select>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="text-white">
                            Found: {filteredAsteroids.length} asteroid{filteredAsteroids.length !== 1 ? 's' : ''}
                        </p>
                        {filterHazardous !== 'all' && (
                            <span className={`px-3 py-1 rounded-full text-sm ${
                                filterHazardous === 'hazardous' 
                                    ? 'bg-red-500/20 text-red-400'
                                    : 'bg-green-500/20 text-green-400'
                            }`}>
                                {filterHazardous === 'hazardous' ? 'Hazardous' : 'Safe'}
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAsteroids.map((asteroid) => (
                        <div
                            key={asteroid.id}
                            className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-transform duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-white font-automn text-xl truncate">
                                        {asteroid.name.replace(/[()]/g, '')}
                                    </h3>
                                    <div className="flex flex-col items-end">
                                        <span className={`px-3 py-1 rounded-full text-sm mb-2 ${
                                            asteroid.is_potentially_hazardous_asteroid
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-green-500/20 text-green-400'
                                        }`}>
                                            {asteroid.is_potentially_hazardous_asteroid ? 'Hazardous' : 'Safe'}
                                        </span>
                                        {asteroid.is_sentry_object && (
                                            <span className="px-3 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-400">
                                                Sentry Object
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-black/30 rounded-lg p-4">
                                        <h4 className="text-gray-400 text-sm mb-2">Absolute Magnitude</h4>
                                        <p className="text-white text-lg">
                                            {asteroid.absolute_magnitude_h} H
                                        </p>
                                    </div>

                                    <div className="bg-black/30 rounded-lg p-4">
                                        <h4 className="text-gray-400 text-sm mb-2">Estimated Diameter</h4>
                                        <div className="space-y-2 text-white">
                                            <div className="flex justify-between">
                                                <span>Kilometers:</span>
                                                <span>{Math.round(asteroid.estimated_diameter.kilometers.estimated_diameter_min * 100) / 100} - {Math.round(asteroid.estimated_diameter.kilometers.estimated_diameter_max * 100) / 100}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Meters:</span>
                                                <span>{Math.round(asteroid.estimated_diameter.meters.estimated_diameter_min)} - {Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/30 rounded-lg p-4">
                                        <h4 className="text-gray-400 text-sm mb-2">Closest Approach</h4>
                                        <div className="space-y-2 text-white">
                                            <div className="flex justify-between">
                                                <span>Date:</span>
                                                <span>{new Date(asteroid.close_approach_data[0].close_approach_date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Distance:</span>
                                                <span>{Math.round(asteroid.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Velocity:</span>
                                                <span>{Math.round(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString()} km/h</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Asteroid