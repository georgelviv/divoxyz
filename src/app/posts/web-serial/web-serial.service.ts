import { Observable, Subject } from 'rxjs';

class WebSerialService {
  private reader: ReadableStreamDefaultReader;

  private decoder: TextDecoder = new TextDecoder();
  private data$: Subject<string> = new Subject<string>();

  public checkIfWebSerialIsSupported(): boolean {
    return 'serial' in navigator;
  }

  public getData$(): Observable<string> {
    return this.data$.asObservable();
  }

  public async init(): Promise<boolean> {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });

      // this.writer = port.writable.getWriter();
      this.reader = port.readable.getReader();

      this.read();

      return true;
    } catch (e) {
      console.error('Cannot connect to web serial');
      return false;
    }
  }

  public async read(): Promise<void> {
    try {
      const { value } = await this.reader.read();
      const decodedData: string = this.decoder.decode(value);
      console.log(decodedData);
      this.data$.next(decodedData);
    } catch (e) {
      console.error('Error to read serial');
    }
  }
}

const webSerialService = new WebSerialService();

export { webSerialService };
