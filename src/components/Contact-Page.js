import { Link } from "react-router-dom";
import logo from "./img/logo.png";

const Contact = () => {
  return (
    <>
    
    <div className="logo-container">
      <Link to="/">
        <img src={logo} alt="persona logo" className="logo" />
      </Link>
    </div>

    <form>

      <h1>Contact Us!</h1>

      <input type="" name="name" id="" placeholder="Please enter your name!" />
      <input type="email" name="email" id="" placeholder="Please enter your email!" />
      <input type="phone" name="phone" id="" placeholder="Please enter your phone number!"/>
      <textarea name="message" id="" cols="30" rows="10" placeholder="Please enter your message!"></textarea>
      <button type="submit">send</button>
    
    </form>

    </>
  );
};

export default Contact;
