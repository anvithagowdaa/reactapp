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
  const [selectedValue1, setSelectedValue1] = useState('');

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [inputField, setInputField] = useState({
    name: '',
  })

  const [inputField1, setInputField1] = useState({
    link: '',
    name1: '',
  })

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const inputsHandler1 = (e) => {
    const { name, value } = e.target;
    setInputField1((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleChange1 = e => {
    setSelectedValue(e.value);
  }

  const handleChange2 = e => {
    setSelectedValue1(e.value);
  }

  function clearInput() {
    setInputField({
      name: '',
    });
    setFile(null);
    setSelectedFile('');
    setSelectedValue('');
  }

  function clearInput1() {
    setInputField1({
      link: '',
      name1: '',
    });
    setSelectedValue1('');
  }

  const [file, setFile] = useState();
  const [selectedFile, setSelectedFile] = useState();

  function handleChange(e) {
    var file = e.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split('.').pop();
    console.log('File extension:', fileExtension);

    if (fileExtension == 'jpg' || fileExtension == 'png' || fileExtension == 'jpeg') {
      setFile(URL.createObjectURL(e.target.files[0]));
      setSelectedFile(e.target.files[0]);
    }
    else {
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

      const res = await axios.post(`${ipofserver}uploadAssignment`, formData);

      if (res.data == "success") {
        alert("Assignment uploaded sucessfully !")
        clearInput()
      }
      else if (res.data == "exist") {
        alert("Assignment already uploaded!")
      }
      else {
        alert("Assignment not uploaded !")
      }

    }
  };

  const handleSubmission1 = async () => {
    // console.log(isFilePicked);
    if (inputField1.link == '' || inputField1.name1 == '' || selectedValue1 == '') {
      alert("Please fill all details !") // eslint-disable-line no-alert
    }
    else {

      axios.post(ipofserver + 'uploadAssignmentGform', {
        link: inputField1.link,
        title: inputField1.name1,
        standard: selectedValue1
      })
        .then(function (response) {
          // alert(typeof(response.data))
          if (response.data == "success") {
            alert("Assignment uploaded sucessfully !")
            clearInput1()
          }
          else if (response.data == "exist") {
            alert("Assignment already uploaded!")
          }
          else {
            alert("Assignment not uploaded !")
          }
        })
        .catch(function (error) {
          return error;
        });

    }
  };

  return (
    <IllustrationLayout
      title="Upload Assignment"
      description="Enter your Assignment details"
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
          <ArgonInput type="text" placeholder="Title of Assignment" size="large" name="name" value={inputField.name}
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
            Upload Assignment
          </ArgonButton>
        </ArgonBox>
      </ArgonBox>
      <ArgonBox component="form" role="form">
        <ArgonTypography variant="h4" fontWeight="medium" mb={2}>
          Upload Assignment as Google Form
        </ArgonTypography>
        <ArgonBox mb={2}>
          <ArgonInput type="text" placeholder="Enter Google Form link" size="large" name="link" value={inputField1.link}
            onChange={inputsHandler1} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="text" placeholder="Title of Assignment" size="large" name="name1" value={inputField1.name1}
            onChange={inputsHandler1} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <Select className="select" styles={styles} options={options} onChange={handleChange2}
            value={options.find(obj => obj.value === selectedValue1)} />
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
          <ArgonButton color="info" size="large" style={{ fontSize: 17 }} onClick={handleSubmission1} fullWidth>
            Upload Assignment
          </ArgonButton>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
