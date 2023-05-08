import React from "react";
import { Link } from "react-router-dom";
import "./css/TermsConditions.css";
import logo from "./img/logo.png";

const TOS = () => {
  return (
    <div className="bodyTOS">
      <div className="box">
        <div class="anotherBox">

          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="persona logo" className="logo" />
            </Link>
          </div>

          <h1> Terms and Conditions </h1>

            <p className="terms">
              Before you start using our service, please read these terms and conditions carefully. By using our app, you agree to the following terms and conditions: 
              <br />  <br />
              1. Eligibility: Our service is intended for individuals who are at least 18 years old. By using our app, you represent and warrant that you are at least 18 years old. 
              <br /> <br />
              2. Account Creation: To use our service, you must create an account by providing accurate and complete information. You agree to keep your login credentials confidential and to notify us immediately if you suspect any unauthorized use of your account.{" "}
              <br /> <br />
              3. User Content: Our service allows you to upload, post, or transmit content such as text, photos, and videos. You retain ownership of your user content, but by submitting it to our app, you grant us a non-exclusive, worldwide, perpetual, irrevocable, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your user content. 
              <br /> <br />
              4. Prohibited Activities: You agree not to use our service for any illegal or unauthorized purpose. You also agree not to harass abuse, impersonate, or intimidate other users, and not to use our app for spamming, phishing, or any other form of unauthorized advertising or solicitation. 
              <br /> <br />
              5. User Conduct: You agree to use our service in a manner that is respectful, courteous, and consistent with our values of inclusivity and diversity. You also agree to abide by any rules or guidelines that we may provide from time to time. 
              <br /> <br />
              6. Third-Party Services: Our service may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be liable for any damage or loss caused by your use of any third-party website or service.{" "}
              <br /> <br />
              7. Disclaimers: Our service is provided on an "as is" and "as available" basis. We do not guarantee that our app will be error-free, uninterrupted, or free from viruses or other harmful components. We disclaim all warranties, express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. 
              <br /> <br />
              8. Limitation of Liability: In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our service. Our total liability to you for any damages shall not exceed the amount paid by you, if any, to use our app. 
              <br /> <br />
              9. Indemnification: You agree to indemnify and hold us harmless from any and all claims, damages, losses, liabilities, and expenses (including attorneys' fees) arising out of or related to your use of our service. 
              <br /> <br />
              10. Governing Law: These terms and conditions shall be governed by and construed in accordance with the laws of the jurisdiction in New York, New York, United States of America. 
              <br /> <br />
              11. Changes to Terms and Conditions: We reserve the right to modify or update these terms and conditions at any time without prior notice. Your continued use of our serviice after any such changes shall constitute your acceptance of the modified terms and conditions. 
              <br /> <br />
              12. Termination: We may terminate your access to our service at any time without prior notice for any reason, including but not limited to your violation of these terms and conditions. <br />
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default TOS;
