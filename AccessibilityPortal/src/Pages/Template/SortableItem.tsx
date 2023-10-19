import React from "react";
import {useSortable} from "@dnd-kit/sortable";
import {useDraggable} from "@dnd-kit/core";
import QuestionCard from "./QuestionCard";
import "./QuestionCard.scss";
import {CSS} from "@dnd-kit/utilities";
import DraggableIcon from "../../assets/grip-horizontal-s.svg";


interface SortableItemProps{
    id: string;
}

function SortableItem(props: SortableItemProps) {
    function Draggable() {
        const{attributes, listeners, setNodeRef} = useDraggable({id: 'id',})
    };

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
            {/*<QuestionCard>{props.id}</QuestionCard>*/}
            <div className="question-card">
            <div className="card">
                <div className="card-header" {...listeners} {...attributes} >
                    <img src={DraggableIcon} />
                </div>
                <div className="card-body">
                    <div className="question" aria-label="Question" role="textbox" contentEditable="true" aria-multiline="true" />
                    <div className="answer">
                        
                    </div>    
                </div>
                <div className="card-footer"> Function</div>
            </div>
        </div>
        </div>
     );

}
export default SortableItem;