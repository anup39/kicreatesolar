import PropTypes from "prop-types";
import { useRef, useState, useCallback, memo } from "react";
import { useDispatch } from "../../../../../store";
import { openSnackbar } from "../../../../../store/slices/snackbar";

// third-party
import Map from "react-map-gl";

// project-import
import DrawControlPanel from "./draw-control-panel";
import DeleteControlPanel from "./delete-control-panel";
import KeepoutControlPanel from "./keepout-control-panel";
import CalculateControlPanel from "./calculate-control-panel";
import ResultControlPanel from "./result-control-panel";
import InfoControlPanel from "./info-control-panel";
import MapControl from "../../../../../ui-component/third-party/map/MapControl";

// ==============================|| MAP - VIEWPORT ANIMATION ||============================== //

function ViewportAnimation({ ...other }) {
  const dispatch = useDispatch();
  const drawRef = useRef();
  const mapRef = useRef(null);
  const [drawMode, setDrawMode] = useState("draw_polygon");

  const [featuresmain, setFeaturesMain] = useState({});
  const [featureskeepout, setFeaturesKeepout] = useState({});

  const handleDrawMain = useCallback(() => {
    console.log("Draw Main started");
    const map = mapRef.current.getMap();
    drawRef.current.component = "main";
    drawRef.current?.changeMode("draw_polygon");
    setDrawMode("draw_polygon");
    // dispatch(
    //   openSnackbar({
    //     open: true,
    //     message: "Main area already in map",
    //     variant: "alert",
    //     alert: {
    //       color: "error",
    //     },
    //     close: false,
    //     anchorOrigin: {
    //       vertical: "top",
    //       horizontal: "center",
    //     },
    //   })
    // );
  }, [mapRef, drawRef]);

  const handleDrawKeepout = useCallback(() => {
    console.log("Draw Keepout started");
    const map = mapRef.current.getMap();
    drawRef.current.component = "keepout";
    drawRef.current?.changeMode("draw_polygon");
    setDrawMode("draw_polygon");
  }, [mapRef, drawRef]);

  const onFeaturesMain = (e) => {
    setFeaturesMain((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  };

  const onFeaturesKeepout = (event) => {
    setFeaturesKeepout((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of event.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  };

  return (
    <Map
      initialViewState={{
        latitude: 22.299405,
        longitude: 73.208119,
        zoom: 11,
        bearing: 0,
        pitch: 0,
      }}
      ref={mapRef}
      {...other}
    >
      <MapControl
        drawRef={drawRef}
        featuresmain={featuresmain}
        featureskeepout={featureskeepout}
        onFeaturesMain={onFeaturesMain}
        onFeaturesKeepout={onFeaturesKeepout}
      />
      <DrawControlPanel onClick={handleDrawMain} />
      <DeleteControlPanel />
      <KeepoutControlPanel onClick={handleDrawKeepout} />
      <CalculateControlPanel />
      <ResultControlPanel />
      <InfoControlPanel />
    </Map>
  );
}

ViewportAnimation.propTypes = {
  mapboxAccessToken: PropTypes.string,
  minZoom: PropTypes.number,
  mapStyle: PropTypes.string,
};

export default memo(ViewportAnimation);
