// material-ui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

// ==============================|| MAP BOX - CONTAINER STYLED ||============================== //

const MapContainerStyled = styled(Box)({
  zIndex: 0,
  height: "calc(100vh - 85px)", // Adjust 64px based on AppBar height
  overflow: "hidden",
  position: "relative",
  borderRadius: 4,
  "& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right": {
    display: "none",
  },
});

export default MapContainerStyled;
