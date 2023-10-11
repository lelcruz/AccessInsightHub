import React, {ReactNode} from 'react';
import './ModalComponent.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size: "xs" |"s" | "m" |"l";
}

const ModalComponent: React.FC<ModalProps> = ({isOpen, onClose, children, size}) => {

  if (!isOpen) return null;
  return (
      <div className="modal-overlay" onClick={onClose}>
        <div className={`modal-main ${size === "xs" ? "extra-small" : size === "s" ? "small" : size === "m" ? "medium" : "large"}`}>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
          <div className="modal-content" onClick={e => {e.stopPropagation()}}>{children}</div>
        </div>
      </div>
  )
}

export default ModalComponent;