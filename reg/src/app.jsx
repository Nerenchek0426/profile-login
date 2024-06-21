import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProvider from './components/UserProvider';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Registr';
import GradeReport from './components/GradeReport';
import { LinksProvide } from './components/LinksContext';
// import Schedule from './Schedule';
// import Graduates from './Graduates';

const App = () => (
    <UserProvider>
        <LinksProvide>
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                { <Route path="/grade-report" element={<GradeReport />} />}
                {/* <Route path="/schedule" element={<Schedule />} /> /}
                {/ < Route path="/graduates" element={<Graduates />} /> */}
            </Routes>
        </Router>
        </LinksProvide>
    </UserProvider>
);

export default App;