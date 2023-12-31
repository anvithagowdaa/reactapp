/* eslint-disable no-param-reassign */
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

import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// react-router components
import { Link } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";
import Container from "@mui/material/Container";

// Shikshana MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Shikshana MUI examples components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

// Shikshana MUI Base Styles
import breakpoints from "assets/theme/base/breakpoints";

// Material Dashboard 2 PRO React context
import { useArgonController } from "context";
import ReactDOM from 'react-dom';
import { Dropdown } from 'react-bootstrap';
import colors from "assets/theme/base/colors";
function DefaultNavbar({ brand, transparent, light, action }) {
  const { info } = colors;
  const [controller] = useArgonController();
  const { darkMode } = controller;
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }
    window.addEventListener("resize", displayMobileNavbar);
    displayMobileNavbar();
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <Container>
      <ArgonBox
        pt={0.75}
        pb={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={2}
        mx={3}
        width="calc(100% - 48px)"
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        position="absolute"
        left={0}
        zIndex={99}
        sx={({
          palette: { transparent: transparentColor, white, background },
          functions: { rgba },
        }) => ({
          backgroundColor: transparent
            ? transparentColor.main
            : rgba(darkMode ? background.dark : white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" px={2}>
          <ArgonBox component={Link} to="/" py={transparent ? 1.5 : 0.75} lineHeight={1}>
            <ArgonTypography variant="v4" fontWeight="bold" color={light ? "white" : "dark"}>
              {brand}
            </ArgonTypography>
          </ArgonBox>
          <ArgonBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
            {/* <DefaultNavbarLink
              icon="donut_large"
              name="dashboard"
              route="/dashboard"
              light={light}
            />
            <DefaultNavbarLink icon="person" name="profile" route="/profile" light={light} /> */}
            
            <DefaultNavbarLink
              icon="home"
              name="Home"
              route="/authentication/home"
              light={light}
            />
            <DefaultNavbarLink
              icon="key"
              name="Teacher login"
              route="/authentication/adminsign-up"
              light={light}
            />
            <DefaultNavbarLink
              icon="account_circle"
              name="Student sign up"
              route="/authentication/sign-up"
              light={light}
            />
            <DefaultNavbarLink
              icon="key"
              name="Student sign in"
              route="/authentication/sign-in"
              light={light}
            />
          </ArgonBox>
          <ArgonBox
            display={{ xs: "inline-block", lg: "none" }}
            lineHeight={0}
            py={1.5}
            pl={1.5}
            color="inherit"
            sx={{ cursor: "pointer" }}
            onClick={openMobileNavbar}
          >
            <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
          </ArgonBox>
        </ArgonBox>
      </ArgonBox>
      {mobileView && <DefaultNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </Container>
  );
}

// Declaring default props for DefaultNavbar
DefaultNavbar.defaultProps = {
  brand: "Shikshana",
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  brand: PropTypes.string,
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(["contained", "outlined", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
      "default",
      "white",
    ]),
    label: PropTypes.string.isRequired,
  }),
};

export default DefaultNavbar;
