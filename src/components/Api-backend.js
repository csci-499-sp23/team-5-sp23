// import React, { useState, useEffect } from "react";

// import { HandleClick } from './modules/DateComputation.js';
// import { UserAuth } from "../context/UserAuthContext";
// import GoogleAPI from "./GoogleAPI.js";

// function APIBackendInterface(props) {
//   const { user } = UserAuth();
//   const [places, setPlaces] = useState([]);
//   const [types, setTypes] = useState([]);

//   useEffect(() => {
//       HandleClick({ email: user.email })
//         .then((value) => {
//           setTypes(value);
//           console.log(value);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//   }, [user.email]);

//   const frontendplaces = (val) => {
//     props.sendUpPlaces(val);
//   };

//   return (
//     <div>
      
//       {types.length > 0 && (
//         <GoogleAPI data={types} sendplaces={frontendplaces} />
//       )}
//     </div>
//   );
// }

// export default APIBackendInterface;
