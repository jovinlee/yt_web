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
                    <el-table-column label="用户名" align="center">
                        <template slot-scope="scope">{{scope.row.name}}</template>
                    </el-table-column>
                    <el-table-column label="当前余额" align="center">
                        <template slot-scope="scope">{{scope.row.blance}}</template>
                    </el-table-column>
                    <el-table-column label="总消费" align="center">
                        <template slot-scope="scope">{{scope.row.buyMoney}}</template>
                    </el-table-column>
                    <el-table-column label="注册时间" width="200" align="center">
                        <template slot-scope="scope">{{scope.row.createTime}}</template>
                    </el-table-column>
                    <el-table-column label="操作" width="200" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="_getMemberChangeRecord(scope.row)">兑换记录
                            </el-button>
                            <el-button
                                    size="mini"
                                    @click="_getMemberBalanceRecord(scope.row)">消费记录
                            </el-button>
                        </template>
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
            <el-dialog title="兑换记录" :visible.sync="changeRecordShow" width='55%'>
                <el-table :data="changeRecord.records" border>
                    <el-table-column label="兑换时间" width="150" align="center">
                        <template slot-scope="scope">{{scope.row.createDt}}</template>
                    </el-table-column>
                    <el-table-column label="流水编号" width="150" align="center">
                        <template slot-scope="scope">{{scope.row.platBizNo}}</template>
                    </el-table-column>
                    <el-table-column label="兑换积分" width="150" align="center">
                        <template slot-scope="scope">{{scope.row.integral}}</template>
                    </el-table-column>
                    <el-table-column label="服务器IP" width="150" align="center">
                        <template slot-scope="scope">{{scope.row.ip}}</template>
                    </el-table-column>
                    <el-table-column label="用户标识" width="150" align="center">
                        <template slot-scope="scope">{{scope.row.uniodid}}</template>
                    </el-table-column>
                </el-table>
                <div class="pagination-container">
                    <el-pagination
                    background
                    @current-change="changeRecordPage"
                    layout="prev, pager, next"
                    :current-page.sync="changeRecord.current"
                    :page-size="changeRecord.size"
                    :page-sizes="[5,10,15]"
                    :total="changeRecord.total">
                    </el-pagination>
                </div>
                <div style="clear: both;"></div>
                <div slot="footer">
                    <el-button  size="small" @click="changeRecordShow = false">取 消</el-button>
                </div>
            </el-dialog>
            
            <el-dialog title="消费记录" :visible.sync="balanceRecordShow"  width='50%'>
                <el-table :data="balanceRecord.records" border >
                    <el-table-column label="消费时间" width="250" align="center">
                        <template slot-scope="scope">{{scope.row.createTime}}</template>
                    </el-table-column>
                    <el-table-column label="消费金额" width="150" align="center">
                        <template slot-scope="scope">{{scope.row.price}}</template>
                    </el-table-column>
                    <el-table-column label="订单号" width="150" align="center">
                        <template slot-scope="scope">{{scope.row.note}}</template>
                    </el-table-column>
                </el-table>
                <div class="pagination-container">
                    <el-pagination
                    background
                    @current-change="balanceRecordPage"
                    layout="prev, pager, next"
                    :current-page.sync="balanceRecord.current"
                    :page-size="balanceRecord.size"
                    :page-sizes="[5,10,15]"
                    :total="balanceRecord.total">
                    </el-pagination>
                </div>
                <div style="clear: both;"></div>
                <div slot="footer">
                    <el-button  size="small" @click="balanceRecordShow = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
   </div>
</template>
<script>
    import {getMembers,getMemberChangeRecord,getMemberBalanceRecord,getAllPlat} from '@/api/platform'
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
                changeRecordItem:{},
                changeRecord:[],
                changeRecordShow:false,
                changeRecordOpt:{
                    appid: this.$store.state.user.userInfo.appid ,
                    pageNum: 1,
                    pageSize: 10
                },
                balanceRecordItem:{},
                balanceRecord:[],
                balanceRecordShow:false,
                balanceRecordOpt:{
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
                this.listQuery.appid=this.choseAppid;
                getMembers(this.listQuery).then(response => {
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
            _getMemberChangeRecord(item){
                this.changeRecordItem=item;
                this.changeRecordPage(1)
            },
            changeRecordPage(pageNum){
                const params={
                    mid:this.changeRecordItem.id,
                    ...this.changeRecordOpt,
                    pageNum
                }
                getMemberChangeRecord(params).then(res=>{
                    this.changeRecordShow=true;
                    this.changeRecord=res.data;
                })
            },
            _getMemberBalanceRecord(item){
                this.balanceRecordItem=item;
                this.balanceRecordPage(1)
            },
            balanceRecordPage(pageNum){
                const params={
                    mid:this.balanceRecordItem.id,
                    ...this.balanceRecordOpt,
                    pageNum
                }
                getMemberBalanceRecord(params).then(res=>{
                    this.balanceRecordShow=true;
                    this.balanceRecord=res.data;
                })
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


