const loadBooksInfo = () => {
    const searchInput = document.getElementById('searchInput');
    fetch(`https://openlibrary.org/search.json?q=${searchInput.value}`)
        .then(res => res.json())
        .then(data => getBooksInfo(data))
    searchInput.value = '';
}
const getBooksInfo = (data) => {
    const items = data.docs;
    const searchResults = document.getElementById('searchResults');
    searchResults.textContent = '';
    const searchFound = document.getElementById('searchFound');
    searchFound.innerText = `we found ${data.numFound} results`;
    items?.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col-4');
        div.innerHTML = `
        <div style="height: 500px;" class="card">
        <img class="card-img-top" src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg"
            class="img-fluid" />
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class=""><b>Author name:</b> ${element?.author_name}</p>
            <p class="card-text">First published: Year ${element?.first_publish_year}</p>
            <p class="card-text">Published Date: ${element?.publish_date}</p>
        </div>
    </div>
                 `;
        searchResults.appendChild(div);
        // console.log(element.cover_i);
        // console.log(element.first_publish_year);
        // console.log(element.publish_date);
        // console.log(element.author_name[0], '&', element.author_name[1]);
        // console.log(element.title);
    });
}

