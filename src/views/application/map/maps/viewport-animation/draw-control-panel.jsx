import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import Box from "@mui/material/Box";

import { IconRectangle } from "@tabler/icons-react";

// project-import
import DrawControlPanelStyled from "../../../../../ui-component/third-party/map/DrawControlPanelStyled";
import { Typography } from "@mui/material";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

function DrawControlPanel({ onClick }) {
  return (
    <DrawControlPanelStyled onClick={onClick}>
      <Box
        sx={{
          marginLeft: 2,
        }}
      >
        <Typography variant="h6">Draw area</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#2bccd3",
          borderRadius: 5,
          padding: 0.5,
        }}
      >
        <IconRectangle stroke={2} color="white" />
      </Box>
    </DrawControlPanelStyled>
  );
}

DrawControlPanel.propTypes = {
  onClick: PropTypes.func,
};

export default memo(DrawControlPanel);
