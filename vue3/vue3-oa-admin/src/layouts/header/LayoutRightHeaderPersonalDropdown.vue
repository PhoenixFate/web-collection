<template>
  <div
    class="personal-menu"
    :class="{ 'personal-menu-active': personalMenuFlag }"
    @mouseenter="$emit('showPersonalMenu')"
    @mouseleave="$emit('hidePersonalMenu')"
  >
    <div class="personal-menu-content">
      <div class="personal-menu-item personal-menu-userinfo">
        <div class="personal-menu-userinfo-top">
          <div class="user-info-left">
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
          <div class="user-info-right">
            <h2>管理员</h2>
            <h4>{{ $store.state.user.username }}</h4>
          </div>
        </div>
        <div class="personal-menu-userinfo-bottom">
          <h4><span>信息公司</span> <span>信息中心</span></h4>
          <h5><span>女</span><span>32岁</span><span>2018.08入职</span></h5>
        </div>
      </div>
      <div
        class="personal-menu-item personal-menu-item-middle"
        v-for="(item, index) in personalMenuList"
        @click="$emit('toPersonalMenu', index)"
        :key="index"
      >
        <div>
          <svg-icon :name="item.icon" />
          <span>{{ item.title }}</span>
        </div>
      </div>
      <div class="personal-menu-item">
        <div class="personal-menu-bottom" @click="handlerLogout()">
          退出登录
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useLogout } from "@/composables/useManager";
const { handlerLogout } = useLogout();

const personalMenuList = [
  {
    icon: "personal-user",
    title: "个人中心",
  },
  {
    icon: "personal-password",
    title: "修改密码",
  },
  {
    icon: "personal-login-log",
    title: "登录日志",
  },
  {
    icon: "personal-settings",
    title: "系统设置",
  },
];
defineProps({
  personalMenuFlag: {
    type: Boolean,
  },
});
defineEmits(["showPersonalMenu", "hidePersonalMenu", "toPersonalMenu"]);
</script>
<style scoped lang="scss">
.personal-menu {
  position: fixed;
  z-index: 100;
}

.personal-menu:before,
.personal-menu:after {
  content: "";
  position: fixed;
  right: 0.75rem;
  top: calc(120px - 0rem);
  width: 0;
  height: 0;
  background-color: rgba(80, 77, 84, 0.1);
  border-bottom-left-radius: 200%;
  z-index: -1;
  transition: border-radius linear 0.8s,
    width cubic-bezier(0.77, 0, 0.175, 1) 0.6s,
    height cubic-bezier(0.77, 0, 0.175, 1) 0.6s;
}

.personal-menu:after {
  background-color: white;
  background-image: url("/image/header/personal-dropdown.svg");
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  transition-delay: 0.2s;
  box-shadow: -6px 7px 28px 0 rgba(40, 40, 40, 0.2);
}

.personal-menu:before {
  transition-delay: 0.26s;
}

.personal-menu-active.personal-menu:before,
.personal-menu-active.personal-menu:after {
  width: 250px;
  height: 360px;
  border-radius: 20px;
}

.personal-menu-active.personal-menu:after {
  -webkit-transition-delay: 0.26s;
  transition-delay: 0.26s;
}

.personal-menu-active.personal-menu:before {
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}
.personal-menu-active.personal-menu {
  visibility: visible;
}
.personal-menu-active .personal-menu-content {
  visibility: visible;
}
.personal-menu-content {
  position: fixed;
  right: 0.75rem;
  top: calc(120px - 0rem);
  width: 250px;
  height: 360px;
  visibility: hidden;
}

.personal-menu-item {
  width: 100%;
  opacity: 0;
  font-size: 1rem;
  line-height: 1.2;
  transition: all 0.3s linear;
  transform: translate(120px, 0%);
  transition: opacity 0.5s ease, transform 0.5s ease;
  z-index: 2;
}

