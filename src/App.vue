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
      }),
      simonMachineSignals,
      activeSignal: -1,
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
    handleGameOver() {},
    handleSignalBtnClicked(signal) {
      this.simonMachine.input(signal);
    },
    handleStartBtnClicked() {
      this.simonMachine.start();
    },
  },
};
</script>

<style>
.active {
  background-color: palevioletred;
}
</style>
