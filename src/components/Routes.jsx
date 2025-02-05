import React from "react"
import { Route, Routes } from "react-router-dom"
import Apod from "./Apod"
import MarsRover from "./MarsRover"
import Asteroid from "./Asteroid"
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Apod />} />
            <Route path="/mars-rover" element={<MarsRover />} />
            <Route path="/asteroid" element={<Asteroid />} />
        </Routes>
    )
}

export default AppRoutes
