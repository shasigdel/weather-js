import { API_KEY } from "./config.js";

// Selectors
const form = document.querySelector('.top-banner form');
const input = document.querySelector('.top-banner input[type="text"]');
const msg = document.querySelector('.top-banner .msg');
const citiesList = document.querySelector('.cities');

// API Settings (Replace with your actual API key)
const apiKey = API_KEY; 
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Event Listener for Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputVal = input.value;

    // Basic Input Validation
    if (inputVal.trim() === '') {
        msg.textContent = "Please enter a city name";
        return;
    }

    // Clear previous results
    citiesList.innerHTML = ''; 
    msg.textContent = ""; 

    try {
        const response = await fetch(
            `${apiBaseUrl}?q=${inputVal}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            } else {
                throw new Error('Network response was not ok');
            }
        }

        const data = await response.json();

        const li = document.createElement('li');
        li.classList.add('city');
        const markup = `
            <h2 class="city-name" data-name="${data.name},${data.sys.country}">
                <span>${data.name}</span>
                <sup>${data.sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(data.main.temp)}<sup>°C</sup></div>
            <figure>
                <img class="city-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
                <figcaption>${data.weather[0].description}</figcaption>
            </figure>
        `;
        li.innerHTML = markup;
        citiesList.appendChild(li);

    } catch (error) {
        msg.textContent = error.message; 
    }
});