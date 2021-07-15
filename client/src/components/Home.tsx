import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import CountryCode from "../assets/CountryCode";
import axios from "axios";
axios.defaults.withCredentials = true;

type FormData = {
  firstName: string;
  lastName: string;
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

type TObj = {
  src: {};
};

const Home = ({ setbIsUpdate, setUserInfo }: Iprops): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [imageFile, setImageFile] = useState<TObj>({ src: {} });
  const [bIsError, setbIsError] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  // const [uploaded, setUploaded] = useState<boolean>(false);
  const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const mobileRule = /^[0-9]*$/;

  const ImgHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.files) {
      let fileSize = event.target.files[0].size;

      if (fileSize > 52428800) {
        setbIsError(true);
      } else {
        let data = new FormData();

        for (let i = 0; i < event.target.files.length; i++) {
          data.append(
            "profileImage",
            event.target.files[i],
            event.target.files[i].name,
          );
        }
        setFileName(event.target.files[0].name);
        await axios
          .post("https://server.hmc-convention-2021.com/imgUpload", data, {
            headers: { "Content-Type": "multipart/form-data;" },
          })
          .then((result) => {
            if (result.data.location) {
              imageFile.src = result.data.location;
            }
            // setUploaded(true);
          });
      }
    }
  };

  const handleMobileCountryCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
  };

  const submitHandle = async (data: FormData) => {
    let aNumber = countryCode + data.mobile;

    setUserInfo({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: aNumber,
      region: data.region,
      country: data.country,
      picture: imageFile,
      sex: data.sex,
    });

    setbIsUpdate(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(submitHandle)}>
        <Body>
          <Content direction="row">
            <NameSpace>
              <Label>First Name</Label>
              <Input
                type="text"
                id="fname"
                {...register("firstName", {
                  required: true,
                  maxLength: 20,
                })}
              />
              <Error>
                {(errors.firstName?.type === "required" &&
                  "First name is required") ||
                  (errors.firstName?.type === "minLength" &&
                    "Your name is too short. Please Check your name again.")}
              </Error>
            </NameSpace>
            <NameSpace>
              <Label>Last Name</Label>
              <Input
                type="text"
                id="fname"
                {...register("lastName", {
                  required: true,
                  minLength: 1,
                  maxLength: 20,
                })}
              />
              <Error>
                {(errors.lastName?.type === "required" &&
                  "Full name is required") ||
                  (errors.lastName?.type === "minLength" &&
                    "Your name is too short. Please Check your name again.")}
              </Error>
            </NameSpace>
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

          <ContentNumber>
            <Label>Phone Number</Label>
            <NumberBox>
              <NumberSelect onChange={(e) => handleMobileCountryCode(e)}>
                {CountryCode.map((el, index) => (
                  <option value={el.code} key={index}>
                    {el.name}
                  </option>
                ))}
              </NumberSelect>
              <CodeNumber>{countryCode} -</CodeNumber>
              <NumberInput
                type="text"
                id="mobile"
                {...register("mobile", {
                  // required: true,
                  minLength: 8,
                  valueAsNumber: true,
                  pattern: mobileRule,
                })}
              />
            </NumberBox>
            <Error>
              {(errors.mobile?.type === "minLength" &&
                "Your mobile number is too short. Please check again") ||
                (errors.mobile?.type === "required" &&
                  "Mobile number is required.") ||
                (errors.mobile?.type === "pattern" && "Only number needed")}
            </Error>
          </ContentNumber>

          <Content>
            <Label>Upload profile picture</Label>
            <InputImage>
              <FileName>{fileName}</FileName>
              <Label
                htmlFor="fileUpload"
                size="16px"
                width="200px"
                item="center"
              >
                . . .
              </Label>
              <Input
                formEncType="multipart/form-data"
                type="file"
                id="fileUpload"
                multiple
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => ImgHandler(e)}
              />
            </InputImage>
            <Error>
              {bIsError ? "Your image must be smaller than 50MB." : null}
              {/* {!uploaded
                ? "Your need to upload at least one image file."
                : null} */}
            </Error>
          </Content>
          <Content>
            <Label>Regional Headquaters</Label>
            <Selection {...register("region", { required: true })}>
              <option value=""> Please choose an option </option>
              <option value="Hyundai Motor North America Headquarters">
                Hyundai Motor North America Headquarters
              </option>
              <option value="Hyundai Motor Central & South America Headquarter">
                Hyundai Motor Central & South America Headquarters
              </option>
              <option value="Hyundai Motor Europe Headquarter">
                Hyundai Motor Europe Headquarter
              </option>
              <option value="Hyundai Motor Asia Pacific Headquarter">
                Hyundai Motor Asia Pacific Headquarters
              </option>
              <option value="Hyundai Motor M.East & Africa Headquarter">
                Hyundai Motor M.East & Africa Headquarters
              </option>
              <option value="Hyundai Motor Russia & CIS Headquarter">
                Hyundai Motor Russia & CIS Headquarters
              </option>
              <option value="Hyundai Motor India Headquarter">
                Hyundai Motor India Headquarters
              </option>
              <option value="China Operations">
                Beijing Hyundai Motor Company
              </option>
            </Selection>
            <Error>
              {errors.region?.type === "required" && "Please select options."}
            </Error>
          </Content>
          <Content>
            <Label>Country</Label>
            <Selection {...register("country", { required: true })}>
              <option value=""> Please choose an option </option>
              <option value="Afganistan">Afghanistan</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="American Samoa">American Samoa</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Anguilla">Anguilla</option>
              <option value="Antigua & Barbuda">Antigua & Barbuda</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Aruba">Aruba</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Barbados">Barbados</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bermuda">Bermuda</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Bonaire">Bonaire</option>
              <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
              <option value="Botswana">Botswana</option>
              <option value="Brazil">Brazil</option>
              <option value="British Indian Ocean Ter">
                British Indian Ocean Ter
              </option>
              <option value="Brunei">Brunei</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Burkina Faso">Burkina Faso</option>
              <option value="Burundi">Burundi</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Canada">Canada</option>
              <option value="Canary Islands">Canary Islands</option>
              <option value="Cape Verde">Cape Verde</option>
              <option value="Cayman Islands">Cayman Islands</option>
              <option value="Central African Republic">
                Central African Republic
              </option>
              <option value="Chad">Chad</option>
              <option value="Channel Islands">Channel Islands</option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Christmas Island">Christmas Island</option>
              <option value="Cocos Island">Cocos Island</option>
              <option value="Colombia">Colombia</option>
              <option value="Comoros">Comoros</option>
              <option value="Congo">Congo</option>
              <option value="Cook Islands">Cook Islands</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Cote DIvoire">Cote DIvoire</option>
              <option value="Croatia">Croatia</option>
              <option value="Cuba">Cuba</option>
              <option value="Curaco">Curacao</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Djibouti">Djibouti</option>
              <option value="Dominica">Dominica</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="East Timor">East Timor</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Equatorial Guinea">Equatorial Guinea</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Falkland Islands">Falkland Islands</option>
              <option value="Faroe Islands">Faroe Islands</option>
              <option value="Fiji">Fiji</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="French Guiana">French Guiana</option>
              <option value="French Polynesia">French Polynesia</option>
              <option value="French Southern Ter">French Southern Ter</option>
              <option value="Gabon">Gabon</option>
              <option value="Gambia">Gambia</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Ghana">Ghana</option>
              <option value="Gibraltar">Gibraltar</option>
              <option value="Great Britain">Great Britain</option>
              <option value="Greece">Greece</option>
              <option value="Greenland">Greenland</option>
              <option value="Grenada">Grenada</option>
              <option value="Guadeloupe">Guadeloupe</option>
              <option value="Guam">Guam</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guinea">Guinea</option>
              <option value="Guyana">Guyana</option>
              <option value="Haiti">Haiti</option>
              <option value="Hawaii">Hawaii</option>
              <option value="Honduras">Honduras</option>
              <option value="Hong Kong">Hong Kong</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="Indonesia">Indonesia</option>
              <option value="India">India</option>
              <option value="Iran">Iran</option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland">Ireland</option>
              <option value="Isle of Man">Isle of Man</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Jamaica">Jamaica</option>
              <option value="Japan">Japan</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="Kiribati">Kiribati</option>
              <option value="Korea North">Korea North</option>
              <option value="Korea South">Korea South</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Laos">Laos</option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberia">Liberia</option>
              <option value="Libya">Libya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Macau">Macau</option>
              <option value="Macedonia">Macedonia</option>
              <option value="Madagascar">Madagascar</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Malawi">Malawi</option>
              <option value="Maldives">Maldives</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="Marshall Islands">Marshall Islands</option>
              <option value="Martinique">Martinique</option>
              <option value="Mauritania">Mauritania</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Mayotte">Mayotte</option>
              <option value="Mexico">Mexico</option>
              <option value="Midway Islands">Midway Islands</option>
              <option value="Moldova">Moldova</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Morocco">Morocco</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Nambia">Nambia</option>
              <option value="Nauru">Nauru</option>
              <option value="Nepal">Nepal</option>
              <option value="Netherland Antilles">Netherland Antilles</option>
              <option value="Netherlands">Netherlands (Holland, Europe)</option>
              <option value="Nevis">Nevis</option>
              <option value="New Caledonia">New Caledonia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Niger">Niger</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Niue">Niue</option>
              <option value="Norfolk Island">Norfolk Island</option>
              <option value="Norway">Norway</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Palau Island">Palau Island</option>
              <option value="Palestine">Palestine</option>
              <option value="Panama">Panama</option>
              <option value="Papua New Guinea">Papua New Guinea</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Phillipines">Philippines</option>
              <option value="Pitcairn Island">Pitcairn Island</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Puerto Rico">Puerto Rico</option>
              <option value="Qatar">Qatar</option>
              <option value="Republic of Montenegro">
                Republic of Montenegro
              </option>
              <option value="Republic of Serbia">Republic of Serbia</option>
              <option value="Reunion">Reunion</option>
              <option value="Romania">Romania</option>
              <option value="Russia">Russia</option>
              <option value="Rwanda">Rwanda</option>
              <option value="St Barthelemy">St Barthelemy</option>
              <option value="St Eustatius">St Eustatius</option>
              <option value="St Helena">St Helena</option>
              <option value="St Kitts-Nevis">St Kitts-Nevis</option>
              <option value="St Lucia">St Lucia</option>
              <option value="St Maarten">St Maarten</option>
              <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
              <option value="St Vincent & Grenadines">
                St Vincent & Grenadines
              </option>
              <option value="Saipan">Saipan</option>
              <option value="Samoa">Samoa</option>
              <option value="Samoa American">Samoa American</option>
              <option value="San Marino">San Marino</option>
              <option value="Sao Tome & Principe">Sao Tome & Principe</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Seychelles">Seychelles</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="Singapore">Singapore</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Solomon Islands">Solomon Islands</option>
              <option value="Somalia">Somalia</option>
              <option value="South Africa">South Africa</option>
              <option value="Spain">Spain</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Sudan">Sudan</option>
              <option value="Suriname">Suriname</option>
              <option value="Swaziland">Swaziland</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Syria">Syria</option>
              <option value="Tahiti">Tahiti</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Thailand">Thailand</option>
              <option value="Togo">Togo</option>
              <option value="Tokelau">Tokelau</option>
              <option value="Tonga">Tonga</option>
              <option value="Trinidad & Tobago">Trinidad & Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Turks & Caicos Is">Turks & Caicos Is</option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Uganda">Uganda</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Arab Erimates">United Arab Emirates</option>
              <option value="United States of America">
                United States of America
              </option>
              <option value="Uraguay">Uruguay</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="Vatican City State">Vatican City State</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Virgin Islands (Brit)">
                Virgin Islands (Brit)
              </option>
              <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
              <option value="Wake Island">Wake Island</option>
              <option value="Wallis & Futana Is">Wallis & Futana Is</option>
              <option value="Yemen">Yemen</option>
              <option value="Zaire">Zaire</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
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
      </Form>
    </>
  );
};

