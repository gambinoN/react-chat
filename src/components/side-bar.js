import UserList from "./Users/user-list";

const SideBar = () => {
    
    return ( 
    <>
       <div id="side" className="h-screen bg-[#F5F5F5] w-full">
           <div className="border-b border-[#d6d6d6]">
                <h1 className="mt-10 ml-10 mb-5 text-[#0a0e0f] font-semibold font-custom text-2xl">Connect with Friends</h1>  
           </div>
           <UserList />
        </div>
    </> );
}
 
export default SideBar;