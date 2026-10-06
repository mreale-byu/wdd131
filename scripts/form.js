const products = [
  {
    id: "fc-1888",
    name: "Flux Capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "Power Laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "Time Circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "Low Voltage Reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "Warp Equalizer",
    averagerating: 5.0
  }
];

const SUBMISSION_KEY = "mySubmissions";

// Reads the total of submissions. Anything missing or unparsable counts as zero.
const getSubmissionCount = () => Number(localStorage.getItem(SUBMISSION_KEY)) || 0;

// Adds one to the stored total and hands back the new value.
function addSubmission() {
  const total = getSubmissionCount() + 1;
  localStorage.setItem(SUBMISSION_KEY, total);
  return total;
}

// This only fires once the browser is satisfied with the form.
const reviewForm = document.querySelector(".review");

if (reviewForm) {
  reviewForm.addEventListener("submit", () => {
    addSubmission();
  });
}

// True only for an id that is actually in the products array. A missing or
// empty argument is not in there either, so both cases answer false.
function productExists(product) {
  return products.some((item) => item.id === product);
}

// This sanity check was NOT asked in the assignment: thank you card is only meant to 
// be reached by posting the form, so if it was opened with no product, or one that does
// not exist, I send the visitor to the form instead.
const thanksCard = document.querySelector(".thanks");

if (thanksCard) {
  const requested = new URLSearchParams(window.location.search).get("product");

  if (!productExists(requested)) {
    // Redirect to the form if the product is invalid or absent.
    window.location.replace("form.html");
  }
}

// Show the running total on the thank you card. Only review.html uses this.
const countOutput = document.querySelector("#submission-count");

if (countOutput) {
  countOutput.textContent = getSubmissionCount();
}

// Fill the product dropdown.
const productSelect = document.querySelector("#product");

if (productSelect) {
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
}
