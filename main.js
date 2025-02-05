const fs = require('fs');
const Parser = require('./parser');
const CodeWriter = require('./codewriter');

function main() {
    if (process.argv.length !== 3) {
        console.log("Usage: node main.js <filename.vm>");
        return;
    }

    const inputFileName = process.argv[2];
    const outputFileName = inputFileName.replace(".vm", ".asm");

    try {
        const parser = new Parser(inputFileName);
        const codeWriter = new CodeWriter(outputFileName);

        while (parser.hasMoreCommands()) {
            parser.advance();
            const commandType = parser.commandType();

            if (commandType === "C_ARITHMETIC") {
                codeWriter.writeArithmetic(parser.arg1());
            } else if (commandType === "C_PUSH") {
                codeWriter.writePush(parser.arg1(), parser.arg2());
            } else if (commandType === "C_POP") {
                codeWriter.writePop(parser.arg1(), parser.arg2());
            }
        }

        codeWriter.close();
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

main();