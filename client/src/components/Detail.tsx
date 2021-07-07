import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
    fullname: string;
    email: string;
    mobile: string;
    picture: string;
    region: string;
    country: string;
    sex: string;
  };
  setbIsEnd: React.Dispatch<React.SetStateAction<boolean>>;
}

const Detail = ({ userInfo, setbIsEnd }: info): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string>();
  const [bIsUpload, setbIsUpload] = useState<boolean>(false);
  const history = useHistory();

  const MediaHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      let fileSize = event.target.files[0].size;

      console.log(fileSize);

      if (fileSize > 524288000) {
        setMessage("Your image must be smaller than 500MB ");
        return;
      } else {
        setbIsUpload(true);
        const data = new FormData();
        data.append(
          "profileImage",
          event.target.files[0],
          event.target.files[0].name,
        );

        await axios
          .post("http://3.36.93.32/mediaPost", data, {
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

            console.log(res);

            const { location } = res.data;

            setUploadedFile(location);

            setMessage("File Uploaded");
          })
          .catch((error) => {
            if (error) {
              setMessage("There was a problem with the server");
            }
            setUploadPercentage(0);
          });
      }
    }
    setbIsUpload(false);
  };

  const submitHandle = async (data: FormData) => {
    // console.log(data);

    let body = {
      fullname: userInfo.fullname,
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

    console.log("바디 : ", body);

    await axios.post("http://3.36.93.32/dealers", body).then((result) => {
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
            <Label htmlFor="fileUpload" size="16px" width="40px">
              . . .
            </Label>
            <Input
              formEncType="multipart/form-data"
              type="file"
              id="fileUpload"
              accept="video/*"
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
            <span>H-Story</span>
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
            <span>H-Travel</span>
          </LabelCheck>
          <LabelCheck className="box-radio-input">
            <Input
              type="radio"
              id="story"
              value="H-Travel"
              {...register("selectedDestination", { required: true })}
            ></Input>
            <span></span>
          </LabelCheck>

          <LabelCheck>
            <span>H-Gather</span>
          </LabelCheck>
          <LabelCheck className="box-radio-input">
            <Input
              type="radio"
              id="story"
              value="H-Gather"
              {...register("selectedDestination", { required: true })}
            ></Input>
            <span></span>
          </LabelCheck>
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
      </Form>
      {/* <FileUpload/> */}
    </Body>
  );
};

export default Detail;

const Body = styled.div`
  display: flex;
  gap: 20px;
  width: 550px;
  flex-direction: column;
`;

const Label = styled.label<{ size?: string; width?: string }>`
  align-items: center;
  font-size: ${(props) => (props.size ? props.size : "inherit")};
  width: ${(props) => (props.width ? props.width : "auto")};
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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

const ProgressContainer = styled.div`
  display: flex;
  width: 550px;
  height: 23px;
  border: 1px solid white;
  border-radius: 15px;
  align-items: center;
`;
