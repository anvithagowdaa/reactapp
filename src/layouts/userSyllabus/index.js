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
    axios.get(`${ipofserver}getSyllabus/${localStorage.getItem('LoginUserstd')}`)
      // .then(res => res.json())
      .then(data => {
        // alert(data.data)
        setHospitals(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const DownloadButton = (event, link, filename) => {
    axios.get(link,{
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data,filename)
      })
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
                Syllabus
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
                </tr>
              </thead>
              <tbody style={{ fontSize: 16 }}>
                {hospitals.map((hospital, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div style={{ display: 'flex' }}>
                        {hospital[1].split(".")[hospital[1].split(".").length - 1] == 'jpg' || hospital[1].split(".")[hospital[1].split(".").length - 1] == 'png' || hospital[1].split(".")[hospital[1].split(".").length - 1] == 'jpeg' ? (
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
                      <ArgonBox mr={1}>
                        <ArgonButton variant="text" color="success"
                          onClick={event => DownloadButton(event,ipofserver + hospital[1], hospital[2]+"."+hospital[1].split(".")[hospital[1].split(".").length - 1])}>
                          <Icon>download</Icon>&nbsp;Download
                        </ArgonButton>
                      </ArgonBox>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* {hospitals.map(hospital => (
              ))} */}
          </ArgonBox>
        </Card>
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
