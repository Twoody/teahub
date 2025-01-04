<template>
  <div class="my-date-wrapper">
    <input
      v-model="localValue"
      v-if="!isLoading"
      autocomplete="new-password"
      class="search-query"
      :placeholder="placeholder"
      :maxlength="maxlength"
      ref="myDate"
      type="tel"
      @input="updateParent()"
      @keypress="isNumber($event) || isDelete($event)"
    >
    <LoadingBar
      v-else
      class="search-query loading"
      size="small"
    />
  </div>
</template>

<script>
import LoadingBar from "@/components/common/loading/LoadingBar.vue"

export default {
  name: "MyDate",
  components:
  {
    LoadingBar,
  },
  data: function()
  {
    return {
      localValue: "",
    }
  },
  props:
  {
    focused: Boolean,
    isDay: Boolean,
    isLoading: Boolean,
    isMonth: Boolean,
    isYear: Boolean,
    value:
    {
      default: "",
      required: false,
      type: String,
    },
  },
  computed:
  {
    /** */
    isValid ()
    {
      if (!this.localValue)
      {
        return false
      }

      let num = parseInt(this.localValue)
      if (!num || num !== parseInt(this.localValue)) 
      {
        return false
      }

      if (this.isDay)
      {
        if (this.localValue === 0 || this.localValue > 31)
        {
          return false
        }
        return true
      }
      else if (this.isMonth)
      {
        if (this.localValue === 0 || this.localValue > 12)
        {
          return false
        }
        return true
      }
      else if (this.isYear)
      {
        // TODO: Allocate to this DateTime
        if (this.localValue === 0 || this.localValue < 2023)
        {
          return false
        }
        return true
      }
      return false
    },

    maxlength ()
    {
      if (this.placeholder === "yyyy")
      {
        return 4
      }
      return 2
    },

    placeholder ()
    {
      if (this.isDay)
      {
        return "dd"
      }
      if (this.isMonth)
      {
        return "mm"
      }
      if (this.isYear)
      {
        return "yyyy"
      }
      return ""
    },
  },
  methods:
  {
    /**
     * @param evt
     * @since 0.1.0
     */
    isDelete (evt)
    {
      /* c8 ignore next 3 */
      evt = (evt) ? evt : window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      const DELETE = 127
      if (charCode === DELETE)
      {
        return true
      }
      evt.preventDefault()
      return false
    },

    isNumber (evt)
    {
      /* c8 ignore next 3 */
      evt = (evt) ? evt : window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode

      if ((charCode > 31 && (charCode < 48 || charCode > 57)) &&
        charCode !== 46)
      {
        evt.preventDefault()
        return false
      }
      else
      {
        return true
      }
    },

	  /** @return {void} Update parent component of date changes */
    updateParent ()
    {
      const toEmit = this.isValid ? this.localValue : ""
      this.$emit(
        "newValue",
        toEmit 
      )
    },
  },
  watch:
  {
    /**
     * @param n
     */
    focused (n)
    {
      if (n)
      {
        this.$refs.myDate.focus()
        this.$emit("focus", true)
      }
    },

    value (n)
    {
      this.localValue = n
    },
  },
}

</script>
