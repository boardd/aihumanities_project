import React, {useState, useEffect} from 'react';
import { QrReader } from 'react-qr-reader';

function App() {

    const [qrCode, setQRCode] = useState('');

    const handleScan = data => {
        if (data) {
            setQRCode(data);
        }
    }

    const handleError = err => {
        console.error(err);
    }

    const [data, setData] = useState({
        members: [],
    });

    useEffect(() => {
        fetch("http://127.0.0.1:5000/members")
        .then(resp => resp.json())
        .then(data => {
            console.log('Response from backend: ', data);
            setData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

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
        // <div>
        //     {(typeof data.members == 'undefined') ? (
        //         <p>Loading...</p>
        //     ) : (
        //         data.members.map((member,i) => (
        //             <p key={i}>{member}</p>
        //         ))
        //     )}
        // </div>
    );
}

export default App;