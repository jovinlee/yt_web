<template>
    <div class="app-container">
        <div class="user-top">
            <div class="area">
                <div class="top">帐户余额</div>
                <div class="bottom">123123</div>
            </div>
            <div class="area">
                <div class="top">今日消耗</div>
                <div class="bottom">1111</div>
            </div>
            <div class="area">
                <div class="top">总充值金额</div>
                <div class="bottom">123123123</div>
            </div>
        </div>
        <div class="txt">投放概览</div>
        <div class="user-top">
            <div class="area">
                <div class="top">暴光量</div>
                <div class="bottom">123123</div>
            </div>
            <div class="area">
                <div class="top">点击量</div>
                <div class="bottom">1111</div>
            </div>
            <div class="area">
                <div class="top">点周率</div>
                <div class="bottom">123123123</div>
            </div>
            <div class="area">
                <div class="top">消耗</div>
                <div class="bottom">123123123</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {}
        },
        computed:{
        },
        created() {
        },
        methods: {}
    }
</script>
<style rel="stylesheet/scss" lang="scss"  scoped>
.app-container {
    .txt{
        padding:50px 0 10px;
        font-size: 20px;
    }
    .user-top{
        display: flex;
        width:750px;
        .area{
            display: flex;
            flex-wrap: wrap;
            width:33%;
            text-align: center;
            border:1px solid #ededed;
            padding:10px;
            .top{
                width: 100%;
                font-size: 20px;
                color:#333;
                padding-bottom: 10px;
            }
            .bottom{
                width: 100%;
                font-size: 25px;
                color: #666;
            }
        }
    }
}
</style>
