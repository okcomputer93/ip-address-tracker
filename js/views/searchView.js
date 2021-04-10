class SearchView {
    _parentElement = document.querySelector("#search");
    _errorClassList = "search__input--error";

    _searchInput = document.querySelector(".search__input");
    _searchBox = document.querySelector(".search__box");

    getQuery() {
        const query = this._searchInput.value;
        return query;
    }

    _clearInput() {
        this._searchInput.value = "";
    }

    addRenderHandler(handler) {
        this._parentElement.addEventListener("submit", handler);
        this._searchInput.addEventListener("focus", this.clearError.bind(this));
    }

    renderError(message) {
        this._searchInput.classList.add(this._errorClassList);
        const markup = `
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
            ${message}
        </p>`;
        this._searchBox.insertAdjacentHTML("afterend", markup);
    }

    clearError() {
        this._searchInput.classList.remove(this._errorClassList);
        // Because re render on every error event
        const errorMessage = document.querySelector(".search__error");
        if (errorMessage) errorMessage.remove();
    }
}

export default new SearchView();
