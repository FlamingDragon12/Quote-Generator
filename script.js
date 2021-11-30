const container = document.getElementById('container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//add loading effects
function loading() {
	loader.hidden =  false;
	container.hidden = true;
}

//remove loading effects
function complete(){
	loader.hidden =  true;
	container.hidden = false;
}
// create a new quote 
function newQuote() {
	loading();
	const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)]
	// console.log(qoute);
	if (!quote.author) {
		authorText.textContent = 'Unknown';
	}
	else{
		authorText.textContent = quote.author;
	}
	if (quote.text.length > 120) {
		quoteText.classList.add('long-quote');
	}
	else {
		quoteText.classList.remove('long-quote');
	}
	quoteText.textContent = quote.text;
	complete();
}

// generate code and fetch from api
async function getQuotes() {
	loading();
	const apiUrl = 'https://type.fit/api/quotes'
	try{
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
		// console.log(apiQuotes);
	}
	catch(error){

	}
}

function tweetQuote(){
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
// loading();