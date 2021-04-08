const searchForm = document.querySelector("#search");
const mymap = L.map("map").setView([51.505, -0.09], 16);
let marker;

L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2tjb21wdXRlciIsImEiOiJja244ZzhjemMwOTVqMm9waWdoY3QwNGwwIn0.3prYNoEeSweSCDKehE9Sig",
    {
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
            "pk.eyJ1Ijoib2tjb21wdXRlciIsImEiOiJja244ZzhjemMwOTVqMm9waWdoY3QwNGwwIn0.3prYNoEeSweSCDKehE9Sig",
    }
).addTo(mymap);

// searchBtn.addEventListener("click", (e) => {
//     e.preventDefault();

// });

searchForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const ipAddress = e.target.querySelector(".search__input").value;
    //TODO: Check for IPv4 and IPv6 correct format
    if (!ipAddress) return;
    //TODO: Implement try catch
    //TODO: Implement Catch error
    //TODO: Implement DOM notification for errors
    const response = await fetch(
        `https://geo.ipify.org/api/v1?apiKey=at_0z40R5hMgN7ejpYAMajXJhL1bp4Uo&ipAddress=${ipAddress}`
    );
    const data = await response.json();
    const { lat, lng } = data.location;
    //TODO: Add loading animation
    //TODO: Update DOM info with data
    if (marker) mymap.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(mymap);
    mymap.flyTo([lat, lng], 16);
});

//TODO: Refactor all this document to object?
