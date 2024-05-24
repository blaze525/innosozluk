import { Grid, Typography, Container } from "@mui/material";
import { Box } from "@mui/system";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MKButton from "components/MKButton";

const NotFound = ({ restartQuiz, rights, total }) => {
  const handleRestart = () => {
    restartQuiz();
  };
  return (
    <Box>
      <Container maxWidth="xs">
        <Grid container>
          <Grid item justifyContent={"center"} xs={12}>
            <Typography variant="h2" color="initial" textAlign={"center"}>
              Test tamamlandy!
            </Typography>
          </Grid>
          <Grid item justifyContent={"center"} xs={12} mt={2}>
            <Typography variant="h3" color="secondary" textAlign={"center"}>
              Netijeler:
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
            <HelpOutlineOutlinedIcon color="info" sx={{ marginRight: 1 }} />
            <Typography variant="h5" color="initial" textAlign={"center"}>
              Jemi sorag sany: {parseInt(total) || 10}
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
            <CheckCircleOutlineOutlinedIcon color="success" sx={{ marginRight: 1 }} />
            <Typography variant="h5" color="initial" textAlign={"center"}>
              Dogry jogaplar: {parseInt(rights) || 0}
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
            <CancelOutlinedIcon color="error" sx={{ marginRight: 1 }} />
            <Typography variant="h5" color="initial" textAlign={"center"}>
              Nädogry jogaplar: {10 - parseInt(rights) || 0}
            </Typography>
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center" my={6}>
            <MKButton color="info" size="large" onClick={handleRestart}>
              Täzeden başla
            </MKButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFound;
