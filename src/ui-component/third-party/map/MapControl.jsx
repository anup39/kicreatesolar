import PropTypes from "prop-types";

// third-party
import {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import { useCallback } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

// project-import
import MapControlsStyled from "./MapControlsStyled";
import GeocoderControl from "./GeocoderControl";
import DrawControl from "./DrawControl";

// ==============================|| MAP BOX - CONTROL ||============================== //

const MapControl = ({
  drawRef,
  featuresmain,
  featureskeepout,
  onFeaturesMain,
  onFeaturesKeepout,
  hideScale,
  hideGeolocate,
  hideFullscreen,
  hideNavigationn,
  hideGeocoder,
}) => {
  const onCreate = useCallback(
    (e) => {
      console.log(drawRef.current.component, "drawRef");
      const component = drawRef.current.component;
      if (component === "main") {
        onFeaturesMain(e);
      } else {
        onFeaturesKeepout(e);
      }
    },
    [onFeaturesMain, onFeaturesKeepout, drawRef]
  );

  const onUpdate = useCallback(
    (e) => {
      const id = e.features[0].id;

      if (featuresmain[id]) {
        onFeaturesMain(e);
      }
      if (featureskeepout[id]) {
        onFeaturesKeepout(e);
      }
    },
    [featuresmain, featureskeepout, onFeaturesMain, onFeaturesKeepout]
  );

  const onDelete = useCallback(
    (e) => {
      onFeaturesMain(e);
    },
    [onFeaturesMain]
  );

  const modes = {
    ...MapboxDraw.modes,
    draw_polygon: MapboxDraw.modes.draw_polygon,
  };

  return (
    <>
      <MapControlsStyled />

      {!hideGeocoder && (
        <GeocoderControl
          mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN}
          position="top-left"
          marker={false}
        />
      )}
      <DrawControl
        ref={drawRef}
        modes={modes}
        position="top-left"
        displayControlsDefault={false}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
      {!hideGeolocate && (
        <GeolocateControl
          position="top-left"
          positionOptions={{ enableHighAccuracy: true }}
          showAccuracyCircle={false}
        />
      )}
      {!hideFullscreen && <FullscreenControl position="top-left" />}
      {!hideScale && <ScaleControl position="bottom-left" />}
      {!hideNavigationn && <NavigationControl position="bottom-left" />}
    </>
  );
};

MapControl.propTypes = {
  drawRef: PropTypes.object,
  featuresmain: PropTypes.object,
  featureskeepout: PropTypes.object,
  onFeaturesMain: PropTypes.func,
  onFeaturesKeepout: PropTypes.func,
  hideScale: PropTypes.bool,
  hideGeolocate: PropTypes.bool,
  hideFullscreen: PropTypes.bool,
  hideNavigationn: PropTypes.bool,
  hideGeocoder: PropTypes.bool,
};

export default MapControl;
