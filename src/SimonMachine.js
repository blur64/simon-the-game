const simonMachineStates = {
  READY_TO_START: 0,
  SEQUNCE_EXECUTION: 1,
  INPUT_WAITING: 2,
  FINISHED: 3,
};

// const simonMachineSignals = {}; ??

class SimonMachine {
  constructor(onSingleSignalOutput, onSequenceExecutionFinish, onWrongInputSignal) { }
  input(signal) { }
  start() { }
}