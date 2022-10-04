import React, { useEffect, useState } from "react";

const ColorSelector = ({ color, setColor }) => {
  const [rgb, setRGB] = useState({ red: 0, green: 0, blue: 0 });

  useEffect(() => {
    function toHex(value) {
      const hex = value.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    function getColor() {
      return `#${toHex(rgb.red)}${toHex(rgb.green)}${toHex(rgb.blue)}`;
    }

    setColor(getColor());
  }, [rgb]);

  function updateColorValue(c, value) {
    const num = Number(value);
    setRGB({ ...rgb, [c]: num });
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        borderStyle: "solid",
        borderRadius: 8,
        padding: 8,
      }}
      className="colorSelectorContainer"
    >
      <h2 style={{ textAlign: "center", marginTop: 0 }}>Color Selector</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ color: "red", margin: 0, marginRight: 4 }}>Red</h2>
        <input
          style={{ margin: 0 }}
          id="red"
          name="red"
          type="range"
          min={0}
          max={255}
          defaultValue={0}
          onChange={(e) => updateColorValue("red", e.target.value)}
        />
        <label style={{ marginLeft: 4 }} htmlFor="red">
          {rgb.red}
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
        <h2 style={{ color: "green", margin: 0, marginRight: 4 }}>Green</h2>
        <input
          style={{ margin: 0 }}
          id="green"
          name="green"
          type="range"
          min={0}
          max={255}
          defaultValue={0}
          onChange={(e) => updateColorValue("green", e.target.value)}
        />
        <label style={{ marginLeft: 4 }} htmlFor="green">
          {rgb.green}
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
        <h2 style={{ color: "blue", margin: 0, marginRight: 4 }}>Blue</h2>
        <input
          style={{ margin: 0 }}
          id="blue"
          name="blue"
          type="range"
          min={0}
          max={255}
          defaultValue={0}
          onChange={(e) => updateColorValue("blue", e.target.value)}
        />
        <label style={{ marginLeft: 4 }} htmlFor="blue">
          {rgb.blue}
        </label>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            borderStyle: "solid",
            borderRadius: 4,
            width: 50,
            height: 50,
            backgroundColor: color,
            marginBottom: 16,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ColorSelector;
