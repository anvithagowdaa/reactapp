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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Shikshana MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Shikshana MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/userSyllabus/components/Header";
import React, { useEffect, useState } from 'react';

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

function Overview() {

  const choices = ['+', '-', '*', '/'];
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [opration, setOpration] = useState('');

  const [sum, setSum] = useState();
  const [score, setScore] = useState(0);

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

  const generateQuestion = () => {
    setNum1(Math.ceil(Math.random() * 10));
    setNum2(Math.ceil(Math.random() * 10));

    const randomIndex = Math.floor(Math.random() * choices.length);
    setOpration(choices[randomIndex]);

    setInputField({
      name: '',
    });
  };

  useEffect(() => {
    generateQuestion();
  }, [])

  const SubmitButton = (event) => {
    
    if (inputField.name == '') {
      alert("Please enter proper value !")
    }
    else if (opration == '+' && +num1 + +num2 === +inputField.name) {
      setScore((score) => score + 1);
    }
    else if (opration == '-' && +num1 - +num2 === +inputField.name) {
      setScore((score) => score + 1);
    }
    else if (opration == '*' && +num1 * +num2 === +inputField.name) {
      setScore((score) => score + 1);
    }
    else if (opration == '/' && +num1 / +num2 === +inputField.name) {
      setScore((score) => score + 1);
    }
    generateQuestion();
  }

  const ResetButton = (event) => {
    setScore(0);
    generateQuestion();
  }

  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <Header />
      <ArgonBox mb={3} mt={-10}>
        <Card>
          <ArgonBox pt={2} px={2}>
            <ArgonBox mb={5}>
              <ArgonTypography variant="h4" fontWeight="medium">
                Games
              </ArgonTypography>

              <ArgonBox>
                <div className="App">
                  <ArgonBox mb={2} style={{}}>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                      <label style={{fontSize: '30px'}}>
                        {num1} {opration} {num2} = 
                      </label>&nbsp;&nbsp;&nbsp;
                      <div style={{ width: '350px' }}>
                        <ArgonInput type="number" placeholder="Enter no" size="large" name="name" value={inputField.name}
                          onChange={inputsHandler} />
                      </div>
                    </div>
                  </ArgonBox>

                  <Grid container>

                    <Grid item xs={6}>
                      <ArgonBox m={2}>
                        <ArgonButton color="info" size="large" style={{ fontSize: 17 }} onClick={event => SubmitButton(event)} fullWidth>
                          Submit
                        </ArgonButton>
                      </ArgonBox>
                    </Grid>
                    <Grid item xs={6}>
                      <ArgonBox m={2}>
                        <ArgonButton color="info" size="large" style={{ fontSize: 17 }} onClick={event => ResetButton(event)} fullWidth>
                          Reset game
                        </ArgonButton>
                      </ArgonBox>
                    </Grid>
                  </Grid>
                  <ArgonBox mt={2}>
                    <p style={{fontSize: '30px'}}>Your Score: {score}</p>
                  </ArgonBox>
                </div>
              </ArgonBox>

            </ArgonBox>
          </ArgonBox>
        </Card>
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
