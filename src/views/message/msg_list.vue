<template>
    <div class="app-container">
        <div class="table-container">
            <el-table :data="list" border style="width: 950px;margin:0 auto;">
                <el-table-column fixed prop="date" label="日期" width="200"></el-table-column>
                <el-table-column prop="name" label="消费" width="700"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import moment from "moment";
    export default {
        data() {
            return {
                date:"",
                list:[],
                form:{},
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
        },
        filters: {
            formatCreateTime(time) {
                let date = new Date(time);
                return formatDate(date, "yyyy-MM-dd HH:mm:ss");
            }
        },
        methods: {}
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


