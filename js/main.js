const authorName = document.querySelector("#author");
const quote = document.querySelector("#quote");
const getQuoteBtn = document.querySelector("#get-quote");
const loadingIndicator = document.querySelector("#loading-indicator");

const fetchQuote = async () => {
  try {
    loadingIndicator.style.display = "block";
      const response = await fetch("https://api.quotable.io/random");
      
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
      }
      
       anime({
         targets: loadingIndicator,
         opacity: [1, 0],
         easing: "easeInOutCubic",
         duration: 300,
       });

       anime({
         targets: quote,
         opacity: [0, 1],
         easing: "easeInOutCubic",
         duration: 1000,
       });

       anime({
         targets: authorName,
         opacity: [0, 1],
         easing: "easeInOutCubic",
         duration: 1000,
         delay: 100,
       });

      const data = await response.json();
        quote.textContent = data.content;
        authorName.textContent = data.author;
  } catch (error) {
       console.error("Error fetching quote:", error);
       loadingIndicator.style.display = "none";
       const errorMessage = document.createElement("p");
       errorMessage.textContent = "Failed to fetch quote. Try again.";
       errorMessage.classList.add("error-message"); 
       document.body.appendChild(errorMessage);
  }

};

getQuoteBtn.addEventListener("click", fetchQuote);
loadingIndicator.style.display = "none";
fetchQuote();
