import SEO from "../components/SEO";
import "../styles/legalPages.css";

export default function ShippingPolicy() {

  return (

    <>

      <SEO
        title="Shipping Policy | Mudrart"
        description="Read Mudrart shipping and delivery policy regarding processing times, tracking and delivery timelines."
        url="https://www.mudrart.in/shipping-policy"
      />

      <div className="legal-page">

        <div className="legal-container">

          <div className="legal-header">

            <h1>
              Shipping & Cancellation Policy
            </h1>

          </div>

          <div className="legal-content">

            <div className="legal-section">

              <h2>
                Order Processing
              </h2>

              <p>
                Orders are usually processed within 1–3 business days.
              </p>

            </div>

            <div className="legal-section">

              <h2>
                Delivery Time
              </h2>

              <ul>

                <li>
                  Standard Shipping: 7–10 business days
                </li>

                <li>
                  Express Shipping: 3–5 business days
                </li>

              </ul>

            </div>

            <div className="legal-section">

              <h2>
                Cancellation Policy
              </h2>

              <div className="legal-highlight">

                <p>
                  Orders cannot be cancelled once successfully placed on Mudrart.
                </p>

              </div>

            </div>

            <div className="legal-section">

              <h2>
                RTO & Failed Deliveries
              </h2>

              <p>
                Additional shipping charges may apply for re-delivery attempts.
              </p>

            </div>

            <div className="legal-section">

              <h2>
                Support
              </h2>

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