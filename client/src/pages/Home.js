import React from 'react';
import Header from '../components/Header';
import '../styling/Home.css'

const Home = () => {
    return (
        <div>
            <Header />
            <img src={require("../images/Carnegie-Museum-Logo.jpg")} style={{height:"600px", margin:"100px", float: "left"}} alt="Carnegie Museum of Art."></img>
            <div className='Content'>
                <h2>Welcome to MyGalleryGuide: Your Personalized Souvenir Creator at the Carnegie Museum of Art</h2>
                <p>MyGalleryGuide was created as a final project for the course AI for Humanities. We decided that AI could be utilized to in such a museum-heavy place like Pittsburgh to help personalize your trip there and give you something unique to you when you leave.</p>
                <h3>How It Works:</h3>
            </div>
        </div>
      );
}

export default Home;