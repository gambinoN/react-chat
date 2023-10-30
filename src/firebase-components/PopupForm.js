import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function PopupForm({ isOpen, onClose }) {

  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chatRoomsCollection = collection(db, 'chatRooms');
    try {
      

      // Add the chat room to Firebase Firestore
      const docRef = await addDoc(chatRoomsCollection, {
        name: roomName,
        description: roomDescription,
      });

      console.log('Chat room created with ID: ', docRef.id);
      // Redirect to the chat room or perform other actions
    } catch (error) {
      console.error('Error creating chat room: ', error);
    }

    // Clear the form fields
    setRoomName('');
    setRoomDescription('');
  };

  if (!isOpen) return null;
  
    return (
      <div className="absolute w-[30%] top-[30%] left-[35%] bg-white p-10">
      <div className="flex justify-between">
        <h2 className="font-sans text-xl mb-6 ">Create New Chat Room</h2>
        <span className="close-button" onClick={onClose}>
              &times;
        </span>
      </div>
      
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="font-md font-sans" htmlFor="room-name">Room Name:</label>
        <input
          type="text"
          placeholder="Enter your room name"
          id="room-name"
          className="h-10 my-4 text-white px-4 py-2"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          required
        />

        <label htmlFor="room-description">Room Description:</label>
        <textarea
          id="room-description"
          placeholder="Enter your room description"
          className="mt-4 lol text-white px-4 py-2"
          value={roomDescription}
          onChange={(e) => setRoomDescription(e.target.value)}
        ></textarea>

        <button className="font-sans font-xl mt-10" type="submit">Create Chat Room</button>
      </form>
    </div>
    );
  }
  
  export default PopupForm;