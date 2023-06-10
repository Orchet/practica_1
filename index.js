const express = require('express');

const app = express();

const engine = require('ejs-locals');

app.set('views', __dirname + '/views');

/* INCLUDE BODY PARSER AND URL ENCODED */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const data = {
    data: [
        [
            "1",
            "Urdesa Norte",
            "Leonardo Larrea",
            "In place"
        ],
        [
            "2",
            "Sauces",
            "Marco Calderon",
            "Atencion Normal"
        ]
    ]
};

/**
 * Codigo usando pug como render engine for html templates.
 */
// app.set('view engine', 'pug');

// app.get('/', (request, response) => {
//     const name = request.query.name;
//     console.log('Name:', name);
//     response.render('pug/index', { name })
// });

/**
 * Codigo usando ejs como render engine for html templates.
 */

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    response.send('Server is running!')
})
//=========================================================

app.get('/admin', (request, response) => {
    const name = request.query.name;
    console.log('Name:', name);
    response.render('ejs/admin/index', { name })
});

app.get('/admin/data', (request, response) => {

    response.json(data)
})

app.post('/admin/data', (request, response) => {
    const item = request.body.item;

    console.log(item);
    data.data.push(item);
    response.json({ code: 'Ok', message: 'Success!'});
});

app.put('/admin/data/:id', (request, response) => {
    const id = request.params.id;
    const item = request.body.item;

    const [address, name, extraInfo] = item;

    console.log("id:", id);
    console.log("item:", item);
    
    const idx = data.data.findIndex(([idElem]) => id == idElem);

    if (idx == -1) {
        return response.json({ code: 'Error', message: 'Not Found'});
    }

    data.data[idx] = [id, address, name, extraInfo];

    response.json({ code: 'Ok', message: 'Success!'});
});

app.get('/admin/data/query', (request, response) => {
    const location = request.query.location;

    console.log("location", location);

    const elem = data.data.find(([idElem, locationElem]) => locationElem == location);

    response.json(elem);
});


app.get('/client', (request, response) => {
    response.render('ejs/client/index')
});

app.listen(3000, () => {
    console.log('Ready in port 3000!')
});