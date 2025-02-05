const fs = require('fs');

class Parser {
    constructor(fileName) {
        this.reader = fs.readFileSync(fileName, 'utf-8').split(/\r?\n/); // Lê o arquivo e separa por linhas
        this.currentCommand = null;
        this.currentIndex = 0;
    }

    hasMoreCommands() {
        return this.currentIndex < this.reader.length;
    }

    advance() {
        while (this.hasMoreCommands()) {
            this.currentCommand = this.reader[this.currentIndex].trim();
            this.currentIndex++;

            // Pular linhas vazias e comentários
            if (this.currentCommand !== "" && !this.currentCommand.startsWith("//")) {
                return;
            }
        }
        this.currentCommand = null;
    }

    commandType() {
        if (!this.currentCommand) return null;

        if (this.currentCommand.startsWith("push")) return "C_PUSH";
        if (this.currentCommand.startsWith("pop")) return "C_POP";
        if (this.currentCommand.startsWith("label")) return "C_LABEL";
        if (this.currentCommand.startsWith("goto")) return "C_GOTO";
        if (this.currentCommand.startsWith("if-goto")) return "C_IF";
        if (this.currentCommand.startsWith("function")) return "C_FUNCTION";
        if (this.currentCommand.startsWith("call")) return "C_CALL";
        if (this.currentCommand.startsWith("return")) return "C_RETURN";

        return "C_ARITHMETIC";
    }

    arg1() {
        const type = this.commandType();
        if (type === "C_RETURN") {
            throw new Error("arg1() called on C_RETURN command");
        }
        if (type === "C_ARITHMETIC") {
            return this.currentCommand;
        }
        return this.currentCommand.split(" ")[1];
    }

    arg2() {
        const type = this.commandType();
        if (!["C_PUSH", "C_POP", "C_FUNCTION", "C_CALL"].includes(type)) {
            throw new Error("arg2() called on invalid command type");
        }
        return parseInt(this.currentCommand.split(" ")[2], 10);
    }
}

module.exports = Parser;
