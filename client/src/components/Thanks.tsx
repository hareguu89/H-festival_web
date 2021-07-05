import React, { useState } from "react";
import styled from "styled-components";

const Thanks = (): JSX.Element => {
  return (
    <>
      <Article>Thank you for your support.</Article>
    </>
  );
};

export default Thanks;

const Article = styled.article`
  color: white;
  font-size: 70px;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
