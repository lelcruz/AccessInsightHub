import React, { useState, useRef, useEffect } from 'react';
import accessibilityIcon from "../../assets/universal-access-svgrepo-com.svg";
import "./AccessibilityMenu.scss";

function AccessibilityMenu() {
    const [toggle, setToggle] = useState(false);
    const [showResetButton] = useState(true);
    const [showCloseButton] = useState(true);
    const [showContrastButton] = useState(true);
    const [showLinkButton] = useState(true);

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
                {showCloseButton && (
                    <button className = "close-button">
                        Close
                    </button>
                )}
                {showResetButton && ( 
                    <button className="reset-button">
                        Reset
                    </button>
                )}
                {showContrastButton && ( 
                    <button className="contrast-button">
                        Contrast
                    </button>
                )}
                {showLinkButton && ( 
                    <button className="link-button">
                        Highlight Links
                    </button>
                )}
            </div>
        </div>
    );
}

export default AccessibilityMenu;

