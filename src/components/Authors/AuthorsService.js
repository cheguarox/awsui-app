const baseUrl = 'http://localhost:5000/authors'

export async function getAuthors() {
    const response = await fetch(baseUrl);
    const authors = await response.json();
    return authors;
}

export function deleteAuthor(id) {

    return fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
}

export function createAuthor(author) {

    return fetch(baseUrl, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(author)
    }).then(res => res.json())

}

export function getAuthor(id) {

    return fetch(`${baseUrl}/${id}`)
    .then(res => res.json())
}

export function updateAuthor(author) {

    return fetch(`${baseUrl}/${author.id}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(author)
    }).then(res => res.json())
}
