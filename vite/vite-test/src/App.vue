<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import axios from "axios";
const test=()=>{
  console.log("ttest")
  axios.get("http://localhost:10601/system/open/user/username/oaAdmin").then((res)=>{
    console.log(res)
  })
}
const test2=()=>{
  console.log("ttest222222")
  axios.post("http://localhost:10602/auth/oauth/token",
  {
    "grant_type":"password",
    "username":"oaAdmin",
    "password":"123456"
  },
  {
    headers:{
      "Authorization":"Basic b2EtYWR2YW5jZWQtYWRtaW46MTIzNDU2",
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res)=>{
    console.log(res)
  })
}
const test3=()=>{
  console.log("ttest")
  axios.post("http://localhost:10602/auth/login",{
    "grant_type":"password",
    "username":"oaAdmin",
    "password":"123456"
  },{
    headers:{
      "Authorization":"Basic b2EtYWR2YW5jZWQtYWRtaW46MTIzNDU2",
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }).then((res)=>{
    console.log(res)
  })
}
</script>

<template>
  <div>
    <button class="btn" @click="test()">按钮</button> <br>
    <button class="btn" @click="test2()">按钮2</button> <br>
    <button class="btn" @click="test3()">按钮3</button>

    <div style="height: 50px"></div>
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>

    <el-row class="mb-4">
      <el-button plain>Plain</el-button>
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="success" plain>Success</el-button>
      <el-button type="info" plain>Info</el-button>
      <el-button type="warning" plain>Warning</el-button>
      <el-button type="danger" plain>Danger</el-button>
    </el-row>

    <el-row class="mb-4">
      <el-button round>Round</el-button>
      <el-button type="primary" round>Primary</el-button>
      <el-button type="success" round>Success</el-button>
      <el-button type="info" round>Info</el-button>
      <el-button type="warning" round>Warning</el-button>
      <el-button type="danger" round>Danger</el-button>
    </el-row>

  </div>
  <HelloWorld msg="Vite + Vue"/>
</template>

<style >
.btn {
  @apply bg-purple-500 text-indigo-50 px-4 py-2 rounded-lg hover:(bg-purple-900) transition-all duration-1000  focus:(ring-8 ring-purple-900)
}
</style>
