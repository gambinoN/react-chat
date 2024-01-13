import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faHouse} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import SideBar from './side-bar';
import { useContext } from 'react';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes'

const NavBar = () => {

    const navigate = useNavigate()
    const {firebase} = useContext(FirebaseContext)
    
    return ( 
        <>
            <div className="lg:w-[30%] w-full h-screen bg-[#F5F5F5] border flex flex-row z-10 border-r-2 border-[#0a0e0f]">
                <div id="nav" className='lg:w-[30%] w-[30%] flex flex-col justify-around items-center border-r z-20 border-[#d6d6d6]'>
                    <img src="../../logo.png" alt=''></img>
                    <div className='flex flex-col items-center justify-evenly'>
                        <ul>
                            <li id="btn" className='mb-10'>
                                <Link to="/"><FontAwesomeIcon icon={faHouse} size='2xl' style={{color: "#7d8081",}} /></Link>
                            </li>                            
                        </ul>
                    </div>   
                    <li id="btn" className='list-none'>
                    <li>
                            <button
                                type="button"
                                title="Sign Out"
                                onClick={() => {
                                firebase.auth().signOut();
                                navigate(ROUTES.WELCOME);
                                }}
                                onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    firebase.auth().signOut();
                                    navigate(ROUTES.WELCOME);
                                }
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowRightFromBracket} size='2xl' style={{color: "#7d8081",}} />
                            </button>
                            </li>
                    </li>
                </div>
                <SideBar />
            </div>
        </>
     );
}
 
export default NavBar;