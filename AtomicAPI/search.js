module.exports = {
    atomByName: atomByName,
    atomBySymbol: atomBySymbol,
    atomByNumber: atomByNumber,
    atomicSymbolToAtomicName: atomicSymbolToAtomicName,
    atomicNameToAtomicSymbol: atomicNameToAtomicSymbol,
    atomicNumberToAtomicName: atomicNumberToAtomicName,
    atomicNameToAtomicNumber: atomicNameToAtomicNumber,
}

atomsJson = require('./atoms.json')['atoms'];

function atomByName(atomicName) {
    return atomsJson.filter(function (atom) {
        return atom.name.toLowerCase() === atomicName.toLowerCase();
    })[0];
}

function atomBySymbol(atomicSymbol) {
    return atomsJson.filter(function (atom) {
        return atom.symbol.toLowerCase() === atomicSymbol.toLowerCase();
    })[0];
}

function atomByNumber(atomicNumber) {
    return atomsJson.filter(function (atom) {
        return atom.atomic_number === atomicNumber;
    })[0];
}

function atomicSymbolToAtomicName(atomicSymbol) {
    return atomsJson.filter(function (atom) {
        return atom.symbol.toLowerCase() === atomicSymbol.toLowerCase();
    })[0]["name"];
}

function atomicNameToAtomicSymbol(atomicName) {
    return atomsJson.filter(function (atom) {
        return atom.name === atomicName;
    })[0]["symbol"];
}

function atomicNumberToAtomicName(atomicNumber) {
    return atomsJson.filter(function (atom) {
        return atom.atomic_number === atomicNumber;
    })[0]["name"];
}

function atomicNameToAtomicNumber(atomicName) {
    return atomsJson.filter(function (atom) {
        return atom.name.toLowerCase() === atomicName.toLowerCase();
    })[0]["number"];
}