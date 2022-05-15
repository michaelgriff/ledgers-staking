import styled from "styled-components";
import { MdClose } from "react-icons/md";

export const ConnectBackground = styled.div`
  width: 100%;
  height: 200vh;
  margin-bottom: -50px;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

export const ConnectModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #1c254e;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;

  @media screen and (max-width: 1000px) {
    width: 75%;
    height: 20%;
  }
`;

export const ConnectModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #fff;
  font-size: 20px;
  padding-top: 20px;
  @media screen and (max-width: 1000px) {
    h1 {
      font-size: 3vw;
    }

    p {
      font-size: 2vw;
    }
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
    margin-top: 10px;
    font-family: kooky;
    font-size: 12px;
    border-radius: 5px;
  }
`;

export const ConnectCloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  color: white;
`;

export const ConnectButtonContainerTop = styled.div`
  display: flex;
  border: 2px solid #dddddd;
  align-items: flex-start;
  padding: 5px 30px;
  width: 60%;
  border-radius: 10px 10px 0 0;
  cursor: pointer;

  :hover {
    background: #fff;
    color: #1c254e;
    transition: 0.2s ease-in-out;
  }
`;

export const ConnectButtonContainerBottom = styled.div`
  display: flex;
  border: 2px solid #dddddd;
  align-items: flex-start;
  padding: 5px 30px;
  width: 60%;
  border-radius: 0 0 10px 10px;
  border-width: 0 2px 2px 2px;

  :hover {
    background: #fff;
    color: #1c254e;
    transition: 0.2s ease-in-out;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
