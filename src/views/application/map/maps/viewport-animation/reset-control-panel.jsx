import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import Box from "@mui/material/Box";
import { IconSettings } from "@tabler/icons-react";

// project-import
import ResetControlPanelStyled from "../../../../../ui-component/third-party/map/ResetControlPanelStyled";
import { Typography } from "@mui/material";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

function ResetControlPanel({ onClick }) {
  return (
    <ResetControlPanelStyled onClick={onClick}>
      <Box
        sx={{
          marginLeft: 2,
        }}
      >
        <Typography variant="h6">Reset Map</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#d3542c",
          borderRadius: 5,
          padding: 0.5,
        }}
      >
        <IconSettings stroke={2} color="white" />
      </Box>
    </ResetControlPanelStyled>
  );
}

ResetControlPanel.propTypes = {
  onClick: PropTypes.func,
};

export default memo(ResetControlPanel);
