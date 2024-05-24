import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { LanguageContext } from "providers/LanguageProvider";

export default function MKAccordionItem({ data }) {
  const [expanded, setExpanded] = React.useState(false);
  const { lang } = React.useContext(LanguageContext);
  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div style={{ margin: "10px 0" }}>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotprops={{ transition: { timeout: 400 } }}
        sx={{
          "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
          "& .MuiAccordionDetails-root": { display: expanded ? "block" : "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography fontWeight={"bold"}>{data["term_" + lang].toUpperCase()}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{data["exp_" + lang]}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
