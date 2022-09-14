import React from "react";

const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="headerContainer">
      <h1>Picross</h1>
      <button
        onClick={() =>
          setCurrentPage(
            currentPage === "picross" ? "picrossCreator" : "picross"
          )
        }
      >
        {currentPage === "picross" ? "Create a Picross" : "Play Picross"}
      </button>
    </div>
  );
};

export default Header;
