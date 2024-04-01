<template>
  <div>
    <div class="buttons-wrapper">
      <button
        v-for="(signal, idx) of simonMachineSignals"
        :key="idx"
        @click="handleSignalBtnClicked(signal)"
        :class="{ active: activeSignal === signal }"
        class="button"
      ></button>
    </div>
    <button @click="handleStartBtnClicked">start</button>
    <span>{{ round }}</span>
  </div>
</template>

<script>
import SimonMachine, { simonMachineSignals } from "./SimonMachine";

export default {
  name: "App",
  data() {
    return {
      simonMachine: new SimonMachine({
        onSingleSignalOutput: this.handleSignal,
        onSequenceExecutionFinish: this.handleSequenceExecFinish,
        onWrongInputSignal: this.handleGameOver,
        onIncreaseSignals: this.handleNextRound,
      }),
      simonMachineSignals,
      activeSignal: -1,
      round: 0,
    };
  },
  methods: {
    handleSignal(signal) {
      this.activeSignal = signal;
      setTimeout(() => (this.activeSignal = -1), 1000);
    },
    handleSequenceExecFinish() {
      this.activeSignal = -1;
    },
    handleGameOver() {
      this.round = 0;
    },
    handleSignalBtnClicked(signal) {
      this.simonMachine.input(signal);
    },
    handleStartBtnClicked() {
      this.simonMachine.start();
    },
    handleNextRound() {
      this.round++;
    },
  },
};
</script>

<style>
.active {
  background-color: palevioletred;
}

.buttons-wrapper {
  width: 200px;
  position: relative;
}

.button {
  width: 100px;
  height: 100px;
  opacity: 0.55;
  border: 1px solid grey;
  padding: 0;
}

.button:hover {
  cursor: pointer;
}

.button:first-child {
  border-top-left-radius: 9999px;
  background-color: blue;
}
.button:nth-child(2) {
  border-top-right-radius: 9999px;
  background-color: red;
}
.button:nth-child(3) {
  border-bottom-left-radius: 9999px;
  background-color: green;
}
.button:last-child {
  border-bottom-right-radius: 9999px;
  background-color: yellow;
}

.button:active {
  opacity: 1;
  position: relative;
}

.button:first-child:active,
.button:nth-child(2):active {
  top: 2px;
}

.button:last-child:active,
.button:nth-child(3):active {
  bottom: 2px;
}

.active {
  opacity: 1;
  border: 1px solid #333;
}
</style>
