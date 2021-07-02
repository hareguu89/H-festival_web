import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
axios.defaults.withCredentials = true;

type FormData = {
  selectedDestination: string;
  Description: string;
};

const Detail = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [mediaFile, setMediaFile] = useState<any>();

  const [percentage, setPercentatge] = useState<Number>(0);

  const [bIsError, setbIsError] = useState(false);

  const MediaHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      let fileSize = event.target.files[0].size;

      if (fileSize > 5000000) {
        setbIsError(true);
      } else {
        setbIsError(false);
        setMediaFile(event.target.files[0]);
        const data = new FormData();
        data.append(
          "Video File",
          event.target.files[0],
          event.target.files[0].name,
        );

        await axios
          .post("http://localhost:4000/imgUpload", data, {
            headers: { "Content-Type": "multipart/form-data;" },
            onUploadProgress(progressEvent: any) {
              const { loaded, total } = progressEvent;
              let percentage = Math.floor((loaded * 100) / total);
              console.log(`${percentage} kb of ${total} | ${percentage}%`);
            },
          })
          .then((result) => {
            if (result.data.location) {
              setMediaFile(result.data.location);
            }
          });
      }
    }
  };

  const submitHandle = async (data: FormData) => {
    console.log(data);
    let body = {
      mediaDest: mediaFile,
      Description: data.Description,
      selectedDest: data.selectedDestination,
    };

    await axios.post("http://localhost:4000/dealers", body).then((result) => {
      console.log(result);
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
          <Error>
            {bIsError ? "Your image must be smaller than 10MB " : null}
          </Error>
        </Content>
        <CheckBox>
          <div>
            <LabelCheck htmlFor="story">
              <span>H-Story</span>
            </LabelCheck>
            <Input
              type="radio"
              id="story"
              value="H-Story"
              {...register("selectedDestination", { required: true })}
            />
            <LabelCheck htmlFor="H-Travel">
              <span>H-Travel</span>
            </LabelCheck>
            <Input
              type="radio"
              id="H-Travel"
              value="H-Travel"
              {...register("selectedDestination", { required: true })}
            />
            <LabelCheck htmlFor="H-Gather">
              <span>H-Gather</span>
            </LabelCheck>
            <Input
              type="radio"
              id="H-Gather"
              value="H-Gather"
              {...register("selectedDestination", { required: true })}
            />
          </div>
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
  width: 550px;
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
