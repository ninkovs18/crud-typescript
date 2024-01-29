import { useState } from "react";

import { Nav, initializeIcons } from "@fluentui/react";
import { INavLink, INavStyles, INavLinkGroup } from "@fluentui/react/lib/Nav";
import { useNavigate } from "react-router-dom";

const navLinks: INavLinkGroup[] = [
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
    setSelectedKey(() => item?.key || "1");
    navigate(item?.url || "/");
  };

  const navigationStyles: Partial<INavStyles> = {
    root: {
      height: "90vh",
      boxSizing: "border-box",
      backgroundColor: "#2b3035",
      paddingTop: "20px",
      borderRight: "2px solid #212529",
    },
    link: {
      backgroundColor: "#343a40",
      color: "#fff",
      borderRadius: "0.75rem",
      selectors: {
        ":hover": { color: "#343a40", fontSize: "20px" },
        ":after": { borderLeft: "5px solid #6741d9" },
      },
    },
  };

  return (
    <Nav
      groups={navLinks}
      styles={navigationStyles}
      selectedKey={String(selectedKey)}
      onLinkClick={handleClick}
    ></Nav>
  );
};

export default Navigation;
