import { Link } from "react-router-dom";
import logo from "./img/logo.png";
import "./css/Contact-Page.css";
import { useState } from 'react';
import { db } from "../firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { async } from "@firebase/util";

// Technically, does not have to be linked to a user in db,
// anyone on the web should be able to contact if they have questions

function Contact() {

  const[input, setInput] = useState("");

  const handleInput = (e) => { setInput(e.target.value); }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input) {
      await addDoc(collection(db, "contactUs"), {
        email: input,
        timestamp: serverTimestamp(),
      })
      setInput("");
    }
  }
  
  return (
    <>

      <div className="contactBody">

        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="persona logo" className="logo" />
          </Link>
        </div>

        <h1>Contact Us!</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input onChange = {handleInput} type="text" name="name" id="name" value={input} />
          </label>
          <label>
            Email:
            <input onChange = {handleInput} type="email" name="email" id="email" />
          </label>
          <label>
            Phone Number:
            {/* to ensure compatibility, type must be "tel" since it is a phone number */}
            <input onChange = {handleInput} type="tel" name="phone" id="phone" />
          </label>
          <textarea
            onChange = {handleInput}
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="Please Type Your Message Here!"
          ></textarea>
          <button type="submit">Send</button>
        </form>

      </div>

    </>
  );
}

export default Contact;
