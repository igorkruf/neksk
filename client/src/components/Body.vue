<template>
  <div class="body_img">Body</div>
</template>
<script>
window.addEventListener("resize", function () {
  // console.log("изменение размера");
  // var b = document.querySelector(".body_img");
  // alert(b.offsetHeight);
});
export default {};
</script>
<style>
.body_img {
  background-color: #666666;
  background-image: url(/img/1.png);
  background-attachment: scrool;
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 400px;
  min-height: calc(100vh - 100px);
  border: 0px solid red;
}
</style>