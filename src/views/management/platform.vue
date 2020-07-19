<template> 
    <div class="app-container">
        <div class="table-container">
            <el-table ref="productAttrCateTable"
                      style="width: 100%"
                      :data="list"
                      v-loading="listLoading"
                      border>
                <el-table-column label="appid" width="220" align="center">
                    <template slot-scope="scope">{{scope.row.appid}}</template>
                </el-table-column>
                <el-table-column label="平台名称" width="200" align="center">
                    <template slot-scope="scope">{{scope.row.appName}}</template>
                </el-table-column>
                <el-table-column label="总消费" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.totalAmt}}</template>
                </el-table-column>
                <el-table-column label="总积分" width="140" align="center">
                    <template slot-scope="scope">{{scope.row.totalJF}}</template>
                </el-table-column>
                <el-table-column label="当前积分" width="140" align="center">
                    <template slot-scope="scope">{{scope.row.currJF}}</template>
                </el-table-column>
                <el-table-column label="白名单" width="150" align="center">
                    <template slot-scope="scope">{{scope.row.whiteIp}}</template>
                </el-table-column>

                <el-table-column label="白名单" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini"
                                @click="modify(scope.row)">修改
                        </el-button>
                        <el-button size="mini"
                                @click="recharge(scope.row)">充值
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="平台更新" :visible.sync="modifyShow" width='55%'>
            <el-form ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
                <el-form-item label="平台名称">
                    <el-input v-model="modifyItem.appName"></el-input>
                </el-form-item>
                <el-form-item label="平台key">
                    <el-input v-model="modifyItem.appKey"></el-input>
                </el-form-item>
                <el-form-item label="白名单">
                    <el-input v-model="modifyItem.whiteIp"></el-input>
                </el-form-item>
            </el-form>
            <div style="clear: both;"></div>
            <div slot="footer">
                <el-button  size="small" @click="modifyShow = false">取 消</el-button>
                <el-button  size="small" @click="modifySubmit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="充值" :visible.sync="rechargeShow" width='55%'>
            <el-form ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
                <el-form-item label="积分">
                    <el-input v-model="rechargeItem.JF"></el-input>
                </el-form-item>
                <el-form-item label="金额">
                    <el-input v-model="rechargeItem.amount"></el-input>
                </el-form-item>
            </el-form>
            <div style="clear: both;"></div>
            <div slot="footer">
                <el-button  size="small" @click="rechargeShow = false">取 消</el-button>
                <el-button  size="small" @click="rechargeSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {getPlatInfoList,updatePlatform,addJF} from '@/api/admin'
    import {formatDate} from "@/utils/date";

    export default {
        name: 'productAttrCateList',
        data() {
            return {
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
                },
                modifyShow:false,
                modifyItem:{},
                rechargeShow:false,
                rechargeItem:{
                    JF:0,
                    amount:0
                }
            };
        },
        created() {
            this.getList();
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
                getPlatInfoList().then(response => {
                    this.listLoading = false;
                    this.list = response.data;
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
            modify(item){
                this.modifyItem = Object.assign({},item);
                this.modifyShow=true;
            },
            modifySubmit(){
                const params={
                    ...this.modifyItem
                }
                updatePlatform(params).then(res=>{
                    this.modifyItem = {};
                    this.modifyShow=false;
                    this.getList();
                })
            },
            recharge(item){
                this.rechargeShow=true;
                this.rechargeItem.appid = item.appid;
            },
            rechargeSubmit(){
                const params={
                    ...this.rechargeItem
                }
                addJF(params).then(res=>{
                    this.rechargeItem = {
                        JF:0,
                        amount:0
                    };
                    this.rechargeShow=false;
                    this.getList();
                })
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


