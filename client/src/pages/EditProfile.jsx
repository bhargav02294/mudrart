import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {

  const [form, setForm] = useState({});

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();


  /* =====================================================
     FETCH PROFILE
  ===================================================== */

  useEffect(() => {

    fetch("/api/profile", {
      headers: {
        Authorization:
          "Bearer " +
          localStorage.getItem("userToken")
      }
    })
      .then(async (res) => {

        if (!res.ok) {
          throw new Error(
            "Unable to load profile"
          );
        }

        return res.json();

      })
      .then((data) => {

        setForm(data);

      })
      .catch((err) => {

        console.error(
          "PROFILE LOAD ERROR:",
          err
        );

        setError(
          "Unable to load your profile."
        );

      });

  }, []);


  /* =====================================================
     SAVE
  ===================================================== */

  const handleSave = async () => {

    try {

      setSaving(true);

      setError("");


      const res = await fetch(
        "/api/profile",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              "Bearer " +
              localStorage.getItem("userToken")
          },

          body: JSON.stringify(form)

        }
      );


      if (!res.ok) {

        const data = await res.json();

        throw new Error(
          data.message ||
          "Unable to update profile"
        );

      }


      navigate("/account");

    } catch (err) {

      console.error(
        "PROFILE SAVE ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to save profile."
      );

    } finally {

      setSaving(false);

    }

  };


  /* =====================================================
     UPDATE ADDRESS
  ===================================================== */

  const updateAddress = (
    field,
    value
  ) => {

    setForm({
      ...form,

      address: {
        ...form.address,
        [field]: value
      }

    });

  };


  return (

    <main className="edit-profile-page">

      <section className="edit-profile-card">


        <div className="edit-profile-header">

          <span>
            ACCOUNT SETTINGS
          </span>

          <h1>
            Edit Profile
          </h1>

          <p>
            Keep your personal and delivery information
            up to date.
          </p>

        </div>


        {error && (

          <div className="edit-profile-error">
            {error}
          </div>

        )}


        {/* =================================================
            PERSONAL INFORMATION
        ================================================= */}

        <div className="edit-profile-section">

          <div className="edit-section-heading">

            <span>
              PERSONAL
            </span>

            <h2>
              Personal Information
            </h2>

          </div>


          <div className="edit-form-grid">

            <label>

              <span>
                Full Name
              </span>

              <input
                type="text"
                placeholder="Full Name"
                value={form.name || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
              />

            </label>


            <label>

              <span>
                Mobile Number
              </span>

              <input
                type="tel"
                placeholder="Mobile Number"
                value={
                  form.address?.mobile || ""
                }
                onChange={(e) =>
                  updateAddress(
                    "mobile",
                    e.target.value
                  )
                }
              />

            </label>

          </div>

        </div>


        {/* =================================================
            ADDRESS
        ================================================= */}

        <div className="edit-profile-section">

          <div className="edit-section-heading">

            <span>
              DELIVERY
            </span>

            <h2>
              Shipping Address
            </h2>

          </div>


          <div className="edit-form-grid">


            <label className="full-width">

              <span>
                Address Line 1
              </span>

              <input
                type="text"
                placeholder="Address Line 1"
                value={
                  form.address?.addressLine1 || ""
                }
                onChange={(e) =>
                  updateAddress(
                    "addressLine1",
                    e.target.value
                  )
                }
              />

            </label>


            <label>

              <span>
                Area
              </span>

              <input
                type="text"
                placeholder="Area"
                value={
                  form.address?.area || ""
                }
                onChange={(e) =>
                  updateAddress(
                    "area",
                    e.target.value
                  )
                }
              />

            </label>


            <label>

              <span>
                District
              </span>

              <input
                type="text"
                placeholder="District"
                value={
                  form.address?.district || ""
                }
                onChange={(e) =>
                  updateAddress(
                    "district",
                    e.target.value
                  )
                }
              />

            </label>


            <label>

              <span>
                State
              </span>

              <input
                type="text"
                placeholder="State"
                value={
                  form.address?.state || ""
                }
                onChange={(e) =>
                  updateAddress(
                    "state",
                    e.target.value
                  )
                }
              />

            </label>


            <label>

              <span>
                Pincode
              </span>

              <input
                type="text"
                inputMode="numeric"
                placeholder="Pincode"
                value={
                  form.address?.pincode || ""
                }
                onChange={(e) =>
                  updateAddress(
                    "pincode",
                    e.target.value
                  )
                }
              />

            </label>


          </div>

        </div>


        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="edit-profile-actions">

          <button
            className="edit-cancel-btn"
            onClick={() =>
              navigate("/account")
            }
            disabled={saving}
          >
            Cancel
          </button>


          <button
            className="edit-save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Changes"
            }
          </button>

        </div>


      </section>

    </main>

  );

}