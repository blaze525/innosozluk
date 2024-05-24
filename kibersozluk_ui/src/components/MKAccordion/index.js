import MKAccordionItem from "components/MKAccordionItem/MKAccordionItem";
import { CircularProgress, Box } from "@mui/material";
import NotFound from "components/NotFound";

export default function MKAccordion({ list, loading }) {
  return (loading) ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress color="info" />
    </Box>) : ((list.length) ? list.map((item) => {
      return <MKAccordionItem key={item.id} data={item} />;
    }) : <NotFound />);
}
