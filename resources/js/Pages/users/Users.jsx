import User from "@/Pages/users/User.jsx";

export default function Users({users}){
    console.log(users)
    return <div>
        {users.map((user) => <User user={user} />)}
    </div>
}
