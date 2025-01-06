<template>
  <div class="availability-search-wrapper">
    <div class="content-section">
      <form
        class="search-box"
        :class="{'is-loading': isLoading, 'is-processing': isProcessing}"
      >
        <AvailabilitySearchBar
          v-if="!hideDateBar"
          class="inputs-container"
          :end="selectedDates[0].end"
          :isLoading="isLoading"
          :isProcessing="isProcessing"
          :start="selectedDates[0].start"
          @updateEndDate="handleUpdateDateEnd($event)"
          @updateStartDate="handleUpdateDateStart($event)"
        />
        <VueCal
          active-view="month"
          class="vue-cal-container vuecal--rounded-theme vuecal--date-picker"
          :disable-views="['day', 'week']"
          :events="selectedDates"
          hide-view-selector
          :min-date="minDate"
          :time="false"
          xsmall
          @cell-click="processDateSelection($event)"
        />
        <BookButton
          :disabled="!isBookingEnabled"
          :isLoading="isLoading"
          :isProcessing="isProcessing"
          :totalPrice="totalPrice"
          @click="handleBookButton()"
        />
      </form>
    </div>
  </div>
</template>

<script>
import {DateTime} from "luxon"
import {Duration} from "luxon"

import AvailabilitySearchBar from "@/components/inputs/AvailabilitySearchBar.vue"
import BookButton from "@/components/buttons/submissions/BookButton.vue"
import VueCal from "vue-cal"
import "vue-cal/dist/vuecal.css"

export default {
  name: "AvailabilitySearch",
  components:
  {
    AvailabilitySearchBar,
    BookButton,
    VueCal,
  },
  data: function()
  {
    return {
      cleaningFee: 100,
      dailyRate: 85,
      hasLocalError: false,
      // maxDate is computed to the current date + 1 year
      maxDate: DateTime.now().plus({
        years: 1, 
      }).toISODate(),
      searchQuery: "",
      selectedDates: [
        {
          end: "",
          start: "",
        },
      ],
    }
  },
  props:
  {
    /** Whether accessibility bar for date selection is available */
    hideDateBar: Boolean,

    /** Is the application currently in a processing state */
    isLoading: Boolean,

    /** Is the application currently in a /processing state */
    isProcessing: Boolean,
  },
  computed: 
  {
    /** @returns {boolean} - Can the booking button be clicked */
    isBookingEnabled () 
    {
      if (!this.selectedDates[0].start) 
      {
        return false
      }
      if (!this.selectedDates[0].end) 
      {
        return false
      }
      return true
    },

    /** @returns {string} ISO representation of "today" s.t. an earlier date is invalid */
    minDate () 
    {
      return DateTime.fromJSDate(new Date().addDays(0)).toISODate()
    },

    totalDays ()
    {
      const startDateTime = DateTime.fromISO(this.selectedDates[0].start)
      const startDuration = Duration.fromObject(startDateTime.c)

      const endDateTime = DateTime.fromISO(this.selectedDates[0].end)
      const endDuration = Duration.fromObject(endDateTime.c)

      // Keep in track of days
      const totalDuration = endDuration.minus(startDuration).shiftTo("days")

      // Add one since count starts at zero
      const totalDays = totalDuration.days + 1
      return totalDays
    },

    totalPrice ()
    {
      if (!this.isBookingEnabled) 
      {
        return ""
      }
      const total = (this.totalDays * this.dailyRate) + this.cleaningFee
      return total + ""
    },
  },
  methods:
  {
    /**
     * @todo docblock
     */
    async handleBookButton ()
    {
      if (!this.isBookingEnabled) 
      {
        // Do nothing and tell user why "nothing"
        this.hasLocalError = true
      }
      else 
      {
        await this.processBookingRequeset()
      }
    },

    handleUpdateDateEnd (ev)
    {
      this.selectedDates[0].end = ev
    },

    handleUpdateDateStart (ev)
    {
      this.selectedDates[0].start = ev
    },

    processBookingRequeset () 
    {
      this.hasLocalError = false
      try
      {
        this.$emit("booking-request", {
          endDate: this.selectedDates[0].end,
          startDate: this.selectedDates[0].start,
        })

      }
      catch (error)
      {
        this.hasLocalError = true
      }
    },

    /**
     * @param selected
     * @returns {boolean} Whether the date selected was accurately processed
     */
    processDateSelection (selected)
    {
      if (this.isLoading || this.isProcessing)
      {
        return false
      }
      let d = DateTime.fromJSDate(new Date(selected))
      let start = DateTime.fromISO(this.selectedDates[0].start)
      let min = DateTime.fromISO(this.minDate)
      let max = DateTime.fromISO(this.maxDate)

      // Selected date cannot be out of bounds
      if (d < min || d > max)
      {
        if (d < min) 
        {
          console.error(`${this.$options.name}: min date '${min}' has illegal selection of ${d}`)
        }
        else if (d > max) 
        {
          console.error(`${this.$options.name}: max date '${max}' has illegal selection of ${d}`)
        }
        return false
      }

      // If a current start date does not exist, make first selection the start date
      if (!this.selectedDates[0].start)
      {
        this.selectedDates[0].start = d.toISODate()
      }

      // If user clicks their start date, it clears the selection
      if (d.toFormat("yyyyMMdd") === start.toFormat("yyyyMMdd"))
      {
        this.selectedDates[0].start = ""
        this.selectedDates[0].end = ""
      }
      // If user clicks a date before their currently selected start, move back the start
      else if (d < start)
      {
        this.selectedDates[0].start = d.toISODate()
      }
      // Else, always just adjust the end date
      else
      {
        this.selectedDates[0].end = d.toISODate()
      }

      return true
    },
  },
}
</script>
