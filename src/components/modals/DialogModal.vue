<template>
  <div
    v-if="visible"
    class="teahub-dialog-modal"
  >
    <div
      class="dialog-overlay"
      @click="close"
    />
    <div
      class="dialog-content"
      :style="{ backgroundColor: backgroundColor }"
    >
      <h2
        class="dialog-header"
        :style="{ backgroundColor: headerColor }"
      >
        <slot name="title"/>
      </h2>
      <div
        class="dialog-body"
        :style="{ backgroundColor: bodyColor }"
      >
        <slot name="body"/>
      </div>
      <div
        class="dialog-footer"
        :style="{ backgroundColor: footerColor }"
      >
        <MyButton
          class="dialog-button"
          :style="{ backgroundColor: buttonColor }"
          @click="close"
        >
          {{ closeButtonLabel }}
        </MyButton>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from "components/buttons/MyButton.vue"

export default {
  name: "DialogModal",
  components:
  {
    MyButton,
  },
  props: {
    backgroundColor: {
      default: "#FFFFFF",
      type: String,
    },
    bodyColor: {
      default: "#FFFFFF",
      type: String,
    },
    buttonColor: {
      default: "#FFFFFF",
      type: String,
    },
    closeButtonLabel: {
      default: "Close",
      type: String,
    },
    footerColor: {
      default: "#2196F3",
      type: String,
    },
    headerColor: {
      default: "#2196F3",
      type: String,
    },
    visible: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    close () 
    {
      this.$emit("close")
    },
  },
}
</script>
