<template></template>

<script>
import SimonMachine from "./SimonMachine";

export default {
  name: "App",
  data() {
    return {
      simonMachine: new SimonMachine({
        onSingleSignalOutput: this.handleSignal,
        onSequenceExecutionFinish: this.handleFinish,
      }),
    };
  },
  methods: {
    handleSignal(signal) {
      console.log(signal);
    },
    handleFinish() {
      console.log("machine is finished");
    },
  },
  created() {
    this.simonMachine.start();
  },
};
</script>

<style>
</style>
