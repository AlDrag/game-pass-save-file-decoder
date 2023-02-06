const fs = require('fs');


const FILE_PATH = './container.225'
const FILE_IDENTIFIER = '0400000014'

fs.readFile(FILE_PATH, (err, buffer) => {
    if (buffer.indexOf(FILE_IDENTIFIER, 0, 'hex') !== 0) {
        throw new Error('This is not a valid file');
    }

    let bufferChecker = '';
    let hasName = false;
    for (const [index, hex] of buffer.entries()) {
        const hexString = hex.toString(16).toUpperCase().padStart(2, 0);
        if (index < 5) {
            continue;
        }

        if (hexString === '00' && bufferChecker === '') {
            continue;
        } else if (hexString === '00' && bufferChecker.endsWith('00')) {
            const sequence = bufferChecker.substring(0, bufferChecker.length - 2);
            console.log(Buffer.from(sequence, 'hex').toString('utf8'));
            hasName = true;
            bufferChecker = '';
            continue;
        }

        bufferChecker += hexString;

        if (hasName && bufferChecker.length === 64) {
            console.log(bufferChecker);
            const guid = convertHexToGuuid(bufferChecker.substr(0, 32));
            console.log(guid);
            hasName = false;
            bufferChecker = '';
        }
    }
});

function convertHexToGuuid(hexString) {
    let guuid = '';
    guuid += hexString.substring(6, 8);
    guuid += hexString.substring(4, 6);
    guuid += hexString.substring(2, 4);
    guuid += hexString.substring(0, 2);
    guuid += '-'
    guuid += hexString.substring(10, 12);
    guuid += hexString.substring(8, 10);
    guuid += '-';
    guuid += hexString.substring(14, 16);
    guuid += hexString.substring(12, 14);
    guuid += '-';
    guuid += hexString.substring(16, 20);
    guuid += '-';
    guuid += hexString.substring(20);
    return guuid
}