import PropTypes from "prop-types";
import { useRef, forwardRef, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

// project imports
import { ThemeMode } from "../../../../config";

// assets
import { IconMoonOff, IconMoon } from "@tabler/icons-react";
import useConfig from "../../../../hooks/useConfig";

const HeaderAvatar = forwardRef(({ children, ...others }, ref) => {
  const theme = useTheme();

  return (
    <Avatar
      ref={ref}
      sx={{
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        display: { xs: "none", md: "flex" },
        bgcolor:
          theme.palette.mode === ThemeMode.DARK
            ? "dark.main"
            : "secondary.light",
        color:
          theme.palette.mode === ThemeMode.DARK
            ? "secondary.main"
            : "secondary.dark",
        "&:hover": {
          bgcolor:
            theme.palette.mode === ThemeMode.DARK
              ? "secondary.main"
              : "secondary.dark",
          color:
            theme.palette.mode === ThemeMode.DARK
              ? "secondary.light"
              : "secondary.light",
        },
      }}
      {...others}
    >
      {children}
    </Avatar>
  );
});

HeaderAvatar.propTypes = {
  children: PropTypes.node,
};

// ==============================|| SEARCH INPUT - MEGA MENu||============================== //

const SwitchTheme = () => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { mode, onChangeMode } = useConfig();

  const handleToggle = () => {
    onChangeMode(mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT);
  };

  return (
    <>
      <HeaderAvatar
        variant="rounded"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {mode === ThemeMode.DARK ? (
          <IconMoonOff stroke={1.5} size="20px" />
        ) : (
          <IconMoon stroke={1.5} size="20px" />
        )}
      </HeaderAvatar>
    </>
  );
};

export default SwitchTheme;
