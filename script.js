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

/**
 * Funktion för att lägga till en ny stad via API:et
 */
async function addCity(name, population) {
    try {
        // Skapa ett nytt objekt för den stad som ska läggas till.
        const newCity = {
            name: name,
            population: population
        };

        // Skicka en POST-förfrågan till API:et med stadens data.
        const response = await fetch(apiUrl, {
            method: 'POST', // Vi använder POST-metoden för att skapa en ny stad
            headers: {
                'Content-Type': 'application/json' // Vi säger att vi skickar JSON-data
            },
            body: JSON.stringify(newCity) // Konvertera objektet till JSON-format
        });

        // Om svaret inte är okej, kasta ett fel.
        if (!response.ok) {
            const errorMessage = await response.text(); // Läs felmeddelandet från servern
            throw new Error(
                `Något gick fel med att lägga till staden: ${response.status} ${response.statusText} - ${errorMessage}`
            );
        }

        // Efter att staden har lagts till, hämta och visa de aktuella städerna.
        fetchCities();
        // Rensa formuläret så att användaren kan lägga till en ny stad.
        addCityForm.reset();
    } catch (error) {
        // Logga felet och visa ett meddelande till användaren.
        console.error('Error:', error);
        alert(`Kunde inte lägga till staden: ${error.message}`);
    }
}

/**
 * Funktion för att ta bort en stad via API:et
 */
async function deleteCity(id) {
    // Fråga användaren om de är säkra på att de vill ta bort staden.
    if (!confirm('Är du säker på att du vill ta bort denna stad?')) {
        return; // Om användaren avbryter, gör ingenting
    }

    try {
        // Skicka en DELETE-förfrågan till API:et med stadens ID.
        const response = await fetch(`${apiUrl}${id}`, {
            method: 'DELETE' // Vi använder DELETE-metoden för att ta bort staden
        });

        // Om svaret inte är okej, kasta ett fel.
        if (!response.ok) {
            throw new Error(
                `Något gick fel med att ta bort staden: ${response.status} ${response.statusText}`
            );
        }
        // Hämta och visa de aktuella städerna efter att en stad har tagits bort.
        fetchCities();
    } catch (error) {
        // Logga felet och visa ett meddelande till användaren.
        console.error('Error:', error);
        alert(`Kunde inte ta bort staden: ${error.message}`);
    }
}

/**
 * Händelsehanterare för formulärets inskickning
 */
addCityForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Förhindra att sidan laddas om när formuläret skickas
    const cityName = cityNameInput.value.trim(); // Hämta och trimma stadens namn
    const cityPopulation = cityPopulationInput.value.trim(); // Hämta och trimma befolkningen

    // Kontrollera att båda fälten är ifyllda
    if (cityName !== '' && cityPopulation !== '') {
        addCity(cityName, parseInt(cityPopulation)); // Lägg till staden om fälten inte är tomma
    } else {
        alert('Vänligen fyll i alla fält.'); // Visa meddelande om fälten är tomma
    }
});

// När sidan laddas, hämta och visa städer
// Denna kod kommer att köras när hela dokumentet har laddats.
window.addEventListener('DOMContentLoaded', fetchCities);
