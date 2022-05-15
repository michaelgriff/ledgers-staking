import styled from "styled-components";

export const ConnectButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #38446d;
  color: white;
  padding: 20px 30px;
  cursor: pointer;
  bottom: 20px;
  font-family: kooky;
  font-size: 24px;
  z-index: 1;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.7);
  :hover {
    background: #fff;
    color: #1c254e;
    transition: 0.2s ease-in-out;
  }
`;

export const ConnectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;
