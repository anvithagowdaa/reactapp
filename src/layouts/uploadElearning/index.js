/**
=========================================================
* Shikshana MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Switch from "@mui/material/Switch";

// Shikshana MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import Select from "react-select";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout1";

import axios from "axios";
import { ipofserver } from 'global';

// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

const options = [
  { label: "Select standard", value: "" },
  { label: "1st standard", value: "1st" },
  { label: "2nd standard", value: "2nd" },
  { label: "3rd standard", value: "3rd" },
  { label: "4th standard", value: "4th" },
  { label: "5th standard", value: "5th" }
];

const styles = {
  control: base => ({
    ...base,
    fontFamily: "Calibri",
    fontSize: '18px'
  }),
  menu: base => ({
    ...base,
    fontFamily: "Calibri",
    fontSize: '18px'
  })
};

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);

  const [selectedValue, setSelectedValue] = useState('');

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [inputField, setInputField] = useState({
    topic: '',
    name: '',
  })

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleChange1 = e => {
    setSelectedValue(e.value);
  }

  function clearInput() {
    setInputField({
      name: '',
      topic: ''
    });
    setSelectedFile('');
    setSelectedValue('');
  }

  const [selectedFile, setSelectedFile] = useState();

  function handleChange(e) {
    setSelectedFile(e.target.files[0]);
  }

  const handleSubmission = async () => {
    // console.log(isFilePicked);
    if (selectedFile == undefined || inputField.name == '' || selectedValue == '') {
      alert("Please fill all details !") // eslint-disable-line no-alert
    }
    else {

      const formData = new FormData();

      formData.append('File', selectedFile);
      formData.append('topic', inputField.topic);
      formData.append('title', inputField.name);
      formData.append('standard', selectedValue);

      const res = await axios.post(`${ipofserver}uploadElearning`, formData);

      if (res.data == "success") {
        alert("E-learning uploaded sucessfully !")
        clearInput()
      }
      else if (res.data == "exist") {
        alert("E-learning already uploaded!")
      }
      else {
        alert("E-learning not uploaded !")
      }

    }
  };

  return (
    <IllustrationLayout
      title="Upload E-learning data"
      description="Enter your E-learning data to upload"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput type="text" placeholder="Enter link of e-learning topic" size="large" name="topic" value={inputField.topic}
            onChange={inputsHandler} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="file" size="large" name="name" onChange={handleChange} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="text" placeholder="Title of e-learning topic" size="large" name="name" value={inputField.name}
            onChange={inputsHandler} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <Select className="select" styles={styles} options={options} onChange={handleChange1}
            value={options.find(obj => obj.value === selectedValue)} />
        </ArgonBox>
        <ArgonBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <ArgonTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mt={4} mb={10}>
          <ArgonButton color="info" size="large" style={{ fontSize: 17 }} onClick={handleSubmission} fullWidth>
            Upload e-learning
          </ArgonButton>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
