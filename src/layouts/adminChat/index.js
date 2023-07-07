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


import React, { useEffect, useState, useRef } from 'react';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Shikshana MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import Grid from "@mui/material/Grid";
import {
  MDBCardBody,
} from "mdb-react-ui-kit";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout1";

import axios from "axios";
import { ipofserver } from 'global';

const divStyle = {
  overflowY: 'scroll',
  // border:'1px solid red',
  width: '100%',
  float: 'left',
  height: '500px',
  position: 'relative',
  backgroundColor: '#E5E4E2'
};

// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

function Illustration() {

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
        username: 'admin',
        standard: 'none',
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
    <IllustrationLayout
      title="Group chat"
      description="Enter your message to send in group !"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox>
        <div style={divStyle} ref={scollToRef}>
          {inputList.map((data, index) => {
            if (data[2] == 'admin' && data[3] == 'none') {
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
                    <p data-letters1="Ad"></p>
                  </div>
                </MDBCardBody>
              </ArgonBox>;
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
    </IllustrationLayout>
  );
}

export default Illustration;
