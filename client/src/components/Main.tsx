import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
axios.defaults.withCredentials = true;

const Main = (): JSX.Element => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    mobile: "",
    picture: "",
    region: "",
    country: "",
    sex: true,
  });
  const [imageFile, setImageFile] = useState<any>();

  const { fullname, email, mobile, picture, region, country, sex } = user;

  const ImgHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    if (event.target.files) {
      setImageFile(event.target.files[0]);
      // console.log(imageFile);

      const data = new FormData();
      data.append(
        "profileImage",
        event.target.files[0],
        event.target.files[0].name,
      );

      await axios
        .post("http://localhost:4000/dealers", data, {
          headers: { "Content-Type": "multipart/form-data;" },
        })
        .then((result) => {
          if (result) {
            setUser({
              ...user,
              picture: result.data.location,
            });
            console.log("세팅 됐나?", user);
          }
        });
    }
  };

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    if (event.target.name === "fname") {
      setUser({
        ...user,
        fullname: value,
      });
    } else if (event.target.name === "email") {
      setUser({
        ...user,
        email: value,
      });
    } else if (event.target.name === "mobile") {
      setUser({
        ...user,
        mobile: value,
      });
    }
  };

  const handleRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target);
    setUser({
      ...user,
      region: event.target.value,
    });
  };

  const handleCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target);
    setUser({
      ...user,
      country: event.target.value,
    });
  };

  const handleGender = (event: any) => {
    console.log(event.target.value);
    const { value } = event.target;

    if (value === "Male") {
      setUser({
        ...user,
        sex: true,
      });
    } else {
      setUser({
        ...user,
        sex: false,
      });
    }
  };

  const submitHandle = async () => {
    console.log(user);
    await axios.post("http://localhost:4000/dealers", user).then((data) => {
      console.log(data);
    });
  };

  return (
    <>
      <MainContainer>
        <Header>
          <Welcome>Hyundai</Welcome>
          <Welcome>Metaverse Convention 2021</Welcome>
        </Header>
        <Body>
          <Label>Full Name</Label>
          <Input
            type="text"
            id="fname"
            name="fname"
            value={fullname}
            onChange={handleUserName}
          />
          <Label>E-Mail</Label>
          <Input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleUserName}
          />
          <Label>Phone Number</Label>
          <Input
            type="text"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={handleUserName}
          />
          <Label>Upload profile picture</Label>
          <InputImage>
            <Label htmlFor="fileUpload" size="16px" width="40px">
              . . .
            </Label>
            <Input
              formEncType="multipart/form-data"
              type="file"
              id="fileUpload"
              onChange={(e) => ImgHandler(e)}
            />
          </InputImage>
          <Label>Regional Headquaters</Label>
          <Selection value={user.region} onChange={handleRegion}>
            <option value=""> Please choose an option </option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
          </Selection>
          <Label>Country</Label>
          <Selection value={user.country} onChange={handleCountry}>
            <option value=""> Please choose an option </option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
          </Selection>
        </Body>
        <CheckBox>
          <div>
            <LabelCheck htmlFor="Male">
              <span>Male</span>
            </LabelCheck>
            <Input
              type="radio"
              id="Male"
              name="Gender"
              value="Male"
              onChange={(e) => handleGender(e)}
            />
            <LabelCheck htmlFor="Female">
              <span>Female</span>
            </LabelCheck>
            <Input
              type="radio"
              id="Female"
              name="Gender"
              value="Female"
              onChange={(e) => handleGender(e)}
            />
          </div>
          <div></div>
        </CheckBox>
        <ButtonBox>
          <Button onClick={() => submitHandle()}>Register</Button>
        </ButtonBox>
      </MainContainer>
    </>
  );
};

export default Main;
const ButtonBox = styled.div`
  display: flex;
  width: 550px;
`;

const Button = styled.button`
  width: 100px;
  font-size: 16px;
  height: 35px;
  color: white;
  border: 1px solid white;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
`;

const CheckBox = styled.div`
  display: flex;
  width: 550px;
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
`;

const Welcome = styled.div`
  line-height: 50px;
`;

const Label = styled.label<{ size?: string; width?: string }>`
  align-items: center;
  font-size: ${(props) => (props.size ? props.size : "inherit")};
  width: ${(props) => (props.width ? props.width : "auto")};
`;

const Body = styled.div`
  display: flex;
  gap: 20px;
  width: 550px;
  flex-direction: column;
`;

const Input = styled.input``;

const InputImage = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: 35px;
  color: white;
  border: solid 1px white;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0);
`;

const Selection = styled.select``;

const LabelCheck = styled.label`
  position: relative;
  /* left: 100px; */
`;
