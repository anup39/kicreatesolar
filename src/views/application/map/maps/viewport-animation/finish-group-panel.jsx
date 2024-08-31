import SaveControlPanel from "./save-control-panel";
import CancelControlPanel from "./cancel-control-panel";
import PropTypes from "prop-types";

export default function FinishGroupPanel({ handleSave, handleCancel }) {
  return (
    <div>
      <SaveControlPanel onClick={handleSave} />
      <CancelControlPanel onClick={handleCancel} />
    </div>
  );
}

FinishGroupPanel.propTypes = {
  handleSave: PropTypes.func,
  handleCancel: PropTypes.func,
};
