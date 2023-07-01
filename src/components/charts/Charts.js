import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DoughnutChart from "./DoughnutChart";

const Charts = () => {
  const [year] = useState(new Date().getFullYear());

 

  return (
    <Container maxWidth="lg" sx={{ mt: "4rem" }}>
      <Grid container spacing={3}>
           <DoughnutChart year={year} />
      </Grid>
    </Container>
  );
};

export default Charts;
