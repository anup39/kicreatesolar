// material-ui
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

// project-import
import MainCard from "../../../ui-component/cards/MainCard";
import { ThemeMode } from "../../../config";

import MapContainerStyled from "../../../ui-component/third-party/map/MapContainerStyled";

import ViewportAnimation from "./maps/viewport-animation";

// data import
// import { cities } from "../../../data/location";

const MAPBOX_THEMES = {
  light: "mapbox://styles/mapbox/light-v10",
  dark: "mapbox://styles/mapbox/dark-v10",
  streets: "mapbox://styles/mapbox/streets-v11",
  outdoors: "mapbox://styles/mapbox/outdoors-v11",
  satellite: "mapbox://styles/mapbox/satellite-v9",
  satelliteStreets: "mapbox://styles/mapbox/satellite-streets-v11",
};

const mapConfiguration = {
  mapboxAccessToken: import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN,
  minZoom: 1,
};

// ==============================|| MAP ||============================== //

const Map = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Viewport Animation">
          <MapContainerStyled>
            <ViewportAnimation
              {...mapConfiguration}
              mapStyle={MAPBOX_THEMES.satellite}
            />
          </MapContainerStyled>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Map;
