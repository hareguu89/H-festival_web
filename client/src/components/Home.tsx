import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
axios.defaults.withCredentials = true;

type FormData = {
  fullname: string;
  email: string;
  mobile: string;
  picture: any;
  region: string;
  country: string;
  sex: string;
};

interface Iprops {
  setUserInfo: React.Dispatch<React.SetStateAction<FormData>>;
  setbIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home = ({ setbIsUpdate, setUserInfo }: Iprops): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [imageFile, setImageFile] = useState<any>();
  const [bIsError, setbIsError] = useState(false);

  const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const ImgHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      let fileSize = event.target.files[0].size;

      if (fileSize > 52428800) {
        setbIsError(true);
      } else {
        setbIsError(false);
        const data = new FormData();
        data.append(
          "profileImage",
          event.target.files[0],
          event.target.files[0].name,
        );
        await axios
          .post("http://localhost:4000/imgUpload", data, {
            headers: { "Content-Type": "multipart/form-data;" },
          })
          .then((result) => {
            if (result.data.location) {
              setImageFile(result.data.location);
            }
          });
      }
    }
  };

  const submitHandle = async (data: FormData) => {
    setUserInfo({
      fullname: data.fullname,
      email: data.email,
      mobile: data.mobile,
      region: data.region,
      country: data.country,
      picture: imageFile,
      sex: data.sex,
    });

    setbIsUpdate(false);

    // await axios.post("http://localhost:4000/dealers", body).then((result) => {
    //   console.log(result);
    //   if (result.data === "완료.") {
    //     setbIsUpdate(false);
    //   }
    // });
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitHandle)}>
        <Body>
          <Content>
            <Label>Full Name</Label>
            <Input
              type="text"
              id="fname"
              {...register("fullname", {
                required: true,
                minLength: 2,
                maxLength: 20,
              })}
            />
            <Error>
              {(errors.fullname?.type === "required" &&
                "Full name is required") ||
                (errors.fullname?.type === "minLength" &&
                  "Your name is too short. Please Check your name again.")}
            </Error>
          </Content>
          <Content>
            <Label>E-Mail</Label>
            <Input
              type="text"
              id="email"
              {...register("email", {
                required: true,
                pattern: emailRule,
              })}
            />
            <Error>
              {(errors.email?.type === "pattern" &&
                "You have entered an invalid e-mail address. Please try again.") ||
                (errors.email?.type === "required" &&
                  "Email address is required.")}
            </Error>
          </Content>

          <Content>
            <Label>Phone Number</Label>
            <Input
              type="number"
              id="mobile"
              {...register("mobile", {
                required: true,
                minLength: 8,
                valueAsNumber: true,
              })}
            />
            <Error>
              {(errors.mobile?.type === "minLength" &&
                "Your mobile number is too short. Please check again") ||
                (errors.mobile?.type === "required" &&
                  "Mobile number is required.")}
            </Error>
          </Content>

          <Content>
            <Label>Upload profile picture</Label>
            <InputImage>
              <Label htmlFor="fileUpload" size="16px" width="40px">
                . . .
              </Label>
              <Input
                formEncType="multipart/form-data"
                type="file"
                id="fileUpload"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => ImgHandler(e)}
              />
            </InputImage>
            <Error>
              {bIsError ? "Your image must be smaller than 50MB " : null}
            </Error>
          </Content>
          <Content>
            <Label>Regional Headquaters</Label>
            <Selection {...register("region", { required: true })}>
              <option value=""> Please choose an option </option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="hamster">Hamster</option>
              <option value="parrot">Parrot</option>
              <option value="spider">Spider</option>
              <option value="goldfish">Goldfish</option>
            </Selection>
            <Error>
              {errors.region?.type === "required" && "Please select options."}
            </Error>
          </Content>
          <Content>
            <Label>Country</Label>
            <Selection {...register("country", { required: true })}>
              <option value=""> Please choose an option </option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="hamster">Hamster</option>
              <option value="parrot">Parrot</option>
              <option value="spider">Spider</option>
              <option value="goldfish">Goldfish</option>
            </Selection>
            <Error>
              {errors.country?.type === "required" && "Please select options."}
            </Error>
          </Content>
        </Body>
        <CheckBox>
          <LabelCheck htmlFor="Male">
            <span>Male</span>
          </LabelCheck>
          <LabelCheck className="box-radio-input">
            <Input
              type="radio"
              id="Male"
              value="Male"
              {...register("sex", { required: true })}
            ></Input>
            <span></span>
          </LabelCheck>

          <LabelCheck htmlFor="Female">
            <span>Female</span>
          </LabelCheck>
          <LabelCheck className="box-radio-input">
            <Input
              type="radio"
              id="Female"
              value="Female"
              {...register("sex", { required: true })}
            ></Input>
            <span></span>
          </LabelCheck>
        </CheckBox>
        <Error>
          {errors.sex?.type === "required" && "Please check your Gender."}
        </Error>
        <ButtonBox>
          <Button>Next</Button>
        </ButtonBox>
      </form>
    </>
  );
};

export default Home;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Error = styled.div`
  margin-top: -2px;
  font-size: 12px;
  color: orange;
`;

const ButtonBox = styled.div`
  margin-top: 30px;
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
  align-items: center;
  gap: 10px;
  width: 550px;
  margin-top: 15px;
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
