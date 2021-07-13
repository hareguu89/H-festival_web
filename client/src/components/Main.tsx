import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Home from "./Home";
import Detail from "./Detail";
import Thanks from "./Thanks";

export type userData = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  picture: string;
  region: string;
  country: string;
  sex: string;
};

const Main = (): JSX.Element => {
  const [isMobile, setisMobile] = useState<boolean>(false);

  // 리사이즈 이벤트를 감지하여 가로 길이에 따라 모바일 여부 결정
  const resizingHandler = () => {
    if (window.innerWidth <= 1023) {
      setisMobile(true);
    } else {
      setisMobile(false);
    }
  };

  // 우선 맨 처음 1023이하면 모바일 처리
  useEffect(() => {
    if (window.innerWidth <= 770) {
      setisMobile(true);
    }

    window.addEventListener("resize", resizingHandler);
    return () => {
      // 메모리 누수를 줄이기 위한 removeEvent
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

  const [bIsUpdate, setbIsUpdate] = useState<boolean>(true);
  const [bIsEnd, setbIsEnd] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    picture: "",
    region: "",
    country: "",
    sex: "",
  });

  const webVideo = `https://h-festival.s3.ap-northeast-2.amazonaws.com/PPRK/Hyundai+x+Boston+Dynamics_BTSxBD_60s_No+Text_without+Logo.mp4?background=1?muted=1`;

  return (
    <>
      <MainContainer>
        {isMobile ? null : (
          <Video autoPlay loop muted>
            <Source src={webVideo} type="video/mp4" />
          </Video>
        )}
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

  @media (max-width: 768px) {
    width: 320px;
    font-size: 22px;
  }
`;

const Welcome = styled.div`
  font-family: "Hyundai Sans Text Office";
  line-height: 50px;
  @media (max-width: 768px) {
    line-height: 25px;
  }
`;

const Source = styled.source`
  width: 100%;
  height: 100%;
`;
const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  object-fit: cover;
  z-index: -1;
  @media (max-width: 768px) {
    width: 320px;
    height: auto;
  }
`;
