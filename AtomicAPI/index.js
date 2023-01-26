const express = require('express');
const app = express();
const port = 8080;
const wiki = require("wikipedia");

app.use(express.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    module.exports = {
        'app': app,
        'port': port
    }
});

app.get('/search/:atom_rep', async (req, res) => {
    const atom = await searchWikipedia(req.params.atom_rep);
    console.log(req.ip + " searched for " + req.params.atom_rep)
    console.log("Sending " + atom.toString() + " to " + req.ip)
    res.send(atom);
});

const searchAtoms = require('./search.js');


async function searchWikipedia(searchTerm) {
    //check if the search term is a number
    if (parseInt(searchTerm).toString() != "NaN") {
        const searchRes = await wiki.page(searchAtoms.atomicNumberToAtomicName(parseInt(searchTerm)));
        const summary = await searchRes.summary();
        const scrape = {
            "title": searchRes.title,
            "summary": summary.description + " " + summary.extract,
            "atom": searchAtoms.atomByName(searchRes.title)
        }
        console.log(scrape)
        return scrape;
    } else {
        if (searchAtoms.atomBySymbol(searchTerm) === undefined) {
            const searchRes = await wiki.page(searchTerm);
            const summary = await searchRes.summary();
            const scrape = {
                "title": searchRes.title,
                "summary": summary.description + " " + summary.extract,
                "atom": searchAtoms.atomByName(searchRes.title)
            }
            console.log(scrape)
            return scrape;
        } else {
            //search by symbol
            const searchRes = await wiki.page(searchAtoms.atomicSymbolToAtomicName(searchTerm));
            const summary = await searchRes.summary();
            const scrape = {
                "title": searchRes.title,
                "summary": summary.description + " " + summary.extract,
                "atom": searchAtoms.atomByName(searchRes.title)
            }
            console.log(scrape)
            return scrape;
        }
    }
}
