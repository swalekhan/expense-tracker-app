import { Card, Grid } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DoughnutChart = ({ year }) => {
  const [categoryWiseExpenses, setCategoryWiseExpenses] = useState([]);
  const {items} = useSelector((state) => state.expense);
  const isDarkThemeEnabled = useSelector((state) => state.theme.isDarkThemeEnabled);

  // console.log(expenses)

  useEffect(() => {
    let food = 0,
      fuel = 0,
      clothes = 0;

    for (const key in items) {
      const filterYear = new Date(items[key].dateTime).getFullYear();

      if (filterYear === year) {
        switch (items[key].category) {
          case "food":
            food += +items[key].amount;
            break;
          case "fuel":
            fuel += +items[key].amount;
            break;
          case "clothes":
            clothes += +items[key].amount;
            break;
          default:
            break;
        }
      }
    }
    setCategoryWiseExpenses([food, clothes, fuel]);
  }, [items, year]);

  let bgColor = "initial";
  let textColor = "initial";
  if (isDarkThemeEnabled) {
    bgColor = "rgba(0, 0, 0, 0.5)";
    textColor = "white";
  }

  const doughnutData = {
    labels: ["food", "clothes", "fuel"],
    datasets: [
      {
        data: categoryWiseExpenses,
        backgroundColor: [
          "rgb(0, 255, 0, 0.7)",
          "rgba(99, 102, 241, 1)",
          "rgb(255, 0, 0, 0.85)",
        ],
        borderWidth: 1,
        borderColor: "grey",
        spacing: 4,
      },
    ],
  };

  const doughnutOptions = {
    maintainAspectRatio: false,
    cutout: 88,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Category wise Expenses",
        color: textColor,
      },
    },
  };

  return (
    <Grid item xs={18} md={12}>
      <Card
        sx={{
          borderRadius: "30px",
          boxShadow: "0 0 15px grey",
          p: "1rem",
          height: "18rem",
          display: "center",
       
          justifyContent: "center",
          bgcolor: bgColor,
          color: textColor,
        }}
      >
        <Doughnut options={doughnutOptions} data={doughnutData} />
      </Card>
    </Grid>
  );
};

export default DoughnutChart;
