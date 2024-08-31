// material-ui
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

// ==============================|| MAP BOX - CONTROL STYLED ||============================== //

const DeleteControlPanelStyled = styled(Box)(({ theme }) => ({
  backdropFilter: `blur(4px)`,
  WebkitBackdropFilter: `blur(4px)`,
  backgroundColor: alpha(theme.palette.background.paper, 1),
  zIndex: 9,
  minWidth: 110,
  position: "absolute",
  top: 8,
  right: "50%",
  // transform: "translateX(-50%)",
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

export default DeleteControlPanelStyled;
