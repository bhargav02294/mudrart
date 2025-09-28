document.addEventListener("DOMContentLoaded", function () {
  const roleSelect = document.getElementById("role");
  const founderFields = document.getElementById("founder-fields");
  const investorFields = document.getElementById("investor-fields");
  const form = document.getElementById("signup-form");
  const successMsg = document.getElementById("success-msg");

  roleSelect.addEventListener("change", function () {
    const role = roleSelect.value;

    founderFields.classList.add("hidden");
    investorFields.classList.add("hidden");

    if (role === "founder") {
      founderFields.classList.remove("hidden");
    } else if (role === "investor") {
      investorFields.classList.remove("hidden");
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const role = roleSelect.value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Just simulating account creation
    console.log(`Creating ${role} account for ${name} (${email})`);

    successMsg.style.display = "block";
    setTimeout(() => {
      window.location.href = "/dashboard.html"; // redirect simulation
    }, 2000);
  });
});



 