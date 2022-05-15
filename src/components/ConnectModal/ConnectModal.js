import React, { useRef } from "react";
import {
  ConnectBackground,
  ConnectButtonContainerBottom,
  ConnectButtonContainerTop,
  ConnectCloseModalButton,
  ConnectModalContent,
  ConnectModalWrapper,
  ImageWrapper,
} from "./ConnectModalElements";
import mm from "../../mm.png";
import wc from "../../wc.png";

const ConnectModal = ({
  walletConnect,
  connect,
  showConnectModal,
  setConnectShowModal,
}) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setConnectShowModal(false);
    }
  };
  return (
    <>
      {showConnectModal ? (
        <ConnectBackground ref={modalRef} onClick={closeModal}>
          <ConnectModalWrapper showConnectModal={showConnectModal}>
            <ConnectModalContent>
              <h1>Connect to The Ledge.</h1>
              <br />
              <ConnectButtonContainerTop onClick={connect}>
                <img class="padding" src={mm} alt={"mm"} />
                <p>Connect with Metamask</p>
              </ConnectButtonContainerTop>
              <ConnectButtonContainerBottom onClick={walletConnect}>
                <ImageWrapper>
                  <img class="padding" src={wc} alt={"wc"} />
                </ImageWrapper>
                <p>Connect with Walletconnect</p>
              </ConnectButtonContainerBottom>
            </ConnectModalContent>
            <ConnectCloseModalButton
              aria-label="Close modal"
              color="white"
              onClick={() => setConnectShowModal((prev) => !prev)}
            />
          </ConnectModalWrapper>
        </ConnectBackground>
      ) : null}
    </>
  );
};

export default ConnectModal;
