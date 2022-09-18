const searchResults = document.getElementById('searchResults');
const searchFound = document.getElementById('searchFound');

// load data from api 
const loadBooksInfo = () => {
    const searchInput = document.getElementById('searchInput');
    fetch(`https://openlibrary.org/search.json?q=${searchInput.value}`)
        .then(res => res.json())
        .then(data => getBooksInfo(data))
    searchInput.value = '';
    searchFound.textContent = '';
    searchResults.textContent = '';
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
                <p class=""><b>Author name:</b> ${element?.author_name}</p>
                <p class="card-text">First published: Year ${element.first_publish_year ? element.first_publish_year : 'not found'}</p>
                <p class="card-text">Published Date: ${element.publish_date ? element.publish_date : 'not found'}</p>
            </div>
        </div>
                 `;
        searchResults.appendChild(div);
    });
}

