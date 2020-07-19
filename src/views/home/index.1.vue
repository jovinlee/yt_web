<template>
    <div class="app-container">
        <div class="total-layout">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="total-frame">
                        <svg-icon icon-class="order" class="total-icon">
                        </svg-icon>
                        <div class="total-title"><a href="https://gitee.com/zscat/mall">今日消耗积分</a></div>
                        <div class="total-value">{{homeData.memUseJf}}</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="total-frame">
                        <svg-icon icon-class="order" class="total-icon">
                        </svg-icon>
                        <div class="total-title"><a href="https://gitee.com/zscat/mall">平台剩余积分</a></div>
                        <div class="total-value">{{homeData.currJf}}</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="total-frame">
                        <svg-icon icon-class="order" class="total-icon">
                        </svg-icon>
                        <div class="total-title"><a href="https://gitee.com/zscat/mall">今日兑换积分</a></div>
                        <div class="total-value">{{homeData.changeJf}}</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="overview-layout">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="out-border">
                        <div class="layout-title">平台信息</div>
                        <div style="padding: 40px">
                            <el-row>
                                <el-col :span="8" class="color-danger overview-item-value">{{myself.appName}}</el-col>
                                <el-col :span="8" class="color-danger overview-item-value">{{myself.appKey}}</el-col>
                                <el-col :span="8" class="color-danger overview-item-value">{{myself.whiteIp&&myself.whiteIp.replace(/;/g,"\n")}}</el-col>
                            </el-row>
                            <el-row class="font-medium">
                                <el-col :span="8" class="overview-item-title">平台名称</el-col>
                                <el-col :span="8" class="overview-item-title">平台key</el-col>
                                <el-col :span="8" class="overview-item-title">白名单</el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="statistics-layout">
            <div class="layout-title">订单统计</div>
            <el-row>
                <el-col :span="20">
                    <div style="padding: 10px;border-left:1px solid #DCDFE6">
                        <el-date-picker
                                style="float: right;z-index: 1"
                                size="small"
                                v-model="orderCountDate"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                @change="_queryStatisticsData"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                        <div>
                            <ve-line
                                    :data="staticData"
                                    :legend-visible="false"
                                    :loading="loading"
                                    :data-empty="dataEmpty"
                                    :settings="chartSettings"></ve-line>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {str2Date} from '@/utils/date';
    import {getPlatInfo, getHomeData, queryStatisticsData} from '@/api/home'
    import {createStore, getStore, updateStore} from '@/api/sys/store'
    import {formatDate} from '@/utils/date';
    export default {
        name: 'home',
        data() {
            return {
                orderCountDate:'',
                myself:{},
                homeData:{},
                staticData:{},
                chartSettings: {
                    xAxisType: 'time',
                    area: true,
                    axisSite: {right: ['exchangeIntegral']},
                    labelMap: {'exchangeIntegral': '兑换积分', 'usedIntegral': '消耗积分'}
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const startDt = new Date();
                            const endDt = new Date(startDt.getTime()-7*24*60*60*1000);
                            this.orderCountDate=[formatDate(endDt, 'yyyy-MM-dd'),formatDate(startDt, 'yyyy-MM-dd')]
                            picker.$emit('pick', [endDt, startDt]);
                        }
                    }, {
                        text: '最近30天',
                        onClick(picker) {
                            const startDt = new Date();
                            const endDt = new Date(startDt.getTime()-30*24*60*60*1000);
                            this.orderCountDate=[formatDate(endDt, 'yyyy-MM-dd'),formatDate(startDt, 'yyyy-MM-dd')]
                            picker.$emit('pick', [endDt, startDt]);
                            picker.$emit('pick', [endDt, startDt]);
                        }
                    }]
                },
                loading: false,
                dataEmpty: false
            }
        },
        computed:{
            whiteIP(){
                return $this.myself.whiteIp.repalce(";","/n")
            },
            startDt(){
                return this.orderCountDate?this.orderCountDate[0]:"";
            },
            endDt(){
                return this.orderCountDate?this.orderCountDate[1]:"";
            }
        },
        created() {
            this.initOrderCountDate();
            this._getPlatInfo();
            this._getHomeData();
            this._queryStatisticsData();
        },
        methods: {
            _getPlatInfo(){
                getPlatInfo().then(res=>{
                    this.myself=res.data;
                })
            },
            _getHomeData(){
                getHomeData().then(res=>{
                    this.homeData=res.data;
                })
            },
            _queryStatisticsData(){
                const params={
                    appid:this.$store.state.user.userInfo.appid,
                    startDt:this.startDt,
                    endDt:this.endDt,
                }
                queryStatisticsData(params).then(res=>{
                    this.staticData={
                        rows:res.data,
                        columns: ['statDay', 'exchangeIntegral', 'usedIntegral'],
                    }
                })
            },
            initOrderCountDate(){
                const startDt = new Date();
                const endDt = new Date(startDt.getTime()-7*24*60*60*1000);
                this.orderCountDate=[formatDate(endDt, 'yyyy-MM-dd'),formatDate(startDt, 'yyyy-MM-dd')]
            }
        }
    }
</script>

<style scoped>
    .app-container {
        margin-top: 40px;
        margin-left: 120px;
        margin-right: 120px;
    }

    .total-layout {
    }

    .total-frame {
        border: 1px solid #DCDFE6;
        padding: 20px;
        height: 100px;
    }

    .total-icon {
        color: #409EFF;
        width: 60px;
        height: 60px;
    }

    .total-title {
        position: relative;
        font-size: 16px;
        color: #909399;
        left: 70px;
        top: -50px;
    }

    .total-value {
        position: relative;
        font-size: 18px;
        color: #606266;
        left: 70px;
        top: -40px;
    }

    .un-handle-layout {
        margin-top: 20px;
        border: 1px solid #DCDFE6;
    }

    .layout-title {
        color: #606266;
        padding: 15px 20px;
        background: #F2F6FC;
        font-weight: bold;
    }

    .un-handle-content {
        padding: 20px 40px;
    }

    .un-handle-item {
        border-bottom: 1px solid #EBEEF5;
        padding: 10px;
    }

    .overview-layout {
        margin-top: 20px;
    }

    .overview-item-value {
        font-size: 24px;
        text-align: center;
    }

    .overview-item-title {
        margin-top: 10px;
        text-align: center;
    }

    .out-border {
        border: 1px solid #DCDFE6;
    }

    .statistics-layout {
        margin-top: 20px;
        border: 1px solid #DCDFE6;
    }
</style>
