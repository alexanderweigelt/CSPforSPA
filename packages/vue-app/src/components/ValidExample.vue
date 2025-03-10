<template>
  <div>
    <p class="safe-style">Dieser Text nutzt eine gültige externe CSS-Datei.</p>
    <button @click="showAlert">Klick mich</button>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    showAlert() {
      alert('Sicheres Skript aufgerufen!')
    },
  },
}
</script>

<style src="./ValidExample.css"></style>
