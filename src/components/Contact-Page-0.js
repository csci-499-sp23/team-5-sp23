// this is old Code, new code is in Contact-Page.js
import { Link } from "react-router-dom";
import logo from "./img/logo.png";
import "./css/Contact-Page.css"

const Contact = () => {


  return (
    <>
    <div className="contactBody">

      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="persona logo" className="logo" />
        </Link>
      </div>

      <h1>Contact Us!</h1>

      <form>
        <label>
          Full Name:
          <input type="" name="name" id="" placeholder="" />
        </label>
        <input type="email" name="email" id="" placeholder="Email" />
        <input type="phone" name="phone" id="" placeholder="Phone Number"/>
        <textarea name="message" id="" cols="30" rows="10" placeholder="Please type your message here!"></textarea>
        <button type="submit">send</button>
      
      </form>

    </div>
    </>
  );
};

export default Contact;
