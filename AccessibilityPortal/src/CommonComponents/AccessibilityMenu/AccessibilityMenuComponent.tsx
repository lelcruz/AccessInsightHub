import React, {useState} from 'react';
import accessibilityIcon from "../../assets/universal-access-svgrepo-com.svg";
import "./AccessibilityMenu.scss";

function AccessibilityMenu() {
    const [toogle, setToogle] = useState(false);

    return(
        <>
            <button className="logo-button" onClick={() => setToogle(!toogle)}>
                <img src={accessibilityIcon} className="img-bottom-right"></img>
            </button>
            <div className={`accessibility-menu${toogle ? ' show-menu' : ''}`}></div>
            
        </>

    )

}

export default AccessibilityMenu;