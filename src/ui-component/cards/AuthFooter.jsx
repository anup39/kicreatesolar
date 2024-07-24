// material-ui
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://portal.b3d.dk/"
      target="_blank"
      underline="hover"
    >
      https://portal.b3d.dk/
    </Typography>
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://b3d.dk/"
      target="_blank"
      underline="hover"
    >
      &copy; b3d.dk
    </Typography>
  </Stack>
);

export default AuthFooter;
