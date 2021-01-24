<template>
    <div v-if="showDialog" class="cts-dialog-container">
      <div class="cts-dialog-backdrop"></div>
      <div class="cts-dialog-wrap" v-on:click="popupOutside($event)">
        <div ref="cts-dialog" class="cts-dialog">
            <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'custom-dialog'
}
</script>

<style scoped>
.cts-dialog-container {
  display: flex;
}

.cts-dialog-backdrop {
  position: fixed;
  z-index: 201;
  opacity: 0.46;
  background-color: rgb(33, 33, 33);
  border-color: rgb(33, 33, 33);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.cts-dialog-wrap {
  position: fixed;
  z-index: 202;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.cts-dialog {
  background: #fff;
  display: block !important;
  width: 600px;
  min-height: 300px;
  max-height: 90%;
  padding: 20px;
  overflow-y: auto;
  -webkit-animation: slide-down 0.3s ease-out;
  -moz-animation: slide-down 0.3s ease-out;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}

</style>