<template>
  <div class="body">
    <router-view name="header" />
    <router-view />
    <!-- <router-view name="footer" /> -->
  </div>
</template>

<script>
export default {};
</script>
<style>
.body {
  box-sizing: border-box;
  min-height: 100vh;
}
</style>
