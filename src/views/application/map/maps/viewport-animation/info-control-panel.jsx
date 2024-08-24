import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import { IconInfoCircle } from "@tabler/icons-react";

// project-import
import InfoControlPanelStyled from "../../../../../ui-component/third-party/map/InfoControlPanelStyled";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

function InfoControlPanel({ data, selectedCity, onSelectCity }) {
  return (
    <InfoControlPanelStyled>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <IconInfoCircle stroke={2} />
        <Typography
          sx={{
            // padding: 1,
            marginTop: 0.3,
          }}
          variant="h6"
          align="center"
        >
          Select your rooftop to calculate to calculate the solar yield
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <IconInfoCircle stroke={2} />
        <Typography
          sx={{
            // padding: 1,
            marginTop: 0.3,
          }}
          variant="h6"
          align="center"
        >
          Draw keep-outs in places where you donot want solar panels
        </Typography>
      </Box>
    </InfoControlPanelStyled>
  );
}

InfoControlPanel.propTypes = {
  data: PropTypes.array,
  selectedCity: PropTypes.string,
  onSelectCity: PropTypes.func,
};

export default memo(InfoControlPanel);
