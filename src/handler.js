const {nanoid} = require('nanoid');
const notes = require('./notes');

//method untuk menambah catatan
const addNoteHandler = (request, h) => {
    //mendapatkan judul, tag, dan body dari request payload
    const { title, tags, body } = request.payload;

    //membuat id string acak dengan nanoid
    const id = nanoid(16);

    //mendapatkan tanggal saat ini
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    //membuat objek catatan baru
    const newNote = {id, title, tags, body, createdAt, updatedAt};

    //menambahkan catatan baru ke dalam array
    notes.push(newNote);

    //mengecek apakah catatan berhasil ditambahkan
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    //jika catatan berhasil ditambahkan, mengembalikan response
    if(isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    //jika catatan gagal ditambahkan, mengembalikan response
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
}

//method untuk mendapatkan semua catatan
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

//method untuk mendapatkan catatan berdasarkan id
const getNoteByIdHandler = (request, h) => {
    //mendapatkan id dari request params
    const {id} = request.params;

    //mencari catatan berdasarkan id
    const note = notes.filter((n) => n.id === id)[0];

    //jika catatan ditemukan, mengembalikan response
    if(note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    //jika catatan tidak ditemukan, mengembalikan response
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

//method untuk mengubah catatan berdasarkan id
const editNoteByIdHandler = (request, h) => {
    //mendapatkan id dari request params
    const {id} = request.params;

    //mendapatkan judul, tag, dan body dari request payload
    const {title, tags, body} = request.payload;

    //mendapatkan tanggal saat ini
    const updatedAt = new Date().toISOString();

    //mencari index dari catatan yang idnya sama dengan id yang dikirimkan
    const index = notes.findIndex((note) => note.id === id);

    //jika index tidak sama dengan -1, artinya catatan ditemukan
    if(index !== -1) {
        //mengubah catatan berdasarkan index
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diubah',
        });
        response.code(200);
        return response;
    }

    //jika catatan tidak ditemukan, mengembalikan response
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal diubah',
    });
    response.code(404);
    return response;
};

//method untuk menghapus catatan berdasarkan id
const deleteNoteByIdHandler = (request, h) => {

    //mendapatkan id dari request params
    const {id} = request.params;

    //mencari index dari catatan yang idnya sama dengan id yang dikirimkan
    const index = notes.findIndex((note) => note.id === id);

    //jika index tidak sama dengan -1, artinya catatan ditemukan
    if(index !== -1) {
        //menjalankan method splice untuk menghapus catatan berdasarkan index
        notes.splice(index, 1);

        //mengembalikan response
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    //jika catatan tidak ditemukan, mengembalikan response
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus',
    });
    response.code(404);
    return response;
}

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler
}
