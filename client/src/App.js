import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import QRCodeScanner from './pages/QRCodeScanner';
import Home from './pages/Home';
import Documentary from './pages/Documentary';

import './styling/App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/scan" element={<QRCodeScanner />} />
                <Route path="/documentary" element={<Documentary />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;