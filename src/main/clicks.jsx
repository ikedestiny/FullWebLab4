import React, { useState, useEffect, useRef } from "react";
const Circle = (props) => {
  // const [count, setCount] = useState(0);

//  useEffect(() => {}, []);

  return (
    //<svg height="100" width="100">
      <circle
        cx={props.cx}
        cy={props.cy}
        r="5"
        stroke="white"
        stroke-width="1"
        fill={props.inArea ? "green" : "red"}
      />
   // </svg>
  );
};


  export default Circle