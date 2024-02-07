import React, { useEffect, useRef, useState } from "react";
import Grid from "../Grid/Grid";



const Panel = () => {
  const [flag, setFlag] = useState(false);

  const handleClick = (() => {
    setFlag(() => !flag);
  })

  return (
    <>
      <Grid rows={10} cols={10} flag={flag} />
      <button onClick={handleClick}> Start </button>
    </>
  );
};

export default Panel;
