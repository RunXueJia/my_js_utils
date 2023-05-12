<template>
  <div id="index">
    <div class="nav">
      <router-link to="/home">首页</router-link>
      <br />
      <router-link to="/about">关于</router-link>
    </div>

    <router-view />
  </div>
</template>

<style lang="scss">
#index {
  display: flex;
  .nav {
    margin-right: 20px;
    border-right: 2px solid red;
    padding-right: 10px;
  }
}
</style>
