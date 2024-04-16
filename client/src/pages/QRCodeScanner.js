import React, {useState, useEffect} from 'react';
import { QrReader } from 'react-qr-reader';
import '../styling/QRCodeScanner.css';

const QRCodeScanner = () => {

    const [qrCode, setQRCode] = useState('');

    const handleScan = data => {
        if (data) {
            setQRCode(data);
        }
    }

    const handleError = err => {
        console.error(err);
    }

    return (
        <div className='scanner-container'>
            <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            className='scanner'
            />
            <p>Scanned QR Code: {qrCode}</p>
        </div>
    )
}

export default QRCodeScanner;