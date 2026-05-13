import SEO from "../components/SEO";
import "../styles/legalPages.css";

export default function RefundPolicy() {

  return (

    <>

      <SEO

        title="Return & Refund Policy | Mudrart"

        description="Read Mudrart refund and replacement policy regarding damaged products, cancellations and digital products."

        url="https://www.mudrart.in/refund-policy"

      />

      <div className="legal-page">

        <div className="legal-container">

          <div className="legal-header">

            <h1>
              Return & Refund Policy
            </h1>

          </div>

          <div className="legal-content">

            <div className="legal-section">

              <h2>
                Eligible Refund Cases
              </h2>

              <ul>

                <li>Damaged products</li>

                <li>Incorrect item delivered</li>

                <li>Manufacturing defects</li>

              </ul>

            </div>

            <div className="legal-section">

              <h2>
                Unboxing Video Required
              </h2>

              <p>
                Customers must provide proper unboxing video proof for damage claims.
              </p>

            </div>

            <div className="legal-section">

              <h2>
                Digital Products
              </h2>

              <p>
                Digital downloads are non-refundable after delivery.
              </p>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}