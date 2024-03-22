class WebSerialService {
  public reader: ReadableStreamDefaultReader;
  public writer: WritableStreamDefaultWriter;

  public checkIfWebSerialIsSupported(): boolean {
    return 'serial' in navigator;
  }

  public async init(): Promise<boolean> {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      console.log(port);

      this.writer = port.writable.getWriter();
      this.reader = port.readable.getReader();

      return true;
    } catch (e) {
      console.error('Cannot connect to web serial');
      return false;
    }
  }

  public async read(): Promise<{ hasError: boolean; data?: string }> {
    try {
      const { value, done } = await this.reader.read();
      console.log(value, done);
      return { hasError: false, data: value };
    } catch (e) {
      console.error('Error to read serial');
      return { hasError: true };
    }
  }
}

const webSerialService = new WebSerialService();

export { webSerialService };
