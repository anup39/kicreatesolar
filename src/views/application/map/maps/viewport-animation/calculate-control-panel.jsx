import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import { Box, Typography, CircularProgress } from "@mui/material";

// project-import
import CalculateControlPanelStyled from "../../../../../ui-component/third-party/map/CalculateControlPanelStyled";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

function CalculateControlPanel({ onClick, dataLoading }) {
  return (
    <CalculateControlPanelStyled onClick={onClick}>
      {dataLoading ? (
        <Box>
          <CircularProgress
            sx={{
              marginLeft: 6,
              padding: 1,
            }}
          />
        </Box>
      ) : (
        <Box>
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
      )}
    </CalculateControlPanelStyled>
  );
}

CalculateControlPanel.propTypes = {
  onClick: PropTypes.func,
  dataLoading: PropTypes.bool,
};

export default memo(CalculateControlPanel);
