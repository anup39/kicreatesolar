import PropTypes from "prop-types";
import { useRef, useState, useCallback, memo } from "react";

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
  const mapRef = useRef(null);

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
      <MapControl />
      <DrawControlPanel
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
