import React from "react";
import "./Feed.css";
import UserBar from "../../components/UserBar/UserBar";
// import Button from "react-bootstrap/Button";

function Feed() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const newDay = new Date();
  console.info(newDay);
  const options = {
    day: "numeric",
    weekday: "long",
  };
  const today = newDay.toLocaleDateString("fr-FR", options);
  return (
    <div className="container">
      <UserBar />
      <div>
        <h5 className="salutation">Bonjour, {currentUser.FirstName}</h5>
        <h2 className="today">{today}</h2>
      </div>
    </div>
  );
}

export default Feed;
