<template>
  <div>
    <button
      :class="{ active: activeBtnId === 0 }"
      @click="handleSignalBtnClicked(0)"
    >
      0
    </button>
    <button
      :class="{ active: activeBtnId === 1 }"
      @click="handleSignalBtnClicked(1)"
    >
      1
    </button>
    <button
      :class="{ active: activeBtnId === 2 }"
      @click="handleSignalBtnClicked(2)"
    >
      2
    </button>
    <button
      :class="{ active: activeBtnId === 3 }"
      @click="handleSignalBtnClicked(3)"
    >
      3
    </button>
    <button @click="handleStartBtnClicked">start</button>
  </div>
</template>

<script>
import SimonMachine from "./SimonMachine";

export default {
  name: "App",
  data() {
    return {
      simonMachine: new SimonMachine({
        onSingleSignalOutput: this.handleSignal,
        onSequenceExecutionFinish: this.handleSequenceExecFinish,
        onWrongInputSignal: this.handleGameOver,
      }),
      activeBtnId: -1,
    };
  },
  methods: {
    handleSignal(signal) {
      this.activeBtnId = signal;
      setTimeout(() => (this.activeBtnId = -1), 1000);
    },
    handleSequenceExecFinish() {
      this.activeBtnId = -1;
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
