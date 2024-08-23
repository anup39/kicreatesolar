import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";

import { IconTrash } from "@tabler/icons-react";

// project-import
import CalculateControlPanelStyled from "../../../../../ui-component/third-party/map/CalculateControlPanelStyled";
import { CircularProgress, Typography } from "@mui/material";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

function CalculateControlPanel({ data, selectedCity, onSelectCity }) {
  return (
    <CalculateControlPanelStyled>
      {/* <Box>
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
      </Box> */}
      <Box>
        <CircularProgress
          sx={{
            marginLeft: 6,
            padding: 1,
          }}
        />
      </Box>
    </CalculateControlPanelStyled>
  );
}

CalculateControlPanel.propTypes = {
  data: PropTypes.array,
  selectedCity: PropTypes.string,
  onSelectCity: PropTypes.func,
};

export default memo(CalculateControlPanel);
