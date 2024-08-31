import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import Box from "@mui/material/Box";
import { IconCircleX } from "@tabler/icons-react";

// project-import
import CancelControlPanelStyled from "../../../../../ui-component/third-party/map/CancelControlPanelStyled";
import { Typography } from "@mui/material";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

function CancelControlPanel({ onClick }) {
  return (
    <CancelControlPanelStyled onClick={onClick}>
      {/* <Box
        sx={{
          marginLeft: 2,
        }}
      >
        <Typography variant="h6">Cancel area</Typography>
      </Box> */}
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
        <IconCircleX stroke={2} color="white" />
      </Box>
    </CancelControlPanelStyled>
  );
}

CancelControlPanel.propTypes = {
  onClick: PropTypes.func,
};

export default memo(CancelControlPanel);