export default Home;

const NameSpace = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  @media only screen and (max-width: 770px) {
    width: 47%;
  }
`;

const Form = styled.form`
  @media only screen and (max-width: 770px) {
    width: 320px;
    font-size: 10px;
  }
`;

const Content = styled.div<{ direction?: string }>`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "column")};
  justify-content: space-between;
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
  }
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 550px;
  margin-top: 15px;
  @media only screen and (max-width: 770px) {
    width: 320px;
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

const Body = styled.div`
  display: flex;
  gap: 20px;
  width: 550px;
  flex-direction: column;

  @media (max-width: 770px) {
    width: 320px;
    font-size: 10px;
    gap: 10px;
  }
`;

const Input = styled.input``;

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

const Selection = styled.select``;

const LabelCheck = styled.label`
  position: relative;
  /* left: 100px; */
`;

const FileName = styled.div`
  @media only screen and (max-width: 770px) {
    /* width: 320px; */
    font-size: 6px;
  }
`;

const ContentNumber = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NumberBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: solid 1px white;
  border-radius: 5px;
`;
const NumberInput = styled.input`
  width: 100%;
  border: none;
`;
const NumberSelect = styled.select`
  border: none;
  width: 40%;
  @media only screen and (max-width: 770px) {
    /* width: 320px; */
    font-size: 10px;
  }
`;

const CodeNumber = styled.div`
  padding: 10px;
  font-size: 16px;
  height: 100%;
  width: 10%;
  white-space: nowrap;
  @media only screen and (max-width: 770px) {
    padding: 0;
  }
`;
