<template>
    <div class="app-container">
        <div class="block">
            <span class="demonstration">日期</span>
            <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </div>
        <div class="table-container">
            <el-table :data="list" border style="width: 555px;margin:0 auto;">
                <el-table-column fixed prop="createDate" label="日期" width="150"></el-table-column>
                <el-table-column prop="companyName" label="公司名称" width="200"></el-table-column>
                <el-table-column prop="xiaofei" label="消费" width="100"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="edit_form_show(scope.row)" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import moment from "moment";
    import {updateBizData,bizDataList,addBizData} from '@/api/data_report'
    import {mapState} from "vuex";
    export default {
        data() {
            return {
                userList:[],
                pageNum:1,
                pageSize:10,
                date:[moment().day(-30).format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')],
                list:[],
                reset:{},
                form:{
                    userId:"",
                    avg:"",
                    chujia:"",
                    clickRate:"",
                    clickTimes:"",
                    createDate:"",
                    showTimes:"",
                    userId:"",
                    xiaofei:""
                },
                dialogFormVisible:true
            };
        },
        computed:{
            startDate:function(){
                if(this.date){
                    var d=this.date[0];
                    var date=new Date(d);
                    return moment(date).format("YYYY-MM-DD");
                }

            },
            endDate:function(){
                if(this.date){
                    var d=this.date[1];
                    var date=new Date(d);
                    return moment(date).format("YYYY-MM-DD");
                }
            }
        },
        created() {
            this.getBizDataList();
        },
        filters: {
            formatCreateTime(time) {
                let date = new Date(time);
                return formatDate(date, "yyyy-MM-dd HH:mm:ss");
            }
        },
        methods: {
            getBizDataList(){
                let params={
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    startDate:this.startDate,
                    endDate:this.endDate,
                    userId:this.$store.state.user.user.rowId
                }
                bizDataList(params).then((res)=>{
                    if(res.status==1){
                    this.list=res.data.records;
                }
                })
            },
            add_form_show:function(){
                this.dialogFormVisible=true;
            },
            add_form_hide:function(){
                this.form={};
                this.dialogFormVisible=false;
            },
            add_submit:function(){
                addBizData(this.form).then(res=>{
                    if(res.status==1){
                        this.form={};
                        this.add_form_hide();
                    }
                });
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.title{
    display: flex;
    width:800px;
    padding:30px 0;
    div{
        width:200px;
    }
}
</style>