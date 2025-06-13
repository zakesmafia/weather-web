// Add this function to your main.js
function getClothingSuggestion(temp, condition) {
  let suggestion = "";

  if (condition.includes("rain") || condition.includes("shower")) {
    suggestion += ", ☂️ umbrella, 🧥 Warm jacket, long pants ";
  }
  if (condition.includes("snow")) {
    suggestion += ", 🥾 warm boots,🧥 Heavy coat, gloves, scarf ";
  }
  if (condition.includes("sunny")) {
    suggestion += " 🕶️ sunglasses, 👕 Light clothes, 🩳shorts";
  }

  return suggestion;
}

// Update your getWeather function - replace the weatherHTML part with this:
async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const apiKey = "122b71bd4d6a418a98c73923251306";
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
    city
  )}&aqi=no`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p>${data.error.message}</p>`;
      return;
    }
    const clothingSuggestion = getClothingSuggestion(
      data.current.temp_c,
      data.current.condition.text.toLowerCase()
    );

    const weatherHTML = `
          <h2>${data.location.name}, ${data.location.country}</h2>
          <p><strong>${data.current.condition.text}</strong></p>
          <img src="https:${data.current.condition.icon}" alt="Weather icon" />
          <p>🌡️ Temperature: ${data.current.temp_c} °C</p>
          <p>💧 Humidity: ${data.current.humidity}%</p>
          <p>👔 clothing suggestion: ${clothingSuggestion}</p>
        `;

    document.getElementById("weatherResult").innerHTML = weatherHTML;
  } catch (error) {
    console.error("Fetch error:", error);
    document.getElementById(
      "weatherResult"
    ).innerHTML = `<p>Something went wrong. Try again.</p>`;
  }
}
