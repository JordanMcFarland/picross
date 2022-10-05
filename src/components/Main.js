import React, { useEffect, useState } from "react";
import Header from "./Header";
import Picross from "./Picross";
import PicrossCreator from "./PicrossCreator";
import ColorSelector from "./ColorSelector";
import AnimationTest from "./AnimationTest";

const Main = () => {
  const [currentPage, setCurrentPage] = useState("picross");
  const [puzzles, setPuzzles] = useState({});

  useEffect(() => {}, []);

  function getCurrentPage() {
    switch (currentPage) {
      case "picross":
        return <Picross puzzles={puzzles} />;
      case "picrossCreator":
        return <PicrossCreator />;
      case "animationTest":
        return <AnimationTest />;
      default:
        return <h3>Something went wrong</h3>;
    }
  }

  return (
    <div className="mainContainer">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {getCurrentPage()}
      {/* {currentPage === "picross" ? (
        <Picross puzzles={puzzles} />
      ) : (
        <PicrossCreator />
      )} */}
    </div>
  );
};

export default Main;
