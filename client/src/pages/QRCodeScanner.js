import React, {useState, useEffect} from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import '../styling/QRCodeScanner.css';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const QRCodeScanner = () => {

    const [scannedImages, setScannedImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250
            },
            fps: 5,
        });
    
        scanner.render(onSuccess, handleError);

        function onSuccess(decodedImageUrl) {
            setScannedImages(prevImages => [...prevImages, decodedImageUrl]);
            scanner.clear();
            scanner.render((newDecodedImageUrl) => {
              setScannedImages(prevImages => [...prevImages, newDecodedImageUrl]);
            }, (error) => {
              setErrorMessage(error);
            });
        }
        
        function handleError(err){
            console.log(err);
            setErrorMessage(err);
        }
    },[])

    const uploadImages = () => {
        console.log("Uploading images:", scannedImages);
        
        fetch('http://127.0.0.1:5000/qrimage_upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                images: scannedImages,
            }),
        })
        .then(response => {
            console.log("Response status:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("Response data:", data);
            if (!data.success) {
                throw new Error(data.error || 'Failed to upload images :(');
            }
            console.log('Uploaded images successfully :)');
        })
        .catch(error => {
            console.error('Error uploading images: ', error);
        });
    };

    return (
        <div>
            <Header />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>Instructions: Scan the QR codes by clicking 'Request Camera Permissions' and allowing permissions. Or, upload the QR code images by clicking 'Scan an Image File' and selecting files from your device.</p>
            <div id="reader" width="300px"></div>
                {errorMessage && <p>Please try scanning or uploading again.</p>}
                {scannedImages && <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <div style={{ textAlign: 'center' }}>
                        <h4>Here's a list of paintings you've uploaded so far:</h4>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {scannedImages.map((imageUrl, index) => (
                                <li key={index}>{imageUrl}</li>
                            ))}
                        </ul>
                    </div>
                </div>}
            <center>
                <button className="finish-button" style={{alignItems: 'center', justifyItems: 'center'}}>
                    <Link to="/generated-image" onClick={uploadImages} style={{ textDecoration: 'none', color: 'inherit', justifyItems: 'center'}}>I'm finished scanning</Link>
                </button>
            </center>
        </div>
    )
}

export default QRCodeScanner;