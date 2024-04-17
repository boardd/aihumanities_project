import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRCodeScanner from './pages/QRCodeScanner';
import Home from './pages/Home';
import Documentary from './pages/Documentary';
import GeneratedImage from './pages/GeneratedImage';

import './styling/App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/scan" element={<QRCodeScanner />} />
                <Route path="/documentary" element={<Documentary />} />
                <Route path="/generated-image" element={<GeneratedImage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;