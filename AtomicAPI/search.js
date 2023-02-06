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
    const atom = atomsJson.filter(function (atom) {
        return atom.name.toLowerCase() === atomicName.toLowerCase();
    })[0];
    if (atom === undefined) {
        return undefined;
    }
    return atom;
}

function atomBySymbol(atomicSymbol) {
    const atom = atomsJson.filter(function (atom) {
        return atom.symbol.toLowerCase() === atomicSymbol.toLowerCase();
    })[0];
    if (atom === undefined) {
        return undefined;
    }
    return atom;
}

function atomByNumber(atomicNumber) {
    const atom = atomsJson.filter(function (atom) {
        return atom.atomic_number === atomicNumber;
    }
    )[0];
    if (atom === undefined) {
        return undefined;
    }
    return atom;
}

function atomicSymbolToAtomicName(atomicSymbol) {
    const atom = atomsJson.filter(function (atom) {
        return atom.symbol.toLowerCase() === atomicSymbol.toLowerCase();
    })[0];
    if (atom === undefined) {
        return undefined;
    }
    return atom.name;
}

function atomicNameToAtomicSymbol(atomicName) {
    const atom = atomsJson.filter(function (atom) {
        return atom.name.toLowerCase() === atomicName.toLowerCase();
    })[0];
    if (atom === undefined) {
        return undefined;
    } else {
        return atom.symbol;
    }
}

function atomicNumberToAtomicName(atomicNumber) {
    const atom = atomsJson.filter(function (atom) {
        return atom.atomic_number === atomicNumber;
    })[0];
    if (atom === undefined) {
        return undefined;
    } else {
        return atom.name;
    }
}

function atomicNameToAtomicNumber(atomicName) {
    const atom = atomsJson.filter(function (atom) {
        return atom.name.toLowerCase() === atomicName.toLowerCase();
    })[0];
    if (atom === undefined) {
        return undefined;
    } else {
        return atom.atomic_number;
    }
}