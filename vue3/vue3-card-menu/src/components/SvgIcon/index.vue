<template>
    <svg aria-hidden="true" class="svg-icon" :width="props.size" :height="props.size">
      <use :xlink:href="symbolId" rel="external nofollow"  :fill="props.color" />
    </svg>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  const props = defineProps({
    prefix: {
      type: String,
      default: 'icon'
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#555'
    },
    size: {
      type: String,
      default: '1rem'
    }
  })
  const symbolId = computed(() => `#${props.prefix}-${props.name}`)
  </script>