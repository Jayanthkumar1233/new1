// Array of 30 quotes
const quoteData = [
    { quote: "The only thing necessary for the triumph of evil is for good men to do nothing.", author: "Edmund Burke" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { quote: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
    { quote: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { quote: "Well done is better than well said.", author: "Benjamin Franklin" },
    { quote: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
    { quote: "It is never too late to be what you might have been.", author: "George Eliot" },
    { quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
    { quote: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
    { quote: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", author: "Helen Keller" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
    { quote: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
    { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { quote: "It is our choices, Harry, that show what we truly are, far more than our abilities.", author: "J.K. Rowling" },
    { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { quote: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.", author: "Mark Twain" },
    { quote: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison" },
    { quote: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { quote: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
    { quote: "Change your thoughts and you change your world.", author: "Norman Vincent Peale" },
    { quote: "The greatest wealth is to live content with little.", author: "Plato" },
    { quote: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { quote: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { quote: "With the new day comes new strength and new thoughts.", author: "Eleanor Roosevelt" },
    { quote: "Keep your eyes on the stars, and your feet on the ground.", author: "Theodore Roosevelt" }
];

// DOM elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('next-quote-btn');
const saveQuoteBtn = document.getElementById('save-quote-btn');
const saveIcon = document.getElementById('save-icon');
const saveText = document.getElementById('save-text');
const favoritesBtn = document.getElementById('favorites-btn');
const favoritesSidebar = document.getElementById('favorites-sidebar');
const closeFavoritesBtn = document.getElementById('close-favorites-btn');
const favoritesList = document.getElementById('favorites-list');
const noFavoritesMsg = document.getElementById('no-favorites-msg');
const dateText = document.getElementById('current-date');
const mainHeading = document.querySelector('.main-heading');
const dotContainer = document.getElementById('dot-container');

let currentQuote = {};
let favorites = [];

// Helper function to get a random quote
const getRandomQuote = () => {
    let newQuote;
    do {
        newQuote = quoteData[Math.floor(Math.random() * quoteData.length)];
    } while (newQuote === currentQuote);
    return newQuote;
};

// Helper function to render the current quote on the page
const renderQuote = (quote) => {
    currentQuote = quote;
    quoteText.textContent = `"${quote.quote}"`;
    quoteAuthor.textContent = `- ${quote.author}`;
    updateSaveButtonState();
};

// Helper function to check if the current quote is in favorites
const isQuoteFavorite = (quote) => {
    return favorites.some(fav => fav.quote === quote.quote && fav.author === quote.author);
};

// Function to update the save button's state (text and icon)
const updateSaveButtonState = () => {
    if (isQuoteFavorite(currentQuote)) {
        saveQuoteBtn.classList.add('saved');
        saveIcon.textContent = '❤'; // Filled heart
        saveText.textContent = 'Saved';
    } else {
        saveQuoteBtn.classList.remove('saved');
        saveIcon.textContent = '♡'; // Outline heart
        saveText.textContent = 'Save Quote';
    }
};

// Function to save favorites to localStorage
const saveFavoritesToLocalStorage = () => {
    try {
        localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
    } catch (error) {
        console.error("Failed to save favorites to localStorage:", error);
    }
};

// Function to render the favorites list
const renderFavorites = () => {
    favoritesList.innerHTML = '';
    if (favorites.length === 0) {
        noFavoritesMsg.style.display = 'block';
    } else {
        noFavoritesMsg.style.display = 'none';
        favorites.forEach(fav => {
            const listItem = document.createElement('li');
            listItem.className = 'favorite-quote-item';
            listItem.innerHTML = `
                <p>"${fav.quote}"</p>
                <cite>- ${fav.author}</cite>
                <button class="remove-btn">Remove</button>
            `;
            // Add a click listener to the remove button
            const removeBtn = listItem.querySelector('.remove-btn');
            removeBtn.addEventListener('click', () => {
                handleRemoveFavorite(fav);
            });
            favoritesList.appendChild(listItem);
        });
    }
};

// --- Animation functionality ---
// Function to create the grid of dots for the animation
const createDots = () => {
    dotContainer.innerHTML = ''; // Clear any existing dots
    const gridRows = 13;
    const gridCols = 13;
    for (let i = 0; i < gridRows * gridCols; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dotContainer.appendChild(dot);
    }
};

// Function to run the dot animation
const runDotAnimation = () => {
    const options = {
        grid: [13, 13],
        from: 'center',
    };
    
    // Create a new timeline instance
    anime.timeline()
        .add({
            targets: '.dot',
            scale: anime.stagger([1.1, 0.75], options),
            ease: 'inOutQuad',
            duration: 1000,
            delay: anime.stagger(200, options)
        })
        .add({
            targets: '.dot',
            scale: 1,
            duration: 1000,
            delay: anime.stagger(200, options),
            complete: () => {
                // After the animation, get a new quote
                const newQuote = getRandomQuote();
                renderQuote(newQuote);
            }
        }, "-=1000"); // Start the second animation 1 second before the first one ends
};


// --- Event Handlers ---

// Handle click for "New Quote" button
newQuoteBtn.addEventListener('click', () => {
    // Run the animation when the button is clicked
    runDotAnimation();
});

// Handle click for "Save Quote" button
saveQuoteBtn.addEventListener('click', () => {
    console.log("Save button clicked! Checking for existing quote...");

    if (isQuoteFavorite(currentQuote)) {
        // Remove the quote from favorites
        console.log("Quote already saved. Removing from favorites.");
        favorites = favorites.filter(fav => fav.quote !== currentQuote.quote || fav.author !== currentQuote.author);
    } else {
        // Add the quote to favorites
        console.log("Quote not saved. Adding to favorites.");
        favorites.push(currentQuote);
    }
    updateSaveButtonState();
    saveFavoritesToLocalStorage();
    renderFavorites();
});

// Handle click for "Show Favorites" button (now a heart icon)
favoritesBtn.addEventListener('click', () => {
    favoritesSidebar.classList.add('open');
});

// Handle click for "Close Favorites" button
closeFavoritesBtn.addEventListener('click', () => {
    favoritesSidebar.classList.remove('open');
});

// Handle removing a favorite from the list
const handleRemoveFavorite = (quoteToRemove) => {
    favorites = favorites.filter(fav => fav.quote !== quoteToRemove.quote || fav.author !== quoteToRemove.author);
    saveFavoritesToLocalStorage();
    renderFavorites();
    updateSaveButtonState(); // Update the main save button if the current quote was removed
};

// --- Date functionality ---
const displayCurrentDate = () => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    dateText.textContent = formattedDate;
};

// --- Color change functionality ---
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Change the main heading color
const changeTitleColor = () => {
    mainHeading.style.color = getRandomColor();
};

// --- Initial Setup ---
const loadFavoritesFromLocalStorage = () => {
    try {
        const savedFavorites = JSON.parse(localStorage.getItem('favoriteQuotes'));
        if (savedFavorites) {
            favorites = savedFavorites;
        }
    } catch (error) {
        console.error("Failed to load favorites from localStorage:", error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadFavoritesFromLocalStorage();
    renderQuote(getRandomQuote());
    renderFavorites();
    displayCurrentDate();
    createDots(); // Create the dots on page load
    // Start the color change interval for the title
    setInterval(changeTitleColor, 2000);
});
