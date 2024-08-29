import PropTypes from "prop-types";
import { useRef, useState, useCallback, memo, useEffect } from "react";
import { useDispatch } from "../../../../../store";
import { useSelector } from "../../../../../store";
import { openSnackbar } from "../../../../../store/slices/snackbar";
import {
  setId,
  setViewName,
  setMode,
  setComponent,
  setWKTGeometry,
  setTypeOfGeometry,
  setFeatureId,
  setShowKeyInfo,
} from "../../../../../store/slices/drawnGeometry";

import {
  editGeojson,
  editGeojsonKeepout,
} from "../../../../../store/slices/mapview";

// third-party
import Map from "react-map-gl";
import AddLayerAndSourceToMap from "../../../../../utils/map/AddLayerAndSourceToMap";

// project-import
import DrawControlPanel from "./draw-control-panel";
import DeleteControlPanel from "./delete-control-panel";
import KeepoutControlPanel from "./keepout-control-panel";
import CalculateControlPanel from "./calculate-control-panel";
import ResultControlPanel from "./result-control-panel";
import InfoControlPanel from "./info-control-panel";
import MapControl from "../../../../../ui-component/third-party/map/MapControl";
import * as turf from "@turf/turf";

// ==============================|| MAP - VIEWPORT ANIMATION ||============================== //

