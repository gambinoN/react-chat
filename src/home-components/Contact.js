import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
    return ( <div id="back" className="h-screen w-3/4 grid grid-cols-2">
        
        <div id="card" className="bg-white h-1/2 w-1/2 m-auto flex items-center flex-col">
            <div className="mt-20 flex justify-center items-center flex-col">
                <FontAwesomeIcon icon={faDiscord} size="2xl" />
                <h1 className="text-2xl mt-2">Discord</h1>
            </div>      
            <h2 className="mt-8 text-xl font-sans">gambinon</h2>
        </div>
            
        <a href="https://www.github.com/gambinoN" id="card" className="bg-white h-1/2 w-1/2 m-auto flex items-center flex-col">
            <div className="mt-20 flex justify-center items-center flex-col">
                <FontAwesomeIcon icon={faGithub} size="2xl" />
                <h1 className="text-2xl mt-2">Github</h1>
            </div>      
            <h2 className="mt-8 text-xl font-sans">gambinoN</h2>
        </a>
            
            
        <a href="https://www.instagram.com/nedim_gabela/" id="card" className="bg-white h-1/2 w-1/2 m-auto flex items-center flex-col">
            <div className="mt-20 flex justify-center items-center flex-col">
                <FontAwesomeIcon icon={faInstagram} size="2xl" />
                <h1 className="text-2xl mt-2">Instagram</h1>
            </div>      
            <h2 className="mt-8 text-xl font-sans">@nedim_gabela</h2>
        </a>
               
        <a href="https://www.linkedin.com/in/nedim-gabela-18bab2255?originalSubdomain=ba" id="card" className="bg-white h-1/2 w-1/2 m-auto flex items-center flex-col ">
            <div className="mt-20 flex justify-center items-center flex-col">
                <FontAwesomeIcon icon={faLinkedin} size="2xl" />
                <h1 className="text-2xl mt-2">Linkedin</h1>
            </div>      
            <h2 className="mt-8 text-xl font-sans">Nedim Gabela</h2>
        </a>
            
            
        </div>
     );
}
 
export default Contact