import React, { useState } from "react";
import '../styles/home.css';
import '../pages/ActivityDetail'


const UserInfo = () => {
    const defaultProfileImage = "https://i.pinimg.com/474x/bd/f4/d3/bdf4d3fe1f9a17136319df951fe9b3e0.jpg";
    const user = {
        name: "Martina Polanco",
        image: "",
        esAdmin: true
    };

    return(
        <div>
            <div className="userDataLeft">
                    <img src={user.image ? user.image : defaultProfileImage} alt=" " className="profilePhoto" />
                    </div>
                    <div className="userDataRigth">
                <p><strong>{user.name}</strong></p>
                {user.esAdmin && (<span className="admin-badge">A</span>)}  {/* IDENTIFICADOR DE SI ES ADMIN*/}
            </div>
        </div>
    );
}

export default UserInfo;