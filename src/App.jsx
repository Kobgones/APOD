import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import NavBar from "./components/NavBar"
import AppRoutes from "./components/Routes"
import "./App.css"

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-black">
                <NavBar />
                <AppRoutes />
            </div>
        </Router>
    )
}

export default App
