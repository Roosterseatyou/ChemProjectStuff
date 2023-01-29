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
    if(atom.title == "Undefined") {
        res.status(404).send("No atom was found with that information!");

    }else {
        res.send(atom);
    }
});

const searchAtoms = require('./search.js');

function generateElectronConfiguration(atom) {
    if(require("./atoms.json")["weird_stuff"].includes(atom.symbol)) {
        return "Sadly, this atom is too weird to have a normal electron configuration and cannot easily be generated. Sorry! :("
    }
    const energyLevels = "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p6".split(" ");
    let electronConfiguration = "";
    let electrons = atom.atomic_number;
    for (let i = 0; i < energyLevels.length; i++) {
        const energyLevel = energyLevels[i];
        var energyLevelElectrons = parseInt(energyLevel[energyLevel.length-1]);
        //check if the energy level can contain double digits
        if (energyLevel[1] === "f" || energyLevel[1] === "d") {
            var energyLevelElectrons = parseInt(energyLevel[energyLevel.length-2] + energyLevel[energyLevel.length - 1]);
        }
        if (electrons >= energyLevelElectrons) {
            electronConfiguration += energyLevel;
            electrons -= energyLevelElectrons;
        } else {
            if(electrons > 0) {
                electronConfiguration += energyLevel[0] + energyLevel[1] + electrons;
            }
            break;
        }
    }
    return electronConfiguration;
}


async function searchWikipedia(searchTerm) {
    //check if the search term is a number
    if (parseInt(searchTerm).toString() != "NaN") {
        const searchRes = await wiki.page(searchAtoms.atomicNumberToAtomicName(parseInt(searchTerm)));
        const summary = await searchRes.summary();
        const scrape = {
            "title": searchRes.title,
            "summary": summary.description + " " + summary.extract,
            "electron_configuration": generateElectronConfiguration(searchAtoms.atomByName(searchRes.title)),
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
                "electron_configuration": generateElectronConfiguration(searchAtoms.atomByName(searchRes.title)),
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
                "electron_configuration": generateElectronConfiguration(searchAtoms.atomByName(searchRes.title)),
                "atom": searchAtoms.atomByName(searchRes.title)
            }
            console.log(scrape)
            return scrape;
        }
    }
}
