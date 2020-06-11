<template>
  <div class="wrapper">
      <div class="mask"></div>
      <div class="content">
        <div class="input">
            <el-input
                class="content-input"
                placeholder="请输入您想充值的服务"
                v-model="input"
            >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <div class="search-list" v-show="hasDate">
            <div class="city" @click="chooseGames(item)" v-show="hasresult" v-for="(item,index) in result" :key="index">
                {{item}}
            </div>
            <div v-show="!hasresult" class="city">未检索到游戏</div>
        </div>
        <div class="games" v-show="!hasDate">
            <div class="area" v-for="(item,key) of games" :key="key">
                <div class="alpha">{{key}}</div>
                <div class="city"
                    v-for = "innerItem of item"
                    :key="innerItem.id"
                    @click="chooseGames(innerItem.name)"
                >
                    {{innerItem.name}}
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
    name: 'otherGames',
    data () {
        return {
            input: '',
            games: {},
            hasDate: false,
            result: []
        }
    },
    methods:{
        getInfo () {
            axios.get('/api/city.json')
                .then(this.getInfoSucc)
        },
        getInfoSucc (res) {
            // console.log(res)
            if(res.data.ret){
                const data = res.data.data
                // console.log(data)
                this.games = data.cities
                console.log(this.games)
            }
        },

        //选择游戏
        chooseGames (name) {
            this.$router.push({ name: 'home', params: { name: name }});
        },

        //精确搜索
        getResult () {
            let input = this.input
            this.result = []
            let result = []
            console.log(input)
            for(let i in this.games){
                this.games[i].forEach((item) => {
                    if(item.name.indexOf(input)> -1||item.spell.indexOf(input)>-1){
                        result.push(item.name)
                    }
                });
            }
            this.result = result
        }
 
    },
    computed:{
        hasresult () {
            return this.result.length?true:false
        }
    },
    watch: {
        //判断input框是否有输入
        input: function(input){
            let self = this
            let timeout = null
            if(input){
                //设置防抖
                if(timeout)clearTimeout(timeout)
                else{
                    timeout = setTimeout(() => {
                        self.getResult()
                    }, 500);
                }
            }
            this.hasDate = (input)? true:false
        }
    },
    mounted () {
        this.getInfo()
    }  

}
</script>

<style lang = "scss" scoped>
.wrapper{
    background-color: #f5f5f5;
}
    .mask{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        /* height: 100%; */
        background-color: #f5f5f5;
        z-index: -1;
    }
    .content{
        padding: .6rem .4rem;
        /* background-color: #f5f5f5; */
        .input{
            .content-input{
                border-radius: 1rem;
            }
        }
        .search-list{
            margin-top: .4rem;
            .city{
                height: 1rem;
                line-height: 1rem;
                background-color: #fff;
                padding-left: .4rem;
                font-weight: bold;
                box-shadow: 1px 0px 5px rgba(0,0,0,.1)
            }
        }
        .games{
            /* margin: 0 .4rem; */
            margin-top: .4rem;
            /* background-color: white; */
            .area{
                .alpha{
                    height: .8rem;
                    line-height: .8rem;
                    font-size: .32rem;
                    padding-left: .4rem;
                    background-color: #f5f5f5;
                }
                .city{
                    height: 1rem;
                    line-height: 1rem;
                    background-color: #fff;
                    padding-left: .4rem;
                    font-weight: bold;
                    box-shadow: 1px 0px 5px rgba(0,0,0,.1)
                }
            }
        }
    }
</style>
