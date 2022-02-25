<template>
  <div class="d-inline-block pb-tile" v-on:click="toggleColor()" v-bind:class="getColorClass">{{color}}</div>
</template>

<script>
export default {
  name: "Tile",
  props: {
    color: Number
  },
  data: function() {
    return {
      showColor: false
    }
  },
  methods: {
    toggleColor: function () {
      this.showColor = !this.showColor;
      console.log("Changed!");
    }
  },
  computed: {
    getColorClass: function () {
      if (this.showColor) {
        return "grey-" + this.$props.color;
      }
      else {
        return ""
      }
    }
  }

}
</script>

<style scoped>
.grey-2 {
  background-color: #345B63 !important;
  color: transparent;
  background-image: url("/assets/tile-bg.svg");
  background-repeat: repeat;
  background-position: center;
}
.grey-4 {
  background-color: #42b983 !important;
  background-image: url("/assets/tile-bg.svg");
  background-repeat: repeat;
  background-position: center;
  color: transparent;
}

.grey-3 {
  background-color: red !important;
  background-image: url("/assets/tile-bg.svg");
  background-repeat: repeat;
  background-position: center;
  color: transparent;
}
</style>
