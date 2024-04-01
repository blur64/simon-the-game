<template>
  <div class="wrapper">
    <div class="buttons-wrapper">
      <button
        v-for="(signal, idx) of simonMachineSignals"
        :key="idx"
        @click="handleSignalBtnClicked(signal)"
        :class="{ active: activeSignal === signal }"
        :disabled="!isUserCanInput"
        class="button"
      ></button>
    </div>
    <div>
      <button @click="handleStartBtnClicked">Start</button>
      <p>Round: {{ round }}</p>
      <p v-if="isGameOver">Lose...</p>
      <div>
        <p>Complexity</p>
        <ul class="levels-list">
          <li>
            <input
              :checked="difficulty === simonMachineModes.SLOW"
              @click="handleDifficultyCheck(simonMachineModes.SLOW)"
              type="radio"
              name="difficulty"
              id="level-easy"
              :disabled="canSwitchDifficulty"
            />
            <label for="level-easy">Easy</label>
          </li>
          <li>
            <input
              :checked="difficulty === simonMachineModes.FAST"
              @click="handleDifficultyCheck(simonMachineModes.FAST)"
              type="radio"
              name="difficulty"
              id="level-medium"
              :disabled="canSwitchDifficulty"
            />
            <label for="level-medium">Medium</label>
          </li>
          <li>
            <input
              :checked="difficulty === simonMachineModes.VERY_FAST"
              @click="handleDifficultyCheck(simonMachineModes.VERY_FAST)"
              type="radio"
              name="difficulty"
              id="level-hard"
              :disabled="canSwitchDifficulty"
            />
            <label for="level-hard">Hard</label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SimonMachine, {
  simonMachineSignals,
  simonMachineModes,
} from "./SimonMachine";

const soundsPaths = [
  require("./assets/1.mp3"),
  require("./assets/2.mp3"),
  require("./assets/3.mp3"),
  require("./assets/4.mp3"),
];

export default {
  name: "App",
  data() {
    return {
      simonMachine: new SimonMachine({}),
      simonMachineSignals,
      simonMachineModes,
      isGameOver: false,
    };
  },
  computed: {
    isUserCanInput() {
      return this.simonMachine.isInputWaiting;
    },
    currentSignals() {
      return this.simonMachine.currentSignalsSequence;
    },
    activeSignal() {
      return this.simonMachine.activeSignal;
    },
    round() {
      return this.currentSignals.length;
    },
    difficulty() {
      return this.simonMachine.mode;
    },
    canSwitchDifficulty() {
      return !this.simonMachine.isActive;
    },
  },
  methods: {
    handleSignalBtnClicked(signal) {
      this.simonMachine.input(signal);
      this.playSignalSound(signal);
    },
    handleStartBtnClicked() {
      this.simonMachine.start();
    },
    handleDifficultyCheck(difficulty) {
      this.simonMachine.setMode(difficulty);
    },
    playSignalSound(signal) {
      const sound = new Audio(soundsPaths[signal]);
      sound.volume = 0.4;
      sound.play();
    },
  },
  watch: {
    activeSignal(newVal) {
      this.playSignalSound(newVal);
    },
    round(newVal, oldVal) {
      this.isGameOver = newVal !== oldVal && newVal === 0;
    },
  },
};
</script>

<style>
.wrapper {
  font-family: sans-serif;
  width: 400px;
  display: flex;
  justify-content: space-around;
  margin: 5vh auto;
}

.buttons-wrapper {
  width: 240px;
  display: flex;
  flex-wrap: wrap;
}

.button {
  width: 120px;
  height: 120px;
  opacity: 0.5;
  border: 1px solid grey;
  padding: 0;
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

.button:hover {
  cursor: pointer;
}

.button:active {
  opacity: 1;
}

.button:disabled {
  cursor: initial;
  opacity: 0.55;
}

.active {
  opacity: 1 !important;
  border: 2px solid #333;
}

.levels-list {
  list-style-type: none;
}
</style>
