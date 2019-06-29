function createDocument(data) {
    return fetch("https://markdown-api-test.herokuapp.com/v1/documents",
    {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(data => {
        return data.json();
    }).catch(console.log);
}

function getDocuments() {

    return fetch("https://markdown-api-test.herokuapp.com/v1/documents").then(data => {
        return data.json();
    }).catch(console.log);
}

function updateDocument(_id, data) {
    return fetch("https://markdown-api-test.herokuapp.com/v1/documents/" + _id,
    {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(data => {
        return data.json();
    }).catch(console.log);
}

function deleteDocument(_id) {
    return fetch("https://markdown-api-test.herokuapp.com/v1/documents/" + _id,
    {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(data => {
        return data.json();
    }).catch(console.log);
}

export {
    createDocument,
    getDocuments,
    updateDocument,
    deleteDocument
};
