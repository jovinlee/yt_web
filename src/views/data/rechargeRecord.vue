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
                    <el-table-column label="编号" width="100" align="center">
                        <template slot-scope="scope">{{scope.row.id}}</template>
                    </el-table-column>
                    <el-table-column label="购买积分" align="center">
                        <template slot-scope="scope">{{scope.row.integral}}</template>
                    </el-table-column>
                    <el-table-column label="到账时间" width="200" align="center">
                        <template slot-scope="scope">{{scope.row.createDt}}</template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination-container">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        layout="total, sizes,prev, pager, next,jumper"
                        :page-size="pageSize"
                        :page-sizes="[10,20,30]"
                        :current-page.sync="pageNum"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import {accountAddRecord,getAllPlat} from '@/api/platform'
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
                dialogVisible: false,
                pageNum: 1,
                pageSize: 10,
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
                const listQuery={
                    appid: this.choseAppid,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }
                accountAddRecord(listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.data.records;
                    this.total = response.data.total;
                });
            },
            handleSizeChange(val) {
                this.pageNum = 1;
                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
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


