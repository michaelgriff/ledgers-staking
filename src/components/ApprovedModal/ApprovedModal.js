import React, { useRef } from "react";
import {
  Background,
  CloseModalButton,
  ModalContent,
  ModalImg,
  ModalWrapper,
} from "./ModalElements";
import ledger from "../../135.png";

const ApprovedModal = ({ showModal, setShowModal, setApprovalForAll }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  return (
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <ModalWrapper showModal={showModal}>
            <ModalImg src={ledger} alt={"thing"} />
            <ModalContent>
              <h1>Approve the ledge</h1>
              <p>
                To stake your Ledgers NFT, <span>you must</span> approve the
                Ledegrs Staking contract{" "}
              </p>
              <button class="approval" onClick={setApprovalForAll}>
                APPROVE
              </button>
            </ModalContent>
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setShowModal((prev) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default ApprovedModal;
