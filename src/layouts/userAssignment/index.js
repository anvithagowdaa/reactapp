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

// Shikshana MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Shikshana MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import ArgonInput from "components/ArgonInput";

// Overview page components
import Header from "layouts/userSyllabus/components/Header";
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ipofserver } from 'global';
import Modal from 'react-bootstrap/Modal';

import Icon from "@mui/material/Icon";
import ArgonButton from "components/ArgonButton";
import docpreview from "../../../src/assets/images/docpreview.jpg"
import pdfpreview from "../../../src/assets/images/pdfpreview.jpg"
import fileDownload from 'js-file-download'

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

function Overview() {

  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios.get(`${ipofserver}getAssignment/${localStorage.getItem('LoginUsername')}/${localStorage.getItem('LoginUserstd')}`)
      // .then(res => res.json())
      .then(data => {
        // alert(data.data)
        setHospitals(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const [show0, setShow0] = useState(false);
  const handleClose0 = event => {
    setShow0(false);
  }
  const handleShow0 = () => setShow0(true);

  const [inputField0, setInputField0] = useState({
    model1in: '',
  })
  const [selectedFile, setSelectedFile] = useState();

  const inputsHandler0 = (e) => {
    const { name, value } = e.target;
    setInputField0((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleChange(e) {
    setSelectedFile(e.target.files[0]);
  }


  const DownloadButton = (event, link, filename) => {
    axios.get(link, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, filename)
      })
  }

  const UploadButton = (event, title) => {
    setInputField0({
      model1in: title,
    });
    handleShow0()
  };

  const MarkButton = (event, title) => {
    axios.post(ipofserver + 'submitAssignmentGoogleForm', {
      title: title,
      username: localStorage.getItem('LoginUsername'),
      standard: localStorage.getItem('LoginUserstd')
    })
      .then(function (response) {
        // alert(typeof(response.data))
        if (response.data == "success") {
          alert("Assignment marked sucessfully !")
          window.location.href = '/Assignment'
        }
        else if (response.data == "exist") {
          alert("Your response is already submitted !")
        }
        else {
          alert("Assignment not uploaded !")
        }
      })
      .catch(function (error) {
        return error;
      });
  };

  const submitButton0 = async () => {
    // console.log(isFilePicked);
    if (selectedFile == undefined || inputField0.model1in == '') {
      alert("Please fill all details !") // eslint-disable-line no-alert
    }
    else {
      const formData = new FormData();

      formData.append('File', selectedFile);
      formData.append('title', inputField0.model1in);
      formData.append('username', localStorage.getItem('LoginUsername'));
      formData.append('standard', localStorage.getItem('LoginUserstd'));

      const res = await axios.post(`${ipofserver}submitAssignment`, formData);

      if (res.data == "success") {
        alert("Assignment uploaded sucessfully !")
        setShow0(false);
        window.location.href = '/Assignment'
      }
      else if (res.data == "exist") {
        alert("Your response is already submitted !")
        setShow0(false);
      }
      else {
        alert("Assignment not uploaded !")
      }

    }
  };

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
                Assignment
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
          <ArgonBox p={2} m={2}>
            <Table striped bordered hover>
              <thead style={{ fontSize: 18 }}>
                <tr>
                  <th>No.</th>
                  <th>Preview</th>
                  <th>Title</th>
                  <th>Upload time</th>
                  <th></th>
                  <th>Upload</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: 16 }}>
                {hospitals.map((hospital, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div style={{ display: 'flex' }}>
                        {hospital[1].startsWith("https://") ? (
                          <a href={hospital[1]}>Click on link</a>
                        ) : hospital[1].split(".")[hospital[1].split(".").length - 1] == 'jpg' || hospital[1].split(".")[hospital[1].split(".").length - 1] == 'png' || hospital[1].split(".")[hospital[1].split(".").length - 1] == 'jpeg' ? (
                          <img
                            src={ipofserver + hospital[1]}
                            width={160}
                            height={140}
                            alt='Player'
                          />
                        ) : hospital[1].split(".")[hospital[1].split(".").length - 1] == 'pdf' ? (
                          <img
                            src={pdfpreview}
                            width={160}
                            height={140}
                            alt='Player'
                          />
                        ) : (
                          <img
                            src={docpreview}
                            width={160}
                            height={140}
                            alt='Player'
                          />
                        )}
                      </div>
                    </td>
                    <td>{hospital[2]}</td>
                    {/* <td>{hospital[1].split(".")[hospital[1].split(".").length-1]}</td> */}
                    <td>{hospital[4]}</td>
                    <td>
                      {hospital[1].startsWith("https://") ? (
                        <p style={{fontSize:'25px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>-</p>
                      ) : (
                        <ArgonBox mr={1}>
                          <ArgonButton variant="text" color="success"
                            onClick={event => DownloadButton(event, ipofserver + hospital[1], hospital[2] + "." + hospital[1].split(".")[hospital[1].split(".").length - 1])}>
                            <Icon>download</Icon>&nbsp;Download
                          </ArgonButton>
                        </ArgonBox>
                      )}
                    </td>
                    {hospital[6] != null ?
                      hospital[7] == '0' ? <td><span style={{ color: '#296E85', fontWeight: 'bold' }}>Uploaded</span></td> : <td><td><span style={{ color: '#007500', fontWeight: 'bold' }}>Checked</span></td></td>
                      // {/* <td><span style={{color: '#296E85',fontWeight: 'bold'}}>Uploaded</span></td> */}
                      :
                      <td>
                      {hospital[1].startsWith("https://") ? (                        
                        <ArgonBox mr={1}>
                          <ArgonButton variant="text" color="primary"
                            onClick={event => MarkButton(event, hospital[2])}>
                            <Icon>check</Icon>&nbsp;Mark as done
                          </ArgonButton>
                        </ArgonBox>
                      ) : (
                        <ArgonBox mr={1}>
                          <ArgonButton variant="text" color="primary"
                            onClick={event => UploadButton(event, hospital[2])}>
                            <Icon>upload</Icon>&nbsp;Upload
                          </ArgonButton>
                        </ArgonBox>
                      )}
                      </td>}
                    {hospital[7] == null ? <td><span style={{ color: 'red', fontWeight: 'bold' }}>Not Uploaded</span></td> : <td>{hospital[7]}</td>}
                  </tr>
                ))}
              </tbody>
            </Table>

            <Modal show={show0} onHide={handleClose0}>
              <Modal.Header closeButton>
                <Modal.Title>Upload Assignment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ArgonBox m={2}>
                  <ArgonInput type="text" placeholder="Enter form label" size="large" name="model1in" value={inputField0.model1in}
                    onChange={inputsHandler0} />
                </ArgonBox>
                <ArgonBox m={2}>
                  <ArgonInput type="file" placeholder="Enter Placeholder for file" size="large" name="model2in"
                    onChange={handleChange} />
                </ArgonBox>
              </Modal.Body>
              <Modal.Footer>
                <ArgonButton color="info" size="large" style={{ height: "40px", width: "30px", fontSize: "15px" }}
                  onClick={handleClose0}>
                  Cancle
                </ArgonButton>
                <ArgonButton color="info" size="large" style={{ height: "40px", width: "30px", fontSize: "15px", marginLeft: "20px" }}
                  onClick={submitButton0}>
                  Submit
                </ArgonButton>
              </Modal.Footer>
            </Modal>
          </ArgonBox>
        </Card>
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
