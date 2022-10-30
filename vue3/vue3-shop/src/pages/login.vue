<template>
        <!-- 行提供 gutter 属性来指定列之间的间距，其默认值为0 -->
        <el-row :gutter="0" class="bg-indigo-500 min-h-screen">
            <el-col :span="16" class="flex items-center justify-center flex-col">
                左边
            </el-col>
            <el-col :span="8" class="bg-light-50 flex items-center justify-center flex-col">
                右边
            </el-col>
        </el-row>
</template>