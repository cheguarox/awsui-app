const baseUrl = 'http://localhost:5000/books'

export async function getBooks() {
    const response = await fetch(`${baseUrl}?_expand=author`);
    const books = await response.json();
    return books;
}

export function deleteBook(id) {

    return fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
}

export function createBook(book) {

    return fetch(baseUrl, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(book)
    }).then(res => res.json())

}

export function getBook(id) {

    return fetch(`${baseUrl}/${id}`)
    .then(res => res.json())
}

export function updateBook(book) {

    return fetch(`${baseUrl}/${book.id}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(book)
    }).then(res => res.json())
}

export function getBooksByAuthor(authorId) {

    return fetch(`${baseUrl}?authorId=${authorId}&_expand=author`)
    .then(res => res.json())

}
