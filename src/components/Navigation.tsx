import { useState } from "react";

import { Nav, initializeIcons } from "@fluentui/react";
import {
  INavButtonProps,
  INavLink,
  INavStyleProps,
  INavStyles,
} from "@fluentui/react/lib/Nav";
import { useNavigate } from "react-router-dom";

const navigationStyles: Partial<INavStyles> = {
  root: {
    height: "90vh",
    boxSizing: "border-box",
    overflowY: "auto",
  },

  compositeLink: {
    backgroundColor: "darkgray",
  },
  link: {
    color: "blue",
    selectors: {
      "&.isSelected": {
        color: "red",
      },
      "::after": { borderLeft: "6px solid blue" },
    },
  },
};

const links = [
  {
    links: [
      {
        name: "Home",
        url: "/",
        key: "1",
      },
      {
        name: "Add",
        url: "/create",
        key: "2",
      },
      {
        name: "Actions",
        url: "/",
        key: "3",
      },
    ],
  },
];

const Navigation = () => {
  initializeIcons();
  const [selectedKey, setSelectedKey] = useState<string>("1");
  const navigate = useNavigate();

  const handleClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    ev?.preventDefault();
    setSelectedKey(item?.key || "1");
    navigate(item?.url || "/");
  };

  return (
    <Nav
      groups={links}
      styles={navigationStyles}
      selectedKey={String(selectedKey)}
      onLinkClick={handleClick}
    ></Nav>
  );
};

export default Navigation;
