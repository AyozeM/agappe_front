import React, { useState } from 'react';
import { ModalService } from "../services/Modal.service";

const modalService: ModalService = ModalService.create();
const styles = {
  closeButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1% 3%'
  }
}

export const Modal: React.FC = () => {
  const [isopen, setIsOpen] = useState(false);
  const [component, setComponent] = useState();

  modalService.modalUpdate$.subscribe(() => {
    setIsOpen(modalService.isOpen);
    setComponent(modalService.openedModal);
  });

  return isopen ? (
    <div className="aux-modal">
      <div className="modal">
        <div style={styles.closeButton}>
          <h5>Crear un agappe</h5>
          <i className="material-icons modal-close" onClick={() => modalService.close()}>close</i>
        </div>
        <div className="modal-content">{component}</div>
      </div>
    </div>
  ) : null;
}