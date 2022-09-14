import React, { useEffect, useState } from "react";
import Header from "./Header";
import Picross from "./Picross";
import PicrossCreator from "./PicrossCreator";

const Main = () => {
  const [currentPage, setCurrentPage] = useState("picross");
  const [puzzles, setPuzzles] = useState({});

  useEffect(() => {}, []);

  return (
    <div className="mainContainer">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "picross" ? (
        <Picross puzzles={puzzles} />
      ) : (
        <PicrossCreator />
      )}
    </div>
  );
};

export default Main;
