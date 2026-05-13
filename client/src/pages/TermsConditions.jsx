import SEO from "../components/SEO";
import "../styles/legalPages.css";

export default function TermsConditions() {

  return (

    <>

      <SEO
        title="Terms & Conditions | Mudrart"
        description="Read Mudrart terms and conditions regarding orders, payments, digital downloads and website usage."
        url="https://www.mudrart.in/terms-and-conditions"
      />

      <div className="legal-page">

        <div className="legal-container">

          <div className="legal-header">

            <h1>
              Terms & Conditions
            </h1>

          </div>

          <div className="legal-content">

            <div className="legal-section">

              <p>
                By accessing or using Mudrart, you agree to comply with these Terms & Conditions.
              </p>

            </div>

            <div className="legal-section">

              <h2>
                Orders & Payments
              </h2>

              <p>
                All orders are subject to acceptance and verification.
              </p>

            </div>

            <div className="legal-section">

              <h2>
                Intellectual Property
              </h2>

              <p>
                All logos, branding, content and platform assets belong to Mudrart unless otherwise stated.
              </p>

            </div>

            <div className="legal-section">

              <h2>
                Governing Law
              </h2>

              <p>
                These terms are governed by the laws of India.
              </p>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}