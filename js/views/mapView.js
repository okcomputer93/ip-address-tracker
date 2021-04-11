class mapView {
    _map = L.map("map");
    _marker;

    constructor() {
        this._map.setView([40.866667, 34.566667], 16);
        L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2tjb21wdXRlciIsImEiOiJja244ZzhjemMwOTVqMm9waWdoY3QwNGwwIn0.3prYNoEeSweSCDKehE9Sig",
            {
                attribution:
                    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: "mapbox/streets-v11",
                tileSize: 512,
                zoomOffset: -1,
                zoom: {
                    position: "bottomright",
                },
                accessToken:
                    "pk.eyJ1Ijoib2tjb21wdXRlciIsImEiOiJja244ZzhjemMwOTVqMm9waWdoY3QwNGwwIn0.3prYNoEeSweSCDKehE9Sig",
            }
        ).addTo(this._map);
        this._map.zoomControl.setPosition("bottomright");
    }

    updateMarker(lat, lng) {
        if (this._marker) this._map.removeLayer(this._marker);
        this._marker = L.marker([lat, lng]).addTo(this._map);
        this._map.flyTo([lat, lng], 16);
    }
}

export default new mapView();
