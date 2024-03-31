const simonMachineStates = {
  READY_TO_START: 0,
  SEQUNCE_EXECUTION: 1,
  INPUT_WAITING: 2,
  FINISHED: 3,
};

// const simonMachineSignals = {}; ??

export default class SimonMachine {
  _onSingleSignalOutput = null;
  _onSequenceExecutionFinish = null;
  _onWrongInputSignal = null;

  _state = simonMachineStates.READY_TO_START;
  _currentSignalsSequence = [];
  _signalOutputTimeInterval = 1500;
  _HTMLIntervalId = 0;

  constructor({ onSingleSignalOutput, onSequenceExecutionFinish, onWrongInputSignal }) {
    this._onSingleSignalOutput = onSingleSignalOutput;
    this._onSequenceExecutionFinish = onSequenceExecutionFinish;
    this._onWrongInputSignal = onWrongInputSignal;
  }

  _getRandomSignal() {
    return generateRandomIntFromZeroTo(3);
  }

  _outputSignal(numberOfSignalToOutput) {
    const signalToOutput = this._currentSignalsSequence[numberOfSignalToOutput];
    this._onSingleSignalOutput(signalToOutput);
  }

  _finishExecutionIfSignalIsLast(signalNumber) {
    if (signalNumber === this._currentSignalsSequence.length) {
      this._onSequenceExecutionFinish();
      clearInterval(this._HTMLIntervalId);
      this._state === simonMachineStates.INPUT_WAITING;
    }
  }

  _executeSequence() {
    this._currentSignalsSequence.push(this._getRandomSignal());
    let signalNumber = 0;
    this._HTMLIntervalId = setInterval(() => {
      this._outputSignal(signalNumber++);
      this._finishExecutionIfSignalIsLast(signalNumber);
    }, this._signalOutputTimeInterval);
  }

  input(signal) { }

  start() {
    if (this._state === simonMachineStates.READY_TO_START) {
      this._state = simonMachineStates.SEQUNCE_EXECUTION;
      this._executeSequence();
    }
  }
}

function generateRandomIntFromZeroTo(to) {
  return Math.round(Math.random() * to);
}