import styled from "styled-components";

export const StatsContainer = styled.div`
  padding-top: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  color: white;
  font-size: 30px;
`;

export const StatsRow = styled.div`
  display: flex;
  align-items: center;
`;

export const StatRed = styled.div`
  font-size: 20px;
  border-radius: 20px;
  border: 8px solid red;
  color: white;
  text-align: center;
  padding: 5px 35px;
  margin: 25px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.7);
`;

export const StatSilver = styled.div`
  font-size: 20px;
  border-radius: 20px;
  border: 8px solid silver;
  color: white;
  text-align: center;
  padding: 5px 35px;
  margin: 25px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.7);
`;

export const StatGold = styled.div`
  font-size: 20px;
  border-radius: 20px;
  border: 8px solid gold;
  color: white;
  text-align: center;
  padding: 5px 35px;
  margin: 25px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.7);
`;
