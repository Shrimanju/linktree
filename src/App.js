import "./App.css";
import SideNavBar from "./app/component/sidenavbar/SideNavBar";
import TopNavBar from "./app/component/topnavbar/TopNavBar";
import MobileView from "./app/component/MobileView/MobileView";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { auth } from "./Firebase_config/firebase";
import Login from "./app/component/Login/Login";
import { useEffect, useState } from "react";

function App() {
  const [user, setuser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setuser(user);
      } else {
        setuser(null);
      }
    });
  });

  return (
    <div>
      {user ? (
        <div className="app">
          <SideNavBar className="sidebar" />
          <TopNavBar className="topnavbar" />
          <MobileView className="mobileview" />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
