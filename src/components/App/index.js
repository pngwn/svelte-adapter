import React, { useState } from "react";
import ReactDOM from "react-dom";

import SvelteCropper from "svelte-easy-crop";
import toReact from "../../../react";

// import "./style.css";

const Cropper = toReact(
  SvelteCropper,
  { width: "500px", height: "500px", position: "relative" },
  "div"
);
let image =
  "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2776&q=80";
let crop = { x: 0, y: 0 };

const buttons = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: "10px"
};

export default function() {
  const [showCropper, toggleShow] = useState(false);
  const [data, setData] = useState({});
  const [zoom, setZoom] = useState(1);

  return (
    <div className="App">
      <button onClick={() => toggleShow(bool => !bool)}>Show Cropper</button>
      <div className="data">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      {showCropper ? (
        <>
          <Cropper
            onCropcomplete={e => setData(e.detail)}
            watchZoom={z => setZoom(z)}
            image={image}
            zoom={zoom}
          />
          <div style={buttons}>
            <button onClick={() => toggleShow(bool => !bool)}>
              Close Cropper
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
