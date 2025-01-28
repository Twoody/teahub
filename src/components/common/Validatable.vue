<template>
  <div
    class="validatable"
    :class="{collapsed: !error || !showError, show: error && showError, warn: error}"
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
