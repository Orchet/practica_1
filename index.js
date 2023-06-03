const { response } = require('express');
const express = require('express');
const app= express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views/pugs');


app.get('/', (request, response) => {
    const name = request.query.name;
    console.log('Name:', name);
    response.render('index', {name})
});

app.listen(3000, () => {
    console.log('Ready in port 3000');
}
);

