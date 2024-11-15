// third-party
import { FormattedMessage } from "react-intl";

// assets
import { IconDashboard, IconDeviceAnalytics } from "@tabler/icons-react";

const icons = {
  IconDashboard: IconDashboard,
  IconDeviceAnalytics: IconDeviceAnalytics,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: "dashboard",
  title: <FormattedMessage id="dashboard" />,
  icon: icons.IconDashboard,
  type: "group",
  children: [
    {
      id: "default",
      title: <FormattedMessage id="default" />,
      type: "item",
      url: "/dashboard/default",
      icon: icons.IconDashboard,
      breadcrumbs: true,
    },
  ],
};

export default dashboard;
