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
import Card from "@mui/material/Card";

// Shikshana MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Shikshana MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import {
  MDBCardBody,
} from "mdb-react-ui-kit";

// Overview page components
import Header from "layouts/userSyllabus/components/Header";
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { ipofserver } from 'global';
import ArgonInput from "components/ArgonInput";
import Grid from "@mui/material/Grid";

const divStyle = {
  overflowY: 'scroll',
  // border:'1px solid red',
  width: '100%',
  float: 'left',
  height: '500px',
  position: 'relative',
  backgroundColor: '#E5E4E2'
};

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

function Overview() {
  const scollToRef = useRef();

  const [inputList, setInputList] = useState([]);

  const [inputField, setInputField] = useState({
    texttosend: '',
  })

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  useEffect(() => {
    // Scroll to the bottom of the list when data is updated
    scollToRef.current.scrollTop = scollToRef.current.scrollHeight;
  }, [inputList]);

  useEffect(() => {
    axios.get(`${ipofserver}getAllChats`)
      // .then(res => res.json())
      .then(data => {
        setInputList(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const SubmitButton = (event) => {
    if (inputField.texttosend != '') {
      axios.post(ipofserver + 'chatBot', {
        texttosend: inputField.texttosend,
        username: localStorage.getItem('LoginUsername'),
        standard: localStorage.getItem('LoginUserstd'),
      })
        .then(function (response) {
          axios.get(`${ipofserver}getAllChats`)
            // .then(res => res.json())
            .then(data => {
              setInputList(data.data);
            })
            .catch(err => {
              console.log(err);
            })
          setInputField({
            texttosend: '',
          });
        })
        .catch(function (error) {
          return error;
        });
    }
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
      }}>
      <Header />
      <ArgonBox mb={3} mt={-10}>
        <Card>
          <ArgonBox pt={2} px={2}>
            <ArgonBox mb={0.5}>
              <ArgonTypography variant="h4" fontWeight="medium">
                Chat
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
          <ArgonBox p={2}>
            <div style={divStyle} ref={scollToRef}>
              {inputList.map((data, index) => {
                if (data[2] == localStorage.getItem('LoginUsername') && data[3] == localStorage.getItem('LoginUserstd')) {
                  return <ArgonBox mb={2} mt={1} ml={3} mr={3} key={index}>
                    <MDBCardBody>
                      <div className="d-flex flex-row justify-content-end mb-4">
                        <div
                          className="p-3 me-1 border"
                          style={{ borderRadius: "15px", backgroundColor: "#fbfbfb" }}>
                          <p className="small mb-0">
                            {data[1]}
                          </p>
                          <p style={{ fontSize: "10px", marginBottom: '-10px', display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginTop: "2px" }}>
                            {data[4]}
                          </p>
                        </div>
                        <p data-letters={data[2].charAt(0).toUpperCase()}></p>
                      </div>
                    </MDBCardBody>
                  </ArgonBox>;
                }
                else if (data[2] == 'admin' && data[3] == 'none') {
                  return <ArgonBox mb={2} mt={1} ml={3} mr={3}>
                    <MDBCardBody>
                      <div className="d-flex flex-row justify-content-start mb-4">
                        <p data-letters1="Ad"></p>
                        <div
                          className="p-3 ms-1"
                          style={{
                            borderRadius: "15px",
                            backgroundColor: "rgba(57, 192, 237,.2)",
                          }}
                        >
                          <p className="small mb-0">
                            {data[1]}
                          </p>
                          <p style={{ fontSize: "10px", marginBottom: '-10px', display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginTop: "2px" }}>
                            {data[4]}
                          </p>
                        </div>
                      </div>
                    </MDBCardBody>
                  </ArgonBox>
                }
                else {
                  return <ArgonBox mb={2} mt={1} ml={3} mr={3}>
                    <MDBCardBody>
                      <div className="d-flex flex-row justify-content-start mb-4">
                        <p data-letters={data[2].charAt(0).toUpperCase()}></p>
                        <div
                          className="p-3 ms-1"
                          style={{
                            borderRadius: "15px",
                            backgroundColor: "rgba(57, 192, 237,.2)",
                          }}
                        >
                          <p className="small mb-0">
                            {data[1]}
                          </p>
                          <p style={{ fontSize: "10px", marginBottom: '-10px', display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginTop: "2px" }}>
                            {data[4]}
                          </p>
                        </div>
                      </div>
                    </MDBCardBody>
                  </ArgonBox>
                }
              })}
            </div>
          </ArgonBox>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <ArgonBox ml={2} my={1}>
                <ArgonInput type="text" placeholder="Enter the text" size="large" name="texttosend" value={inputField.texttosend}
                  onChange={inputsHandler} />
              </ArgonBox>
            </Grid>
            <Grid item xs={1}>
              <button className="button has-icon icon-send"
                onClick={event => SubmitButton(event)}>Send</button>
            </Grid>
          </Grid>
        </Card>
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
