<template>
    <div class="app-container">
        <div class="block">
            <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button size="small" @click="add_form_show" v-show="this.$store.state.user.user.name == 'admin'">添加数据</el-button>
            <!--<el-button v-if="show_down" @click="_getReport" size="small">文件下载</el-button>-->
            <el-button @click="_getReport" size="small">导出数据</el-button>
            <el-button v-if="$store.state.user.user.name != 'admin'" @click="openFilesDialog" size="small">下载文件</el-button>
        </div>
        <div class="table-container">
            <el-table :data="list" border style="width: 90%;margin:0 auto;"  v-loading="listLoading">
                <el-table-column prop="createDate" label="日期" width="100"></el-table-column>
                <el-table-column prop="companyName" label="公司名称" width="150"></el-table-column>
                <el-table-column prop="xiaofei" label="消费金额" width="100"></el-table-column>
                <el-table-column prop="chujia" label="出价(元)" width="100"></el-table-column>
                <el-table-column prop="md" label="模式" width="100"></el-table-column>
                <el-table-column prop="showTimes" label="展示量" width="100"></el-table-column>
                <el-table-column prop="clickTimes" label="点击次数" width="100"></el-table-column>
                <el-table-column prop="clickRate" label="点击率(%)" width="100"></el-table-column>
                <el-table-column prop="avg" label="平均点击成本(元)" width=""></el-table-column>
                <el-table-column fixed="right" label="操作" width="150" v-if="$store.state.user.user.name == 'admin'">
                    <template slot-scope="scope">
                        <div style="display:flex;">
                            <el-button type="text" @click="edit_form_show(scope.row)" size="small">编辑</el-button>
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

        <el-dialog title="添加数据" :visible.sync="dialogFormVisible">
            <el-form :model="form" :inline="true" label-position="right" label-width="100px">
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
                <el-form-item label="消费金额" :label-width="'100px'">
                    <el-input v-model="form.xiaofei" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="出价" :label-width="'100px'">
                    <el-input v-model="form.chujia" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="模式CPC/CPM/OCPC/OCPM" :label-width="'100px'">
                    <el-input v-model="form.md" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="展示量" :label-width="'100px'">
                    <el-input v-model="form.showTimes" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="点击次数" :label-width="'100px'">
                    <el-input v-model="form.clickTimes" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="点击率" :label-width="'100px'">
                    <el-input v-model="form.clickRate" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="平均点击成本" :label-width="'100px'">
                    <el-input v-model="form.avg" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="add_form_hide">取 消</el-button>
                <el-button type="primary" @click="add_submit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加数据" :visible.sync="dialogFormVisible_edit">
            <el-form :model="form" :inline="true" label-position="right" label-width="100px">
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
                <el-form-item label="消费金额" :label-width="'100px'">
                    <el-input v-model="form.xiaofei" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="出价(元)" :label-width="'100px'">
                    <el-input v-model="form.chujia" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="模式CPC/CPM/OCPC/OCPM" :label-width="'100px'">
                    <el-input v-model="form.md" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="展示量" :label-width="'100px'">
                    <el-input v-model="form.showTimes" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="点击次数" :label-width="'100px'">
                    <el-input v-model="form.clickTimes" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="点击率(%)" :label-width="'100px'">
                    <el-input v-model="form.clickRate" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
                <el-form-item label="平均点击成本" :label-width="'100px'">
                    <el-input v-model="form.avg" autocomplete="off" :style="{width:'200px'}"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="edit_form_hide">取 消</el-button>
                <el-button type="primary" @click="edit_submit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="收货地址" :visible.sync="dialogTableVisible"  width="500px">
            <el-table :data="fileList" width="450">
                <el-table-column property="companyName" label="公司名称" width="150"></el-table-column>
                <el-table-column property="fileName" label="文件名称" width="200"></el-table-column>
                <el-table-column fixed="right" label="" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="download(scope.row)" size="small">下载</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
    import moment from "moment";
    import {userList}  from '@/api/user';
    import {updateBizData,bizDataList,addBizData,getReport,fileList} from '@/api/data_report'
    export default {
        data() {
            return {
                data:{},
                userList:[],
                pageNum:1,
                pageSize:10,
                listLoading: true,
                date:[moment().day(-30).format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')],
                list:[],
                reset:{},
                form:{
                    userId:"",
                    avg:"",
                    chujia:"",
                    md:"",
                    clickRate:"",
                    clickTimes:"",
                    createDate:"",
                    showTimes:"",
                    userId:"",
                    xiaofei:""
                },
                dialogFormVisible:false,
                dialogFormVisible_edit:false,
                dialogTableVisible:false,
                fileList:[]
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
                
            },
            show_down:function(){
                return this.$store.state.user.user.showDown==1;
            }
        },
        created() {
            userList(0,1000).then((res)=>{
                if(res.status==1){
                    this.userList=res.data.records;
                }
            })
            this.getBizDataList();
        },
        filters: {
            formatCreateTime(time) {
                let date = new Date(time);
                return formatDate(date, "yyyy-MM-dd HH:mm:ss");
            }
        },
        methods: {
            _getReport(){
                var hours = new Date().getHours();
                if(hours > 22 || hours < 10){
                    this.$message({
                        message: '系统维护请稍后再试!',
                        type: 'warning'
                    });
                }else {
                    window.open(`/statement/yt/export?endDate=${this.endDate}&startDate=${this.startDate}&userId=${this.$store.state.user.user.rowId}`);
                }
            },
            openFilesDialog(){
                this.fileList=[];
                fileList({userId:this.$store.state.user.user.rowId}).then(res=>{
                    if(res.status==1){
                        this.fileList=res.data||[];
                    }
                })
                this.dialogTableVisible=true;
            },
            pageChange:function(pageNum){
                this.pageNum=pageNum;
                this.getBizDataList();
            },
            getBizDataList(){
                this.listLoading = true;
                let params={
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    startDate:this.startDate,
                    endDate:this.endDate,
                    userId:this.$store.state.user.user.rowId
                }
                bizDataList(params).then((res)=>{
                    this.listLoading = false;
                    if(res.status==1){
                        this.data=res.data;
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
            edit_form_hide:function(){
                this.form={};
                this.dialogFormVisible_edit=false;
            },
            edit_form_show:function(item){
                this.form=Object.assign({},item);
                this.dialogFormVisible_edit=true;
            },
            add_submit:function(){
                addBizData(this.form).then(res=>{
                    if(res.status==1){
                        this.form={};
                        this.add_form_hide();
                    this.getBizDataList();
                    }
                });

            },
            edit_submit:function(){
                updateBizData(this.form).then(res=>{
                    if(res.status==1){
                        this.form={};
                        this.edit_form_hide();
                        this.getBizDataList();
                    }
                });
            },
            download:function({fileName,userId}){
                var url=`/statement/yt/downFile?userId=${userId}&fileName=${fileName}`;
                window.open(url);
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .block{padding-top: 20px;}
</style>


