import React, { useState } from "react";
import '../styles/home.css';
import '../pages/ActivityDetail'
import userInfo from'../mocks/users.json'
import UserCard from "./UserCard";


const UserInfo = () => {
    const defaultProfileImage = "https://i.pinimg.com/474x/bd/f4/d3/bdf4d3fe1f9a17136319df951fe9b3e0.jpg";
    const user = JSON.parse(localStorage.getItem("user"));

    

    return(
        <div>
            <div className="userDataLeft">
                    <img src={user.image ? user.image : defaultProfileImage} alt=" " className="profilePhoto" />
                    </div>
                    <div className="userDataRight">
                <p><strong>{user?.name}</strong></p>
                {user.esAdmin && (<span className="admin-badge">A</span>)}  {/* IDENTIFICADOR DE SI ES ADMIN*/}
            </div>
        </div>
    );
}

const AllUsersInfo = () =>{
    const usersData = userInfo.users; 

    const [users] = useState(usersData || []); 
    const [search, setSearch] = useState("");


    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    ); 

    return(
        <div>
            <input 
            type="text" 
            placeholder="Buscar por nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search"
            />
            {filteredUsers.length === 0 ? (
                <p>No se encontraron Usuarios.</p>
            ) : (
                filteredUsers.map((user) => (
                    <UserCard
                        key={user.id}
                        user = {user}
                    />
                ))
            )}
        </div>
    );
}
export  {UserInfo, AllUsersInfo};