import './about-us.css'
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react";


function writeUserData(userId, name, email) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
  });
}



export default function about_us() {
  return (
    <div className='body'>
      <div className="container">
        <div className="card">
          <div className="imgBx">
            <img src="/img/alyssa.jpg"  alt='picture of team member Alyssa'/>
          </div>
          <div className="content">
            <h2>Alyssa Vo</h2>
            <p>Project Manager/UX Designer</p>
          </div>
        </div>
        <div className="card">
          <div className="imgBx">
            <img src="/img/andrew.png" alt='picture of team member Andrew'/>
          </div>
          <div className="content">
            <h2>Andrew Michaels</h2>
            <p>Front/Backend Developer</p>
          </div>
        </div>
        <div className="card">
          <div className="imgBx ">
            <img src="/img/jessie.jpg" alt='picture of team member Jessie'/>
          </div>
          <div className="content">
            <h2>Jessie Zeng</h2>
            <p>Data Scientist</p>
          </div>
        </div>
      </div>
    </div>  
  );
}