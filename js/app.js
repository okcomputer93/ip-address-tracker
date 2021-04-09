const searchForm = document.querySelector("#search");
const searchInput = searchForm.querySelector(".search__input");
const searchBox = searchForm.querySelector(".search__box");

const ipAddressInfo = document.querySelector(".info__content--ip");
const locationInfo = document.querySelector(".info__content--location");
const timeZoneInfo = document.querySelector(".info__content--timezone");
const ispInfo = document.querySelector(".info__content--isp");

const mymap = L.map("map").setView([40.866667, 34.566667], 16);
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

searchForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    removeError();
    const ipAddress = e.target.querySelector(".search__input").value;
    if (!validateIpAddress(ipAddress)) return;
    newIpSearch(ipAddress);
});

//TODO: Refactor all this document to object?
//TODO: Change map marker style

const printError = (error) => {
    searchInput.classList.add("search__input--error");
    const errorElement = `
    <p class="search__error">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="search__icon"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
            />
        </svg>
        ${error}
    </p>`;
    searchBox.insertAdjacentHTML("afterend", errorElement);
};

const removeError = () => {
    searchInput.classList.remove("search__input--error");
    const errorMessage = document.querySelector(".search__error");
    if (errorMessage) errorMessage.remove();
};

searchInput.addEventListener("focus", () => {
    removeError();
});

const fetchData = async (ipAddress) => {
    try {
        const response = await fetch(
            `https://geo.ipify.org/api/v1?apiKey=at_0z40R5hMgN7ejpYAMajXJhL1bp4Uo&ipAddress=${ipAddress}`
        );
        const data = await response.json();
        if (!response.ok)
            throw new Error("There was an error, please try again later");
        return data;
    } catch (error) {
        printError(error);
    }
};

const updateMarker = (lat, lng) => {
    if (marker) mymap.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(mymap);
    mymap.flyTo([lat, lng], 16);
};

const updateSearchInfo = (data) => {
    const { ip, location, isp } = data;
    const { city, region, postalCode } = location;
    ipAddressInfo.textContent = ip;
    locationInfo.textContent = `${city}, ${region} ${postalCode}`;
    ispInfo.textContent = isp;
};

const newIpSearch = async (ipAddress) => {
    const data = await fetchData(ipAddress);
    updateSearchInfo(data);
    const { lat, lng } = data.location;
    updateMarker(lat, lng);
};

const validateIpAddress = (ipAddress) => {
    if (!ipAddress) {
        printError("Please provide an IP address");
        return false;
    }
    const ipValidation = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/gm.test(
        ipAddress
    );
    if (!ipValidation) {
        printError("Please provide a valid IPv4 or IPv6 address");
        return false;
    }
    return true;
};

newIpSearch("");
