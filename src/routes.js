const {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler} = require('./handler');

const routes = [
    //route untuk menambah catatan
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },

    //route untuk mendapatkan semua catatan
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },

    //route untuk mendapatkan catatan berdasarkan id
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },

    //route untuk mengubah catatan berdasarkan id
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },

    //route untuk menghapus catatan berdasarkan id
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    }
];

module.exports = routes;
