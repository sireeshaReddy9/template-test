const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');


// Get Quotes from api
let apiQuotes=[];

// show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

// Hide loading
function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}

// show newQuote
function newQuote(){
    loading();
    // pick a random quote from apiQuotes array
    const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank and replace it with unknown
    if(!quote.author){
        authorText.textContent='unknown';
    }else{
        authorText.textContent=quote.author;
        quoteText.textContent=quote.text; 
    }
    if(quote.text.length>50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // set Quote,Hide Loader
    quoteText.textContent=quote.text;
    complete();
}


async function getQuotes() {
    loading();
    const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response=await fetch(apiUrl);
        apiQuotes=await response.json();
        newQuote();
    }
    catch(error){

    }
}

//Tweet Quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote.textContent}-${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//on Load
getQuotes();
