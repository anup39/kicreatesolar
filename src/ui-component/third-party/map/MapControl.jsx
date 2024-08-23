import PropTypes from "prop-types";

// third-party
import {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import { useState, useCallback } from "react";
import GeocoderControl from "./GeocoderControl";
import DrawControl from "./DrawControl";

// project-import
import MapControlsStyled from "./MapControlsStyled";

// ==============================|| MAP BOX - CONTROL ||============================== //

const MapControl = ({
  hideScale,
  hideGeolocate,
  hideFullscreen,
  hideNavigationn,
  hideGeocoder,
}) => {
  const [features, setFeatures] = useState({});
  const onUpdate = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);
  return (
    <>
      <MapControlsStyled />

      {!hideGeocoder && (
        <GeocoderControl
          mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN}
          position="top-left"
        />
      )}
      <DrawControl
        position="top-left"
        displayControlsDefault={false}
        controls={{
          polygon: true,
          trash: true,
        }}
        defaultMode="draw_polygon"
        onCreate={onUpdate}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
      {!hideGeolocate && (
        <GeolocateControl
          position="top-left"
          positionOptions={{ enableHighAccuracy: true }}
        />
      )}
      {!hideFullscreen && <FullscreenControl position="top-left" />}
      {!hideScale && <ScaleControl position="bottom-left" />}
      {!hideNavigationn && <NavigationControl position="bottom-left" />}
    </>
  );
};

MapControl.propTypes = {
  hideScale: PropTypes.bool,
  hideGeolocate: PropTypes.bool,
  hideFullscreen: PropTypes.bool,
  hideNavigationn: PropTypes.bool,
  hideGeocoder: PropTypes.bool,
};

export default MapControl;
