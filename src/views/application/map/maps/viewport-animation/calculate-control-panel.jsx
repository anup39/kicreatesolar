import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import { Box, Typography } from "@mui/material";

// project-import
import CalculateControlPanelStyled from "../../../../../ui-component/third-party/map/CalculateControlPanelStyled";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

function CalculateControlPanel({ mapRef }) {
  const handleCalculate = () => {
    console.log("Calculate");
    const map = mapRef.current.getMap();
    console.log(map.getStyle().sources, "map.getStyle().sources");
  };
  return (
    <CalculateControlPanelStyled>
      <Box onClick={handleCalculate}>
        <Typography
          sx={{
            marginLeft: 4,
            padding: 1,
          }}
          variant="h6"
          align="center"
          color={"#fff"}
        >
          CALCULATE
        </Typography>
      </Box>
      {/* <Box>
        <CircularProgress
          sx={{
            marginLeft: 6,
            padding: 1,
          }}
        />
      </Box> */}
    </CalculateControlPanelStyled>
  );
}

CalculateControlPanel.propTypes = {
  mapRef: PropTypes.object,
};

export default memo(CalculateControlPanel);
