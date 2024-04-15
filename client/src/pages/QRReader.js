import React, {useState, useEffect} from 'react';
import { QrReader } from 'react-qr-reader';

export default function QRReader() {
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
        <div>
            <h1>QR Code Reader</h1>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
            <div style={{ marginTop: '20px' }}>
                <h2>Scanned QR Code:</h2>
                <p>{qrCode}</p>
            </div>
        </div>
    )
}