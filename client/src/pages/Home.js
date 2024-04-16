import React from 'react';
import Header from '../components/Header';
import '../styling/Home.css'

const Home = () => {
    return (
        <div>
            <Header />
            <img src={require("../images/Carnegie-Museum-Logo.jpg")} style={{height:"600px", margin:"100px", float: "left"}} alt="Carnegie Museum of Art."></img>
            <div className='Content'>
                <p>Description of project here. (mention carnegie museum, qr codes, instructions on how to use application)</p>
            </div>
        </div>
      );
}

export default Home;