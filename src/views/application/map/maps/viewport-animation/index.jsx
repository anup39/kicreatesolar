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

function ViewportAnimation({ data, ...other }) {
  const drawRef = useRef();
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [drawMode, setDrawMode] = useState("draw_polygon");

  const [selectedCity, setSelectedCity] = useState(data[2].city);

  const onSelectCity = useCallback((event, { longitude, latitude }) => {
    setSelectedCity(event.target.value);
    mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
    const map = mapRef.current.getMap();
    map.addSource("point", {
      type: "geojson",
      data: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });
    map.addLayer({
      id: "point",
      type: "circle",
      source: "point",
      paint: {
        "circle-radius": 10,
        "circle-color": "red",
      },
    });
  }, []);

  const handleDrawMain = () => {
    console.log("clicked");
    const map = mapRef.current.getMap();
    console.log(map, "map");

    changeModeTo("draw_polygon", "main");

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
  };

  const handleDrawKeepout = () => {
    console.log("clicked");
    // const map = mapRef.current;
    // console.log(mapRef.current, "map");

    changeModeTo("draw_polygon", "keepout");

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
  };

  const changeModeTo = (mode, component) => {
    drawRef.current.component = component;
    drawRef.current?.changeMode(mode);
    setDrawMode(mode);
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
      <MapControl drawRef={drawRef} changeModeTo={changeModeTo} />
      <DrawControlPanel
        onClick={handleDrawMain}
        data={data}
        selectedCity={selectedCity}
        onSelectCity={onSelectCity}
      />
      <DeleteControlPanel
        data={data}
        selectedCity={selectedCity}
        onSelectCity={onSelectCity}
      />
      <KeepoutControlPanel
        onClick={handleDrawKeepout}
        data={data}
        selectedCity={selectedCity}
        onSelectCity={onSelectCity}
      />
      <CalculateControlPanel
        data={data}
        selectedCity={selectedCity}
        onSelectCity={onSelectCity}
      />
      <ResultControlPanel
        data={data}
        selectedCity={selectedCity}
        onSelectCity={onSelectCity}
      />
      <InfoControlPanel
        data={data}
        selectedCity={selectedCity}
        onSelectCity={onSelectCity}
      />
    </Map>
  );
}

ViewportAnimation.propTypes = {
  data: PropTypes.array,
  city: PropTypes.string,
};

export default memo(ViewportAnimation);
