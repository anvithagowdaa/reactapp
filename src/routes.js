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

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.
  Once you add a new route on this file it will be visible automatically on
  the Sidenav.
  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Shikshana MUI layouts
import Dashboard from "layouts/dashboard";
import Syllabus from "layouts/userSyllabus";
import Timetable from "layouts/userTimetable";
import AdminChat from "layouts/adminChat";
import Assignment from "layouts/userAssignment";
import Games from "layouts/userGames";
import Elearning from "layouts/userElearning";
import Chatbot from "layouts/userChatbot";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import AdminSignUp from "layouts/authentication/adminsign-in";
import UploadTimeTable from "layouts/uploadTimeTable";
import UploadSyllabus from "layouts/uploadSyllabus";
import UploadAssignment from "layouts/uploadAssignment";
import UploadElearning from "layouts/uploadElearning";
import CheckAssignment from "layouts/checkAssignment";
import HomePage from "layouts/authentication/firsthome";


// Shikshana MUI components
import ArgonBox from "components/ArgonBox";

const routes = [
  {
    type: "route",
    name: "Syllabus",
    key: "Syllabus",
    route: "/Syllabus",
    icon: <ArgonBox component="i" color="primary" fontSize="16px" className="ni ni-app" />,
    component: <Syllabus />,
  },
  {
    type: "route",
    name: "Timetable",
    key: "Timetable",
    route: "/Timetable",
    icon: <ArgonBox component="i" color="primary" fontSize="23px" className="ni ni-fat-add" />,
    component: <Timetable />,
  },
  {
    type: "route",
    name: "Assignment",
    key: "Assignment",
    route: "/Assignment",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-check-bold" />,
    component: <Assignment />,
  },
  {
    type: "route",
    name: "E-learning",
    key: "Elearning",
    route: "/Elearning",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-single-copy-04" />,
    component: <Elearning />,
  },
  {
    type: "route",
    name: "Games",
    key: "Games",
    route: "/Games",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-trophy" />,
    component: <Games />,
  },
  {
    type: "route",
    name: "Chats",
    key: "Chatbot",
    route: "/Chatbot",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-chat-round" />,
    component: <Chatbot />,
  },
  {
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "Logout",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
    ),
    component: <SignIn />,
  },

  {
    route: "/authentication/home",
    component: <HomePage />,
  },
  {
    route: "/authentication/sign-up",
    component: <SignUp />,
  },

  {
    route: "/authentication/adminsign-up",
    component: <AdminSignUp />,
  },

  {
    route: "/uploadTimeTable",
    component: <UploadTimeTable />,
  },  

  {
    route: "/adminChat",
    component: <AdminChat />,
  },
  
  {
    route: "/uploadSyllabus",
    component: <UploadSyllabus />,
  },  

  {
    route: "/uploadAssignment",
    component: <UploadAssignment />,
  },

  {
    route: "/uploadElearning",
    component: <UploadElearning />,
  },

  {
    route: "/checkAssignment",
    component: <CheckAssignment />,
  },
];

export default routes;
