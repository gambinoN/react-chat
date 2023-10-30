import { db } from "../firebase-components/firebase";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

const ChatRoomList = () => {
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
      const fetchChatRooms = async () => {
        try {
          const chatRoomsSnapshot = await getDocs(collection(db, 'chatRooms'));
          const chatRoomData = chatRoomsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setChatRooms(chatRoomData);
        } catch (error) {
          console.error('Error fetching chat rooms: ', error);
        }
      };
  
      fetchChatRooms();
    }, []);
  

    return ( 
        <div>
            <ul className="mt-5">
                {chatRooms.map((chatRoom) => (
                <li className='text-white font-sans text-lg py-8 px-10 hover:bg-sky-600 hover:cursor-pointer' key={chatRoom.id}>
                    <FontAwesomeIcon className='mr-5' size='lg' icon={faUserGroup} /><a href={`/chat/${chatRoom.id}`}>{chatRoom.name}</a>
                </li>
                ))}
            </ul>
        </div>
     );
}
 
export default ChatRoomList;