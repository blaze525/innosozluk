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
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Close";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Accordion
import MKAccordion from "components/MKAccordion";

// Toastify
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Stats page components
import Pagination from "@mui/material/Pagination";
import LanguageSwitcher from "components/LanguageSwitcher";
import IconButton from "@mui/material/IconButton";
import { LanguageContext } from "providers/LanguageProvider";

function Pages({ pagesCount, page, onPageChange, listData, setPage, loading, setLoading }) {
  const lang = useContext(LanguageContext);
  const [search, setSearch] = useState("");
  const [hidePaginations, setHidePaginations] = useState(false);
  const [data, setData] = useState(listData);
  useEffect(() => {
    setData(listData);
  }, [listData]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setData([]);
    if (search.length > 1) {
      setHidePaginations(true);
      setLoading(true);
      axios(`http://10.10.73.17:3100/api/search?term=${search}&lang=${lang.lang}`).then((res) => {
        setLoading(false);
        if (res.data.length > 0) {
          setData(res.data);
        }
      });
    } else if (search.length === 0) {
      setHidePaginations(false);
      setPage(1);
      setLoading(true);
      axios(`http://10.10.73.17:3100/api/query/${parseInt(page)}`).then((res) => {
        setData(res.data);
        setLoading(false);
      });
    } else {
      toast.warn("Gözleg üçin azyndan 2 harp giriziň!");
    }
  };

  const clearButtonHandle = (e) => {
    setSearch("");
  };

  const searchHandle = (e) => {
    setSearch(e.target.value);
  };

  return (
    <MKBox component="section" py={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
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
            Adalgany gözläň
          </MKTypography>
          <MKTypography variant="body1" color="text">
            Aşakdaky sanawdan özüňize gerekli kiber adalganyň düşündirilişini tapyp bilersiňiz.
          </MKTypography>
          <LanguageSwitcher />
        </Grid>
      </Container>
      <Container>
        <Grid container direction="row" alignItems="center" justifyContent="center">
          <Grid item md={6} sx={{ ml: { xs: 0, lg: 3 }, mb: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <MKInput
                  type="text"
                  label="Gözleg sözüňiz"
                  fullWidth
                  value={search}
                  onChange={searchHandle}
                  maxLength={10}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="secondary"
                          edge="end"
                          children={<SearchIcon fontSize="small" />}
                          onClick={clearButtonHandle}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <MKButton
                  variant="gradient"
                  color="info"
                  sx={{ height: "100%" }}
                  fullWidth
                  onClick={handleSearchSubmit}
                >
                  GÖZLE
                </MKButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div id="forScroll"></div>
        <ToastContainer />
      </Container>

      {!hidePaginations && data.length ? (
        <Container sx={{ mt: 10 }}>
          <Grid
            container
            item
            xs={12}
            lg={6}
            flexDirection="column"
            alignItems="center"
            sx={{ textAlign: "center", mx: "auto", px: 0.75 }}
          >
            <Pagination
              count={pagesCount}
              size="large"
              shape="rounded"
              page={page}
              color="info"
              onChange={onPageChange}
            />
          </Grid>
        </Container>
      ) : (
        ""
      )}

      <Container sx={{ mt: { xs: 8, lg: 16 } }}>
        {<MKAccordion list={data} loading={loading} />}
      </Container>
      {!hidePaginations && data.length ? (
        <Container sx={{ mt: { xs: 8, lg: 16 } }}>
          <Grid
            container
            item
            xs={12}
            lg={6}
            flexDirection="column"
            alignItems="center"
            sx={{ textAlign: "center", mx: "auto", px: 0.75 }}
          >
            <Pagination
              count={pagesCount}
              size="large"
              shape="rounded"
              page={page}
              color="info"
              onChange={onPageChange}
            />
          </Grid>
        </Container>
      ) : (
        ""
      )}
    </MKBox>
  );
}

export default Pages;
