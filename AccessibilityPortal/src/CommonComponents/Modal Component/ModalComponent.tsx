import React, {ReactNode} from 'react';
import './ModalComponent.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size: "s" | "m";
}

const ModalComponent: React.FC<ModalProps> = ({isOpen, onClose, children, size}) => {

  if (!isOpen) return null;
  return (
      <div className="modal-overlay" onClick={onClose}>
        <div className={`modal-main ${size === "s" ? "small" : "medium"}`}>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
          <div className="modal-content" onClick={e => {e.stopPropagation()}}>{children}</div>
        </div>
      </div>
  )
}

export default ModalComponent;