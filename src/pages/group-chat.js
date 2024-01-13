import { useState } from "react"
import NavBar from "../components/nav-bar";
import useUser from "../hooks/use-user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import LoggedInUserContext from "../context/logged-in-user";
import Group from "../components/group-chat";

const GroupChat = ({user: loggedInUser}) => {
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
                <Group user={user}/>
              </div>
              <div className="lg:hidden">
                {!showNav ? (
                  <>
                    <Group user={user} />                  
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
}
 
export default GroupChat;