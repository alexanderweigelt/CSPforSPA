<template>
  <div>
    <!-- Inline-Styles, die CSP verletzen -->
    <style>
      .unsafe {
        color: red;
      }
    </style>

    <p class="unsafe">Dieser Text nutzt ein Inline-Style und verletzt die CSP.</p>

    <button @click="addUnsafeScript">Klick mich (unsicher)</button>

    <!-- Verletzendes Inline-Style direkt im `style`-Attribut -->
    <p style="color: red">Dieser Text ist rot.</p>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    addUnsafeScript() {
      // Dynamisches Hinzufügen eines Inline-Skripts
      const script = document.createElement('script')
      script.innerHTML = "alert('Unsicheres Inline-Skript!');"
      document.body.appendChild(script)
    },
  },
}
</script>

<style src="./InvalidExample.css"></style>
