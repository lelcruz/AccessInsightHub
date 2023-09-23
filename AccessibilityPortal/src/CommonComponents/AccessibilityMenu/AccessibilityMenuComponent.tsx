import React, {useState, useRef, useEffect} from 'react';
import accessibilityIcon from "../../assets/universal-access-svgrepo-com.svg";
import "./AccessibilityMenu.scss";

function AccessibilityMenu() {

    const [toogle, setToogle] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            if (toogle && menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setToogle(false)
            }
        }
        //Close the menu on mousedown outside the menu
        document.addEventListener("mousedown", clickOutside)
    }, [toogle])

    return(
        <div ref={menuRef}>
            <button className="logo-button" onClick={() => setToogle(!toogle)}>
                <img src={accessibilityIcon} className="img-bottom-right"></img>
            </button>
            <div className={`accessibility-menu${toogle ? ' show-menu' : ''}`}></div>
            
        </div>

    )

}

export default AccessibilityMenu;