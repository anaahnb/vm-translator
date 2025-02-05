class Command {
    isCommand() {
        throw new Error("Method 'isCommand()' must be implemented.");
    }
}

class Arithmetic extends Command {
    constructor(name) {
        super();
        this.name = name;
    }
    isCommand() {}
}

class Pop extends Command {
    constructor(segment, index) {
        super();
        this.segment = segment;
        this.index = index;
    }
    isCommand() {}
}

class Push extends Command {
    constructor(segment, index) {
        super();
        this.segment = segment;
        this.index = index;
    }
    isCommand() {}
}

class Label extends Command {
    constructor(name) {
        super();
        this.name = name;
    }
    isCommand() {}
}

class Goto extends Command {
    constructor(label) {
        super();
        this.label = label;
    }
    isCommand() {}
}

class IfGoto extends Command {
    constructor(label) {
        super();
        this.label = label;
    }
    isCommand() {}
}

class FunctionCommand extends Command {
    constructor(name, vars) {
        super();
        this.name = name;
        this.vars = vars;
    }
    isCommand() {}
}

class CallFunction extends Command {
    constructor(funcName, args) {
        super();
        this.funcName = funcName;
        this.args = args;
    }
    isCommand() {}
}

class Return extends Command {
    isCommand() {}
}

class UndefinedCommand extends Command {
    constructor(label) {
        super();
        this.label = label;
    }
    isCommand() {}
}
