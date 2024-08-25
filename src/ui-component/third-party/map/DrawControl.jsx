import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl";
import React from "react";
import PropTypes from "prop-types";

const DrawControl = React.forwardRef((props, ref) => {
  const drawRef = useControl(
    () => new MapboxDraw(props),
    ({ map }) => {
      map.on("draw.create", props.onCreate);
      map.on("draw.update", props.onUpdate);
      map.on("draw.delete", props.onDelete);
    },
    ({ map }) => {
      map.off("draw.create", props.onCreate);
      map.off("draw.update", props.onUpdate);
      map.off("draw.delete", props.onDelete);
    },
    {
      position: props.position,
    }
  );
  React.useImperativeHandle(ref, () => drawRef, [drawRef]); // This way I exposed drawRef outside the component
  return null;
});

DrawControl.displayName = "DrawControl";

export default DrawControl;

DrawControl.propTypes = {
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  position: PropTypes.string,
};
