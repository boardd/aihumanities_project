import React, {useState, useEffect} from 'react';
import { QrReader } from 'react-qr-reader';
import { Html5QrcodeScanner } from 'html5-qrcode';
import '../styling/QRCodeScanner.css';

const QRCodeScanner = () => {

    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                heigh: 250,
            },
            fps: 5,
        });
    
        scanner.render(onSuccess, handleError);
    
        function onSuccess(result){
            scanner.clear();
            setScanResult(result);
        }
        
        function handleError(err){
            alert(err);
        }
    },[])

    return (
        <div>
            <h1 className='scanner-container'>Scan QR Code</h1>
            <div id='reader'></div>
        </div>
    )
}

export default QRCodeScanner;