function ViewportAnimation({ ...other }) {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.drawnGeometry);
  const maingeojosn = useSelector((state) => state.mapview.maingeojosn);
  const keepoutgeojson = useSelector((state) => state.mapview.keepoutgeojson);

  const wkt_geometry = useSelector((state) => state.drawnGeometry.wkt_geometry);
  const type_of_geometry = useSelector(
    (state) => state.drawnGeometry.type_of_geometry
  );
  const id = useSelector((state) => state.drawnGeometry.id);
  const feature_id = useSelector((state) => state.drawnGeometry.feature_id);
  const view_name = useSelector((state) => state.drawnGeometry.view_name);
  const component = useSelector((state) => state.drawnGeometry.component);

  const drawRef = useRef();
  const mapRef = useRef(null);

  const [drawMode, setDrawMode] = useState("draw_polygon");
  const [showResult, setShowResult] = useState(true);
  const [minimizeResult, setMinimizeResult] = useState(false);

  const [featuresmain, setFeaturesMain] = useState({});
  const [featureskeepout, setFeaturesKeepout] = useState({});

  const onShowResult = (value) => {
    setShowResult(value);
  };

  const onMinimizeResult = (value) => {
    setMinimizeResult(value);
  };

  const handleDrawMain = useCallback(() => {
    console.log("Draw Main started");
    const map = mapRef.current.getMap();
    console.log(map.getStyle().sources, "map.getStyle().sources");
    console.log(map.getStyle().layers, "map.getStyle().layers");

    drawRef.current.component = "main";
    drawRef.current?.changeMode("draw_polygon");
    setDrawMode("draw_polygon");

    const layer_name = "Main";

    dispatch(setWKTGeometry(null));
    dispatch(setTypeOfGeometry(null));
    dispatch(setId(null));
    dispatch(setViewName(null));
    dispatch(setFeatureId(null));
    dispatch(setComponent(null));

    if (mode && mode === "Edit") {
      const layerId = layer_name + "layer";
      map.setFilter(layerId, null);
    }
    const type_of_geometry = "Polygon";
    if (type_of_geometry === "Polygon") {
      if (layer_name === "Main" && maingeojosn.features.length > 0) {
        dispatch(
          openSnackbar({
            open: true,
            message: "Main area already in map",
            variant: "alert",
            alert: {
              color: "error",
            },
            close: false,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          })
        );
      } else {
        drawRef.current?.changeMode("draw_polygon");
      }
    }
    // // need id here
    dispatch(setId(layer_name));
    dispatch(setViewName(layer_name));
    dispatch(setMode("Draw"));
    dispatch(setComponent("category"));
  }, [mapRef, drawRef, dispatch, mode, maingeojosn]);

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

  const handleSave = useCallback(() => {
    console.log("Save");
    console.log(wkt_geometry, "wkt_geometry");
    console.log(type_of_geometry, "type_of_geometry");
    console.log(id, "id");
    console.log(view_name, "view_name");
    console.log(mode, "mode");
    console.log(component, "component");
    if (
      wkt_geometry &&
      type_of_geometry &&
      String(id) &&
      view_name &&
      mode &&
      component
    ) {
      console.log("Save");
      // dispatch(setshowGeomFormPopup("block"));
      if (mode === "Draw") {
        console.log("Draw mode");
        // dispatch(setshowMapLoader(true));
        setTimeout(() => {
          // dispatch(setshowMapLoader(false));
          if (mapRef.current?.getMap()) {
            const sourceId = view_name + "source";
            const layerId = view_name + "layer";
            const map = mapRef.current?.getMap();
            console.log(map, "map");
            if (map.getSource(sourceId) && map.getLayer(layerId)) {
              console.log("source and layer exists");
              const source = map.getSource(sourceId);
              if (view_name === "Main") {
                const deepcopy = {
                  ...maingeojosn,
                  features: maingeojosn.features.map((feature) => ({
                    ...feature,
                    geometry: { ...feature.geometry },
                    properties: { ...feature.properties },
                  })),
                };
                // Push the new feature into the features array

                deepcopy.features.push({
                  type: "Feature",
                  properties: {
                    centroid: turf.centroid(turf.polygon(wkt_geometry)),
                    area: turf.area(turf.polygon(wkt_geometry)).toFixed(2),
                    component: component,
                    type_of_geometry: type_of_geometry,
                    view_name: view_name,
                  },
                  geometry: {
                    coordinates: wkt_geometry,
                    type: type_of_geometry,
                  },
                  id: maingeojosn.features.length,
                });

                // Log the updated features array
                console.log(deepcopy.features, "features");

                // Create the new GeoJSON object
                const newgeojson = {
                  type: "FeatureCollection",
                  features: deepcopy.features,
                };
                console.log(newgeojson, "newgeojson");

                source.setData(newgeojson);
                // createSmallPolygons({
                //   map: map,
                //   mainPolygon: newgeojson,
                //   height: 0.01,
                //   width: 0.01,
                // });
                dispatch(editGeojson(newgeojson));
                dispatch(
                  openSnackbar({
                    open: true,
                    message: "Sucessfully created ",
                    variant: "alert",
                    alert: {
                      color: "error",
                    },
                    close: false,
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                  })
                );
              }
              if (view_name === "Keepout") {
                console.log("Keepout");
                const deepcopy = {
                  ...keepoutgeojson,
                  features: keepoutgeojson.features.map((feature) => ({
                    ...feature,
                    geometry: { ...feature.geometry },
                    properties: { ...feature.properties },
                  })),
                };
                // Push the new feature into the features array
                deepcopy.features.push({
                  type: "Feature",
                  properties: {
                    centroid: turf.centroid(turf.polygon(wkt_geometry)),
                    area: turf.area(turf.polygon(wkt_geometry)).toFixed(2),
                    component: component,
                    type_of_geometry: type_of_geometry,
                    view_name: view_name,
                  },
                  geometry: {
                    coordinates: wkt_geometry,
                    type: type_of_geometry,
                  },
                  id: keepoutgeojson.features.length,
                });

                // Create the new GeoJSON object
                const newgeojson = {
                  type: "FeatureCollection",
                  features: deepcopy.features,
                };
                console.log(newgeojson, "newgeojson");

                source.setData(newgeojson);
                dispatch(editGeojsonKeepout(newgeojson));
                dispatch(
                  openSnackbar({
                    open: true,
                    message: "Sucessfully created ",
                    variant: "alert",
                    alert: {
                      color: "error",
                    },
                    close: false,
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                  })
                );
              }
            }
            const drawInstance = drawRef.current;
            drawInstance.deleteAll();
            drawInstance.changeMode("simple_select");
            dispatch(setWKTGeometry(null));
            dispatch(setTypeOfGeometry(null));
            dispatch(setId(null));
            dispatch(setViewName(null));
            dispatch(setMode(null));
            dispatch(setFeatureId(null));
            dispatch(setComponent(null));
          }
        }, 3000);
      } else {
        console.log("Edit mode");
        // dispatch(setshowMapLoader(true));
        setTimeout(() => {
          // dispatch(setshowMapLoader(false));
          if (mapRef.current?.getMap()) {
            const sourceId = view_name + "source";
            const layerId = view_name + "layer";
            const map = window.map_global;
            if (map.getSource(sourceId) && map.getLayer(layerId)) {
              const source = map.getSource(sourceId);
              if (view_name === "Main") {
                const deepcopy = JSON.parse(JSON.stringify(maingeojosn));
                const features = deepcopy.features.map((feature) => {
                  if (feature.id === feature_id) {
                    feature.geometry.coordinates = wkt_geometry;
                    feature.properties.centroid = turf.centroid(
                      turf.polygon(wkt_geometry)
                    );
                    feature.properties.area = turf
                      .area(turf.polygon(wkt_geometry))
                      .toFixed(2);
                  }
                  return feature;
                });
                const newgeojson = {
                  type: "FeatureCollection",
                  features: features,
                };
                source.setData(newgeojson);
                dispatch(
                  openSnackbar({
                    open: true,
                    message: "Sucessfully updated",
                    variant: "alert",
                    alert: {
                      color: "error",
                    },
                    close: false,
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                  })
                );
              }
              if (view_name === "Keepout") {
                const deepcopy = JSON.parse(JSON.stringify(keepoutgeojson));
                const features = deepcopy.features.map((feature) => {
                  if (feature.id === feature_id) {
                    feature.geometry.coordinates = wkt_geometry;
                    feature.properties.centroid = turf.centroid(
                      turf.polygon(wkt_geometry)
                    );
                    feature.properties.area = turf
                      .area(turf.polygon(wkt_geometry))
                      .toFixed(2);
                  }
                  return feature;
                });

                const newgeojson = {
                  type: "FeatureCollection",
                  features: features,
                };
                source.setData(newgeojson);
                dispatch(
                  openSnackbar({
                    open: true,
                    message: "Sucessfully updated",
                    variant: "alert",
                    alert: {
                      color: "error",
                    },
                    close: false,
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                  })
                );
              }
            }
            if (mode === "Edit") {
              map.setFilter(layerId, null);
            }
            const drawInstance = drawRef.current;
            drawInstance.deleteAll();
            drawInstance.changeMode("simple_select");
            dispatch(setWKTGeometry(null));
            dispatch(setTypeOfGeometry(null));
            dispatch(setId(null));
            dispatch(setViewName(null));
            dispatch(setMode(null));
            dispatch(setFeatureId(null));
            dispatch(setComponent(null));
          }
        }, 3000);
      }
    }
  }, [
    component,
    dispatch,
    feature_id,
    id,
    mode,
    // popUpRef,
    type_of_geometry,
    view_name,
    wkt_geometry,
    maingeojosn,
    keepoutgeojson,
  ]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (map) {
      const keyDownHandler = (e) => {
        console.log(e.key);
        if (e.key === "Enter") {
          handleSave();
          dispatch(setShowKeyInfo(false));
        }
      };
      window.addEventListener("keydown", keyDownHandler);
      return () => {
        window.removeEventListener("keydown", keyDownHandler);
      };
    }
  }, [handleSave, dispatch]);

  const handleMaploaded = (event) => {
    const map = event.target;
    const fillType = "fill";
    let url = maingeojosn;
    ["Main", "Keepout"].forEach((layer_name) => {
      if (layer_name === "Keepout") {
        url = keepoutgeojson;
      }
      AddLayerAndSourceToMap({
        map: map,
        layerId: layer_name + "layer",
        sourceId: layer_name + "source",
        url: url,
        source_layer: layer_name + "source",
        // popUpRef: popUpRef,
        showPopup: false,
        style: {
          fill_color: layer_name === "Main" ? "red" : "yellow",
          fill_opacity: 0.2,
          stroke_color: "black",
        },
        zoomToLayer: url.features.length > 0 ? true : false,
        extent: turf.bbox(url),
        geomType: "geojson",
        fillType: fillType,
        trace: false,
        component: "map",
      });
    });
    console.log(map, "map");
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
      onLoad={(event) => {
        handleMaploaded(event);
      }}
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
      <CalculateControlPanel mapRef={mapRef} />
      {showResult && (
        <ResultControlPanel
          minimizeResult={minimizeResult}
          onShowResult={onShowResult}
          onMinimizeResult={onMinimizeResult}
        />
      )}
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
