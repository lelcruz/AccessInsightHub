import React from 'react';
import BasicCardComponent from "../../CommonComponents/Card/BasicCardComponent";

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

            <div>
            <div>
                <BasicCardComponent
                    imageUrl={"/vite.svg"}
                    title={"Example Card 1"}
                ></BasicCardComponent>
            </div>
            <div>
                <BasicCardComponent
                    imageUrl={"/vite.svg"}
                    title={"Example Card 2"}
                ></BasicCardComponent>
            </div>
            <div>
                <BasicCardComponent
                    imageUrl={"/vite.svg"}
                    title={"Example Card 3"}
                ></BasicCardComponent>
            </div>
            <div>
                <BasicCardComponent
                    imageUrl={"/vite.svg"}
                    title={"Example Card 4"}
                ></BasicCardComponent>
            </div>


        </div>


        </div>
       

        

    );

}

export default MainPage;