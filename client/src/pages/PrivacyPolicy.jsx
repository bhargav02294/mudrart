import SEO from "../components/SEO";
import "../styles/legalPages.css";

export default function PrivacyPolicy() {

  return (

    <>

      <SEO

        title="Privacy Policy | Mudrart"

        description="Read Mudrart privacy policy regarding customer information, order data, payment security, cookies and data protection."

        url="https://www.mudrart.in/privacy-policy"

      />

      <div className="legal-page">

        <div className="legal-container">

          <div className="legal-header">

            <h1>
              Privacy Policy
            </h1>

            <p>
              Mudrart values your privacy and protects customer information responsibly.
            </p>

          </div>

          <div className="legal-content">

            <div className="legal-section">

              <h2>
                Information We Collect
              </h2>

              <ul>

                <li>Name, email and mobile number</li>

                <li>Shipping and billing address</li>

                <li>Order and payment details</li>

                <li>Device and browser information</li>

                <li>Analytics and cookies data</li>

              </ul>

            </div>

            <div className="legal-section">

              <h2>
                How We Use Information
              </h2>

              <p>
                We use customer data for order processing, support,
                fraud prevention, analytics, shipping and customer experience improvements.
              </p>

            </div>

            <div className="legal-section">

              <h2>
                Payment Security
              </h2>

              <p>
                Payments are securely processed through trusted payment gateways.
                Mudrart does not store sensitive banking credentials.
              </p>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}