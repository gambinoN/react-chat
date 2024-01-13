import { useContext } from "react";
import LoggedInUserContext from "../../context/logged-in-user";
import useUsers from "../../hooks/use-users";
import { Link } from "react-router-dom";

const UserList = () => {
    const {user} = useContext(LoggedInUserContext)
    const {users} = useUsers(user.userId)

    return ( 
        <>
            {users ? users.map((user, index) => (
                <Link key={index} to={`/chat/${user.username}`}>
                    <div className="w-[80%] flex hover:bg-[#D8D8D8] mx-auto mt-6 px-4 py-4 rounded-lg">
                        <img src={`../../../${user.username}.jpg`} className="rounded-xl mr-4 "/>
                        <div className="flex flex-col">
                            <p className="font-bold text-black text-lg font-pop">{user.fullName}</p>
                            <p className="font-pop text-black text-opacity-40 text-sm">{user.username}</p>
                        </div>
                    </div>
                </Link>
            )) : (
                <p>Loading...</p>
            )}
        </>
     );
}
 
export default UserList;