import React, {useState, useEffect} from 'react';
// import { QrReader } from 'react-qr-reader';
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

    // const uploadImages = () => {
    //     console.log(scannedImages.map((imageUrl, index) => ({'images': imageUrl})))
    //     fetch('http://127.0.0.1:5000/qrimage_upload', {
    //         method: 'POST',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //         images: scannedImages.map((imageUrl, index) => ({'images': imageUrl})),
    //         }),
    //     })
    //     .then(response => {
    //         console.log(JSON.stringify({
    //             images: scannedImages.map((imageUrl, index) => ({'images': imageUrl}))}))
    //         if (!response.ok) {
    //         console.log(response);
    //         throw new Error('Failed to upload images :(');
    //         }
    //         console.log(response)
    //         console.log('Uploaded images successfully :)');
    //     })
    //     .catch(error => {
    //         console.error('Error uploading images: ', error);
    //     });
    // };

    return (
        <div>
            <Header />
            <h1>QR Code Scanner</h1>
            <div id="reader" width="300px"></div>
                {errorMessage && <p>Please try scanning or uploading again.</p>}
                {scannedImages && <div>
                    {/* <p>Scanned Images:</p>
                    <div className="scanned-images">
                        {scannedImages.map((imageUrl, index) => (
                            <img key={index} src={require("../paintings/"+imageUrl)} alt={`Scanned QR Code ${index + 1}`} />
                        ))}
                    </div> */}
                    <p>Scanned Images List: {scannedImages}</p>
                </div>}
                {/* {scannedImage && (
                    <div>
                        <p>Scanned Image:</p>
                        <img src={require("../paintings/"+scannedImage)} alt="Scanned QR Code" />
                    </div>
                )} */}
            <button className="finish-button" style={{alignItems: 'center', justifyItems: 'center'}}>
                <Link to="/generated-image" onClick={uploadImages} style={{ textDecoration: 'none', color: 'inherit', justifyItems: 'center'}}>I'm finished scanning</Link>
            </button>
        </div>
    )
}

export default QRCodeScanner;