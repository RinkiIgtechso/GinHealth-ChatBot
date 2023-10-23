import { useEffect, useState } from "react";
import AllRoutes from "./AllRoutes/AllRoutes";
import { socket } from './socket';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

//   useEffect(()=>{
//     function onConnect() {

//         setIsConnected(true);
//     }

//     socket.on('connect', onConnect);

//     return () => {
//         socket.off('connect', onConnect);
//       };
// },[])

  return (
    <div>
      <AllRoutes />
    </div>
  );
}

export default App;
