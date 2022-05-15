import React from "react";
import { LoadingContainer } from "./LoadingElements";
import { HashLoader } from "react-spinners";

const LoadingScreen = ({ loading }) => {
  return (
    <LoadingContainer>
      <HashLoader size={50} color={"#fff"} loading={loading} />
    </LoadingContainer>
  );
};

export default LoadingScreen;
