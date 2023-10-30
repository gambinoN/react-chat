function ChatMessage({ message, currentUser }) {
 
  const isCurrentUser = message.senderId === currentUser.uid;

  return (
    
    <div className={`message ${isCurrentUser ? 'sent text-black rounded-xl rounded-br-none text-md font-sans' : 'received  text-white rounded-xl rounded-tl-none text-md font-sans'}`}>
      <img className='rounded-full mr-3' src={message.photo} alt=''/>
      <div>
      <p>{message.text}</p>
      </div>
      
    </div>
    
  );
}

export default ChatMessage;