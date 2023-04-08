import "./css/Contact.css";

const Contact = () => {
  return (
    <form>
      <h1>Contact Us!</h1>
      <input type="" name="name" id="" placeholder="Please enter your name!" />
      <input type="email" name="email" id="" placeholder="Please enter your email!" />
      <input type="phone" name="phone" id="" placeholder="Please enter your phone number!"/>
      <textarea name="message" id="" cols="30" rows="10" placeholder="Please enter your message!"></textarea>
      <button type="submit">send</button>
    </form>
  );
};

export default Contact;
