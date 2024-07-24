// third-party
import { FormattedMessage } from "react-intl";

// assets
import {
  IconApps,
  IconUserCheck,
  IconBasket,
  IconFileInvoice,
  IconMessages,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc,
} from "@tabler/icons-react";

// constant
const icons = {
  IconApps,
  IconUserCheck,
  IconBasket,
  IconFileInvoice,
  IconMessages,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc,
};

// ==============================|| MENU ITEMS - APPLICATION ||============================== //

const application = {
  id: "application",
  title: <FormattedMessage id="application" />,
  icon: icons.IconApps,
  type: "group",
  children: [
    {
      id: "clients",
      title: <FormattedMessage id="clients" />,
      type: "item",
      url: "/apps/clients",
      icon: icons.IconBasket,
      breadcrumbs: false,

      // children: [
      // {
      //   id: "clients",
      //   title: <FormattedMessage id="clients-list" />,
      //   type: "item",
      //   url: "/apps/clients/client-list",
      // },
      // {
      //   id: "product-details",
      //   title: <FormattedMessage id="product-details" />,
      //   type: "item",
      //   link: "/apps/e-commerce/product-details/:id",
      //   url: "/apps/e-commerce/product-details/1",
      //   breadcrumbs: false,
      // },
      // {
      //   id: "product-list",
      //   title: <FormattedMessage id="product-list" />,
      //   type: "item",
      //   url: "/apps/e-commerce/product-list",
      // },
      // {
      //   id: "checkout",
      //   title: <FormattedMessage id="checkout" />,
      //   type: "item",
      //   url: "/apps/e-commerce/checkout",
      // },
      // ],
    },
  ],
};

export default application;
