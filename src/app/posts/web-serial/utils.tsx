function checkIfWebSerialIsSupported(): boolean {
  return 'serial' in navigator;
}

export { checkIfWebSerialIsSupported };