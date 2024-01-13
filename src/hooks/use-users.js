import { useEffect, useState } from "react"
import { getUsersByUserId } from "../services/firebase"

const useUsers = (userId) => {
    const [allUsers, setAllUsers] = useState(null)

    useEffect(() => {
        async function fetchUsers() {
            try {
                const users = await getUsersByUserId(userId)
                setAllUsers(users)    
            } catch (error) {
                console.error('Error fetching users: ', error)
            }
        }

        if(userId) {
            fetchUsers()
        }
    }, [userId])

    return { users: allUsers, setAllUsers };
}
 
export default useUsers;