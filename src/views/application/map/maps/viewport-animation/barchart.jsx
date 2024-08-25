import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import PropTypes from "prop-types";

// Map month numbers to month names
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function Barchart() {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{ width: "100%" }}
    ></Stack>
  );
}

const valueFormatter = (value) => `${value} KWh`;

const chartSetting = {
  series: [{ dataKey: "E_m", label: "Month", valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

export default function TickPlacementBars({ data }) {
  const tickPlacement = "middle";
  const tickLabelPlacement = "middle";

  // Add month_new property to each object in the array
  const updatedData = data.outputs.monthly.fixed.map((entry) => ({
    ...entry,
    month_new: monthNames[entry.month - 1],
  }));

  return (
    <div style={{ width: "100%" }}>
      <Barchart />
      <BarChart
        dataset={updatedData}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month_new",
            tickPlacement,
            tickLabelPlacement,
          },
        ]}
        // barLabel="value"
        {...chartSetting}
      />
    </div>
  );
}

TickPlacementBars.propTypes = {
  data: PropTypes.object,
};
