import { useContext } from "react";
import LoggedInUserContext from "../context/logged-in-user";

const Home = () => {
    const {user} = useContext(LoggedInUserContext)

    return ( 
    <>
     <div className="lg:w-[70%] w-full h-screen bg-[#0a0e0f] flex justify-center items-center">
        <div id='gradient-01' className="absolute top-8 right-[150px] z-[5]"></div>
            <div id="slide-fwd-center" className="flex justify-center items-center flex-col z-10">
                <h1 className="text-white text-left text-md font-custom text-[36px]">Hello {user.fullName}</h1>
                <h2 className="text-white font-custom font-bold text-center text-[36px]">choose friend & start typing</h2>
            </div>
            <div id="gradient-02" className="z-[5] bottom-[300px] left-60 hidden absolute md:block"></div>
        </div>
    </> 
    );
}
 
export default Home;