<template>
    <div class="app-container">
        <div class="block">
            <el-button size="small" @click="add_form_show" v-show="this.$store.state.user.user.name == 'admin'">添加数据</el-button>
        </div>
        <div class="table-container">
            <el-table :data="list" border style="width: 750px;margin:0 auto;"  v-loading="listLoading">
                <el-table-column prop="info" label="信息" width="450"></el-table-column>
                <el-table-column prop="companyName" label="公司名称" width="150"></el-table-column>
                <el-table-column prop="createDate" label="日期" width="150"> </el-table-column>
            </el-table>
        </div>
        <!-- <div class="pagination-container">
            <el-pagination
                    background
                    @size-change=""
                    @current-change=""
                    layout="total, sizes,prev, pager, next,jumper"
                    :page-size="data.pageSize"
                    :page-sizes="[10,20,30]"
                    :current-page.sync="data.pageNum"
                    :total="total">
            </el-pagination>
        </div> -->
        <el-dialog title="添加数据" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-position="right" label-width="100px">
                <el-form-item label="公司名称" :label-width="'100px'">
                    <el-select v-model="form.userId" placeholder="请选择公司">
                        <el-option
                                v-for="item in userList"
                                :key="item.value"
                                :label="item.companyName"
                                :value="item.rowId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期" :label-width="'100px'">
                    <el-date-picker
                            v-model="form.createDate"
                            type="datetime"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="信息" :label-width="'100px'">
                    <el-input v-model="form.info" autocomplete="off" :style="{width:'400px'}"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="add_form_hide">取 消</el-button>
                <el-button type="primary" @click="add_submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import moment from "moment";
    import {userList}  from '@/api/user';
    import {addMessage,messageList,} from '@/api/message.js';
    import {mapState} from "vuex";
    export default {
        data() {
            return {
                userList:[],
                pageNum:1,
                pageSize:10,
                listLoading: true,
                date:[moment().day(-30).format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')],
                list:[],
                reset:{},
                form:{
                    userId:"",
                    info:"",
                    createDate:""
                },
                edit_form:{},
                dialogFormVisible:false,
                dialogFormVisible_edit:false
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
            userList(0,1000).then((res)=>{
                console.log(res);
            if(res.status==1){
                this.userList=res.data.records;
            }
        })
            this.getMessageList()
        },
        methods: {
            getMessageList(){
                this.listLoading = true;
                let params={
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    userId:this.$store.state.user.user.rowId
                }
                messageList(params).then((res)=>{
                    this.listLoading = false;
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
            edit_form_show:function(item){
                this.form=Object.assign({},item);
                this.dialogFormVisible_edit=true;
            },
            edit_form_hide:function(){
                this.form={};
                this.dialogFormVisible_edit=false;
            },
            add_submit:function(){
                addMessage(this.form).then(res=>{
                    if(res.status==1){
                        this.form={};
                        this.add_form_hide();
                        this.getMessageList();
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