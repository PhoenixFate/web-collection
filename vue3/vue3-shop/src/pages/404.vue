<template>
    <div>
        <el-result icon="warning" title="Warning Tip" sub-title="您找的页面走丢了～">
            <template #extra>
                <el-button type="primary" @click="this.$router.push('/')">返回首页</el-button>
            </template>
        </el-result>
    </div>
</template>