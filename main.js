async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const apiKey = "61b577f1c6c348938c175549252805";
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

    const weatherHTML = `
          <h2>${data.location.name}, ${data.location.country}</h2>
          <p><strong>${data.current.condition.text}</strong></p>
          <img src="https:${data.current.condition.icon}" alt="Weather icon" />
          <p>🌡️ Temperature: ${data.current.temp_c} °C</p>
          <p>💧 Humidity: ${data.current.humidity}%</p>
        
        `;

    document.getElementById("weatherResult").innerHTML = weatherHTML;
  } catch (error) {
    console.error("Fetch error:", error);
    document.getElementById(
      "weatherResult"
    ).innerHTML = `<p>Something went wrong. Try again.</p>`;
  }
}
