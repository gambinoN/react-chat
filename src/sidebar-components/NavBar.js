import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPhone, faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import logo from './logo.png'
import { useState } from 'react';
import PopupForm from '../firebase-components/PopupForm';

const NavBar = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
      setIsPopupOpen(true);
    };
  
    const closePopup = () => {
      setIsPopupOpen(false);
    };

    
    return ( 
        <>
            <div id="nav" className="w-36 h-screen border flex justify-around items-center flex-col">
                <img src={logo} alt=''></img>
                <div>
                    <ul>
                        <li id="btn" className='mb-10'>
                            <Link to="/"><FontAwesomeIcon icon={faHouse} size='2xl' style={{color: "#7d8081",}} /></Link>
                        </li>
                        <li id="btn">
                            <Link to="/contact"><FontAwesomeIcon icon={faPhone} size='2xl' style={{color: "#7d8081",}} /></Link>
                        </li>
                    </ul>
                </div>   
                <li id="btn" onClick={openPopup} className='list-none'>
                 <FontAwesomeIcon icon={faPlusCircle} size='2xl' style={{color: "#7d8081",}} />
                </li>
                <PopupForm isOpen={isPopupOpen} onClose={closePopup} />          
            </div>
        </>
     );
}
 
export default NavBar;