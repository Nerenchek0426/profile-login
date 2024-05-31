import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainform from "./components/registr"
import Profile from './components/Profile';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Mainform />} />
                <Route path="/Profile" element={<Profile />} />
            </Routes>
        </Router>
    );
};
export default App;