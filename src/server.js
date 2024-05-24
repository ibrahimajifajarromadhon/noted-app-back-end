const Hapi = require('@hapi/hapi');
const routes = require('./routes');

//method untuk membuat server
const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Accept', 'Content-Type'], // Allow specific headers
                additionalHeaders: ['X-Requested-With'], // Allow additional headers
            },
        },
    });

    //method untuk menambahkan route
    server.route(routes);

    //method untuk menjalankan server
    await server.start();
    console.log('Server running on port', server.info.port);
}

//method untuk menjalankan server
init();

