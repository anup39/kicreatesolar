// material-ui
import Box from "@mui/material/Box";

import banner from "../../../../assets/images/layout/banner.png";

const MegaMenuBanner = () => {
  return (
    <Box
      sx={{
        py: 1,
        pl: 1,
        height: "100%",
        "& svg": { width: "100%", height: "100%", verticalAlign: "middle" },
      }}
    >
      <img src={banner} alt="Berry" width="267" height="352" />
    </Box>
  );
};

export default MegaMenuBanner;
