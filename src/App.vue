<template></template>

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
    };
  },
  methods: {
    handleSignal(signal) {
      console.log(signal);
    },
    handleSequenceExecFinish() {
      console.log("machine is finished exec");
    },
    handleGameOver() {
      console.log("game over");
    },
  },
  created() {
    this.simonMachine.start();
  },
};
</script>

<style>
</style>
