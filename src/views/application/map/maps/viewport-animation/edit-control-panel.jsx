import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import Box from "@mui/material/Box";
import { IconEdit } from "@tabler/icons-react";

// project-import
import EditControlPanelStyled from "../../../../../ui-component/third-party/map/EditControlPanelStyled";
import { Typography } from "@mui/material";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

function EditControlPanel({ onClick }) {
  return (
    <EditControlPanelStyled onClick={onClick}>
      {/* <Box
        sx={{
          marginLeft: 2,
        }}
      >
        <Typography variant="h6">Edit area</Typography>
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
        <IconEdit stroke={2} color="white" />
      </Box>
    </EditControlPanelStyled>
  );
}

EditControlPanel.propTypes = {
  onClick: PropTypes.func,
};

export default memo(EditControlPanel);
