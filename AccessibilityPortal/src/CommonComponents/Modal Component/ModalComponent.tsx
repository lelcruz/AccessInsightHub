import React, {ReactNode} from 'react';
import './ModalComponent.scss';

// Interface defining the properties expected by the ModalComponent
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    size: "xs" | "s" | "m" | "l";
}

// ModalComponent: A flexible and reusable modal component
const ModalComponent: React.FC<ModalProps> = ({isOpen, onClose, children, size}) => {
    // Do not render the modal if isOpen is false
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* Modal main container with dynamic size class */}
            <div
                className={`modal-main ${size === "xs" ? "extra-small" : size === "s" ? "small" : size === "m" ? "medium" : "large"}`}>
                {/* Close button for the modal */}
                <button className="modal-close-button" onClick={onClose}>
                    &times;
                </button>
                {/* Modal content area, stops propagation of click events to prevent closing when clicked inside */}
                <div className="modal-content" onClick={e => {
                    e.stopPropagation()
                }}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalComponent;
