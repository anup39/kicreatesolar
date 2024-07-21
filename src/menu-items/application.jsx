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
      id: "e-commerce",
      title: <FormattedMessage id="e-commerce" />,
      type: "collapse",
      icon: icons.IconBasket,
      children: [
        {
          id: "products",
          title: <FormattedMessage id="products" />,
          type: "item",
          url: "/apps/e-commerce/products",
        },
        {
          id: "product-details",
          title: <FormattedMessage id="product-details" />,
          type: "item",
          link: "/apps/e-commerce/product-details/:id",
          url: "/apps/e-commerce/product-details/1",
          breadcrumbs: false,
        },
        {
          id: "product-list",
          title: <FormattedMessage id="product-list" />,
          type: "item",
          url: "/apps/e-commerce/product-list",
        },
        {
          id: "checkout",
          title: <FormattedMessage id="checkout" />,
          type: "item",
          url: "/apps/e-commerce/checkout",
        },
      ],
    },
  ],
};

export default application;
