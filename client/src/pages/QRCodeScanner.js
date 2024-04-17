import React, {useState, useEffect} from 'react';
// import { QrReader } from 'react-qr-reader';
import { Html5QrcodeScanner } from 'html5-qrcode';
import '../styling/QRCodeScanner.css';
import Header from '../components/Header';
import axios from 'axios';

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

    const uploadImages = async () => {
        try {
          const formData = new FormData();
          scannedImages.forEach((imageUrl, index) => {
            formData.append(`image${index + 1}`, imageUrl);
          });
    
          const response = await axios.post('http://127.0.0.1:5000/qrimage_upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
    
          console.log(response.data);
        } catch (error) {
          console.error('Error uploading images:', error);
        }
    };

    useEffect(() => {
        if (scannedImages.length > 0) {
          uploadImages();
        }
    }, [scannedImages]);

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
        </div>
    )
}

export default QRCodeScanner;