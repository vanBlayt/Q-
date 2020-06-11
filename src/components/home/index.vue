<template>
  <div>
      <div class="mask"></div>
      <div class="content">
          <div class="header">
              <div class="left">
                  <div class="iconfont icon-tengxun"></div>
                  <span>QQ充值</span>
              </div>
              <div class="right" @click="getMoreInfo">
                  <span class="info">更多</span>
                  <div class="iconfont icon-arrow-right"></div>
              </div>
          </div>
          <div class="num">
              <div class="num-title">代充值QQ账号</div>
              <el-input
                class="num-input"
                placeholder="请输入内容"
                v-model="input"
                medium= "medium"
                clearable>
              </el-input>
          </div>
          <div class="function">
              <div class="type">
                  <div class="title">充值类型</div>
                  <div class="wrapper">
                    <div class="type-card" :class="{checked:checked}" @click="switcher">
                        {{getType}}
                    </div>
                    <div class="type-card" :class="{checked:!checked}" @click="switcher">
                        DNF黑钻
                    </div>
                    <!-- <div>{{this.$route.params.name}}</div> -->
                  </div>
              </div>
              <div class="money">
                  <div class="money-title">充值面额</div>
                  <div class="card-wrapper" >
                    <div class="money-card"
                        v-for="(item,index) of data"
                        :key="index"
                        :class="{checked:index===myIndex}"
                        @click="change(item,index)"
                    >
                        <div class="wrapper">
                            <div class="num">{{item.num}}</div>
                            <div class="price">售价{{item.price}}元</div>
                        </div>
                    </div>
                  </div>
              </div>
              <div class="submit">立即充值: {{money}}元</div>
          </div>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
    props: {
        name: String
    },
    data () {
        return {
            input: '',
            Qbi:'',
            heizuan:'',
            checked: true,
            data: {},
            myIndex: 0,
            money: 9.85,
            type: ''
        }
    },
    methods:{
        //获取数据
        getdate () {
            axios.get('/api/date.json')
                .then(this.getInfoSucc)
        },
        getInfoSucc (res) {
            res = res.data
            if(res.ret){
                const data = res.data
                this.Qbi = data.Qbi
                this.heizuan = data.heizuan
                this.data = data.Qbi
            }
        },
        
        //switcher 选择充值Q币还是黑钻
        switcher () {
            this.checked = !this.checked
            this.data = this.checked? this.Qbi:this.heizuan
            this.myIndex = 0
            this.money = this.data[0].price
        },

        //选择充值面额
        change (item,index) {
            this.myIndex = index    
            this.money = item.price
        },

        //跳转到更多游戏界面
        getMoreInfo () {
            this.$router.push('/otherGames')
        }
    },
    computed:{
        getType: function() {
            return this.type = this.$route.params.name||'Q币'
        }
    },
    mounted () {
        this.getdate()
        console.log(this.$route.params.name)
    }
    
}
</script>

<style lang = "scss">
    .mask{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        /* height: 100%;
        width: 1005; */
        background-color: #ccc;
        z-index: -1;
    }
    .content{
        margin: .4rem .25rem;
        background-color: white;
        border-radius: .1rem .1rem 0 0;
        box-sizing: border-box;
        padding: .4rem;
        font-size: .32rem;
        box-shadow: .1rem .1rem .1rem rgba(0,0,0,.1);
        .header{
            position: relative;
            display: flex;
            .left{
                flex: 1;
                display: flex;
                align-items: center;
                .icon-tengxun{
                    font-size: .5rem;
                    margin-right: .3rem;
                    color: skyblue;
                }
            }
            .right{
                flex: 0 0 1.6rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                color: #ccc;
                .icon-arrow-right{
                    font-size: .5rem;
                }
                .info{
                    font-size: .3rem;
                }
            }
        }
        .header::before{
            content: '';
            position: absolute;
            background-color: #ccc;
            left: -.5rem;
            bottom: -.5rem;
            height: .2rem;
            width: .2rem;
            border-radius: 50%;
            z-index: 100;
        }
        .header::after{
            content: '';
            position: absolute;
            background-color: #ccc;
            right: -.5rem;
            bottom: -.5rem;
            height: .2rem;
            width: .2rem;
            border-radius: 50%;
            z-index: 100;
        }
        .num{
        margin-top: .6rem;
            .num-title{
                margin-bottom: .18rem;
            }
            .num-input{
                border: none;
                /* height: 1rem; */
            }
        }
        .function{
            margin-top: .45rem;
            .type{
                .title{
                    font-size: .3rem;
                }
                .wrapper{
                    display: flex;
                    .type-card{
                        width: 2rem;
                        height: .8rem;
                        line-height: .8rem;
                        margin-top: .2rem;
                        text-align: center;
                        background: white;
                        border: 1px solid orangered;
                        border-radius: .2rem;
                        margin-right: .15rem;
                    }
                    .checked{
                        background-color: orangered;
                        color: white;
                    }
                }
            }
            .money{
                margin-top: .4rem;
                .money-title{
                    font-size: .3rem;
                }
                .card-wrapper{
                    display: flex;
                    flex-wrap: wrap;
                    .money-card{
                        position: relative;
                        margin-top: .2rem;
                        width: 1.8rem;
                        height: 1.4rem;
                        /* line-height: 1.4rem; */
                        text-align: center;
                        font-size: .2rem;
                        background: white;
                        margin:  .1rem; 
                        border: 1px solid orangered;
                        border-radius: .2rem;
                        box-shadow: 1px 1px .1rem rgba($color: #000000, $alpha: .1);
                        .wrapper{
                            position: absolute;
                            top: 25%;
                            left: 20%;
                            transform: translateX(-50%);
                            transform: translateY(-50%);
                            .num{
                                font-size: .3rem;
                                margin-bottom: .1rem;
                            }
                        }
                    }
                    .checked{
                        background-color: orangered;
                        color: white;
                    }
                }
            }
            .submit{
                margin: 0 auto;
                margin-top: .8rem;
                height: 1rem;
                line-height: 1rem;
                width: 6rem;
                background-image: linear-gradient(to right, orange , orangered);
                border-radius: 1rem;
                text-align: center;
            }
        }
    }
    
   
</style>
