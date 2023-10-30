import ChatRoomList from "../chat-components/ChatRoomList";
import GoogleLogin from "../firebase-components/GoogleLogin";

const SideBar = () => {
    
    return ( 
    <>
       <div id="side" className="h-screen w-1/4 border inline-block ">
            <GoogleLogin />
           <div>
                <h1 className="mt-5 ml-5 text-white font-semibold font-sans text-2xl">Chat rooms</h1>
                <ChatRoomList />
           </div>
        </div>
    </> );
}
 
export default SideBar;