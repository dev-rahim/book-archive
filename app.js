const searchResults = document.getElementById('searchResults');
const searchFound = document.getElementById('searchFound');

// Get the input field
const searchInput = document.getElementById("searchInput");

// Execute a function when the user presses a key on the keyboard
searchInput.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("searchButton").click();
    }
});

// load data from api 
const loadBooksInfo = () => {

    // const searchInput = document.getElementById('searchInput');

    if (searchInput.value) {
        fetch(`https://openlibrary.org/search.json?q=${searchInput.value}`)
            .then(res => res.json())
            .then(data => getBooksInfo(data))
        searchFound.textContent = '';
        searchResults.textContent = '';
    } else {
        searchFound.innerText = `Invalid input`;
    }

    searchInput.value = '';
}


// get books info 
const getBooksInfo = (data) => {

    const items = data.docs;
    searchFound.innerText = `we found ${data.numFound} results`;

    items?.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div style="height: 500px;" class="card h-100">
            <img height="555px" width="396px" class="card-img-top" src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg"/>
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class=""> <span class="fw-bold">Author name:</span> ${element?.author_name}</p>
                <p class="card-text "><span class="fw-bold">First published: Year</span> ${element.first_publish_year ? element.first_publish_year : 'not found'}</p>
                <p class="card-text "><span class="fw-bold">Published Date:</span> ${element.publish_date ? element.publish_date : 'not found'}</p>
            </div>
        </div>
                 `;
        searchResults.appendChild(div);
    });
}

