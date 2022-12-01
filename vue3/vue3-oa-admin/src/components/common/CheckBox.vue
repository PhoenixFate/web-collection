<template>
  <div class="check-box-body">
    <label class="checkbox" ref="lableRef">
      <input
        type="checkbox"
        v-model="sonCheckBoxChecked"
        ref="inputRef"
        @change="defaultCheckBoxChange"
      />
      <svg viewBox="0 0 24 24" filter="url(#goo-light)" ref="svgRef">
        <path class="tick" d="M4.5 10L10.5 16L24.5 1"></path>
        <circle class="dot" cx="10.5" cy="15.5" r="1.5"></circle>
      </svg>
    </label>
  </div>
</template>
<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref, nextTick } from "vue";
import gsap from "gsap";

const props = defineProps({
  checkBoxChecked: {
    type: Boolean,
    default: false,
    required: true,
  },
  scale: {
    type: Number,
    default: 0.8,
    required: false,
  },
});
const emit = defineEmits(["update:checkBoxChecked", "inputChange"]);

const lableRef = ref();
const inputRef = ref();
const svgRef = ref();

const defaultCheckBoxChange = () => {
  if (props.checkBoxChecked) {
    gsap.fromTo(
      inputRef.value,
      {
        "--border-width": "3px",
      },
      {
        "--border-color": "#24a7f3",
        "--border-width": "12px",
        duration: 0.2,
        clearProps: true,
      }
    );
    gsap.set(svgRef.value, {
      "--dot-x": "14px",
      "--dot-y": "-14px",
      "--tick-offset": "20.5px",
      "--tick-array": "16.5px",
      "--drop-s": 1,
    });
    gsap.to(lableRef.value, {
      keyframes: [
        {
          "--border-radius-corner": "14px",
          duration: 0.2,
          delay: 0.2,
        },
        {
          "--border-radius-corner": "6px",
          duration: 0.3,
          // clearProps: true,
        },
      ],
    });
    gsap.to(svgRef.value, {
      "--dot-x": "0px",
      "--dot-y": "0px",
      "--dot-s": 1,
      duration: 0.4,
      delay: 0.4,
    });
    gsap.to(svgRef.value, {
      keyframes: [
        {
          "--tick-offset": "48px",
          "--tick-array": "14px",
          duration: 0.3,
          delay: 0.2,
        },
        {
          "--tick-offset": "46.5px",
          "--tick-array": "16.5px",
          duration: 0.35,
          clearProps: true,
        },
      ],
    });
  }

  emit("inputChange");
};

const sonCheckBoxChecked = computed({
  get: () => props.checkBoxChecked,
  set: (value) => {
    console.log(value);
    emit("update:checkBoxChecked", value);
  },
});

onMounted(() => {
  lableRef.value.style.setProperty("transform", `scale(${props.scale})`);
});
</script>
<style lang="scss">
.check-box-body {
  width: 30px;
  height: 30px;
  --c-active: #24a7f3;
  --c-active-inner: #ffffff;
  --c-default: #d2d6e9;
  --c-default-dark: #c7cbdf;
  --c-black: #1b1b22;
  --border-radius: 6px;
  --border-radius-corner: 6px;
  @apply flex justify-center items-center;
  .checkbox {
    display: table;
    border-radius: var(--border-radius, 12px) var(--border-radius-corner, 12px)
      var(--border-radius, 12px) var(--border-radius, 12px);
    position: relative;
  }
  .checkbox input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border: none;
    background: none;
    display: block;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border-radius: 0.5rem;
    width: 24px;
    height: 24px;
  }

  .checkbox svg {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    pointer-events: none;
    fill: #ffffff;
    transform: scale(1.01) translateZ(0);
  }

  .checkbox input {
    --border-color: var(--c-default);
    --border-width: 2px;
    box-shadow: inset 0 0 0 var(--border-width) var(--border-color);
  }

  .checkbox input:checked {
    --border-color: var(--c-active);
  }

  .checkbox input:not(:checked) {
    transition: box-shadow 0.25s;
  }

  .checkbox input:not(:checked):hover {
    --border-width: 3px;
    --border-color: var(--c-active);
  }

  .checkbox input:checked {
    --border-width: 12px;
  }

  .checkbox input:checked + svg {
    --tick-offset: 46.5px;
  }

  .checkbox input + svg {
    --dot-x: 14px;
    --dot-y: -14px;
    --dot-s: 1;
    --tick-offset: 20.5px;
    --tick-array: 16.5px;
    --tick-s: 1;
    --drop-s: 1;
  }

  .checkbox input + svg .tick {
    fill: none;
    stroke-width: 3px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #ffffff;
    stroke-dasharray: var(--tick-array) 33px;
    stroke-dashoffset: var(--tick-offset);
    transform-origin: 10.5px 16px;
    transform: scale(var(--tick-s)) translateZ(0);
  }

  .checkbox input + svg .dot {
    transform-origin: 10.5px 15.5px;
    transform: translate(var(--dot-x), var(--dot-y)) scale(var(--dot-s))
      translateZ(0);
  }

  .checkbox input + svg .drop {
    transform-origin: 25px -1px;
    transform: scale(var(--drop-s)) translateZ(0);
  }
}
</style>
