import PropTypes from "prop-types";

// third-party
import {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import { useState, useCallback, useRef } from "react";
import GeocoderControl from "./GeocoderControl";
import DrawControl from "./DrawControl";

// project-import
import MapControlsStyled from "./MapControlsStyled";

// ==============================|| MAP BOX - CONTROL ||============================== //

const MapControl = ({
  drawRef,
  hideScale,
  hideGeolocate,
  hideFullscreen,
  hideNavigationn,
  hideGeocoder,
}) => {
  const [featuresmain, setFeaturesMain] = useState({});
  const [featureskeepout, setFeaturesKeepout] = useState({});

  console.log(featuresmain, "featuresmain");
  console.log(featureskeepout, "featureskeepout");

  const onCreate = useCallback(
    (e) => {
      console.log(drawRef.current.component, "drawRef");
      const component = drawRef.current.component;
      if (component === "main") {
        setFeaturesMain((currFeatures) => {
          const newFeatures = { ...currFeatures };
          for (const f of e.features) {
            newFeatures[f.id] = f;
          }
          return newFeatures;
        });
      } else {
        setFeaturesKeepout((currFeatures) => {
          const newFeatures = { ...currFeatures };
          for (const f of e.features) {
            newFeatures[f.id] = f;
          }
          return newFeatures;
        });
      }
    },
    [drawRef]
  );

  const onUpdate = useCallback(
    (e) => {
      console.log(e, "event");
      // console.log(drawRef.current.component, "drawRef");
      const id = e.features[0].id;

      if (featuresmain[id]) {
        setFeaturesMain((currFeatures) => {
          const newFeatures = { ...currFeatures };
          for (const f of e.features) {
            newFeatures[f.id] = f;
          }
          return newFeatures;
        });
      }
      if (featureskeepout[id]) {
        setFeaturesKeepout((currFeatures) => {
          const newFeatures = { ...currFeatures };
          for (const f of e.features) {
            newFeatures[f.id] = f;
          }
          return newFeatures;
        });
      }
    },
    [featuresmain, featureskeepout]
  );

  const onDelete = useCallback((e) => {
    setFeaturesMain((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  // const onModeChange = useCallback((e) => {
  //   setDrawMode(e.mode);
  // }, []);
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
        ref={drawRef}
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
  hideScale: PropTypes.bool,
  hideGeolocate: PropTypes.bool,
  hideFullscreen: PropTypes.bool,
  hideNavigationn: PropTypes.bool,
  hideGeocoder: PropTypes.bool,
};

export default MapControl;