.personal-menu-item:nth-child(1) {
  transition-delay: 0.25s;
}
.personal-menu-item:nth-child(2) {
  transition-delay: 0.2s;
}
.personal-menu-item:nth-child(3) {
  transition-delay: 0.15s;
}
.personal-menu-item:nth-child(4) {
  transition-delay: 0.1s;
}
.personal-menu-item:nth-child(5) {
  transition-delay: 0.05s;
}
.personal-menu-item:nth-child(6) {
  transition-delay: 0s;
}

.personal-menu-item-middle {
  letter-spacing: 2px;
  margin: 0 10px;
  width: calc(100% - 20px);
  font-size: 0.9rem;
  height: 40px;
  cursor: pointer;
  > div {
    height: 100%;
    width: 100%;
    padding-left: 30px;
    transition: all 0.3s;
    @apply flex justify-start items-center rounded-lg text-gray-500;
    span {
      @apply ml-3;
    }
  }
  > div:hover {
    padding-left: 50px;
    background-color: rgba(221, 220, 220, 0.4);
    @apply text-gray-900 font-bold;
  }
}
.personal-menu-bottom {
  height: 50px;
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background: rgba(#d4dced, 0.4);
  color: #868eae;
  letter-spacing: 2px;
  font-size: 1rem;
  margin-top: 10px;
  transition: all 0.3s;
  cursor: pointer;
  @apply flex justify-center items-center;
  &:hover {
    background: rgba(#d4dced, 0.64);
    font-size: 1.2rem;
    @apply text-red-400;
  }
}

.personal-menu-active {
  .personal-menu-item {
    opacity: 1;
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transition: opacity 0.5s ease, color 0.5s ease,
      -webkit-transform 0.5s ease;
    transition: opacity 0.5s ease, color 0.5s ease, -webkit-transform 0.5s ease;
    transition: opacity 0.5s ease, transform 0.3s ease, color 0.5s ease;
    transition: opacity 0.5s ease, transform 0.3s ease, color 0.5s ease,
      -webkit-transform 0.5s ease;
  }
  .personal-menu-item:nth-child(1) {
    transition-delay: 0.8s;
  }
  .personal-menu-item:nth-child(2) {
    transition-delay: 0.9s;
  }
  .personal-menu-item:nth-child(3) {
    transition-delay: 1s;
  }
  .personal-menu-item:nth-child(4) {
    transition-delay: 1.1s;
  }
  .personal-menu-item:nth-child(5) {
    transition-delay: 1.2s;
  }
  .personal-menu-item:nth-child(6) {
    transition-delay: 1.3s;
  }
}

.personal-menu-userinfo {
  height: 120px;
  width: calc(100% - 20px);
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 0;
  transition: all 0.3s;
  background-color: rgba(180, 180, 180, 0.2);
  &:hover {
    background-color: rgba(180, 180, 180, 0.3);
  }
  @apply rounded-xl;
  .personal-menu-userinfo-top {
    height: 80px;
    @apply flex justify-center items-center;
    .user-info-left {
      width: 100px;
      height: 80px;
      @apply flex justify-center items-center;
    }
    .user-info-left img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .user-info-right {
      padding-left: 10px;
      padding-top: 6px;
      @apply flex-1;
    }

    .user-info-right h2 {
      font-size: 1.3rem;
      font-family: "jxht", sans-serif;
    }
    .user-info-right h4 {
      font-weight: normal;
      font-size: 0.9rem;
      @apply text-gray-600 mt-2;
    }
  }
  .personal-menu-userinfo-bottom {
    height: 40px;
    background-color: rgba(200, 200, 200, 0.3);
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    padding-left: 2rem;
    padding-top: 0.2rem;
    h4 {
      font-size: 0.9rem;
      line-height: 1.2;
      font-weight: bold;
      span {
        margin-right: 0.6rem;
      }
    }
    h5 {
      font-size: 0.7rem;
      line-height: 1.2;
      letter-spacing: 0px;
      @apply text-gray-500;
      margin-top: 0.2rem;
      span {
        margin-right: 0.6rem;
      }
    }
  }
}
</style>
