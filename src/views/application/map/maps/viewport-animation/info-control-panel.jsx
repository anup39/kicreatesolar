import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { IconInfoCircle } from "@tabler/icons-react";

// project-import
import InfoControlPanelStyled from "../../../../../ui-component/third-party/map/InfoControlPanelStyled";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

function InfoControlPanel() {
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
          Select your rooftop to calculate the solar yield
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
          Press <b>Esc</b> to quit drawing. <b>Enter</b> to save the drawn area
        </Typography>
      </Box>
    </InfoControlPanelStyled>
  );
}

InfoControlPanel.propTypes = {};

export default memo(InfoControlPanel);
