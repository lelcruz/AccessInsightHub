import {useDraggable} from "@dnd-kit/core";
import React from "react";
import RadioButtonIcon from "../../assets/radio-button-checked-svgrepo-com.svg";
import CheckBoxesIcon from "../../assets/checkbox-svgrepo-com.svg";
import DropDownIcon from "../../assets/circle-arrow-up-svgrepo-com.svg";
import FileUploadIcon from "../../assets/folder-upload-svgrepo-com.svg";
import SortableCard from "./SortableCard";

interface MenuProps{
    id: number;
}

function DraggableMenu(props: MenuProps){

    const {attributes, listeners, setNodeRef} = useDraggable({id: props.id,});

    return(
        <div className="side-menu">
                <ul>
                    <li ref={setNodeRef} {...listeners} {...attributes}><a href="">
                        <img src={RadioButtonIcon} /> Multiple choice </a>
                    </li>
                    <li><a href="#">
                        <img src={CheckBoxesIcon} /> Checkboxes</a></li>
                    <li ><a href="#">
                        <img src={DropDownIcon} /> Dropdown</a></li>
                    <li ><a href="#">
                        <img src={FileUploadIcon} /> File upload</a></li>
                </ul>
            </div>
    );
}       

export default DraggableMenu;