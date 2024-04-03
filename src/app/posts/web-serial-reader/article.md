This demo requires any connected serial device (for example **GPS UART module** connected over UART to USB).

Serial communication is a method of transferring data between digital devices by sending the data bit by bit sequentially over a single communication line.
For example, it can be devices like printers, routers, barcode scanners, GPS receivers, etc. Mostly, serial devices use USB connections, but it's also possible to connect via Bluetooth. A popular hardware implementation of serial communication is **UART** (Universal Asynchronous Receiver/Transmitter.)
Chrome and some other browsers now [support](https://caniuse.com/web-serial) connection to serial devices with [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API).

This demo allows to connect to serial device and read data from it over serial connection.
