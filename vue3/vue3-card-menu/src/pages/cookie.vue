<template>
    <div>
        cookie 功能测试 <br>
        <el-button @click="setCookie()">设置cookie</el-button>
        <el-button @click="getCookie()">读取cookie</el-button>
        <el-button @click="deleteCookie()">删除cookie</el-button>

    </div>
</template>
<script setup>
import {useCookies} from "@vueuse/integrations/useCookies"
const cookie=useCookies()
console.log(cookie)
function setCookie(){
    cookie.set("test-token","abc")
}
function getCookie(){
    console.log(cookie.get("test-token"))
}
function deleteCookie(){
    cookie.remove("test-token")
}
</script>