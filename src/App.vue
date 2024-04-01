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
    <p v-if="isGameOver">Lose...</p>
  </div>
</template>

<script>
import SimonMachine, { simonMachineSignals } from "./SimonMachine";

export default {
  name: "App",
  data() {
    return {
      simonMachine: new SimonMachine({}),
      simonMachineSignals,
      isGameOver: false,
    };
  },
  computed: {
    currentSignals() {
      return this.simonMachine.currentSignalsSequence;
    },
    activeSignal() {
      return this.simonMachine.activeSignal;
    },
    round() {
      return this.currentSignals.length;
    },
  },
  methods: {
    handleSignalBtnClicked(signal) {
      this.simonMachine.input(signal);
    },
    handleStartBtnClicked() {
      this.simonMachine.start();
    },
  },
  watch: {
    activeSignal(newVal, oldVal) {
      // play sound here
    },
    round(newVal, oldVal) {
      this.isGameOver = newVal !== oldVal && newVal === 0;
    },
  },
};
</script>

<style>
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
