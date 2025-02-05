const fs = require('fs');

class CodeWriter {
    constructor(fileName) {
        this.writer = fs.createWriteStream(fileName, { flags: 'w' });
        this.moduleName = "";
        this.synCount = 0;
    }

    setFileName(fileName) {
        this.moduleName = fileName.split("/").pop().split(".")[0];
    }

    registerName(segment, index) {
        switch (segment) {
            case "local": return "LCL";
            case "argument": return "ARG";
            case "this": return "THIS";
            case "that": return "THAT";
            case "pointer": return `R${3 + index}`;
            case "temp": return `R${5 + index}`;
            default: return `${this.moduleName}.${index}`;
        }
    }

    writePush(segment, index) {
        if (segment === "constant") {
            this._write(`@${index} // push ${segment} ${index}`);
            this._write("D=A");

        } else if (segment === "static" || segment === "temp" || segment === "pointer") {
            this._write(`@${this.registerName(segment, index)} // push ${segment} ${index}`);
            this._write("D=M");

        } else {
            this._write(`@${this.registerName(segment, index)} // push ${segment} ${index}`);
            this._write("D=M");
            this._write(`@${index}`)
            this._write("A=D+A")
            this._write("D=M")
            
        }
        this._write("@SP");
        this._write("A=M");
        this._write("M=D");
        this._write("@SP");
        this._write("M=M+1");
    }

    writePop(segment, index) {
        if (["static", "temp", "pointer"].includes(segment)) {
            this._write(`@SP // pop ${segment} ${index}`);
            this._write("M=M-1");
            this._write("A=M");
            this._write("D=M");
            this._write(`@${this.registerName(segment, index)}`);
            this._write("M=D");
        } else {
            this._write(`@${this.registerName(segment, 0)} // pop ${segment} ${index}`);
            this._write("D=M");
            this._write(`@${index}`);
            this._write("D=D+A");
            this._write("@R13");
            this._write("M=D");
            this._write("@SP");
            this._write("M=M-1");
            this._write("A=M");
            this._write("D=M");
            this._write("@R13");
            this._write("A=M");
            this._write("M=D");
        }
    }

    writeArithmetic(command) {
        const commands = {
            "add": () => this._writeArithmeticAdd(),
            "sub": () => this._writeArithmeticSub(),
            "neg": () => this._writeArithmeticNeg(),
            "eq": () => this._writeArithmeticEq(),
            "gt": () => this._writeArithmeticGt(),
            "lt": () => this._writeArithmeticLt(),
            "and": () => this._writeArithmeticAnd(),
            "or": () => this._writeArithmeticOr(),
            "not": () => this._writeArithmeticNot()
        };
        if (commands[command]) commands[command]();
    }

    _writeArithmeticAdd() {
        this._write("@SP // add");
        this._write("M=M-1");
        this._write("A=M");
        this._write("D=M");
        this._write("A=A-1");
        this._write("M=D+M");
    }

    _writeArithmeticSub() {
        this._write("@SP // sub");
        this._write("M=M-1");
        this._write("A=M");
        this._write("D=M");
        this._write("A=A-1");
        this._write("M=M-D");
    }

    _writeArithmeticNeg() {
        this._write("@SP // neg");
        this._write("A=M");
        this._write("A=A-1");
        this._write("M=-M");
    }

    _writeArithmeticEq() {
        const label = `JEQ_${this.moduleName}_${this.synCount++}`;
        this._write("@SP // eq");
        this._write("AM=M-1");
        this._write("D=M");
        this._write("@SP");
        this._write("AM=M-1");
        this._write("D=M-D");
        this._write(`@${label}`);
        this._write("D;JEQ");
        this._write("D=1");
        this._write(`(${label})`);
        this._write("D=D-1");
        this._write("@SP");
        this._write("A=M");
        this._write("M=D");
        this._write("@SP");
        this._write("M=M+1");
    }

    _writeArithmeticGt() {
        const labelTrue = `JGT_TRUE_${this.moduleName}_${this.synCount}`;
        const labelFalse = `JGT_FALSE_${this.moduleName}_${this.synCount++}`;
        this._write("@SP // gt");
        this._write("AM=M-1");
        this._write("D=M");
        this._write("@SP");
        this._write("AM=M-1");
        this._write("D=M-D");
        this._write(`@${labelTrue}`);
        this._write("D;JGT");
        this._write("D=0");
        this._write(`@${labelFalse}`);
        this._write("0;JMP");
        this._write(`(${labelTrue})`);
        this._write("D=-1");
        this._write(`(${labelFalse})`);
        this._write("@SP");
        this._write("A=M");
        this._write("M=D");
        this._write("@SP");
        this._write("M=M+1");
    }

    _writeArithmeticLt() {
        const labelTrue = `JLT_TRUE_${this.moduleName}_${this.synCount}`;
        const labelFalse = `JLT_FALSE_${this.moduleName}_${this.synCount++}`;
        this._write("@SP // lt");
        this._write("AM=M-1");
        this._write("D=M");
        this._write("@SP");
        this._write("AM=M-1");
        this._write("D=M-D");
        this._write(`@${labelTrue}`);
        this._write("D;JLT");
        this._write("D=0");
        this._write(`@${labelFalse}`);
        this._write("0;JMP");
        this._write(`(${labelTrue})`);
        this._write("D=-1");
        this._write(`(${labelFalse})`);
        this._write("@SP");
        this._write("A=M");
        this._write("M=D");
        this._write("@SP");
        this._write("M=M+1");
    }

    _writeArithmeticAnd() {
        this._write("@SP // and");
        this._write("AM=M-1");
        this._write("D=M");
        this._write("A=A-1");
        this._write("M=D&M");
    }

    _writeArithmeticOr() {
        this._write("@SP // or");
        this._write("AM=M-1");
        this._write("D=M");
        this._write("A=A-1");
        this._write("M=D|M");
    }

    _writeArithmeticNot() {
        this._write("@SP // not");
        this._write("A=M");
        this._write("A=A-1");
        this._write("M=!M");
    }

    close() {
        this.writer.end();
    }

    _write(s) {
        this.writer.write(s + "\n");
    }
}

module.exports = CodeWriter;
