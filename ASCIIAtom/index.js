const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = {
    'readline': readline
}

console.log('\n****************************\nWelcome to the ASCII Atom API!');
console.log('This was made for Mr. Hartman\'s Chemistry class.\n****************************\n');
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

console.log("\n\n------------------------------------")
console.log("E - Electron, P - Proton, N - Neutron")
console.log("Electrons sit in the Energy Shells, which are the electron cloud.")
console.log("Protons and Neutrons sit in the Nucleus, which is the center of the atom.")
console.log("Electrons have a charge of -1, Protons have a charge of +1, and Neutrons have no charge.")
console.log("See the atom-parts command for more information on the parts of an atom!")
console.log("------------------------------------")



async function start() {
    console.log('Type help to get started!');
    startCommandLine();
}

start();

function startCommandLine() {
    readline.question('Enter a command: ', command => {
        if (command === 'help') {
            console.log('----------------------------Commands----------------------------');
            console.log('help - Displays this message');
            console.log('exit - Exits the program');
            console.log('search - Searches for an atom');
            console.log('atom-parts - Displays the parts of an atom');
            console.log('experiments - Displays the experiments that contributed to our modern understanding of the atom')
            console.log('----------------------------------------------------------------\n')
            console.log('\n')
        }
        else if (command === 'search') {
            searchAtom();
        }
        else if (command === 'atom-parts') {
            console.log('------------------------Parts of an atom------------------------');
            console.log('Protons - Positively charged particles. Found in the nucleus, these particles have a charge of +1. Protons were discovered by Ernest Rutherford in 1911.\n');
            console.log('Neutrons - Neutral particles. Found in the nucleus, these particles have no charge. Neutrons were discovered by James Chadwick in 1932.\n');
            console.log('Electrons - Negatively charged particles. Found in the electron cloud, these tiny particles are stored in energy shells (see their section below!) and have a charge of -1. Electrons were discovered by J.J. Thomson in 1897 through the Cathode Ray Experiment (run the experiments command!). The Oil Drop Experiment helped determine the charge of the electron (run the experiments command!).\n');
            console.log('Nucleus - The center of the atom. This contains the protons and neutrons in the atom,and was discovered by Ernest Rutherford in 1911 through the Gold Foil Experiment (run the experiments command!).\n');
            console.log("Energy Shells - The energy shells are the electron cloud. These are the energy levels that electrons can exist in. Electrons can only exist in certain energy levels, and this was discovered by Niels Bohr in 1913 through the Atomic Emmision Experiment (run the experiments command!).\n")
            console.log('----------------------------------------------------------------\n')
            console.log('\n')
        }
        else if (command === 'experiments') {
            console.log('----------------Experiments that contributed to our modern understanding of the atom----------------');
            
            console.log('The Gold Foil Experiment - This experiment was conducted by Ernest Rutherford in 1911. In this experiment, Rutherford shot alpha particles at a thin sheet of gold foil. \nRutherford expected the particles to pass through the foil, but instead, they were deflected. This showed that the atom had a dense, positively charged nucleus.\n');
            console.log('The Cathode Ray Experiment - This experiment was conducted by J.J. Thomson in 1897. In this experiment, Thomson used a cathode ray tube to shoot electrons at a metal plate. \nThomson expected the electrons to pass through the plate, but instead, they were deflected. This showed that the atom had negatively charged particles.\n');
            console.log('The Oil Drop Experiment - This experiment was conducted by Robert Millikan in 1909. In this experiment, Millikan used an oil drop to measure the charge of an electron. \nMillikan expected the charge of an electron to be -1, but instead, it was -1.602176634 x 10^-19. This showed that the charge of an electron was not a whole number.\n')
            console.log('Atomic Emmision - This experiment was conducted by Niels Bohr in 1913. In this experiment, Bohr used a hydrogen atom to show that electrons could only exist in certain energy levels. \nBohr expected the electrons to be able to exist in any energy level, but instead, they could only exist in certain energy levels. This showed that electrons could only exist in certain energy levels.\n')
            console.log('--------------------------------------------------------------------------------------------------\n')
            console.log('\n')
            
        }
        else if (command === 'exit') {
            console.log('Exiting...');
            return readline.close();
        }
        else {
            console.log('Invalid command! Type help to see a list of commands.\n');
            
        }
        startCommandLine();
    });
}

function searchAtom() {
    readline.question('Enter the name of the atom: ', name => {
        readline.question('Enter the symbol of the atom: ', symbol => {
            readline.question('Enter the atomic number of the atom: ', number => {

                let atomInformation = null;

                getAtomInformation(name, symbol, number).then(data => {
                    if (data === "No atom was found with that information!") {
                        console.log('No atom was found with that information!');
                        return startCommandLine();
                    }

                    atomInformation = data;

                    console.log("Name: " + atomInformation.atom.name);
                    console.log("Symbol: " + atomInformation.atom.symbol);
                    console.log("Atomic Number: " + atomInformation.atom.atomic_number);
                    console.log("Atomic Mass: " + atomInformation.atom.atomic_mass);
                    console.log("Electron Configuration: " + atomInformation.electron_configuration);
                    console.log("Description: " + atomInformation.summary);
                    startCommandLine();
                });
            });
        });
    })
}

async function getAtomInformation(atomName, atomSymbol, atomNumber) {
    if (atomName === "" || atomName === null) {
        if (atomSymbol === "" || atomSymbol === null) {
            if (atomNumber === "" || atomNumber === null) {
                getAtomInformation();
            } else {
                const res = await fetch('http://localhost:8080/search/' + atomNumber)
                if (res.status === 404) {
                    return "No atom was found with that information!";
                }
                const data = await res.json();
                return data;
            }
        } else {
            const res = await fetch('http://localhost:8080/search/' + atomSymbol);
            if (res.status === 404) {
                return "No atom was found with that information!";
            }
            const data = await res.json();
            return data;
        }
    } else {
        const res = await fetch('http://localhost:8080/search/' + atomName);
        if (res.status === 404) {
            return "No atom was found with that information!";
        }
        const data = await res.json();
        return data;
    }
}