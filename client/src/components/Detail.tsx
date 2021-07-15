import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { Line } from "rc-progress";
axios.defaults.withCredentials = true;

type FormData = {
  selectedDestination: string;
  Description: string;
};

interface info {
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    picture: string;
    region: string;
    country: string;
    sex: string;
  };
  setbIsEnd: React.Dispatch<React.SetStateAction<boolean>>;
}

type TObj = {
  src: {};
};

const Detail = ({ userInfo, setbIsEnd }: info): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState<TObj>({ src: {} });
  const [bIsUpload, setbIsUpload] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const MediaHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setbIsUpload(true);
      const data = new FormData();

      for (let i = 0; i < event.target.files.length; i++) {
        data.append(
          "profileImage",
          event.target.files[i],
          event.target.files[i].name,
        );
      }

      setFileName(event.target.files[0].name);

      await axios
        .post("https://server.hmc-convention-2021.com/mediaPost", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            let a = Number(progressEvent.loaded) * 100;
            let percentage = Math.round(a / progressEvent.total);
            setUploadPercentage(parseInt(String(percentage)));
          },
        })
        .then((res) => {
          setTimeout(() => setUploadPercentage(0), 10000);
          if (res.data.location) {
            uploadedFile.src = res.data.location;
            setMessage("File Uploaded");
          }
        })
        .catch((error) => {
          if (error) {
            setMessage("There was a problem with the server");
          }
          setUploadPercentage(0);
        });
    }
    setbIsUpload(false);
  };

  const submitHandle = async (data: FormData) => {
    let body = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      mobile: userInfo.mobile,
      picture: userInfo.picture,
      region: userInfo.region,
      country: userInfo.country,
      sex: userInfo.sex,
      mediaDest: uploadedFile,
      description: data.Description,
      selectedDest: data.selectedDestination,
    };
    await axios
      .post("https://server.hmc-convention-2021.com/dealers", body)
      .then((result) => {
        console.log(result.data);
        if (result.data === "완료.") {
          setbIsEnd(true);
        }
      });
  };

  return (
    <Body>
      <Form onSubmit={handleSubmit(submitHandle)}>
        <Content>
          <Label>Upload your files</Label>
          <InputImage>
            <FileName>{fileName}</FileName>
            <Label htmlFor="fileUpload" size="16px" width="200px" item="center">
              . . .
            </Label>
            <Input
              formEncType="multipart/form-data"
              type="file"
              id="fileUpload"
              multiple
              // accept="video/*"
              onChange={(e) => MediaHandler(e)}
            />
          </InputImage>
          {bIsUpload ? (
            <ProgressContainer>
              <Line
                percent={uploadPercentage}
                strokeWidth={4}
                strokeColor="white"
                trailColor="none"
              />
            </ProgressContainer>
          ) : null}
          <Error>{message}</Error>
        </Content>

        <CheckBox>
          <LabelCheck>
            <Span>H-Story</Span>
          </LabelCheck>
          <LabelCheck className="box-radio-input">
            <Input
              type="radio"
              id="story"
              value="H-Story"
              {...register("selectedDestination", { required: true })}
            ></Input>
            <span></span>
          </LabelCheck>

          <LabelCheck>
            <Span>H-Traveler</Span>
          </LabelCheck>
          <LabelCheck className="box-radio-input">
            <Input
              type="radio"
              id="story"
              value="H-Traveler"
              {...register("selectedDestination", { required: true })}
            ></Input>
            <span></span>
          </LabelCheck>

          {/* <LabelCheck>
            <Span>H-Gather</Span>
          </LabelCheck>
          <LabelCheck className="box-radio-input">
            <Input
              type="radio"
              id="story"
              value="H-Gather"
              {...register("selectedDestination", { required: true })}
            ></Input>
            <span></span>
          </LabelCheck> */}
        </CheckBox>

        <Error>
          {errors.selectedDestination?.type === "required" &&
            "Please tick one of these locations."}
        </Error>
        <Content>
          <Label>Description</Label>
          <Textarea
            {...register("Description", {
              required: true,
              max: 100,
              min: 10,
            })}
          />
        </Content>
        <Error>
          {(errors.Description?.type === "required" &&
            "Description is required.") ||
            (errors.Description?.type === "min" &&
              "at least 10 character needed.")}
        </Error>
        <ButtonBox>
          <Button>Submit</Button>
        </ButtonBox>
        <Error>{error}</Error>
      </Form>
    </Body>
  );
};

export default Detail;

const Body = styled.div`
  display: flex;
  gap: 20px;
  width: 550px;
  flex-direction: column;
  @media only screen and (max-width: 770px) {
    width: 320px;
    font-size: 10px;
    gap: 10px;
  }
`;

const Label = styled.label<{ size?: string; width?: string; item?: string }>`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.item ? "row-reverse" : "none")};
  cursor: ${(props) => (props.item ? "pointer" : "none")};
  font-size: ${(props) => (props.size ? props.size : "inherit")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media only screen and (max-width: 770px) {
    width: ${(props) => (props.width ? props.width : "320px")};
    font-size: 15px;
  }
`;

const Input = styled.input``;

const Span = styled.span`
  @media only screen and (max-width: 770px) {
    font-size: 15px;
  }
`;
const InputImage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  height: 35px;
  color: white;
  font-size: 14px;
  border: solid 1px white;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0);
  @media (max-width: 770px) {
    width: 320px;
    font-size: 10px;
    height: 25px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LabelCheck = styled.label`
  position: relative;
  /* left: 100px; */
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 550px;
  margin-bottom: 10px;
  @media only screen and (max-width: 770px) {
    width: 320px;
    margin-bottom: 0;
  }
`;

const Error = styled.div`
  font-size: 12px;
  color: orange;
`;

const Textarea = styled.textarea`
  padding: 10px;
  height: 200px;
  resize: none;
  font-size: 16px;
  color: white;
  border: solid 1px white;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0);
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 770px) {
    width: 320px;
    height: 150px;
    font-size: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media only screen and (max-width: 770px) {
    gap: 10px;
  }
`;

const ButtonBox = styled.div`
  margin-top: 30px;
  display: flex;
  @media only screen and (max-width: 770px) {
    margin-top: 20px;
  }
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

  @media only screen and (max-width: 770px) {
    width: 50px;
    height: 25px;
    font-size: 12px;
    padding: 0;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  width: 550px;
  height: 23px;
  border: 1px solid white;
  border-radius: 15px;
  align-items: center;
  @media only screen and (max-width: 770px) {
    width: 320px;
    height: 15px;
  }
`;

const FileName = styled.div``;
