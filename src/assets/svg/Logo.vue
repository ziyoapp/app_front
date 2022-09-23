<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 27 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.5 6.25027L17.3122 10L13.5 13.7497V6.25027Z"
      fill="#A0D008"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.5 6.25027L9.68779 10L13.5 13.7497V6.25027Z"
      fill="#46BB0C"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 0L5.47882 5.38894L10.9576 0H0Z"
      fill="#19426E"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.9576 0L17.3122 6.25027L23.6667 2.12686e-06L10.9576 0Z"
      fill="#001A35"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.0424 20L21.5212 14.6111L27 20H16.0424Z"
      fill="#19426E"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.33333 20L9.68785 13.7497L16.0424 20H3.33333Z"
      fill="#001A35"
    />
  </svg>
</template>

<script>
export default {
  name: "LogoIcon",
  props: {
    width: {
      type: Number,
      default: 27,
    },
    height: {
      type: Number,
      default: 20,
    },
  },
};
</script>
