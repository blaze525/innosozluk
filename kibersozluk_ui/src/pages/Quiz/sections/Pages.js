/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { useState, useContext, useEffect } from "react";
import axios from "axios";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";


// Stats page components
import LanguageSwitcher from "components/LanguageSwitcher";
import { LanguageContext } from "providers/LanguageProvider";
import QuizBox from "components/QuizBox";

function Pages() {
  const lang = useContext(LanguageContext);

  return (
    <MKBox component="section" py={6}>
      <Container>
        <Grid
          item
          xs={12}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
        >
          <MKBadge
            variant="contained"
            color="info"
            badgeContent="INNOTEH"
            container
            sx={{ mb: 2 }}
          />
          <MKTypography variant="h2" fontWeight="bold">
            Özüňi syna
          </MKTypography>
          <MKTypography variant="body1" color="text">
            Aşakdaky test oýuny arkaly kiber adalgalary bilmek boýunça öz ukybyňyzy barlap
            bilersiňiz
          </MKTypography>
          <LanguageSwitcher />
          <QuizBox lang={lang} />
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Pages;
