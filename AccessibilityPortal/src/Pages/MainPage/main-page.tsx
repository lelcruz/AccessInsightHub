import React from 'react';
import BasicCardComponent from "../../CommonComponents/Card/BasicCardComponent";

import {useNavigate} from "react-router-dom";
//import '../../../node_modules/bootstrap/scss/_card.scss';

function MainPage(){

    return (
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


    );

}

export default MainPage;