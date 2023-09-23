import React, {ReactNode} from 'react';
import './ModalComponent.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({isOpen, onClose, children}) => {

  if (!isOpen) return null;
  return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-main">
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
          <div className="modal-content" onClick={e => {e.stopPropagation()}}>{children}</div>
        </div>
      </div>
  )
}

export default ModalComponent;