// third-party
import { FormattedMessage } from "react-intl";

// assets
import {
  IconKey,
  IconReceipt2,
  IconBug,
  IconBellRinging,
  IconPhoneCall,
  IconQuestionMark,
  IconShieldLock,
} from "@tabler/icons-react";

// constant
const icons = {
  IconKey,
  IconReceipt2,
  IconBug,
  IconBellRinging,
  IconPhoneCall,
  IconQuestionMark,
  IconShieldLock,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  title: <FormattedMessage id="pages" />,
  caption: <FormattedMessage id="pages-caption" />,
  icon: icons.IconKey,
  type: "group",
  children: [
    {
      id: "landing",
      title: <FormattedMessage id="landing" />,
      type: "item",
      icon: icons.IconBellRinging,
      url: "/pages/landing",
      target: true,
    },
  ],
};

export default pages;
