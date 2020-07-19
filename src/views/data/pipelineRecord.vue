<template> 

    <div class="condition">
        <el-select v-if="name=='admin'" v-model="choseAppid" @change="getList" placeholder="请选择分类">
            <el-option
                    v-for="item in allPlat"
                    :key="item.appid"
                    :label="item.appName"
                    :value="item.appid">
            </el-option>
        </el-select>
        <div class="app-container">
            <div class="table-container">
                <el-table ref="productAttrCateTable"
                        style="width: 100%"
                        :data="list"
                        v-loading="listLoading"
                        border>
                    <el-table-column label="平台流水编号" width="220" align="center">
                        <template slot-scope="scope">{{scope.row.platBizNo}}</template>
                    </el-table-column>
                    <el-table-column label="用户标识" width="200" align="center">
                        <template slot-scope="scope">{{scope.row.uniodid}}</template>
                    </el-table-column>
                    <el-table-column label="兑换积分" width="120" align="center">
                        <template slot-scope="scope">{{scope.row.integral}}</template>
                    </el-table-column>
                    <el-table-column label="平台兑换前" width="140" align="center">
                        <template slot-scope="scope">{{scope.row.currIntegral}}</template>
                    </el-table-column>
                    <el-table-column label="平台兑换后" width="140" align="center">
                        <template slot-scope="scope">{{scope.row.afterIntegral}}</template>
                    </el-table-column>
                    <el-table-column label="兑换时间" width="130" align="center">
                        <template slot-scope="scope">{{scope.row.createDt}}</template>
                    </el-table-column>
                    <el-table-column label="服务器IP" width="180" align="center">
                        <template slot-scope="scope">{{scope.row.ip}}</template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination-container">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        layout="total, sizes,prev, pager, next,jumper"
                        :page-size="listQuery.pageSize"
                        :page-sizes="[10,20,30]"
                        :current-page.sync="listQuery.pageNum"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import {accountSubtractRecord,getAllPlat} from '@/api/platform'
    import {formatDate} from "@/utils/date";

    export default {
        name: 'productAttrCateList',
        data() {
            return {
                allPlat: [],
                choseAppid: this.$store.state.user.userInfo.appid,
                name: this.$store.state.user.userInfo.name,
                list: null,
                total: null,
                listLoading: true,
                listQuery: {
                    // appid: this.$store.state.user.userInfo.name == 'admin' ? choseAppid : this.$store.state.user.userInfo.appid,
                    appid: this.$store.state.user.userInfo.appid ,
                    pageNum: 1,
                    pageSize: 10
                },
                dialogVisible: false,
                dialogTitle: '',
                productAttrCate: {
                    name: '',
                    id: null
                },
                rules: {
                    name: [
                        {required: true, message: '请输入类型名称', trigger: 'blur'}
                    ]
                }
            };
        },
        created() {
            if(this.name == 'admin'){
                this._getAllPlat().then(()=>{
                    this.getList();
                })
            }else{
                this.getList();
            }
        },
        filters: {
            formatCreateTime(time) {
                let date = new Date(time);
                return formatDate(date, "yyyy-MM-dd HH:mm:ss");
            }
        },
        methods: {
            getList() {
                this.listLoading = true;
                this.listQuery.appid=this.choseAppid
                accountSubtractRecord(this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.data.records;
                    this.total = response.data.total;
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getList();
            },
            _getAllPlat(){
                return getAllPlat().then(res=>{
                    this.allPlat=res.data,
                    this.choseAppid=res.data[0].appid;
                })
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


