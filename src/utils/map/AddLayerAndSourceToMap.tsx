import {
  Map,
  LngLatBounds,
  SourceSpecification,
  CircleLayerSpecification,
  LayerSpecification,
} from "mapbox-gl";
import { Provider } from "react-redux";
import ReactDOM, { Root } from "react-dom/client";
import { RefObject } from "react";
import {
  setWKTGeometry,
  setTypeOfGeometry,
  setMode,
  setFeatureId,
  setComponent,
  setViewName,
} from "../../store/slices/drawnGeometry";

interface AddLayerProps {
  map: Map;
  layerId: string;
  sourceId: string;
  url: string;
  source_layer: string;
  showPopup: boolean;
  style: { fill_color: string; fill_opacity: string; stroke_color: string };
  zoomToLayer: boolean;
  extent: LngLatBounds;
  geomType: string;
  fillType: string;
  trace: boolean;
  component: string;
  popUpRef: RefObject<HTMLDivElement>;
  dispatch: any;
  draw: any;
}

function AddLayerAndSourceToMap({
  map,
  layerId,
  sourceId,
  url,
  source_layer,
  showPopup,
  style,
  zoomToLayer,
  extent,
  geomType,
  fillType,
  trace,
  dispatch,
  draw,
}: AddLayerProps) {
  // Rest of your component code remains unchanged

  console.log("adding layer");

  if (zoomToLayer) {
    map.fitBounds(extent);
  }

  if (geomType && geomType === "geojson") {
    const newSourceGeojson: SourceSpecification = {
      type: "geojson",
      data: url,
    };
    map.addSource(sourceId, newSourceGeojson);
  } else {
    const newSource: SourceSpecification = {
      type: "vector",
      tiles: [url],
      promoteId: "id",
    };

    map.addSource(sourceId, newSource);
  }

  if (fillType && fillType === "circle") {
    const newLayer: CircleLayerSpecification = {
      id: layerId,
      type: "circle",
      source: sourceId,
      // "source-layer": source_layer,
      layout: {},
      paint: {
        "circle-color": style.fill_color,
        "circle-radius": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          13,
          7,
        ],
        "circle-stroke-width": 1,
        "circle-stroke-color": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          "black",
          "black",
        ],
      },
    };
    map.addLayer(newLayer);
  } else if (fillType && fillType === "line") {
    const newLayer: LayerSpecification = {
      id: layerId,
      type: "line",
      source: sourceId,
      // "source-layer": source_layer,
      layout: {},
      paint: {
        "line-color": style.fill_color,
        "line-width": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          5,
          3,
        ],
      },
    };
    map.addLayer(newLayer);
  } else {
    const newLayer: LayerSpecification = {
      id: layerId,
      type: "fill",
      source: sourceId,
      // "source-layer": source_layer,
      layout: {},
      paint: {
        "fill-color": style.fill_color,
        "fill-outline-color": style.stroke_color,
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          0.3,
          parseFloat(style.fill_opacity),
        ],
      },
      // filter: ["!=", ["id"], 65],
    };
    map.addLayer(newLayer);
    // if (layerId === "Mainlayer") {
    //   if (map.getSource("Keepoutsource") && map.getLayer("Keepoutlayer")) {
    //     map.moveLayer("Keepoutlayer", "Mainlayer");
    //   }
    // }
  }

  let hoveredStateId: null = null!;

  map.on("mousemove", layerId, (e) => {
    // @ts-ignore
    if (e.features.length > 0) {
      if (hoveredStateId) {
        map.setFeatureState(
          {
            source: sourceId,
            id: hoveredStateId,
            // sourceLayer: source_layer,
          },
          { hover: false }
        );
      }
      // @ts-ignore
      hoveredStateId = e.features[0].id;
      map.setFeatureState(
        {
          source: sourceId,
          // @ts-ignore
          id: hoveredStateId,
          // sourceLayer: source_layer,
        },
        { hover: true }
      );
    }
  });

  map.on("mouseleave", layerId, () => {
    if (hoveredStateId) {
      map.setFeatureState(
        {
          source: sourceId,
          id: hoveredStateId,
          // sourceLayer: source_layer,
        },
        { hover: false }
      );
    }
  });

  map.on("click", layerId, (e) => {
    console.log(e, "e");

    draw.deleteAll();
    draw.add(features[0]);
    // Here setting the state of the draw object in drawPolygon
    dispatch(setWKTGeometry(null));
    dispatch(setTypeOfGeometry(null));
    dispatch(setMode("Edit"));
    dispatch(setFeatureId(feature_id));
    dispatch(setComponent(properties.component));
    dispatch(setViewName(properties.view_name));
    if (properties.component === "category") {
      dispatch(setId(feature_id));
    }
    //Note: Here i have to find if the clicked featue is of category or project
    console.log(properties, "properties");
    console.log(view_name, "view_name");
    if (view_name) {
      const layerId = view_name + "layer";
      map.setFilter(layerId, null);
    }
    const layerId = properties.view_name + "layer";
    console.log(layerId, "layerId");
    map.setFilter(layerId, null);
    const layer = map.getLayer(layerId);
    const existingFilter = layer.filter || ["all"];
    const filterCondition = ["!=", ["id"], feature_id];
    const updatedFilter = ["all", existingFilter, filterCondition];
    map.setFilter(layerId, updatedFilter);
  });
}

export default AddLayerAndSourceToMap;
