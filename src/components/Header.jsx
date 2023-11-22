import React from "react";

const HeaderStyle = {
  height: "10vh",
  backgroundColor: "rgb(127, 159, 247)",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Header = () => {
  return (
    <header style={HeaderStyle}>
      <h1>HEADER</h1>
    </header>
  );
};

export default Header;
