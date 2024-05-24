import { useState, useContext } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { LanguageContext } from "providers/LanguageProvider";

// flag icons
import flag_tm from "assets/images/flag_tm.png";
import flag_ru from "assets/images/flag_ru.png";
import flag_us from "assets/images/flag_us.png";
import MKAvatar from "components/MKAvatar";

function LanguageSwitcher() {
  const { lang, setLang } = useContext(LanguageContext);
  const [dropdown, setDropdown] = useState(null);
  const diller = {
    tm: "Türkmen dili",
    ru: "Rus dili",
    en: "Iňlis dili",
  };
  const openDropdown = ({ currentTarget }) => setDropdown(currentTarget);
  const closeDropdown = () => setDropdown(null);

  // Styles
  const iconStyles = {
    ml: 1,
    fontWeight: "bold",
    transition: "transform 200ms ease-in-out",
  };

  const dropdownIconStyles = {
    transform: dropdown ? "rotate(180deg)" : "rotate(0)",
    ...iconStyles,
  };

  return (
    <MKBox component="section" py={4}>
      <Container>
        <Grid item xs={12} lg={12} textAlign="center">
          Dili saýlaň:
        </Grid>
        <Grid item xs={12} lg={12} textAlign="center">
          <MKButton variant="gradient" color="info" onClick={openDropdown}>
            {diller[lang]} <Icon sx={dropdownIconStyles}>expand_more</Icon>
          </MKButton>
          <Menu anchorEl={dropdown} open={Boolean(dropdown)} onClose={closeDropdown}>
            <MenuItem
              onClick={() => {
                closeDropdown();
                setLang("tm");
              }}
            >
              <Grid marginRight={1}>
                <MKAvatar src={flag_tm} size={"xs"} alt="Türkmen dili" />
              </Grid>
              Türkmen dili
            </MenuItem>
            <MenuItem
              onClick={() => {
                closeDropdown();
                setLang("ru");
              }}
            >
              <Grid marginRight={1}>
                <MKAvatar src={flag_ru} size={"xs"} alt="Rus dili" />
              </Grid>
              Rus dili
            </MenuItem>
            <MenuItem
              onClick={() => {
                closeDropdown();
                setLang("en");
              }}
            >
              <Grid marginRight={1}>
                <MKAvatar src={flag_us} size={"xs"} alt="Iňlis dili" />
              </Grid>
              Iňlis dili
            </MenuItem>
          </Menu>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default LanguageSwitcher;
