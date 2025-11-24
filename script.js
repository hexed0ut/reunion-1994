const foodSelect = document.getElementById("food");
const nonvegOptions = document.getElementById("nonveg-options");
const form = document.getElementById("details-form");
const successMsg = document.getElementById("success-msg");
const loading = document.getElementById("loading");
const addAnotherBtn = document.getElementById("add-another");
const submitBtn = form.querySelector('button[type="submit"]');

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby1PyGs_JwOZQgGZNAcqF7Hr_wjddM09s37NO5TS8clDnhl2sv6GS0S12FcFQHp1RSG/exec";

foodSelect.addEventListener("change", () => {
  if (foodSelect.value === "nonveg") {
    nonvegOptions.classList.remove("hidden");
  } else {
    nonvegOptions.classList.add("hidden");
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const foodValue = foodSelect.value;
  const nonvegChoiceValue = document.getElementById("nv-choice").value;

  if (foodValue === "nonveg" && nonvegChoiceValue.trim() === "") {
    alert("Please select your Non-Veg choice.");
    return;
  }

  const data = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    food: document.getElementById("food").value,
    nonvegChoice: document.getElementById("nv-choice").value || "",
    comments: document.getElementById("comments").value
  };

  loading.classList.remove("hidden");
  submitBtn.style.display = 'none';
  await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  
  loading.classList.add("hidden");
  successMsg.classList.remove("hidden");
  addAnotherBtn.classList.remove("hidden");

  form.reset();
  nonvegOptions.classList.add("hidden");

  setTimeout(() => {
    successMsg.classList.add("hidden");
  }, 2000);
});

addAnotherBtn.addEventListener("click", () => {
  successMsg.classList.add("hidden");
  addAnotherBtn.classList.add("hidden");
  submitBtn.style.display = 'inline-block';
});






