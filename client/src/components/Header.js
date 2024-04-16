// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styling/Header.css';

// const Header = () => {
//     return (
//         // <div>
//         //     <div className="header">
//         //         <Link to="/" className="logo">Project Title</Link>
//         //         <div className="header-right">
//         //             <Link className="active" to="/scan">Scan QR Code</Link>
//         //             <Link className="active" to="/upload">Upload QR Codes</Link>
//         //         </div>
//         //     </div>
//         // </div>
//         <header className="Header">
//             <img src="../images/humanai.jpg" className="logo" alt="AI for Humanities" />
//             <nav className="Nav">
//                 <a href="/">Home</a>
//                 <a href="/instructions">Instructions</a>
//                 <a href="/scan">Scan</a>
//                 <a href="/upload">Upload</a>
//             </nav>
//         </header>
//       );
// }

// export default Header;

/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import '../styling/Header.css';

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">
        <div>
            <img src={require("../images/ai-icon.png")} className="Logo" alt="logo" />
            <span className="Project-Name"> &nbsp; for Humanities</span>
        </div>
        <nav className="Nav">
          <a href="/">Home</a>
          <a href="/scan">Scan</a>
          <a href="/upload">Upload</a>
        </nav>
      <button onClick={toggleNav} className="Burger">
        🍔
      </button>
    </header>
  );
}