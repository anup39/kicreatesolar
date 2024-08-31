import DeleteControlPanel from "./delete-control-panel";
import EditControlPanel from "./edit-control-panel";
import PropTypes from "prop-types";

export default function EditGroupPanel({ handleEdit }) {
  return (
    <div>
      <EditControlPanel onClick={handleEdit} />
      <DeleteControlPanel />
    </div>
  );
}

EditGroupPanel.propTypes = {
  handleEdit: PropTypes.func,
};
