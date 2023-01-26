const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('             ==============                 ');
console.log('           //              \\\\             ');
console.log('         //                  \\\\           ');
console.log('       //                      \\\\         ');
console.log('     E/                          \\E        ');
console.log('   //                              \\\\     ');
console.log(' //                PNP               \\\\   ');
console.log('|E                 PNP                 E|  ');
console.log(' \\\\                PNP               //   ');
console.log('   \\\\                              //     ');
console.log('     \\E                          E/       ');
console.log('       \\\\                      //         ');
console.log('         \\\\                  //           ');
console.log('           \\\\              //             ');
console.log('             ==============                 ');

let atomName = null;
let atomSymbol = null;
let atomNumber = null;
let atomMass = null;

readline.question('Enter the name of the atom: ', name => {
    readline.question('Enter the symbol of the atom: ', symbol => {
        readline.question('Enter the atomic number of the atom: ', number => {
            readline.question('Enter the atomic mass of the atom: ', mass => {
                atomName = name;
                atomSymbol = symbol;
                atomNumber = number;
                atomMass = mass;

                let atomInformation = null;

                getAtomInformation().then(data => {
                    atomInformation = data;
                    console.log("Name: " + atomInformation.atom.name);
                    console.log("Symbol: " + atomInformation.atom.symbol);
                    console.log("Atomic Number: " + atomInformation.atom.atomic_umber);
                    console.log("Description: " + atomInformation.summary);
                });

                console.log()
                readline.close();
            });
        });
    });
})




async function getAtomInformation() {
    if (atomName === "" || atomName === null) {
        if (atomSymbol === "" || atomSymbol === null) {
            if (atomNumber === "" || atomNumber === null) {
                getAtomInformation();
            } else {
                const res = await fetch('http://localhost:8080/search/' + atomNumber);
                const data = await res.json();
                return data;
            }
        } else {
            const res = await fetch('http://localhost:8080/search/' + atomSymbol);
            const data = await res.json();
            return data;
        } 
    }else {
        const res = await fetch('http://localhost:8080/search/' + atomName);
        const data = await res.json();
        return data;
    }
}