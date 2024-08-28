// material-ui
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

// ==============================|| MAP BOX - CONTROL STYLED ||============================== //

const CalculateControlPanelStyled = styled(Box)(({ theme }) => ({
  backdropFilter: `blur(4px)`,
  WebkitBackdropFilter: `blur(4px)`,
  backgroundColor: alpha("#4CCCD3", 1),
  zIndex: 9,
  minWidth: 140,
  position: "absolute",
  bottom: 100, // Position it at the bottom
  left: "50%", // Center it horizontally
  transform: "translateX(-50%)", // Adjust for the width of the element
  padding: 2,
  borderRadius: 20,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "1px 1px 1px",
  "&:hover": {
    cursor: "pointer",
  },
}));

export default CalculateControlPanelStyled;
