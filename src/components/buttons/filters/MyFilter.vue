<template>
  <MyButton
    :active="!inactive"
    class="my-filter-wrapper"
    :inactive="inactive"
    pill
  >
    <slot/>
  </MyButton>
</template>

<script>
import MyButton from "components/buttons/MyButton.vue"

export default {
  name: "MyFilter",
  components:
  {
    MyButton,
  },
  props: {
    /** Is current filter being applied */
    inactive: Boolean,
  },
}
</script>
