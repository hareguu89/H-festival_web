import React, { useState } from "react";
import styled from "styled-components";
import Home from "./Home";
import Detail from "./Detail";
import hkhk from "../assets/hkhk.mp4";
import humanity from "../assets/humanity.mp4";
import Thanks from "./Thanks";

export type userData = {
  fullname: string;
  email: string;
  mobile: string;
  picture: string;
  region: string;
  country: string;
  sex: string;
};

const Main = (): JSX.Element => {
  const [bIsUpdate, setbIsUpdate] = useState<boolean>(true);
  const [bIsEnd, setbIsEnd] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState({
    fullname: "",
    email: "",
    mobile: "",
    picture: "",
    region: "",
    country: "",
    sex: "",
  });

  return (
    <>
      <MainContainer>
        <Video autoPlay loop muted>
          <source src="https://h-festival.s3.ap-northeast-2.amazonaws.com/humanity.mp4" />
        </Video>
        <Header>
          <Welcome>Hyundai</Welcome>
          <Welcome>Metaverse Convention 2021</Welcome>
        </Header>
        {!bIsEnd ? (
          bIsUpdate ? (
            <Home setbIsUpdate={setbIsUpdate} setUserInfo={setUserInfo} />
          ) : (
            <Detail userInfo={userInfo} setbIsEnd={setbIsEnd} />
          )
        ) : (
          <Thanks />
        )}
      </MainContainer>
    </>
  );
};

export default Main;

const Video = styled.video`
  position: absolute;
  width: 100%;
  top: 0%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

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
  font-family: "Hyundai Sans Text Office";
  line-height: 50px;
`;
