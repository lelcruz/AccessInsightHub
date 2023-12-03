import React, { useState, useRef, useEffect } from 'react';
import accessibilityIcon from "../../assets/universal-access-svgrepo-com.svg";
import cursorIcon from "/src/assets/cursor-svgrepo-com.svg"
import "./AccessibilityMenu.scss";

function AccessibilityMenu() {
    const [toggle, setToggle] = useState(false);
    const [showResetButton] = useState(true);
    const [showCloseButton] = useState(true);
    const [showHighContrastButton] = useState(true);
    const [showInvertButton] = useState(true);
    const [showTextButton] = useState(true);
    const [showSpacingButton] = useState(true);
    const [showImageButton] = useState(true);
    const [showSaturationButton] = useState(true);
    const [showCursorButton] = useState(true);
    const [showReadingAidButton] = useState(true);
    const [showDyslexiaButton] = useState(true);
    const [showTextAlignButton] = useState(true);
    
    const [hideImages, setHideImages] = useState(false);
    const [isCursorButtonPressed, setCursorButtonPressed] = useState(false);

    const handleCloseMenu = () => {
        setToggle(false);
    };

    const resetWebsite = () => {
        // Reset SCSS classes
        const rootElement = document.documentElement;
        rootElement.classList.remove('bigger-text', 'increased-spacing', 'dyslexia-friendly');
    
        // Reset filters
        rootElement.style.filter = 'none';
    
        // Reset font styles
        document.body.style.fontFamily = 'inherit';
    
        // Reset image visibility
        setHideImages(false);
        const images = document.querySelectorAll('img');
        images.forEach((image) => {
            image.style.display = 'block';
        });
    
        // Reset text alignment
        document.body.classList.remove('text-align-center');

        //Reset cursor
        document.body.style.cursor = 'auto';
        setCursorButtonPressed(false);
    };
    

    //Adding function on here because of errors on scss
    const toggleHighContrast = () => {
        const rootElement = document.documentElement;
        const currentHighContrast = rootElement.style.filter;
        rootElement.style.filter = currentHighContrast === 'contrast(150%)' ? 'none' : 'contrast(150%)';
        const highContrastEnabled: boolean = true;
        //localStorage.setItem('highContrastEnabled', currentHighContrast.toString());

    };

    {/*useEffect(() => {
        const highContrastEnabled: string | null = localStorage.getItem('highContrastEnabled');
        const isHighContrastEnabled: boolean = highContrastEnabled == 'true';
        if (highContrastEnabled === 'true') {
            // Apply high contrast styles
            const rootElement = document.documentElement;
            rootElement.style.filter = 'contrast(150%)';
        }
    }, []);*/}


    const toggleInvert = () => {
        const rootElement = document.documentElement;
        const currentInvert = rootElement.style.filter;
        rootElement.style.filter = currentInvert === 'invert(100%)' ? 'none' : 'invert(100%)';
    };

    const toggleBiggerText = () => {
        const rootElement = document.documentElement;
        rootElement.classList.toggle('bigger-text');
    };

    const toggleHideImages = () => {
        setHideImages(!hideImages);
        const images = document.querySelectorAll('img:not(.img-bottom-right)');
        
        images.forEach((image) => {
            const imgElement = image as HTMLImageElement;
            imgElement.style.display = hideImages ? 'block' : 'none';
        });
    };
    

    const toggleTextSpacing = () => {
        const rootElement = document.documentElement;
        rootElement.classList.toggle('increased-spacing');
    };

    const toggleSaturation = () => {
        const rootElement = document.documentElement;
        const currentSaturation = rootElement.style.filter;
        if (currentSaturation === 'grayscale(100%)' ) {
            rootElement.style.filter = 'grayscale(0%)';
        } else {
            rootElement.style.filter = 'grayscale(100%)';
        }
    };

    const handleCursorButtonClick = () => {
        setCursorButtonPressed(!isCursorButtonPressed);
    };

    
    const toggleDyslexiaFriendly = () => {
        const rootElement = document.documentElement;
        rootElement.classList.toggle('dyslexia-friendly');
    
        // Check if dyslexia-friendly class is present
        const isDyslexiaFriendly = rootElement.classList.contains('dyslexia-friendly');
    
        // Change the font for the entire website
        document.body.style.fontFamily = isDyslexiaFriendly ? 'Comic Sans MS' : 'inherit';
    };

  
    const menuRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const body = document.body;
        if (isCursorButtonPressed) {
          body.style.cursor = `url(${cursorIcon}), auto`;
        } else {
          body.style.cursor = 'auto';
        }
      }, [isCursorButtonPressed]);
    

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
                <img
                    src={accessibilityIcon}
                    className={`img-bottom-right ${hideImages ? 'hidden' : ''}`}
                    alt="Accessibility Icon"
                />
            </button>
            
            <div className={`accessibility-menu${toggle ? ' show-menu' : ''}`}>
                <div className="menu-header">
                    Accessibility Menu
                </div>

                {showCloseButton && (
                    <button className="close-button" onClick={handleCloseMenu}>
                        Close
                    </button>
                )}

                {showResetButton && (
                    <button className="reset-button" onClick={resetWebsite}>
                        Reset
                    </button>
                )}

                {showHighContrastButton && ( 
                    <button className="high-contrast-button" onClick={toggleHighContrast}>
                        High Contrast
                    </button>
                )}

                {showInvertButton && ( 
                    <button className="invert-button" onClick={toggleInvert}>
                        Invert
                    </button>
                )}

                {showTextButton && ( 
                    <button className="text-button" onClick={toggleBiggerText}>
                        Bigger Text
                    </button>
                )}

                {showSpacingButton && ( 
                    <button className="spacing-button" onClick={toggleTextSpacing}>
                        Text Spacing
                    </button>
                )}

                {showImageButton && ( 
                    <button className={`image-button${hideImages ? ' hidden' : ''}`} onClick={toggleHideImages}>
                        {hideImages ? 'Show Images' : 'Hide Images'}
                    </button>
                )}

                {showSaturationButton && ( 
                    <button className= "saturation-button" onClick={toggleSaturation}>
                        Saturation
                    </button>
                )}

                {showCursorButton && (
                    <button
                        className={`cursor-button ${isCursorButtonPressed ? 'active' : ''}`}
                        onClick={handleCursorButtonClick}>
                        Cursor
                    </button>
                )}

                {showDyslexiaButton && ( 
                    <button className="dyslexia-button" onClick={toggleDyslexiaFriendly}>
                        Dyslexia Friendly
                    </button>
                )}

                <button className="textalign-button button button-white" onClick={() => document.body.classList.toggle('text-align-center')}>
                Text Align
                </button>
            </div>
        </div>
    );
}

export default AccessibilityMenu;

