The best loading spinner
<template>
  <div class="loading-spinner">
    <font-awesome-icon
      icon="spinner"
      spin
      :class="classes"
    />
  </div>
</template>

<script>
export default {
  name: "Spinner",
  props:
  {
    /** Diameter of the spinner */
    size:
    {
      default: "small",
      required: false,
      type: String,
    },
  },
  computed:
  {
    /**
     * @returns {object} CSS classes for applying/customizing diameter of spinner 
     */
    classes ()
    {
      let classArray = [
        "spinner-svg",
      ]
      classArray.push(this.sizeClass)
      return classArray
    },

    /**
     * @returns {string} A css class for spinner length
     */
    sizeClass ()
    {
      let prefix = "spinner-"

      switch (this.size)
      {
        case "small":
          return prefix + "sm"

        case "medium":
          return prefix + "md"

        case "large":
          return prefix + "lg"

        case "x-large":
          return prefix + "xl"

        default:
          return prefix + "sm"
      }
    },
  },
}
</script>
<style scoped lang="less">
  .loading-spinner {
    display: inline-block;
    position: relative;
    overflow: hidden;

   .spinner-svg {
     height: 100%;
     &.spinner-sm {
      width: 16px;
     }
     &.spinner-md {
      width: 32;
     }
     &.spinner-lg {
      width: 64px;
     }
     &.spinner-xl {
      width: 128px;
     }
   }
  }
</style>
