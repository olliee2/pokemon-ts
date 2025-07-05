export default class Logger {
  private static instance: Logger;
  private static list: HTMLOListElement;

  private constructor(list: HTMLOListElement) {
    Logger.list = list;
  }

  static getInstance(list?: HTMLOListElement): Logger {
    if (!Logger.instance) {
      if (!list) {
        throw new Error('Logger missing list.');
      }
      Logger.instance = new Logger(list);
    }
    return Logger.instance;
  }

  static log(message: string): void {
    if (!Logger.list) {
      throw new Error('Logger not initialized.');
    }

    const isScrolledToBottom =
      this.list.scrollHeight - this.list.clientHeight <=
      this.list.scrollTop + 1;

    const li = document.createElement('li');
    li.textContent = message;
    Logger.list.append(li);

    if (isScrolledToBottom) {
      this.list.scrollTop = this.list.scrollHeight - this.list.clientHeight;
    }
  }
}
