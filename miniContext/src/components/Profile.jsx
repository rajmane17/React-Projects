import { useContext} from 'react'
import UserContext from '../context/UserContext'

function Profile() {
    // we are receiving a object over here, which contains username and password.
    const {user} = useContext(UserContext)

    if(!user) return <div> Please login first </div>

    return <div>Welcome, {user.username}</div>
}

export default Profile
