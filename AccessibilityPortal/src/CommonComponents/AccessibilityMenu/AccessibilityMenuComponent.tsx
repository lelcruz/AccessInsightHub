import React, { useState, useRef, useEffect } from 'react';
import accessibilityIcon from "../../assets/universal-access-svgrepo-com.svg";
import "./AccessibilityMenu.scss";

function AccessibilityMenu() {
    const [toggle, setToggle] = useState(false);
    const [showResetButton] = useState(true);
    const [showCloseButton] = useState(true);
    const [showHighContrastButton] = useState(true);
    const [showInvertButton] = useState(true);
    const [showLinkButton] = useState(true);
    const [showTextButton] = useState(true);
    const [showSpacingButton] = useState(true);
    const [showImageButton] = useState(true);
    const [showDyslexiaButton] = useState(true);
    const [showCursorButton] = useState(true);
    const [showReadingAidButton] = useState(true);
    const [showLineHeightButton] = useState(true);
    const [showTextAlignButton] = useState(true);
    const [showSaturationButton] = useState(true);
    const [hideImages, setHideImages] = useState(false);
    
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
    };
    

    //Adding function on here because of errors on scss
    const toggleHighContrast = () => {
        const rootElement = document.documentElement;
        const currentHighContrast = rootElement.style.filter;
        rootElement.style.filter = currentHighContrast === 'contrast(150%)' ? 'none' : 'contrast(150%)';
    };

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
    
        // You might want to perform additional logic here, such as updating CSS classes or applying specific styles.
        // For simplicity, let's just hide or show all images by updating their 'display' property.
        const images = document.querySelectorAll('img:not(.img-bottom-right)');
        images.forEach((image) => {
            image.style.display = hideImages ? 'block' : 'none';
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

    const toggleDyslexiaFriendly = () => {
        const rootElement = document.documentElement;
        rootElement.classList.toggle('dyslexia-friendly');
    
        // Check if dyslexia-friendly class is present
        const isDyslexiaFriendly = rootElement.classList.contains('dyslexia-friendly');
    
        // Change the font for the entire website
        document.body.style.fontFamily = isDyslexiaFriendly ? 'Comic Sans MS' : 'inherit';
    };

    const handleTextAlignClick = () => {
        //Add a class to the body element to apply text alignment
        const bodyElement = document.body;
        bodyElement.classList.toggle('text-align-center');

        //Close the menu after applying text alignment
        e.stopPropagation();
    };
    
  
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
                <img
                    src={accessibilityIcon}
                    className={`img-bottom-right ${hideImages ? 'hidden' : ''}`}
                    alt="Accessibility Icon"
                />
            </button>
            <div className={`accessibility-menu${toggle ? ' show-menu' : ''}`}>
                <div className = "menu-header">
                    Accessibility Menu
                </div>
                {showCloseButton && (
                    <button className = "close-button" onClick={handleCloseMenu}>
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

                {showLinkButton && ( 
                    <button className="link-button">
                        Highlight Links
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

                {showDyslexiaButton && ( 
                    <button className="dyslexia-button" onClick={toggleDyslexiaFriendly}>
                        Dyslexia Friendly
                    </button>
                )}

                {showCursorButton && ( 
                    <button className= "cursor-button">
                        Cursor
                    </button>
                )}

                {showReadingAidButton && (
                    <button className= "readingaid-button">
                        Reading Aid
                    </button>
                )}

                {showLineHeightButton && ( 
                    <button className="lineheight-button">
                    Line Height
                    </button>
                )}

                {showTextAlignButton && ( 
                    <button className= "textalign-button" onClick={handleTextAlignClick}>
                        Text Align
                    </button>
                )}

                {showSaturationButton && ( 
                    <button className= "saturation-button" onClick={toggleSaturation}>
                        Saturation
                    </button>
                )}
            </div>
        </div>
    );
}

export default AccessibilityMenu;

