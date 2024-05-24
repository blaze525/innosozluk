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

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Presentation page sections
import Pages from "pages/Presentation/sections/Pages";
import Download from "pages/Presentation/sections/Download";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/banner.jpg";

// React Hooks
import { useState, useEffect } from "react";

import axios from "axios";

function Presentation() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const PER_PAGE = 50;

  useEffect(() => {
    axios("http://10.10.73.17:3100/api/total_items").then((res) => {
      setTotalPages(Math.ceil(res.data.total_items / PER_PAGE));
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios(`http://10.10.73.17:3100/api/query/${parseInt(page)}`).then((res) => {
      setData(res.data);
      setLoading(false);
    });

    const scrollElement = document.querySelector("#forScroll");
    scrollElement.scrollIntoView();
  }, [page]);

  const handleChange = (e, p) => {
    setPage(p);
  };

  return (
    <>
      <DefaultNavbar routes={routes} sticky />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              INNOSÖZLÜK{" "}
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              Kiber adalgalaryň düşündirişli sözlügi
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Pages
          page={page}
          onPageChange={handleChange}
          pagesCount={totalPages}
          listData={data}
          setPage={setPage}
          loading={loading}
          setLoading={setLoading}
        />
        <Container sx={{ mt: 6 }}>
          <Download />
        </Container>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Presentation;
