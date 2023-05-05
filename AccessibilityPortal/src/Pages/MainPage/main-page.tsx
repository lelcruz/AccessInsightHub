import React from 'react';
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent"; 
import {useNavigate} from "react-router-dom";
import '../../Styles/main.scss';
function MainPage(){

    return (
        <div className="main-page">
            <div className="header">
                <div className="input-group">
                    <input type="search" className="form-control"></input>
                    <button className="btn btn-dark">Search</button>  
                </div>    
            </div>
        </div>
    )

}

export default MainPage;