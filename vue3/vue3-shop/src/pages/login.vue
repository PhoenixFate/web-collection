<template>
    <!-- 行提供 gutter 属性来指定列之间的间距，其默认值为0 -->
    <el-row :gutter="0" class="bg-indigo-500 min-h-screen">
        <el-col :span="16" class="flex items-center justify-center">
            <div>
                <div class="font-bold text-5xl text-light-50 mb-4">欢迎光临</div>
                <div class="text-gray-200 text-sm">此站点是 vue3+vite 商城后端管理项目前端</div>
            </div>
        </el-col>
        <el-col :span="8" class="bg-light-50 flex items-center justify-center flex-col">
            <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
            <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
                <span class="h-[1px] w-16 bg-gray-200"></span>
                <span>账号密码登录</span>
                <span class="h-[1px] w-16 bg-gray-200"></span>
            </div>
            <el-form :model="form" class="w-[250px]">
                <el-form-item>
                    <el-input v-model="form.name" placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" placeholder="请输入密码"/>
                </el-form-item>
                <el-form-item>
                    <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const form = reactive({
    name: '',
    password:''
})

const onSubmit = () => {
    console.log('submit!')
}
</script>