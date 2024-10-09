// URL till API:et
// Här definierar vi adressen till API:et där vi hämtar information om städer.
const apiUrl = 'https://avancera.app/cities/';

// Hämta referenser till DOM-element
// Vi hämtar olika element från HTML-dokumentet så att vi kan arbeta med dem i JavaScript.
const cityList = document.getElementById('cityList'); // Listan där städer kommer att visas
const addCityForm = document.getElementById('addCityForm'); // Formuläret för att lägga till en ny stad
const cityNameInput = document.getElementById('cityName'); // Inmatningsfält för stadens namn
const cityCountryInput = document.getElementById('cityCountry'); // Inmatningsfält för land
const cityPopulationInput = document.getElementById('cityPopulation'); // Inmatningsfält för befolkning

/**
 * Funktion för att hämta och visa städer från API:et
 */
async function fetchCities() {
    try {
        // Vi skickar en GET-förfrågan till API:et för att hämta städer.
        const response = await fetch(apiUrl);

        // Om svaret inte är okej (t.ex. 404 eller 500), kastar vi ett fel.
        if (!response.ok) {
            throw new Error(
                `Något gick fel med att hämta städer: ${response.status} ${response.statusText}`
            );
        }

        // Vi konverterar svaret från API:et till JSON-format.
        const cities = await response.json();

        // Vi rensar listan innan vi lägger till nya städer.
        cityList.innerHTML = '';

        // Vi går igenom varje stad i den hämtade datan.
        cities.forEach((city) => {
            // Skapa en listpunkt för varje stad.
            const li = document.createElement('li');
            li.className = 'city-item'; // Lägger till en CSS-klass för styling
            li.textContent = `${city.name}, Befolkning: ${city.population}`; // Sätter textinnehållet till stadens namn och befolkning

            // Skapa en knapp för att ta bort staden.
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Ta bort'; // Knappens text
            deleteBtn.className = 'btn btn-delete'; // Lägger till en CSS-klass för styling

            // När knappen klickas, anropa funktionen deleteCity med stadens ID.
            deleteBtn.addEventListener('click', () => deleteCity(city.id));

            // Lägg till knappen i listpunkten.
            li.appendChild(deleteBtn);
            // Lägg till listpunkten i listan av städer.
            cityList.appendChild(li);
        });
    } catch (error) {
        // Om något går fel, logga felet i konsolen och visa ett meddelande till användaren.
        console.error('Error:', error);
        alert(`Kunde inte hämta städer: ${error.message}`);
    }
}
//funktion för att ta bort en stad
async function deleteCity(id) {
    //Fråga användaren om de är säkra på att de vill ta bort staden
    if (!confirm('Är du säker på att du vill ta bort staden')) {
        return;
    }
    try {
        const response = await fetch(`${apiUrl}${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Gick ej att ta bort staden');
        }
        fetchCities();
    } catch (error) {
        console.error('Error', error);
        alert('Kunde ej ta bort staden');
    }
}

//När sidan laddas så vill jag hämta och visa städer
//Nedan kod kommer att köras när hela dokumentet har laddats
window.addEventListener('DOMContentLoaded', fetchCities);
