import {useDraggable} from "@dnd-kit/core";
import React from "react";
import RadioButtonIcon from "../../assets/radio-button-checked-svgrepo-com.svg";
import CheckBoxesIcon from "../../assets/checkbox-svgrepo-com.svg";
import DropDownIcon from "../../assets/circle-arrow-up-svgrepo-com.svg";
import FileUploadIcon from "../../assets/folder-upload-svgrepo-com.svg";


// Define a TypeScript interface for the props that the DraggableMenu component expects
interface MenuProps {
    id: number;
}

// Define the DraggableMenu component that takes the 'id' prop and makes the menu items draggable
function DraggableMenu(props: MenuProps) {
    // Destructure the attributes, listeners, and setNodeRef from a custom hook (useDraggable)
    const {attributes, listeners, setNodeRef} = useDraggable({id: props.id});

    return (
        <div className="side-menu">
            <ul>
                {/* Create a draggable list item with attributes and listeners */}
                <li ref={setNodeRef} {...listeners} {...attributes}>
                    <a href="">
                        <img src={RadioButtonIcon}/> Multiple choice
                    </a>
                </li>
                {/* Additional menu items */}
                <li>
                    <a href="#">
                        <img src={CheckBoxesIcon}/> Checkboxes
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src={DropDownIcon}/> Dropdown
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src={FileUploadIcon}/> File upload
                    </a>
                </li>
            </ul>
        </div>
    );
}

// Export the DraggableMenu component as the default export
export default DraggableMenu;
