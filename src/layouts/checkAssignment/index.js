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
import React, { useEffect, useState } from 'react';

// Shikshana MUI components
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import Table from 'react-bootstrap/Table';
import Icon from "@mui/material/Icon";
import ArgonInput from "components/ArgonInput";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout1";

import axios from "axios";
import { ipofserver } from 'global';
import fileDownload from 'js-file-download'

// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

function Illustration() {

  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios.get(`${ipofserver}getSubmitedAssignment`)
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
    axios.get(link, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, filename)
      })
  }

  const SubmitButton = async (event, ivalue, id, username, std, title) => {

    var x = document.getElementById("Input" + ivalue).value;

    if (x == '') {
      alert("Please enter marks to submit !")
    }
    else {
      axios.post(ipofserver + 'updateMarks', {
        id: id,
        username: username,
        std: std,
        title: title,
        marks: x,
      })
        .then(function (response) {
          document.getElementById("Input" + ivalue).value = '';
          if (response.data == "success") {
            window.location.href = '/checkAssignment'
          }
          else {
            alert("Marks not updated !")
          }
        })
        .catch(function (error) {
          return error;
        });
    }
  }

  return (
    <IllustrationLayout
      title="Remarked Assignments"
      description="Check and distribute marks"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox component="form" role="form">
        <Table striped bordered hover>
          <thead style={{ fontSize: 18 }}>
            <tr>
              <th>No.</th>
              <th>Uploader</th>
              <th>Title</th>
              <th>Uploaded assignment</th>
              <th>Enter Marks</th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{ fontSize: 16 }}>
            {hospitals.map((hospital, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <p style={{ marginBottom: '1px' }}><strong>{hospital[1]}</strong></p>
                  <p>{hospital[2]}</p>
                </td>
                <td>{hospital[3]}</td>
                <td>
                  {hospital[4] == "Marked" ? (
                    <p style={{ fontSize: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>-</p>
                  ) : (
                    <ArgonBox mr={1}>
                      <ArgonButton variant="text" color="success"
                        onClick={event => DownloadButton(event, ipofserver + hospital[4], hospital[1] + "_" + hospital[3] + "." + hospital[4].split(".")[hospital[4].split(".").length - 1])}>
                        <Icon>download</Icon>&nbsp;Download
                      </ArgonButton>
                    </ArgonBox>
                  )}
                </td>
                {hospital[5] != '0' ?
                  <td><span style={{ color: '#296E85', fontWeight: 'bold' }}>{hospital[5]}</span></td>
                  :
                  <td>
                    <ArgonBox key={index}>
                      <ArgonInput type="number" placeholder="Enter marks" size="large" name="model1in" id={"Input" + index} />
                    </ArgonBox>
                  </td>
                }
                {hospital[5] != '0' ?
                  <td><span style={{ color: '#2E8BC0', fontWeight: 'bold' }}>Already checked</span></td>
                  :
                  <td>
                    <ArgonBox mr={1}>
                      <ArgonButton variant="text" color="info"
                        onClick={event => SubmitButton(event, index, hospital[0], hospital[1], hospital[2], hospital[3])}>
                        <Icon>check</Icon>&nbsp;Submit
                      </ArgonButton>
                    </ArgonBox>
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </Table>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
