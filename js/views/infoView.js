class InfoView {
    _ipAddressInfo = document.querySelector(".info__content--ip");
    _locationInfo = document.querySelector(".info__content--location");
    _timeZoneInfo = document.querySelector(".info__content--timezone");
    _ispInfo = document.querySelector(".info__content--isp");

    renderSearch(data) {
        const { ip, location, isp } = data;
        const { city, region, postalCode } = location;
        this._ipAddressInfo.textContent = ip;
        this._locationInfo.textContent = `${city}, ${region} ${postalCode}`;
        this._timeZoneInfo = location.timezone;
        this._ispInfo.textContent = isp;
    }
}

export default new InfoView();