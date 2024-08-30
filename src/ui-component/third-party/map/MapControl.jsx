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
import { useDispatch } from "../../../store";

// project-import
import MapControlsStyled from "./MapControlsStyled";
import GeocoderControl from "./GeocoderControl";
import DrawControl from "./DrawControl";
import {
  setShowKeyInfo,
  setWKTGeometry,
  setTypeOfGeometry,
} from "../../../store/slices/drawnGeometry";

// ==============================|| MAP BOX - CONTROL ||============================== //

const MapControl = ({
  drawRef,
  featuresmain,
  featureskeepout,
  onFeaturesMain,
  onFeaturesKeepout,
  onShowFinish,
  hideScale,
  hideGeolocate,
  hideFullscreen,
  hideNavigationn,
  hideGeocoder,
}) => {
  const dispatch = useDispatch();
  const onCreate = useCallback(
    (event) => {
      dispatch(setShowKeyInfo(true));
      const feature = event.features;
      const geometry = feature[0].geometry;
      const type_of_geometry = feature[0].geometry.type;
      if (type_of_geometry === "Polygon") {
        const coordinates = geometry.coordinates[0];
        // const wktCoordinates = coordinates
        //   .map((coord) => `${coord[0]} ${coord[1]}`)
        //   .join(", ");
        // const wktCoordinates_final = `POLYGON ((${wktCoordinates}))`;
        dispatch(setWKTGeometry([coordinates]));
        dispatch(setTypeOfGeometry(type_of_geometry));
        console.log(drawRef.current, "drawRef.current");
        onShowFinish(true);
      }
    },
    [dispatch, drawRef, onShowFinish]
  );

  const onUpdate = useCallback(
    (event) => {
      dispatch(setShowKeyInfo(true));
      // const draw = map.draw;
      const feature = event.features;
      const geometry = feature[0].geometry;
      const type_of_geometry = feature[0].geometry.type;

      if (type_of_geometry === "Polygon") {
        const coordinates = geometry.coordinates[0];
        // const wktCoordinates = coordinates
        //   .map((coord) => `${coord[0]} ${coord[1]}`)
        //   .join(", ");
        // const wktCoordinates_final = `POLYGON ((${wktCoordinates}))`;
        dispatch(setWKTGeometry([coordinates]));
        dispatch(setTypeOfGeometry(type_of_geometry));
        onShowFinish(true);
      }
    },
    [dispatch, drawRef, onShowFinish]
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
