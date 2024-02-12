import Grid from "../Grid/Grid";

const Panel = () => {
  return (
    <>
      <div> <h1> Conway's game of life </h1> </div>
      <Grid rows={25} cols={25} />
    </>
  );
};

export default Panel;
