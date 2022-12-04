'use strict';

const express = require('express');
const axios = require('axios')
const mongoose = require('mongoose');
const cors = require('cors');

var corsOption = {
    origin: '*'
}

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
mongoose.connect("mongodb://dbmongo:27017/newCollection");

const Feature = mongoose.model('Feature', {
    label: String,
    housenumber: Number,
    id: String,
    name: String,
    postcode: String,
    citycode: String,
    city: String,
    context: String,
    type: String,
    street: String
})


// App
const app = express();
app.use(cors(corsOption))

app.get('/', (req, res) => {
    res.send('Hello World');

});

app.get('/french', async (req, res) => {
    const data = await axios.get('https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&limit=15').then(resu => {
        return resu.data;
    })
    // console.log(data.features[0].properties); 

    const t_t = data.features[0].properties
    const feature = {
        label: t_t.label,
        housenumber: t_t.housenumber,
        id: t_t.id,
        name: t_t.name,
        postcode: t_t.postcode,
        citycode: t_t.citycode,
        city: t_t.city,
        context: t_t.context,
        type: t_t.type,
        street: t_t.street
    }
    // feature.save().then((doc) => {
    //     console.log("Stored _id: " + doc._id); 
    // })

    Feature.create(feature, (err, ft) => {
        if (err) console.log({ "mongo_error": err });

        console.log("Stored");
    })
    res.send(JSON.stringify(data)).status(200)
})


app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
