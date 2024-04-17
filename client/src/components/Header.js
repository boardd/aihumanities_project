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
          <a href="/"><img src={require("../images/ai-icon.png")} className="Logo" alt="logo" /></a>
          <a href="/"><span className="Project-Name"> &nbsp; for Humanities</span></a>
        </div>
        <nav className="Nav">
          <a href="/scan">Start Scanning</a>
          <a href="/documentary">Documentary</a>
        </nav>
      {/* <button onClick={toggleNav} className="Burger">
        🍔
      </button> */}
    </header>
  );
}