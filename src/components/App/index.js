import React, { useState } from "react";
import toReact from "../../../react";

import SvelteApp from "../App.svelte";

const baseStyle = {
  width: "50%",
  background: "pink"
};

const SvelteInReact = toReact(SvelteApp, baseStyle, "div");

const button = {
  padding: "3px 5px",
  fontSize: "16px",
  borderRadius: "2px",
  backgroundColor: "cadetblue",
  color: "white",
  border: "none"
};

const App = () => {
  const [count, setCount] = useState(10);

  const handleClick = () => setCount(prevCount => prevCount + 1);

  return (
    <div>
      <h1>I am React component</h1>
      <button style={button} onClick={handleClick}>
        Increment - {count}
      </button>
      <SvelteInReact number={count} onClick={handleClick} />
    </div>
  );
};

export default App;
