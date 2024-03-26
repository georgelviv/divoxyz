import { wait } from '@shared/utils/general.utils';
import { Observable, Subject } from 'rxjs';

class WebSerialDevice {
  private reader: ReadableStreamDefaultReader;
  private port: SerialPort;

  private decoder: TextDecoder = new TextDecoder();
  private data$: Subject<string> = new Subject<string>();
  private isReading: boolean = false;

  public checkIfWebSerialIsSupported(): boolean {
    return 'serial' in navigator;
  }

  public getData$(): Observable<string> {
    return this.data$.asObservable();
  }

  public async connect(): Promise<boolean> {
    if (this.port) {
      await this.closePort();
    }
    try {
      this.port = await navigator.serial.requestPort();
      await this.port.open({ baudRate: 9600 });

      this.reader = this.port.readable.getReader();

      return true;
    } catch (e) {
      console.error('Cannot connect to web serial', typeof e);
      return false;
    }
  }

  public startReading(): void {
    if (this.isReading) {
      return;
    }
    this.isReading = true;
    this.read();
  }

  public stopReading(): void {
    if (!this.isReading) {
      return;
    }
    this.isReading = false;
  }

  public async closePort(): Promise<void> {
    this.isReading = false;
    if (this.reader) {
      this.reader.releaseLock();
    }

    this.reader = null;

    if (this.port) {
      try {
        await this.port.close();
      } catch (e) {
        console.error('Error to close port', e);
      }
    }
    this.port = null;
  }

  private async read(): Promise<void> {
    try {
      const { value } = await this.reader.read();
      const decodedData: string = this.decoder.decode(value);
      this.data$.next(decodedData);
      if (this.isReading) {
        await wait(100);
        this.read();
      }
    } catch (e) {
      if (typeof e === 'object' && 'message' in e) {
        if (e.message === 'Releasing Default reader') {
          return;
        }
      }
      console.error('Error to read serial', e);
    }
  }
}

export { WebSerialDevice };
