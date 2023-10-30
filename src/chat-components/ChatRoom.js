import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // If you're using React Router for navigation
import { db } from '../firebase-components/firebase';
import { onSnapshot } from 'firebase/firestore';
import { doc, collection, query, orderBy, addDoc, getDoc } from 'firebase/firestore';
import ChatMessage from './ChatMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';


function ChatRoom( { currentUser } ) {
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentRoomId, setCurrentRoomId] = useState(roomId);
    const [currentRoomName, setCurrentRoomName] = useState('');
  
    useEffect(() => {
        const chatRoomDocRef = doc(db, 'chatRooms', roomId);
        const messagesRef = collection(chatRoomDocRef, 'messages');
        const q = query(messagesRef, orderBy('timestamp'));
  
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const messageData = querySnapshot.docs.map((doc) => doc.data());
          setMessages(messageData);
        });
    
        // Unsubscribe from the listener when the component unmounts
        return () => {
          unsubscribe();
        };
    }, [roomId]);

    useEffect(() => {
      // Function to fetch room name based on room ID
      const fetchRoomName = async (roomId) => {
        try {
          const roomRef = doc(db, 'chatRooms', roomId);
          const roomSnapshot = await getDoc(roomRef);
  
          if (roomSnapshot.exists()) {
            const roomData = roomSnapshot.data();
            setCurrentRoomName(roomData.name);
          } else {
            setCurrentRoomName('Room Not Found'); // Handle the case where the room doesn't exist
          }
        } catch (error) {
          console.error('Error fetching room name:', error);
        }
      };
  
      // Fetch the room name when the currentRoomId changes
      fetchRoomName(currentRoomId);
    }, [currentRoomId]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const chatRoomDocRef = doc(db, 'chatRooms', roomId);
      const messagesRef = collection(chatRoomDocRef, 'messages');
    
      try {
        await addDoc(messagesRef, {
          text: newMessage,
          timestamp: new Date(),
          senderId: currentUser.uid,
          photo: currentUser.photoURL
        });
        setNewMessage('');
      } catch (error) {
        console.error('Error adding message: ', error);
      }
    };

    const renderedMessages = messages.map((message, index) => (
      <ChatMessage key={index} message={message} currentUser={currentUser} />
    ));
    
  
    return (
      <div className='h-screen w-3/4'>
        <div id='room' className='flex h-28 pl-5 align-middle '>
          <h2 className='text-white font-sans font-semibold text-2xl ml-10 pt-10'><FontAwesomeIcon icon={faComment} size='xl' className='mr-2'/> Chat Room - {currentRoomName}</h2>
        </div> 
        <div id="bg" className='flex flex-col-reverse overflow-y-scroll py-8'>  
          <div className="chat-messages">{renderedMessages}</div>
        </div>
        <form className='flex h-12 ' onSubmit={handleSubmit} >
                <input
                  type="text"
                  className='w-11/12 px-4 py-5 border-none text-white focus:outline-none'
                  value={newMessage}
                  autoFocus
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button className='w-1/12 bg-sky-900 text-white' type="submit">Send</button>
              </form>
      </div>
    );
  }

export default ChatRoom;