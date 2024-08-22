// third-party
import { FormattedMessage } from "react-intl";

// assets
import { IconPictureInPicture, IconMapPin } from "@tabler/icons-react";

// constant
const icons = {
  IconPictureInPicture,
  IconMapPin,
};

// ==============================|| UI FORMS MENU ITEMS ||============================== //

const forms = {
  id: "ui-forms",
  title: <FormattedMessage id="forms" />,
  icon: icons.IconPictureInPicture,
  type: "group",
  children: [
    {
      id: "map",
      title: <FormattedMessage id="map" />,
      type: "item",
      icon: icons.IconMapPin,
      url: "/forms/map",
    },
  ],
};

export default forms;
