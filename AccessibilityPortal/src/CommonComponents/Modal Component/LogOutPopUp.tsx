import React, {ReactNode} from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size: "s" | "m" |"l";
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, size }) => {
  return (
    <>
      {isOpen && (
        <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Do you want to logout?</h5>
              </div>
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
