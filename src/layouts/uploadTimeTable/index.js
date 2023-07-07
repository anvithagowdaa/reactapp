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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Shikshana MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import preview from "../../../src/assets/images/browse.jpg";
import docpreview from "../../../src/assets/images/docpreview.jpg"
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
    });
    setFile(null);
    setSelectedFile('');
    setSelectedValue('');
  }

  const [file, setFile] = useState();
  const [selectedFile, setSelectedFile] = useState();

  function handleChange(e) {
    var file = e.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split('.').pop();
    console.log('File extension:', fileExtension);

    if (fileExtension == 'jpg' || fileExtension == 'png' || fileExtension == 'jpeg'){
      setFile(URL.createObjectURL(e.target.files[0]));
      setSelectedFile(e.target.files[0]);
    }
    else{      
      setFile(docpreview);
      setSelectedFile(e.target.files[0]);
    }    
  }

  const handleSubmission = async () => {
    // console.log(isFilePicked);
    if (selectedFile == undefined || inputField.name == '' || selectedValue == '') {
      alert("Please fill all details !") // eslint-disable-line no-alert
    }
    else {

      const formData = new FormData();

      formData.append('File', selectedFile);
      formData.append('title', inputField.name);
      formData.append('standard', selectedValue);

      const res = await axios.post(`${ipofserver}uploadTimeTable`, formData);

      if (res.data == "success") {
        alert("Timetable uploaded sucessfully !")
        clearInput()
      }
      else if(res.data == "exist") {
        alert("Timetable already uploaded!")
      }
      else {
        alert("Timetable not uploaded !")
      }

    }
  };

  return (
    <IllustrationLayout
      title="Upload TimeTable"
      description="Enter your TimeTable details"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox component="form" role="form">
        <div className="App">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <label htmlFor="file1">
              <img src={file == null ? preview : file} style={{
                width: 370, height: 270, borderWidth: 2, borderStyle: 'dashed', borderColor: 'black', borderRadius: 4
              }} />
            </label>
          </div>
          <input type="file" id="file1" onChange={handleChange} hidden />
        </div>
        <ArgonBox mb={2}>
          <ArgonInput type="text" placeholder="Title of Timetable" size="large" name="name" value={inputField.name}
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
            Upload TimeTable
          </ArgonButton>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
