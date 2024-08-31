import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import Box from "@mui/material/Box";
import { IconSquareRoundedCheck } from "@tabler/icons-react";

// project-import
import SaveControlPanelStyled from "../../../../../ui-component/third-party/map/SaveControlPanelStyled";
import { Typography } from "@mui/material";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

function SaveControlPanel({ onClick }) {
  return (
    <SaveControlPanelStyled onClick={onClick}>
      {/* <Box
        sx={{
          marginLeft: 2,
        }}
      >
        <Typography variant="h6">Save area</Typography>
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
        <IconSquareRoundedCheck stroke={2} color="white" />
      </Box>
    </SaveControlPanelStyled>
  );
}

SaveControlPanel.propTypes = {
  onClick: PropTypes.func,
};

export default memo(SaveControlPanel);
