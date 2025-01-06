Button to book a stay
<template>
  <MyButton
    class="search-execute"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <transition
      name="fade"
      mode="out-in"
    >
      <span
        v-if="isLoading || isProcessing"
        class="execute-text execute-loading"
        key="process-running"
      >
        {{ bookingText }}
      </span>
      <span
        v-else
        class="execute-text execute-clickable"
        key="booking"
      >
        {{ bookingText }}
      </span>
    </transition>
  </MyButton>
</template>

<script>
import MyButton from "@/components/buttons/MyButton.vue"

export default {
  name: "BookButton",
  components: 
  {
    MyButton,
  },
  props:
  {
    /** Whether the button is disabled or not */
    disabled: Boolean,

    /** Whether we are in loading state or not */
    isLoading: Boolean,

    /** Whether we are in processing state or not */
    isProcessing: Boolean,

    /** The total price of the booked stay */
    totalPrice: {
      default: "",
      required: false,
      type: String,
    },
  },
  computed: {
    bookingText ()
    {
      if (this.isLoading) 
      {
        return "Loading"
      }
      else if (this.isProcessing) 
      {
        return "Processing Request"
      }
      if (!this.totalPrice) 
      {
        return "Book"
      }
      return `Book - $${this.totalPrice}`
    },
  },
}
</script>
