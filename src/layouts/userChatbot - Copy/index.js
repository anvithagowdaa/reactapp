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

  const [inputList, setInputList] = useState([]);

  const listRef = useRef(null);
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
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [inputList]);

  const SubmitButton = (event) => {
    if (inputField.texttosend != '') {
      axios.post(ipofserver + 'chatBot', {
        texttosend: inputField.texttosend,
      })
        .then(function (response) {
          setInputList(inputList.concat(<ArgonBox mb={2} mt={1} ml={3} mr={3}>
            <MDBCardBody>
              <div className="d-flex flex-row justify-content-end mb-4">
                <div
                  className="p-3 me-3 border"
                  style={{ borderRadius: "15px", backgroundColor: "#fbfbfb" }}
                >
                  <p className="small mb-0">
                    {inputField.texttosend}
                  </p>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
              </div>
              <div className="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div
                  className="p-3 ms-3"
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "rgba(57, 192, 237,.2)",
                  }}
                >
                  <p className="small mb-0">
                    {response.data}
                  </p>
                </div>
              </div>
            </MDBCardBody>
          </ArgonBox>));
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
      }}
    >
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
            <div style={divStyle} ref={listRef}>
              {inputList}
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
