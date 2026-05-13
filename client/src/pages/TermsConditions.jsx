import SEO from "../components/SEO";
import "../styles/legalPages.css";

export default function TermsConditions() {

  return (

    <>

      <SEO

        title="Terms & Conditions | Mudrart"

        description="Read Mudrart terms and conditions regarding orders, payments, digital downloads, copyright and platform usage."

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

              <h2>
                Platform Usage
              </h2>

              <p>
                By accessing Mudrart, users agree to use the platform lawfully and responsibly.
              </p>

            </div>

            <div className="legal-section">

              <h2>
                Orders & Payments
              </h2>

              <p>
                Orders are subject to acceptance and verification.
              </p>

            </div>

            <div className="legal-section">

              <h2>
                Intellectual Property
              </h2>

              <p>
                All branding, logos, platform assets and designs belong to Mudrart unless otherwise stated.
              </p>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}