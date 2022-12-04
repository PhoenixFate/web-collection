<template>
  <div class="middle-menu-top">
    <div class="menu-top-item top-item1"></div>
    <div class="menu-top-item top-item2">
      <div class="bounce">
        <span class="letter text-gray1">极</span>
        <span class="letter text-gray1 mr-1">客</span>
        <span class="letter text-golden">O</span>
        <span class="letter mr-1 text-golden">A</span>
        <span class="letter text-gray">办</span>
        <span class="letter text-gray">公</span>
      </div>
      <div class="admin-title2">
        <span>后台管理</span>
      </div>
    </div>
    <div class="menu-top-item top-item3"></div>
    <div class="menu-top-bottom-cover"></div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.middle-menu-top {
  height: 200px;
  width: 420px;
  overflow: hidden;
  position: fixed;
  left: 128px;
  top: 0;
  .menu-top-item {
    position: absolute;
    z-index: 1;
  }
  .menu-top-bottom-cover {
    width: 410px;
    height: 60px;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fff;
  }
  .top-item1 {
    left: 0;
    top: 0;
    width: 80px;
    height: 200px;
    border-radius: 0 80px 80px 0;
    background-color: var(--background-main-color);
  }
  .top-item2 {
    width: 260px;
    height: 260px;
    border-radius: 50%;
    left: 76px;
    top: -94px;
    background-color: #fff;
    position: relative;
    letter-spacing: 2px;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10+ and Edge */
    user-select: none; /* Standard syntax */
    .bounce {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 80px;
      position: absolute;
      bottom: 66px;
      white-space: nowrap;
    }

    .letter {
      animation: bounce 20s cubic-bezier(0.05, 0, 0.2, 1) infinite alternate;
      display: inline-block;
      transform: translate3d(0, 0, 0);
      font: normal 600 2rem "Varela Round", sans-serif;
      font-family: "hlb", sans-serif;
    }

    .admin-title2 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 50px;
      position: absolute;
      bottom: 28px;
      left: 70px;
      font: normal 600 1.6rem "Varela Round", sans-serif;
      font-family: "hlb", sans-serif;
      --admin-title-text2: #a0acc1;
      background: var(--admin-title-text2) -webkit-linear-gradient(
          left,
          var(--admin-title-text2),
          #d8d8d8 40%,
          #fff 70%,
          var(--admin-title-text2)
        ) no-repeat 0 0;
      background-size: 20% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-animation: slideShine 10s linear infinite;
      animation: slideShine 10s linear infinite;
    }

    .letter:nth-child(1) {
      animation-delay: 0s;
    }

    .letter:nth-child(2) {
      animation-delay: 0.2s;
    }

    .letter:nth-child(3) {
      animation-delay: 0.4s;
    }

    .letter:nth-child(4) {
      animation-delay: 0.6s;
    }

    .letter:nth-child(5) {
      animation-delay: 0.8s;
    }

    .letter:nth-child(6) {
      animation-delay: 1s;
    }

    .text-golden {
      background: linear-gradient(to right, #eccc6d, #e89906);
      /*背景被裁剪到文字*/
      -webkit-background-clip: text;
      background-clip: text;
      /*设置文字的填充颜色*/
      -webkit-text-fill-color: transparent;
    }
    .text-golden:hover {
      background: linear-gradient(to right, #bb9010, #f1ed04);
      /*背景被裁剪到文字*/
      -webkit-background-clip: text;
      background-clip: text;
      /*设置文字的填充颜色*/
      -webkit-text-fill-color: transparent;
    }
    .text-gray1 {
      background: linear-gradient(45deg, #f6a46d 0%, #e62d6b 100%);
      /*背景被裁剪到文字*/
      -webkit-background-clip: text;
      background-clip: text;
      /*设置文字的填充颜色*/
      -webkit-text-fill-color: transparent;
    }

    .text-gray1:hover {
      background: linear-gradient(to right, #bb9010, #f1ed04);
      /*背景被裁剪到文字*/
      -webkit-background-clip: text;
      background-clip: text;
      /*设置文字的填充颜色*/
      -webkit-text-fill-color: transparent;
    }

    .text-gray {
      @apply text-gray-800;
    }

    .text-gray:hover {
      /* background: linear-gradient(to right, #edc69e, #f9ad0b); */
      background: linear-gradient(to right, #eccc6d, #e89906);
      /*背景被裁剪到文字*/
      -webkit-background-clip: text;
      background-clip: text;
      /*设置文字的填充颜色*/
      -webkit-text-fill-color: transparent;
    }

    @keyframes bounce {
      0% {
        transform: translate3d(0, 0, 0);
      }

      98% {
        transform: translate3d(0, 0, 0);
      }

      100% {
        transform: translate3d(0, -1em, 0);
      }
    }

    @-webkit-keyframes slideShine {
      0% {
        background-position: -30% -30%;
      }
      74% {
        background-position: -30% -30%;
      }
      100% {
        background-position: 130% 130%;
      }
    }

    @keyframes slideShine {
      0% {
        background-position: -30% -30%;
      }
      74% {
        background-position: -30% -30%;
      }
      100% {
        background-position: 130% 130%;
      }
    }
  }
  .top-item3 {
    left: 332px;
    top: 0;
    width: 80px;
    height: 200px;
    border-radius: 80px 0 0 80px;
    background-color: var(--background-main-color);
  }
}
</style>
