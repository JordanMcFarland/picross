import React, { useRef, useState } from "react";
import { Transition } from "react-transition-group";

const AnimationTestDiv = ({ color, solved }) => {
  const nodeRef = useRef(null);

  const duration = 3000;

  const defaultStyle = {
    width: 50,
    height: 50,
    backgroundColor: "white",
    transition: `all ${duration}ms ease-in-out`,
    outline: "solid",
  };

  const transitionStyles = {
    entering: { backgroundColor: color, outline: "solid 0px" },
    entered: { backgroundColor: color, outline: "none" },
    exiting: { backgroundColor: "white", outline: "solid" },
    exited: { backgroundColor: "white", outline: "solid" },
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
          ></div>
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
