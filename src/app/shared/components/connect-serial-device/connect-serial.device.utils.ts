import { wait } from '../../utils/general.utils';
import { Observable, Subject } from 'rxjs';
import { SerialDevice } from './connect-serial-device.models';

function notSelectDeviceError(e: any): boolean {
  return (
    typeof e === 'object' &&
    'message' in e &&
    Boolean((e.message as string).match('No port selected by the user.'))
  );
}

function deviceReleasedError(e: any): boolean {
  return (
    typeof e === 'object' &&
    'message' in e &&
    Boolean((e.message as string).match('Releasing Default reader'))
  );
}

export enum WebSerialDeviceConnectStatus {
  connected,
  errorToConnect,
  notSelected,
  disconnected
}

export interface WebSerialDeviceConnectResponse {
  device?: SerialDevice;
  status: WebSerialDeviceConnectStatus;
}

class WebSerialDevice {
  private reader: ReadableStreamDefaultReader;
  private port: SerialPort;

  private decoder: TextDecoder = new TextDecoder();
  private data$: Subject<string> = new Subject<string>();
  private disconnected$: Subject<boolean> = new Subject<boolean>();
  private isReading: boolean = false;

  constructor() {
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  public checkIfWebSerialIsSupported(): boolean {
    return 'serial' in navigator;
  }

  public getData$(): Observable<string> {
    return this.data$.asObservable();
  }

  public getDisconnected$(): Observable<boolean> {
    return this.disconnected$.asObservable();
  }

  public async connect(): Promise<WebSerialDeviceConnectResponse> {
    if (this.port) {
      await this.closePort();
    }
    try {
      this.port = await navigator.serial.requestPort();
      await this.port.open({ baudRate: 9600 });

      this.reader = this.port.readable.getReader();
      this.port.addEventListener('disconnect', this.handleDisconnect);

      return {
        status: WebSerialDeviceConnectStatus.connected,
        device: {
          reader: this.reader
        }
      };
    } catch (e) {
      if (notSelectDeviceError(e)) {
        return {
          status: WebSerialDeviceConnectStatus.notSelected
        };
      }
      console.error('Cannot connect to serial', e);
      return {
        status: WebSerialDeviceConnectStatus.errorToConnect
      };
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
      if (deviceReleasedError(e)) {
        return;
      }
      console.error('Error to read serial', e);
    }
  }

  private handleDisconnect(): void {
    this.closePort();
    this.disconnected$.next(true);
  }
}

export { WebSerialDevice };
