import { useState } from "react";

import { Nav, initializeIcons } from "@fluentui/react";
import { INavLink, INavStyles } from "@fluentui/react/lib/Nav";
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
        name: "Link 2",
        url: "/link2",
        key: "2",
      },
      {
        name: "Link 3",
        url: "/link3",
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
