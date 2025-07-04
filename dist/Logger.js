export default class Logger {
    constructor(list) {
        Logger.list = list;
    }
    static getInstance(list) {
        if (!Logger.instance) {
            if (!list) {
                throw new Error('Logger missing list.');
            }
            Logger.instance = new Logger(list);
        }
        return Logger.instance;
    }
    static log(message) {
        if (!Logger.list) {
            throw new Error('Logger not initialized.');
        }
        const li = document.createElement('li');
        li.textContent = message;
        Logger.list.append(li);
    }
}
//# sourceMappingURL=Logger.js.map