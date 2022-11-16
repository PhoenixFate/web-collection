<template>
  <div
    class="personal-image"
    :class="{ 'personal-image-active': personalImageFlag }"
  >
    <div class="personal-image-content">
      <div class="personal-image-item">
        <img
          :src="$store.state.user.avatar"
          alt=""
          v-if="$store.state.user.avatar"
        />
        <img
          src="/image/header/avatar-default-man.png"
          v-if="!$store.state.user.avatar"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  personalImageFlag: {
    type: Boolean,
  },
});
defineEmits(["showPersonalImage", "hidePersonalImage"]);
</script>
<style scoped lang="scss">
.personal-image {
  position: fixed;
  z-index: 100;
}

.personal-image:before,
.personal-image:after {
  content: "";
  position: fixed;
  right: 30px;
  top: calc(100px - 0.5rem);
  width: 250px;
  height: 0px;
  background-color: rgba(80, 77, 84, 0.1);
  border-bottom-left-radius: 500%;
  border-bottom-right-radius: 500%;
  z-index: -1;
  transition: border-radius linear 0.8s,
    width cubic-bezier(0.77, 0, 0.175, 1) 0.6s,
    height cubic-bezier(0.77, 0, 0.175, 1) 0.6s;  
}

.personal-image:after {
  background-color: white;
  background-image: url("/image/header/personal-dropdown.svg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 200%;
  transition-delay: 0.2s;
  box-shadow: -6px 7px 28px 0 rgba(40, 40, 40, 0.4);
}

.personal-image:before {
  transition-delay: 0.26s;
}

.personal-image-active.personal-image:before,
.personal-image-active.personal-image:after {
  width: 250px;
  height: 250px;
  border-radius: 20px;
}

.personal-image-active.personal-image:after {
  -webkit-transition-delay: 0.26s;
  transition-delay: 0.26s;
}

.personal-image-active.personal-image:before {
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}
.personal-image-active.personal-image {
  visibility: visible;
}
.personal-image-content {
  position: fixed;
  right: 30px;
  top: calc(100px - 0.5rem);
  width: 250px;
  height: 250px;
  visibility: hidden;
  padding: 10px;
}

.personal-image-item {
  width: 230px;
  height: 30px;
  opacity: 0;
  font-size: 1rem;
  line-height: 1.2;
  transform: translate(0%,0%);
  transition: opacity 0.5s ease, transform 0.5s ease, color 0.5s ease;
  img {
    width: 230px;
    height: 30px;
    border-radius: 18px;
    transition: all 0.5s linear;
  }
}
.personal-image-active {
  .personal-image-content {
    visibility: visible;
    .personal-image-item {
      opacity: 1;
      height: 230px;
      transform: translateY(0%);
      transition: opacity 0.5s ease 0.5s, transform 0.5s ease, color 0.5s ease;
      transition-delay: 0.6s;
      img {
        width: 230px;
        height: 230px;
        transition-delay: 0.6s;
      }
    }
  }
}
</style>
