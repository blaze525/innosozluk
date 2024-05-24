import { Grid, Icon, Typography } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { useMemo } from "react";

const QuizCounter = ({ dogry, jemi, hazirki }) => {
  const nadogry = useMemo(() => {
    return hazirki - dogry - 1;
  }, [hazirki]);

  return (
    <Grid container item xs={12} border my={3}>
      <Grid item xs={6}>
        <Grid
          item
          xs={12}
          textAlign="left"
          fontSize="small"
          alignContent="center"
          alignItems="center"
          justifyItems="center"
          justifyContent="center"
        >
          <CheckCircleOutlineOutlinedIcon color="success" sx={{ marginRight: 1 }} />
          Dogry: {dogry}
        </Grid>
        <Grid item xs={12} textAlign={"left"} fontSize="small">
          <CancelOutlinedIcon color="error" sx={{ marginRight: 1 }} />
          Nädogry: {nadogry}
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid item xs={12} textAlign={"right"} fontSize="small">
          <HelpOutlineOutlinedIcon sx={{ marginRight: 1 }} />
          Sorag: {hazirki}/{jemi}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuizCounter;
