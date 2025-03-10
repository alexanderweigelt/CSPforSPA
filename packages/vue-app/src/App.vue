<script setup lang="ts">
import ValidExample from './components/ValidExample.vue'
import InvalidExample from './components/InvalidExample.vue'
</script>

<template>
  <div>
    <header>
      <h1>Vue.js CSP Beispiel</h1>
    </header>

    <section class="card">
      <h2>Valides Beispiel</h2>
      <ValidExample />
    </section>

    <section class="card">
      <h2>Beispiel mit CSP-Verletzung</h2>
      <InvalidExample />
    </section>
  </div>
</template>

<style>
.card {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
</style>
