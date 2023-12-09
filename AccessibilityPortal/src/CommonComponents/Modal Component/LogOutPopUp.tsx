import React, {ReactNode} from 'react';

// Interface for the props accepted by the Modal component
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    size: "s" | "m" | "l";
}

// Modal component: Displays a modal with a header and a footer.
// The modal only appears if the isOpen prop is true.
const Modal: React.FC<ModalProps> = ({isOpen, onClose, children, size}) => {
    return (
        <>
            {/* Conditional rendering based on isOpen prop */}
            {isOpen && (
                <div className="modal" tabIndex={-1} role="dialog" style={{display: 'block'}}>
                    <div className={`modal-dialog modal-${size}`} role="document">
                        <div className="modal-content">
                            {/* Modal header with title */}
                            <div className="modal-header">
                                <h5 className="modal-title">Do you want to logout?</h5>
                            </div>
                            {/* Modal footer containing the children components */}
                            <div className="modal-footer">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;

