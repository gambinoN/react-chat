import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { doesRoomExist } from "../../services/firebase";
import FirebaseContext from "../../context/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Chat = ({user}) => {
    const { username } = useParams();
  const [roomId, setRoomId] = useState(null);
  const [roomIdSet, setRoomIdSet] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { firebase } = useContext(FirebaseContext);

  const generateRoomId = (name1, name2) => {
    const sortedNames = [name1, name2].sort();
    return `${sortedNames[0]}_${sortedNames[1]}`;
  };

     const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever messages update
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const roomIdValue = generateRoomId(user.username, username);
    setRoomId(roomIdValue)

    const checkRoom = async () => {
      const doesExist = await doesRoomExist(roomIdValue);

      if (!doesExist.length && username && user.username) {
        try {
          await firebase.firestore().collection('rooms').add({
            roomId: roomIdValue,
            roomName: username,
            participants: [user.username, username],
            createdAt: Date.now(),
          });
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      }
    };

    if (!roomIdSet && username && user.username) {
      setRoomId(roomIdValue);
      checkRoom();
      setRoomIdSet(true);
    }
  }, [user.username, username, roomId, roomIdSet, firebase]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("messages")
      .where("roomId", "==", roomId)
      .orderBy("dateCreated")
      .onSnapshot(
        (snapshot) => {
          const newMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(newMessages);
        },
        (error) => {
          console.error("Error in snapshot listener:", error);
        }
      );

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, [roomId, firebase]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user && user.username && roomId) {
      try {
        await firebase.firestore().collection('messages').add({
          roomId: roomId,
          content: message,
          senderId: user.username,
          senderImg: `../../../public/${user.username}.jpg`,
          dateCreated: Date.now(),
        });
        console.log(1);
      } catch (error) {
        console.log('Error while sending message: ', error);
      }
    }

    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

    return ( 
    <>
     <div className="lg:w-[70%] w-full h-screen bg-[#0a0e0f] flex flex-col-reverse">
        <form onSubmit={handleSubmit} method="POST" className="mx-auto w-[80%] mb-5">
            <span className="input1 w-[80%] mb-4 mx-auto mr-5">
                            <input 
                                id="input"
                                aria-label="Type your message"
                                type="text"
                                onChange={(e) => {
                                    setMessage(e.target.value)
                                }}
                                onKeyDown={handleKeyDown}
                                value={message}
                                placeholder="Type your message"
                                className="text-sm text-white w-full h-[50px] rounded-xl "
                            />
                            <span></span>
                        </span>
            <button type="submit"><FontAwesomeIcon icon={faPaperPlane} size="2xl" style={{color: "#ffffff",}} /></button>
        </form>
        <div ref={chatContainerRef} className="w-[80%] mx-auto mb-10 font-custom overflow-y-auto">   

        {messages.map((message, index) => (
            <>
            {user.username === message.senderId ? (
                    <>
                    <div className="flex flex-row-reverse mb-4">
                        <img src={`../../../${message.senderId}.jpg`} className="rounded-full h-[50px] w-[50px] ml-4" alt="Sender image" />
                        <div id="input" key={index} className="max-w-[300px] bg-[#ffffff] rounded-t-xl rounded-bl-xl px-3 py-3 float-right text-[#292c2e] break-normal">
                                <div className="flex flex-col">
                                    <p className="text-sm">{message.content}</p>
                                    <p className="text-xs text-[#5e5e5e] mt-2">{new Date(message.dateCreated).toLocaleString()}</p>
                                </div>
                        </div>
                    </div>
                    
                    </>
                ) : (
                    <>
                    <div className="flex mb-4">
                    <img src={`../../../${message.senderId}.jpg`} className="rounded-full h-[50px] w-[50px] mr-4" alt="Sender image" />

                        <div id="input" key={index} className="max-w-[300px] bg-[#292c2e] rounded-t-xl rounded-bl-xl px-3 py-3 text-white float-left break-normal">
                                <div className="flex flex-col">
                                    <p className="text-sm">{message.content}</p>
                                    <p className="text-xs text-[#d9d9d9] mt-2">{new Date(message.dateCreated).toLocaleString()}</p>
                                </div>
                        </div>
                    </div>
                    
                    </>
                )}
            </>          
        ))}
         </div>

         <div id="header" className="h-[10%] w-full bg-[#0a0e0f] border-b-2 border-[#5e5e5e] top-0 fixed flex md:justify-normal justify-center items-center">
            <img src={`../../../${username}.jpg`} className='h-[60px] w-[60px] rounded-full ml-8' alt="Header User image" />
            <p className="text-white font-custom text-lg ml-4">{username}</p>
         </div>
     </div>
    
        
    </> 
    );
}
 
export default Chat;
