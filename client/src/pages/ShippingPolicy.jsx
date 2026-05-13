import SEO from "../components/SEO";
import "../styles/legalPages.css";

export default function ShippingPolicy() {

  return (

    <>

      <SEO

        title="Shipping Policy | Mudrart"

        description="Read Mudrart shipping policy regarding dispatch timelines, delivery estimates, tracking and shipping support."

        url="https://www.mudrart.in/shipping-policy"

      />

      <div className="legal-page">

        <div className="legal-container">

          <div className="legal-header">

            <h1>
              Shipping Policy
            </h1>

          </div>

          <div className="legal-content">

            <div className="legal-section">

              <h2>
                Processing Time
              </h2>

              <p>
                Orders are usually processed within 1–3 business days.
              </p>

            </div>

            <div className="legal-section">

              <h2>
                Delivery Timelines
              </h2>

              <ul>

                <li>Metro Cities: 3–6 business days</li>

                <li>Other Areas: 5–9 business days</li>

              </ul>

            </div>

            <div className="legal-section">

              <h2>
                Tracking
              </h2>

              <p>
                Tracking details are shared after dispatch.
              </p>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}