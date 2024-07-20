import React from "react";
import { Suspense } from "react";

export const SamplePage = (Component) => {
  return (
    <>
      {" "}
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Component />
      {/* </Suspense> */}
    </>
  );
};

export default SamplePage;
