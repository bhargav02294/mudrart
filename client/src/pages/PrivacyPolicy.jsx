import SEO from "../components/SEO";
import "../styles/legalPages.css";

export default function PrivacyPolicy() {

  return (

    <>

      <SEO
        title="Privacy Policy | Mudrart"
        description="Read Mudrart privacy policy regarding customer data, payments, cookies and information protection."
        url="https://www.mudrart.in/privacy-policy"
      />

      <div className="legal-page">

        <div className="legal-container">

          <div className="legal-header">

            <h1>
              Privacy Policy
            </h1>

            <p>
              Last Updated: May 2026
            </p>

          </div>

          <div className="legal-content">

            <div className="legal-section">

              <p>
                Mudrart is committed to protecting your privacy and safeguarding your personal information responsibly.
              </p>

            </div>

            <div className="legal-section">

              <h2>
                Information We Collect
              </h2>

              <ul>

                <li>
                  Contact and Shipping Details
                </li>

                <li>
                  Payment & Transaction Information
                </li>

                <li>
                  Account Information
                </li>

                <li>
                  Device & Browser Information
                </li>

                <li>
                  Uploaded Images & Design Files
                </li>

                <li>
                  Communications with Support Team
                </li>

              </ul>

            </div>

            <div className="legal-section">

              <h2>
                How We Use Information
              </h2>

              <ul>

                <li>
                  Process orders and shipping
                </li>

                <li>
                  Provide customer support
                </li>

                <li>
                  Improve website experience
                </li>

                <li>
                  Send order updates and offers
                </li>

                <li>
                  Prevent fraud and abuse
                </li>

              </ul>

            </div>

            <div className="legal-section">

              <h2>
                Cookies & Analytics
              </h2>

              <p>
                We use cookies and analytics technologies to improve user experience, analyze traffic and optimize platform performance.
              </p>

            </div>

            <div className="legal-section">

              <h2>
                Contact
              </h2>

              <p>
                For privacy concerns:
              </p>

              <p>
                mudrart1@gmail.com
              </p>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}