const Home = ({setHidden, hidden}) => {
    const handleClick = () => {
        setHidden(!hidden)
    }

    return ( 
    <>
     <div id="back1" className="h-screen w-full md:w-3/4 flex flex-col justify-center items-center">
        <h1 className="text-white text-[85px] w-1/2 mr-20 mb-40">Welcome to my React Chat project</h1>
        <p className="text-white text-[30px]">Enter the room and start typing!</p>
        <button className="md:hidden bg-white px-6 py-1 font-sans text-xl text-center mb-5" onClick={handleClick}>Go to Login page</button>
     </div>
    </> );
}
 
export default Home;