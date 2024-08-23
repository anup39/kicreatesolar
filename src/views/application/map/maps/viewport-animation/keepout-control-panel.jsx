import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";

import { IconSquareToggleHorizontal } from "@tabler/icons-react";

// project-import
import KeepoutControlPanelStyled from "../../../../../ui-component/third-party/map/KeepoutControlPanelStyled";
import { Typography } from "@mui/material";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

function KeepoutControlPanel({ data, selectedCity, onSelectCity }) {
  return (
    <KeepoutControlPanelStyled>
      <Box
        sx={{
          marginLeft: 2,
        }}
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
  data: PropTypes.array,
  selectedCity: PropTypes.string,
  onSelectCity: PropTypes.func,
};

export default memo(KeepoutControlPanel);
