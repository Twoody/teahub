<template>
  <div
    class="validatable"
    :class="{warn: error}"
  >
    <slot/>
    <transition
      name="error-fade"
      appear
    >
      <div
        v-if="error && showError"
        class="error-message"
      >
        ^ {{ error }}
      </div>
    </transition>
  </div>
</template>

<script>
export default
{
  name: "Validatable",
  props:
  {
    error:
    {
      required: true,
      type: String,
    },
    showError:
    {
      default: true,
      required: false,
      type: Boolean,
    },
  },
}
</script>

<style lang="less">
.validatable {
  .error-message {
    color: #F5AF11;
    font-weight: 900;
    position: relative;
    text-align: left;
    top: -4px;
  }
}

.error-fade-enter-active,
.error-fade-leave-active {
  transition: opacity 1s, transform 1s;
}

.error-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.error-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.error-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.error-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
