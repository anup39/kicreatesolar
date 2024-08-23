import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";

import { IconTrash } from "@tabler/icons-react";

// project-import
import DeleteControlPanelStyled from "../../../../../ui-component/third-party/map/DeleteControlPanelStyled";
import { Typography } from "@mui/material";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

function DeleteControlPanel({ data, selectedCity, onSelectCity }) {
  return (
    <DeleteControlPanelStyled>
      <Box
        sx={{
          marginLeft: 2,
        }}
      >
        <Typography variant="h6">Delete area</Typography>
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
        <IconTrash stroke={2} color="white" />
      </Box>
    </DeleteControlPanelStyled>
  );
}

DeleteControlPanel.propTypes = {
  data: PropTypes.array,
  selectedCity: PropTypes.string,
  onSelectCity: PropTypes.func,
};

export default memo(DeleteControlPanel);
