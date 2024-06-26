const simonMachineStates = {
  READY_TO_START: 0,
  SEQUNCE_EXECUTION: 1,
  INPUT_WAITING: 2,
  FINISHED: 3,
};

export const simonMachineSignals = [0, 1, 2, 3];

export const simonMachineModes = {
  SLOW: 0,
  FAST: 1,
  VERY_FAST: 2,
};

const modesSpeed = {
  [simonMachineModes.SLOW]: 1500,
  [simonMachineModes.FAST]: 1000,
  [simonMachineModes.VERY_FAST]: 400,
};

/**
 * This class represents an abstraction over mechanism (working principe) of 
 * the game. This mechanism will stay the same independant of the environment
 * the game exists in (browser page, desktop or mobile app, api, physical 
 * device). That's why this class operates abstract signals rather than 
 * definite buttons like in a physical simon-game device. Because user 
 * interface of the game might not to assume buttons: for example, device can 
 * produce sequnce by only specific sounds and user must repeat them by own 
 * voice. There's can be different interfaces variants but theese abstract
 * "signals" will be always in one way or another.
 * @class
 */
export default class SimonMachine {
  _onSingleSignalOutput = null;
  _onSequenceExecutionFinish = null;
  _onWrongInputSignal = null;
  _onIncreaseSignals = null;

  _state = simonMachineStates.READY_TO_START;
  _currentSignalsSequence = [];
  _inputSignalSequence = [];
  _signalOutputTimeInterval = 1500;
  _HTMLIntervalId = 0;
  _activeSignal = -1;
  _mode = simonMachineModes.SLOW;

  constructor({
    onSingleSignalOutput = () => { },
    onSequenceExecutionFinish = () => { },
    onWrongInputSignal = () => { },
    onIncreaseSignals = () => { }
  }) {
    this._onSingleSignalOutput = onSingleSignalOutput;
    this._onSequenceExecutionFinish = onSequenceExecutionFinish;
    this._onWrongInputSignal = onWrongInputSignal;
    this._onIncreaseSignals = onIncreaseSignals;
  }

  _getRandomSignal() {
    return generateRandomIntFromZeroTo(3);
  }

  _calculateSignalRetentionTime() {
    return this._signalOutputTimeInterval - this._signalOutputTimeInterval * 0.2;
  }

  _outputSignal(numberOfSignalToOutput) {
    const signalToOutput = this._currentSignalsSequence[numberOfSignalToOutput];
    this._activeSignal = signalToOutput;
    setTimeout(() => this._activeSignal = -1, this._calculateSignalRetentionTime());
    this._onSingleSignalOutput(signalToOutput);
  }

  _finishExecutionIfSignalIsLast(signalNumber) {
    if (signalNumber === this._currentSignalsSequence.length - 1) {
      clearInterval(this._HTMLIntervalId);
      setTimeout(() => {
        this._onSequenceExecutionFinish();
        this._state = simonMachineStates.INPUT_WAITING;
      }, this._signalOutputTimeInterval);
    }
  }

  _executeSequence() {
    this._currentSignalsSequence.push(this._getRandomSignal());
    this._onIncreaseSignals();
    let signalNumber = 0;
    this._HTMLIntervalId = setInterval(() => {
      this._outputSignal(signalNumber);
      this._finishExecutionIfSignalIsLast(signalNumber);
      ++signalNumber;
    }, this._signalOutputTimeInterval);
  }

  _verifyInputSequence() {
    return this._inputSignalSequence
      .every((signal, idx) => signal === this._currentSignalsSequence[idx]);
  }

  _checkAllSequenceInputed() {
    return this._inputSignalSequence.length === this._currentSignalsSequence.length;
  }

  _reset() {
    this._currentSignalsSequence = [];
    this._inputSignalSequence = [];
    clearInterval(this._HTMLIntervalId);
    this._state = simonMachineStates.READY_TO_START;
  }

  get currentSignalsSequence() {
    return this._currentSignalsSequence;
  }

  get activeSignal() {
    return this._activeSignal;
  }

  get mode() {
    return this._mode;
  }

  get isInputWaiting() {
    return this._state === simonMachineStates.INPUT_WAITING;
  }

  get isActive() {
    return this._state === simonMachineStates.READY_TO_START ||
      this._state === simonMachineStates.FINISH;
  }

  setMode(modeToSet) {
    if (this._state !== simonMachineStates.READY_TO_START) {
      return;
    }
    this._mode = modeToSet;
  }

  input(signal) {
    if (this._state !== simonMachineStates.INPUT_WAITING) {
      return;
    }

    this._inputSignalSequence.push(signal);
    if (this._verifyInputSequence()) {
      if (this._checkAllSequenceInputed()) {
        this._inputSignalSequence = [];
        this._state = simonMachineStates.SEQUNCE_EXECUTION;
        this._executeSequence();
      }
    } else {
      this._state = simonMachineStates.FINISHED;
      this._reset();
      this._onWrongInputSignal();
    }
  }

  start() {
    if (this._state === simonMachineStates.READY_TO_START) {
      this._state = simonMachineStates.SEQUNCE_EXECUTION;
      this._signalOutputTimeInterval = modesSpeed[this._mode];
      this._executeSequence();
    }
  }
}

function generateRandomIntFromZeroTo(to) {
  return Math.round(Math.random() * to);
}