class Logger {
    constructor() {
        this.updateTag = "\x1b[43m\x1b[35mUPDATE:\x1b[0m";
        this.errorTag = "\x1b[41m\x1b[37mERROR:\x1b[0m";
        this.statusTag = "\x1b[46m\x1b[37mSTATUS:\x1b[0m";
        this.successTag = "\x1b[42m\x1b[37mSUCCESSFUL:\x1b[0m";
        this.warningTag = "\x1b[40m\x1b[31mWARNING:\x1b[0m";
        console.log(`${this.updateTag}Logging tags available for use.`);
    }

    logUpdate(msg) {
        console.log(`${this.updateTag}${msg}`);
    }

    logError(msg) {
        console.log(`${this.errorTag}${msg}`);
    }

    logStatus(msg) {
        console.log(`${this.statusTag}${msg}`);
    }

    logSuccess(msg) {
        console.log(`${this.successTag}${msg}`);
    }

    logWarning(msg) {
        console.log(`${this.warningTag}${msg}`);
    }
}

module.exports = Logger;
