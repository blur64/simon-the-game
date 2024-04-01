<template>
  <div>
    <button
      v-for="(signal, idx) of simonMachineSignals"
      :key="idx"
      @click="handleSignalBtnClicked(signal)"
      :class="{ active: activeSignal === signal }"
    >
      {{ signal }}
    </button>
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
</style>
