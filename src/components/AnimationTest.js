import React, { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";

const AnimationTestDiv = ({ color, solved }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    console.log(nodeRef);
  }, []);

  const duration = 3000;

  const defaultStyle = {
    width: 0,
    height: 0,
    backgroundColor: "white",
    transition: `all ${duration}ms ease-in-out`,
    outline: "solid",
    visibility: "visible",
  };

  const transitionStyles = {
    entering: {
      backgroundColor: color,
      outline: "solid 0px",
      visibility: "visible",
      width: 50,
      height: 50,
      display: "block",
      fontSize: 16,
    },
    entered: {
      backgroundColor: color,
      outline: "none",
      visibility: "visible",
      height: 50,
      width: 50,
    },
    exiting: {
      backgroundColor: "white",
      outline: "solid",
      opacity: 0,
      width: 0,
      height: 0,
      fontSize: 0,
    },
    exited: {
      backgroundColor: "white",
      outline: "solid",
      opacity: 0,
      visibility: "hidden",
      height: 0,
      width: 0,
      fontSize: 0,
    },
  };

  return (
    <div style={{ padding: 8, backgroundColor: "white" }}>
      <Transition nodeRef={nodeRef} in={solved} timeout={duration}>
        {(state) => (
          <div
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            text
          </div>
        )}
      </Transition>
    </div>
  );
};

const AnimationTest = () => {
  const [solved, setSolved] = useState(false);
  return (
    <div>
      <AnimationTestDiv color={"blue"} solved={solved} />
      <AnimationTestDiv color={"red"} solved={solved} />
      <button onClick={() => setSolved(!solved)}>Test</button>
    </div>
  );
};

export default AnimationTest;
