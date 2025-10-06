const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const copyBtn = document.getElementById("copyBtn");
const tweetBtn = document.getElementById("tweetBtn");

let quotesData = [];

// Load local quotes from quotes.json
async function loadQuotes() {
  try {
    const response = await fetch("quotes.json");
    if (!response.ok) throw new Error("Failed to fetch local quotes");
    quotesData = await response.json();
    showRandomQuote();
  } catch (error) {
    quoteText.textContent = "⚠️ Failed to load quotes. Please try again!";
    quoteAuthor.textContent = "";
  }
}

// Show a random quote
function showRandomQuote() {
  if (quotesData.length === 0) return;

  const randomIndex = Math.floor(Math.random() * quotesData.length);
  const quote = quotesData[randomIndex];

  // Fade animation
  quoteText.classList.remove("fade");
  void quoteText.offsetWidth;
  quoteText.classList.add("fade");

  quoteText.textContent = `"${quote.text}"`;
  quoteAuthor.textContent = quote.author ? `— ${quote.author}` : "— Unknown";
}

// Button events
newQuoteBtn.addEventListener("click", showRandomQuote);

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(
    `${quoteText.textContent} ${quoteAuthor.textContent}`
  );
  alert("✅ Quote copied to clipboard!");
});

tweetBtn.addEventListener("click", () => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${quoteText.textContent} ${quoteAuthor.textContent}`
  )}`;
  window.open(tweetUrl, "_blank");
});

// Load quotes on page load
loadQuotes();
