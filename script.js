
const fetchMethods = {
    xhr: fetchWithXHR,
    async: fetchWithAsyncAwait,
    promise: fetchWithPromises
};

document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('.btn').forEach(button => {
        const method = button.getAttribute('data-method');
        button.addEventListener('click', fetchMethods[method]);
    });
});

// Fetch with XMLHttpRequest
function fetchWithXHR() {
    const { lat, long } = getInputValues();
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            updateWeather(JSON.parse(xhr.responseText), 'XMLHttpRequest');
        }
    };
    xhr.open("GET", getUrl(lat, long));
    xhr.send();
}

// Fetch with async/await
async function fetchWithAsyncAwait() {
    const { lat, long } = getInputValues();
    try {
        const response = await fetch(getUrl(lat, long));
        const data = await response.json();
        updateWeather(data, 'Async/Await');
    } catch (error) {
        console.error(`Fetch Error: ${error}`);
    }
}

// Fetch with Promises
function fetchWithPromises() {
    const { lat, long } = getInputValues();
    fetch(getUrl(lat, long))
        .then(response => response.json())
        .then(data => updateWeather(data, 'Promises'))
        .catch(error => console.error(`Fetch Error: ${error}`));
}


function getInputValues() {
    const lat = document.getElementById("lat").value;
    const long = document.getElementById("long").value;
    return { lat, long };
}


function getUrl(lat, long) {
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,weathercode`;
}


function updateWeather({ current: { temperature_2m }}, method) {
    document.getElementById("temperature").innerText = `${temperature_2m} °C`;
    document.getElementById("method-used").innerText = method;
}
