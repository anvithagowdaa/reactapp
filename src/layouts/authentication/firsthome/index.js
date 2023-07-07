/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

import Grid from "@mui/material/Grid";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { ipofserver } from 'global';

// Images
const bgImage = ipofserver + "/static/webimg/2.jpg";
const firstimg = ipofserver + "/static/webimg/1.jpg";
const secimg = ipofserver + "/static/webimg/2.jpg";
const fifthimg = ipofserver + "/static/webimg/3.jpg";
const sixthimg = ipofserver + "/static/webimg/4.jpg";
const seventhimg = ipofserver + "/static/webimg/5.jpg";

function Cover() {
  return (
    <CoverLayout
      title="Welcome!"
      description="The World Is Within Reach !"
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card style={{ width: "1288px", marginLeft: "-480px" }}>
        <div style={{ marginBottom: "40px", marginTop: "70px" }}>
          <div className="container">

            <div className="paragraphs">
              <Grid container spacing={2}>
                <Grid item xs={6.5}>
                  <img className="img1" src={firstimg} style={{ height: "400px" }} />
                </Grid>
                <Grid item xs={5.5}>
                  <div className="content-heading">
                    <h3>Admissions</h3>
                    <p style={{ fontSize: "15px" }}>Focusing on admissions means focusing on the website’s home page. The home page is the place where students and their families will get their first experience directly after they click on your website. Focus on listening to the desires and concerns of prospective families. The images added to the home page should be professional, so avoid selfies and dumb fonts as the website is often visited by parents. Include contact info, strengths, feature programs kind of things to the home page, which will help the parents to know more about your school.</p>

                    <Link className="btn btn-outline-primary" to="/authentication/sign-in">Know more</Link>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="content-heading">
                    <h3>News and blogs</h3>
                    <p style={{ fontSize: "15px" }}>This is the most critical aspect of the website where you can share some fascinating stories of successful students. Also by sharing the latest information and activities, you can continue to involve and grab the attention of employees, parents, and students. It is the best way to keep the information in the blogs which will help the folks to come back and see the information that they are looking for. For making the required information more accessible using the available news engines.</p>

                    <Link className="btn btn-outline-primary" to="/authentication/sign-in">Read more</Link>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <img className="img2" src={secimg} style={{ height: "400px", width: "500px" }} />
                </Grid>

                <Grid item xs={7}>
                  <img className="img1" src={fifthimg} style={{ height: "400px", width: "600px" }} />
                </Grid>
                <Grid item xs={5}>
                  <div className="content-heading mt-3">
                    <h3>Present parents emphasis</h3>
                    <p style={{ fontSize: "15px" }}>Full-time job work for any school is serving the needs of the present parents by providing them with the required information, resources available, and connection details, or link. For speaking with the parents directly and for providing more frequently asked information along with the academic calendar, news, or blogs it is important to have a separate section for parents. Try to provide your school website futures more user friendly by providing the information in fewer checks. Without creating different accounts by the parents, consider and understand if something should be protected by a password. Understand the capabilities of other systems that you are using for school other than the website.</p>
                    <Link className="btn btn-outline-primary" to="/authentication/sign-in">Know more</Link>
                  </div>
                </Grid>

                <Grid item xs={6.5}>
                  <div className="content-heading mt-3">
                    <h3>Calendars</h3>
                    <p style={{ fontSize: "15px" }}>Calendars show how the school worked. We may also say the heart of the school is the calendars. It should include weekly, monthly, tests, special events. Special events are the events that will engage the students and families. The calendar should provide details that would not require individuals to check for a previous call or messages for event and exam information. Parents will know whether they need to participate in the events or not by getting a straightforward calendar. To minimize the size of the clicks and sign by the visitors, you can use the calendar like SIS powered calendar.</p>

                    <Link className="btn btn-outline-primary" to="/authentication/sign-in">Know more</Link>
                  </div>
                </Grid>
                <Grid item xs={5.5}>
                  <img className="img1" src={sixthimg} style={{ height: "400px",width: "500px" }} />
                </Grid>

                <Grid item xs={6.5}>
                  <img className="img1" src={seventhimg} style={{ height: "400px",width: "580px" }} />
                </Grid>
                <Grid item xs={5.5}>
                  <div className="content-heading mt-3">
                    <h3>Forms</h3>
                    <p style={{ fontSize: "15px" }}>Paper types cause the majority of parents considerable discomfort or irritation. You need to ask for the data again if the paper forms are missing and parents can be annoyed by this. So, add the forms on your website and also use WordPress plugins, fillable PDF forms, or downloadable forms to make the forms as simple as possible. Also, consider the distinction between signature and e-signature and use the resources accordingly.</p>

                    <Link className="btn btn-outline-primary" to="/authentication/sign-in">Know more</Link>
                  </div>
                </Grid>

              </Grid>

            </div>

          </div>
        </div>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
