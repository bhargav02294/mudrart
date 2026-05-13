import SEO from "../components/SEO";
import "../styles/legalPages.css";

export default function Contact() {

  return (

    <>

      <SEO

        title="Contact Mudrart | Customer Support & Help"

        description="Contact Mudrart for order support, shipping queries, refund assistance, digital download help, collaborations and customer support."

        url="https://www.mudrart.in/contact"

      />

      <div className="legal-page">

        <div className="legal-container">

          <div className="legal-header">

            <h1>
              Contact Us
            </h1>

            <p>
              We are always here to help you with orders, support,
              shipping, digital downloads, refunds and collaborations.
            </p>

          </div>

          <div className="legal-content">

            <div className="contact-box">

              <h3>Email Support</h3>

              <p>
                support@mudrart.in
              </p>

              <h3 style={{ marginTop: "20px" }}>
                Instagram
              </h3>

              <p>
                @mudrart.in
              </p>

            </div>

            <div className="legal-section">

              <h2>
                Support Timings
              </h2>

              <p>
                Monday to Saturday — 10 AM to 7 PM IST
              </p>

              <p>
                Average response time is 24–48 business hours.
              </p>

            </div>

            <div className="legal-section">

              <h2>
                We Help With
              </h2>

              <ul>

                <li>Order tracking</li>

                <li>Shipping issues</li>

                <li>Refund support</li>

                <li>Damaged products</li>

                <li>Digital download access</li>

                <li>Business collaborations</li>

                <li>Copyright concerns</li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}