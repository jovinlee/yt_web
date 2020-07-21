<template>
    <div class="app-container">
        <div class="user-top">
            <div class="area">
                <div class="top">帐户余额</div>
                <div class="bottom">{{this.$store.state.user.user.balance||0}}</div>
            </div>
            <div class="area">
                <div class="top">今日消耗</div>
                <div class="bottom">{{homeData.showTimes||0}}</div>
            </div>
            <div class="area">
                <div class="top">总充值金额</div>
                <div class="bottom">{{this.$store.state.user.user.totalAmt||0}}</div>
            </div>
        </div>
        <div class="txt">投放概览</div>
        <div class="user-top">
            <div class="area">
                <div class="top">曝光量</div>
                <div class="bottom">{{homeData.showTimes||0}}</div>
            </div>
            <div class="area">
                <div class="top">点击量</div>
                <div class="bottom">{{homeData.clickTimes||0}}</div>
            </div>
            <div class="area">
                <div class="top">点击率</div>
                <div class="bottom">{{homeData.clickRate||0}}</div>
            </div>
            <div class="area">
                <div class="top">消耗</div>
                <div class="bottom">{{homeData.xiaofei||0}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getHomeData} from "../../api/home.js";
    import moment from 'moment';
    export default {
        name: 'home',
        data() {
            return {
                homeData:{}
            }
        },
        computed:{
        },
        created() {
            console.log(this.$store.state.user);
            var params = {
                createDate:moment().format("YYYY-MM-DD"),
                userId:this.$store.state.user.user.rowId
            }
            getHomeData(params).then(res=>{
                if(res.status==1){
                    this.homeData = res.data||{};
                }
            });
        },
        methods: {}
    }
</script>
<style rel="stylesheet/scss" lang="scss"  scoped>

.app-container {
    padding: 150px;
    .txt{
        padding:50px 0 10px;
        font-size: 20px;
    }
    .user-top{
        display: flex;
        /*width:750px;*/
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
