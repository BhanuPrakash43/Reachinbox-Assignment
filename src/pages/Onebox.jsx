import { useState } from "react";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import CenterPart from "../components/CenterPart";

function Onebox() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleMenuItemClick = (path) => {
    setSelectedComponent(path);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "/":
        return <CenterPart />;
      case "/search":
        return <CenterPart />;
      case "/mail":
        return <CenterPart />;
      case "/send":
        return <CenterPart />;
      case "/stack":
        return <CenterPart />;
      case "/inbox":
        return <Home />;
      case "/stacks":
        return <CenterPart />;
      default:
        return <CenterPart />;
    }
  };

  return (
    <div className="h-screen w-screen dark:bg-black bg-white pl-14">
      <Leftbar onMenuItemClick={handleMenuItemClick} />
      <Navbar />
      <div>{renderComponent()}</div>
    </div>
  );
}

export default Onebox;
