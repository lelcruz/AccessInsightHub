import React from "react";
import {useSortable} from "@dnd-kit/sortable";
import "./QuestionCard.scss";
import {CSS} from "@dnd-kit/utilities";
import DraggableIcon from "../../assets/grip-horizontal-s.svg";
import "bootstrap/dist/js/bootstrap.bundle.min";


interface SortableItemProps{
    id: number;
}

function SortableCard(props: SortableItemProps) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
     } = useSortable({id: props.id});

     const style = {
        transform: CSS.Transform.toString(transform),
        transition
     }

     return(
        <div ref={setNodeRef} style={style}>
            <div className="question-card">
            <div className="card">
                <div className="card-header" {...listeners}>
                    <img src={DraggableIcon} {...attributes}/>
                </div>
                <div className="card-body">
                    <div className="question" aria-label="Question" role="textbox" contentEditable="true" aria-multiline="true" />
                    <div className="answer">

                    </div>  
                </div>
                <div className="card-footer">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Function Menu
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#">Multiple choice</a></li>
                            <li><a className="dropdown-item" href="#">Checkboxes</a></li>
                            <li><a className="dropdown-item" href="#">Dropdown</a></li>
                            <li><a className="dropdown-item" href="#">File upload</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
     );

}
export default SortableCard;