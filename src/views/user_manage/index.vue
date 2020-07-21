<template> 
    <div class="app-container">
        <div class="block">
            <el-button @click="showDailog">新增用户</el-button>
            <el-button @click="showDailog">上传表单文件</el-button>
        </div>
        <div class="table-container">
            <el-table :data="userList" border type='index' style="width: 910px;margin:0 auto;"  v-loading="listLoading">
                <el-table-column prop="rowId" label="用户ID" width="100"></el-table-column>
                <el-table-column prop="name" label="用户名" width="200"></el-table-column>
                <el-table-column prop="password" label="密码" width="100"></el-table-column>
                <el-table-column prop="companyName" label="公司名称" width="200"></el-table-column>
                <el-table-column prop="showDown" label="是否下载" width="100">
                    <template slot-scope="scope">
                        {{scope.row.showDown==1?"是":"否"}}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template slot-scope="scope">
                        <div class="btns">
                            <el-button type="primary" @click="showDailog_edit(scope.row)" size="small">修改</el-button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <el-upload
                                :data="{userId:scope.row.rowId}"
                                class="upload-demo"
                                file="file"
                                :on-change="upload"
                                :show-file-list="false"
                                action="/statement/yt/upload">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    style="width: 810px;margin:0 auto;"
                    background
                    @current-change="pageChange"
                    layout="total,prev, next,jumper"
                    :page-size="pageSize"
                    :current-page.sync="pageNum"
                    :total="data.total">
            </el-pagination>
        </div>
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-position="left" label-width="200px">
                <el-form-item label="账号" :label-width="'100px'">
                    <el-input v-model="form.name" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="'100px'">
                    <el-input v-model="form.password" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="公司名称" :label-width="'100px'">
                    <el-input v-model="form.companyName" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="是否允许下载" :label-width="'100px'">
                    <el-switch
                        v-model="form.showDown"
                        active-color="#13ce66"
                        inactive-color="#ccc"
                        active-value="1"
                        inactive-value="0">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancle">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible_edit">
            <el-form :model="updateUser" label-position="left" label-width="200px">
                <el-form-item label="账号" :label-width="'100px'">
                    <el-input disabled v-model="updateUser.name" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="'100px'">
                    <el-input v-model="updateUser.password" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="公司名称" :label-width="'100px'">
                    <el-input v-model="updateUser.companyName" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="是否允许下载" :label-width="'100px'">
                    <el-switch
                        v-model="updateUser.showDown"
                        active-color="#13ce66"
                        inactive-color="#ccc"
                        active-value="1"
                        inactive-value="0">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel_edit">取 消</el-button>
                <el-button type="primary" @click="edit_submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {addUser,userList,updateUser,deleteUser} from '@/api/user'
    export default {
        data() {
            return {
                userList:[],
                data:{},
                pageNum:1,
                pageSize:10,
                listLoading:true,
                dialogFormVisible:false,
                dialogFormVisible_edit:false,
                reset:{
                    name:'',
                    password:"",
                    showDown:0,
                    companyName:"",
                },
                form:{
                    name:'',
                    password:"",
                    showDown:false,
                    companyName:"",
                },
                updateUser:{}
            };
        },
        created() {
            this.getUserList();
        },
        methods: {
            showDailog:function(){
                this.dialogFormVisible=true;
            },
            cancle:function(){
                this.dialogFormVisible=false;
                this.form=Object.assign({},this.reset);
            },
            showDailog_edit:function(item){
                console.log(item);
                this.updateUser = Object.assign({},item) ;
                this.dialogFormVisible_edit=true;
            },
            cancel_edit:function(){
                this.updateUser = {}
                this.dialogFormVisible_edit=false;
            },
            submit:function(){
                addUser(this.form).then(res=>{
                    if(res.status==1){
                        this.getUserList().then(()=>{
                            this.dialogFormVisible=false;
                            this.form=Object.assign({},this.reset);
                        })
                    }
                })
            },
            pageChange:function(pageNum){
                console.log(pageNum);
                this.pageNum=pageNum;
                this.getUserList();
            },
            getUserList:function(){
                this.listLoading = true;
                return userList(this.pageNum, this.pageSize).then(res => {
                    this.listLoading = false;

                    if(res.status==1){
                        this.data=res.data;
                        this.userList=res.data.records;
                        this.pageNum = res.data.current;
                    }
                })
            },
            edit_submit:function(){
                updateUser(this.updateUser).then(res=>{
                    if(res.status==1){
                        this.form=this.reset;
                        this.getUserList().then(()=>{
                            this.dialogFormVisible_edit=false;
                        })
                    }
                })
            },
            deleteUser_show:function(item){
                var {rowId} = item;
                this.$confirm('确定删除该用户吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                }).then(() => {
                    deleteUser({rowId}).then(res=>{
                        if(res.status==1){
                            this.getUserList().then(()=>{
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            })
                        }
                    })
                })
            },
            upload(res){
                console.log(res);
                if(res.status=="success"){
                    if(res.response.status==1){
                        this.$message({
                            type: 'success',
                            message: '上传成功!'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.response.message
                        });
                    }
                }
            }
        }
    }
</script>
<style>
  .el-upload-list{display: none}  
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .btns{
        display: flex;
        align-items: center;
    }
</style>


