import { Link } from "react-router-dom";
import * as ROUTES from '../constants/routes'

const Welcome = () => {      

    return ( 
        <>
        <div id="back" className="w-full h-screen bg-[#0a0e0f] flex justify-center items-center">
        <div id='gradient-01' className="absolute top-8 right-[150px] z-[5]"></div>
            <div id="slide-fwd-center" className="flex justify-center items-center flex-col z-10">
                <h1 className="text-white text-left text-md font-custom text-[36px]">Connect friends</h1>
                <h2 className="text-white font-custom font-bold text-[36px]">easily & quickly</h2>
                <div className="text-lg font-pop flex mt-10 cursor-pointer">
                    <Link to={ROUTES.LOGIN}>
                        <button className="w-[330px] h-[50px] bg-white text-black rounded-full">Log In</button>
                    </Link>
                </div>
                <div className="text-[#B9C1BE] text-sm mt-16 flex flex-col justify-center z-10 items-center font-pop">
                    <p>Don't have an account?</p>
                    <Link to={ROUTES.SIGN_UP}>
                        <p className="text-white font-bold">Create account</p> 
                    </Link>
                </div>
            </div>
            <div id="gradient-02" className="z-[5] bottom-[300px] left-8 hidden absolute md:block"></div>
        </div>
        </>
     );
}
 
export default Welcome;