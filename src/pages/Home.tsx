import DisplayData from "../components/DisplayData";
import { Stack } from "@fluentui/react";

const Home = () => {
  return (
    <Stack style={{backgroundColor: "#2b3035", borderLeft: "2px solid #212529" }}>
      <DisplayData />
    </Stack>
  );
};

export default Home;
