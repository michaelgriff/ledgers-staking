import styled from "styled-components";

export const DisplayContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const DisplayHalf = styled.div`
  text-align: center;
  color: white;
  flex: 2;
  font-size: 30px;
`;

export const DisplayModal = styled.div`
  background-color: #38446d;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  min-height: 500px;
  border-radius: 20px;
  margin: 0px 40px;
  position: relative;
  z-index: 1;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.7);
`;

export const ModalRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0px 10px;
  width: 100%;
`;

export const ModalImage = styled.img`
  border: 8px solid #1c254e;
  border-radius: 20px;
  margin-bottom: 10px;
  flex: 1;
  width: 70%;
  height: auto;
  max-height: 153px;
  max-width: 153px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.7);
`;

export const ModalImageGold = styled.img`
  border: 8px solid gold;
  border-radius: 20px;
  margin-bottom: 10px;
  flex: 1;
  width: 70%;
  height: auto;
  max-height: 153px;
  max-width: 153px;
`;

export const ModalButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #1c254e;
  color: white;
  margin-top: 20px;
  padding: 10px 30px;
  cursor: pointer;
  bottom: 20px;
  position: absolute;
  font-family: kooky;
  z-index: 1;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.7);
`;

export const ModalRowElement = styled.div`
  text-align: center;
  font-size: 15px;
  flex: 1;
  width: 20%;
  height: auto;
  margin: 20px 0px 5px;
  p {
    margin: 0px;
  }
`;
