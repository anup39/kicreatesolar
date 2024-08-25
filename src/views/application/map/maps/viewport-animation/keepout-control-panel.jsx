import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import { Box, Typography } from "@mui/material";
import { IconSquareToggleHorizontal } from "@tabler/icons-react";

// project-import
import KeepoutControlPanelStyled from "../../../../../ui-component/third-party/map/KeepoutControlPanelStyled";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

function KeepoutControlPanel({ onClick }) {
  return (
    <KeepoutControlPanelStyled>
      <Box
        sx={{
          marginLeft: 2,
        }}
        onClick={onClick}
      >
        <Typography variant="h6">Create keepout</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f8dd7c",
          borderRadius: 5,
          padding: 0.5,
        }}
      >
        <IconSquareToggleHorizontal stroke={2} color="white" />
      </Box>
    </KeepoutControlPanelStyled>
  );
}

KeepoutControlPanel.propTypes = {
  onClick: PropTypes.func,
};

export default memo(KeepoutControlPanel);
