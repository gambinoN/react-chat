import useUser from "../hooks/use-user";
import Home from "../components/Home";
import LoggedInUserContext from "../context/logged-in-user";
import NavBar from "../components/nav-bar";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Dashboard = ({user: loggedInUser}) => {
    const [showNav, setShowNav] = useState(false)
    const {user, setActiveUser} = useUser(loggedInUser?.uid)

    const handleClick = () => {
        setShowNav(prevShowNav => !prevShowNav)
    }
  
      return (
        <>
          <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
            <div className="lg:flex">
              <div className="lg:hidden absolute z-30 mt-8 ml-8">
                <button onClick={handleClick}>
                  <FontAwesomeIcon
                    icon={faBars}
                    size="2xl"
                    style={{ color: "#7d8081" }}
                  />
                </button>
              </div>
              <div id="karanje" className="flex w-full">
                <NavBar />
                <Home />
              </div>
              <div className="lg:hidden">
                {!showNav ? (
                  <>
                    <Home />                  
                  </>
                ) : (
                  <>
                    <NavBar />
                  </>
                )}
              </div>
            </div>
          </LoggedInUserContext.Provider>
        </>
      );
    };
    
    export default Dashboard;