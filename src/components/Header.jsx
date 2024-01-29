const HeaderStyle = {
  height: "10vh",
  backgroundColor: "#212529",
  color: "#fff",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Header = () => {
  return (
    <header style={HeaderStyle}>
      <h1 style={{ textAlign: "left", width: "100%", marginLeft: "40px" }}>
        Admin panel
      </h1>
    </header>
  );
};

export default Header;
