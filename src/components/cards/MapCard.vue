<template>
  <div
    class="map-card-wrapper"
    :class="{'hidden': !shown, 'shown': shown}"
  >
    <div class="top-section">
      <div class="row">
        <div class="map-card-title">
          {{ formattedTitle }}
        </div>
        <div class="favorites-star">
          <font-awesome-icon
            :icon="['fa', 'star']"
            inverse
          />
        </div>
      </div>
      <div class="map-card-subtitle">
        {{ formattedSubtitle }}
      </div>
    </div>
    <div class="map-card-map">
      <img
        height="140"
        :src="url"
        width="140"
      >
    </div>
    <button
      class="map-card-button"
      @click="$emit('click')"
    >
      View Details
    </button>
  </div>
</template>

<script>

export default {
  name: "MapCard",
  data: function() 
  {
    return {}
  },
  props:
  {
    /** Title, subtitle, addy, phone, etc. object */
    activity: {
      required: true,
      type: Object,
    },

    /** The url to use for the thumbnail */
    imageURL: {
      default: "",
      required: false,
      type: String,
    },

    /** Does the app using this component have a stable connection */
    isOnline: Boolean,

    /** Is the card shown or not */
    shown: Boolean,
  },
  computed:
  {
    formattedSubtitle ()
    {
      return this.activity.subtitle || "-"
    },

    formattedTitle ()
    {
      return this.activity.title || "-"
    },

    // TODO: Setup as a prop
    url ()
    {
      if (this.isOnline)
      {
        return this.imageURL
      }
      return "assets/imgs/cat-with-hammer.png"
    },
  },
}
</script>
