import React, { useState, useRef, useEffect } from 'react';
import accessibilityIcon from "../../assets/universal-access-svgrepo-com.svg";
import "./AccessibilityMenu.scss";

function AccessibilityMenu() {
    const [toggle, setToggle] = useState(false);
    const [showTestButton, setShowTestButton] = useState(true);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            if (toggle && menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setToggle(false);
            }
        };
        // Close the menu on mousedown outside the menu
        document.addEventListener("mousedown", clickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [toggle]);

    return (
        <div ref={menuRef}>
            <button className="logo-button" onClick={() => setToggle(!toggle)}>
                <img src={accessibilityIcon} className="img-bottom-right" alt="Accessibility Icon" />
            </button>
            <div className={`accessibility-menu${toggle ? ' show-menu' : ''}`}>
                {showTestButton && ( // Render the test button only if showTestButton is true
                    <button className="test-button" onClick={() => alert("Test button clicked!")}>
                        Test
                    </button>
                )}
            </div>
        </div>
    );
}

export default AccessibilityMenu;

