import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const GeneratedImage = () => {

    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch generated image URL from backend
        fetch('http://127.0.0.1:5000/generated-image')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch image (bad response)');
                }
            })
            .then(data => {
                if (data.image_url) {
                    setImageUrl(data.image_url);
                } else {
                    throw new Error('Image URL not found');
                }
            })
            .catch(error => {
                console.error("Error fetching image:", error);
                setError('Failed to fetch image');
            });
    }, []);

    return (
        <div>
            <Header />
            <center>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h3>Your Personalized Memento</h3>
                {imageUrl ? (
                    <>
                        <img src={imageUrl} alt="Generated Artwork" style={{ maxWidth: '100%', height: 'auto' }} />
                        <p>Thanks for visiting the Carnegie Museum of Art and interacting with MyGalleryGuide! :)</p>
                    </>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <p>Loading image...</p>
                )}
            </center>
        </div>
    )

}
export default GeneratedImage;