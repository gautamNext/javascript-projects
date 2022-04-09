// Import stylesheets
import "./style.css";
// https://www.algoexpert.io/api/testimonials?limit=2&after=55
const API_BASE_URL = "https://www.algoexpert.io/api/testimonials";

const testimonialContainer = document.getElementById("testimonial-container");
let afterID = null;

function handleScroll() {
  const bottomHeightLeftToScroll =
    this.scrollHeight - (this.clientHeight + this.scrollTop);
  if (bottomHeightLeftToScroll === 0) {
    fetchTestimonials();
  }
}

testimonialContainer.addEventListener("scroll", handleScroll);

function createTestimonialNode(message, id) {
  const testimonialNode = document.createElement("p");
  testimonialNode.setAttribute("id", id);
  testimonialNode.setAttribute("class", "testimonial");
  testimonialNode.innerText = message;

  return testimonialNode;
}

function updateTestimonialsInDOM(testimonials) {
  var fragment = document.createDocumentFragment();
  testimonials.forEach(({ id, message }) => {
    fragment.appendChild(createTestimonialNode(message, id));
  });
  testimonialContainer.appendChild(fragment);
}

function createTestimonialUrl(limit) {
  const url = new URL(API_BASE_URL);
  url.searchParams.set("limit", limit);

  if (afterID !== null) {
    url.searchParams.set("after", afterID);
  }

  return url;
}

function fetchNextTestimonialSet(limit = 5) {
  let hasNext = true;
  let readyToMakeNextCall = true;

  return function () {
    if (!hasNext || !readyToMakeNextCall) {
      return;
    }

    readyToMakeNextCall = false;
    const url = createTestimonialUrl(limit);
    fetch(url)
      .then((res) => res.json())
      .then(({ testimonials, hasNext }) => {
        hasNext = hasNext;
        if (testimonials.length) {
          afterID = testimonials[testimonials.length - 1].id;
          updateTestimonialsInDOM(testimonials);
        }

        if (hasNext) {
          readyToMakeNextCall = true;
        } else {
          testimonialContainer.removeEventListener("scroll", handleScroll);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

const fetchTestimonials = fetchNextTestimonialSet(5);

fetchTestimonials();
