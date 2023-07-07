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
import Select from "react-select";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

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
    username: '',
    email: '',
    mobile: '',
    password: ''
  })

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleChange = e => {
    setSelectedValue(e.value);
  }

  function clearInput() {
    setInputField({
      username: '',
      email: '',
      mobile: '',
      password: ''
    });
    setSelectedValue('')
  }

  const submitButton = () => {
    // alert(inputField.password)
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (inputField.username == '' || inputField.email == '' || inputField.mobile == '' || inputField.password == '' || selectedValue == '') {
      alert("Please enter all details !")
      // clearInput()
    }
    else if (inputField.mobile.length != 10) {
      alert("Please enter valid mobile number !")
      // clearInput()
    }
    else if (!filter.test(inputField.email)) {
      alert("Please enter valid email !")
      // clearInput()
    }
    else {
      // alert(inputField.username + " " + inputField.email + " " + inputField.mobile + " " + inputField.password + " " + inputField.email + " " + selectedValue)
      axios.post(ipofserver + 'userRegister', {
        username: inputField.username,
        email: inputField.email,
        mobile: inputField.mobile,
        password: inputField.password,
        standard: selectedValue
      })
        .then(function (response) {
          // alert(typeof(response.data))
          if (response.data == "success") {
            alert("User added successfully !")
            clearInput()
            window.location.href = '/authentication/sign-in'
          }
          else {
            alert("User already exist !")
            clearInput()
          }
        })
        .catch(function (error) {
          return error;
        });
    }
  }

  return (
    <IllustrationLayout
      title="Sign Up"
      description="Enter your details to sign up"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput type="text" placeholder="Username" size="large" name="username" value={inputField.username}
            onChange={inputsHandler} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="email" placeholder="Email" size="large" name="email" value={inputField.email}
            onChange={inputsHandler} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="number" placeholder="Mobile" size="large" name="mobile" value={inputField.mobile}
            onChange={inputsHandler} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="password" placeholder="Password" size="large" name="password" value={inputField.password}
            onChange={inputsHandler} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <Select className="select" styles={styles} options={options} onChange={handleChange}
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
        <ArgonBox mt={4} mb={1}>
          <ArgonButton color="info" size="large" onClick={submitButton} fullWidth>
            Sign Up
          </ArgonButton>
        </ArgonBox>
        <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <ArgonTypography
              component={Link}
              to="/authentication/sign-in"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Sign in
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
