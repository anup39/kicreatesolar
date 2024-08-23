// material-ui
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

// ==============================|| MAP BOX - CONTROL STYLED ||============================== //

const ResultControlPanelStyled = styled(Box)(({ theme }) => ({
  backdropFilter: `blur(4px)`,
  WebkitBackdropFilter: `blur(4px)`,
  backgroundColor: alpha(theme.palette.background.paper, 1),
  zIndex: 9,
  minWidth: 140,
  position: "absolute",
  bottom: 8, // Changed from top to bottom
  right: 8, // Kept right as it is
  padding: 2,
  borderRadius: 4,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "1px 1px 1px",
  "&:hover": {
    cursor: "pointer",
  },
}));

export default ResultControlPanelStyled;
