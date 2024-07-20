// import React from "react";
import { Suspense } from "react";

// const SamplePage = (Component) => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Component />
//     </Suspense>
//   );
// };

// export default SamplePage;

const SamplePage = (Component) => {
  const WrappedComponent = (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

  WrappedComponent.displayName = `SamplePage(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};
export default SamplePage;
