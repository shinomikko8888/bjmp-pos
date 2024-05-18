import ModalBody from "./modal-template/modal-body";
import ModalFooter from "./modal-template/modal-footer";
import ModalHeader from "./modal-template/modal-header";
import '../../styles/modals/general.css';
import { useState } from "react";

export default function Modal({ headerContent, footerContent, bodyContent, stateChecker, stateControl, customWidth, customZIndex}) {
  const handleBackdropClick = (e) => {
    // Check if the click target is the backdrop element
    if (e.target.id === 'modal') {
        stateControl((prev) => !prev);
    }
  };
  return (
    <>
      <div
        className={`modal ${!stateChecker ? 'closed' : ''}`}
        id="modal"
        onClick={handleBackdropClick}
        style={{zIndex: customZIndex}}
      >
        <div className={`modal-content ${!stateChecker ? 'closed' : ''}`} onClick={(e) => e.stopPropagation()} style={{width: customWidth}}>
          <ModalHeader content={headerContent} />
          <ModalBody content={bodyContent} />
          <ModalFooter content={footerContent} />
        </div>
      </div>
    </>
  );
}
