import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ImageUploader from './pages/ImageUploader';
import QRCodeScanner from './pages/QRCodeScanner';
import Home from './pages/Home';

import './styling/App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/scan" element={<QRCodeScanner />} />
                <Route path="/upload" element={<ImageUploader />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;