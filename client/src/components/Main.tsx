import React, { useState } from "react";
import styled from "styled-components";
import Home from "./Home";
import Detail from "./Detail";

const Main = (): JSX.Element => {
  const [bIsUpdate, setbIsUpdate] = useState<boolean>(true);

  return (
    <>
      <MainContainer>
        <Header>
          <Welcome>Hyundai</Welcome>
          <Welcome>Metaverse Convention 2021</Welcome>
        </Header>
        {!bIsUpdate ? <Home setbIsUpdate={setbIsUpdate} /> : <Detail />}
      </MainContainer>
    </>
  );
};

export default Main;

const MainContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 50px;
`;

const Header = styled.header`
  width: 550px;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Welcome = styled.div`
  line-height: 50px;
`;
