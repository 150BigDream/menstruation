//app.js
App({
  globalData: {
    token: '',
    openid: '',
    userid: ''
  },
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    const token = wx.getStorageSync('token');
    console.log(token);
    //判断token是否有值
    if (token && token.length != 0) {
      //已经存在token，验证token是否过期
      //this.chek_token();
      wx.redirectTo({
        url: "/pages/DataAnalysis-wang/DataAnalysis-wang",
      })
    } else {
      this.login();
    }
  },
  login() {
    console.log("执行了操作1");
    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code;
        console.log("进来了吗！！");
        console.log(code);
        wx.request({
          url: 'http://localhost:8081/cis',
          method: 'get',
          data: {
            code: code
          },
          success: (res) => {
            //取出token
            const token = res.data.code;
            //将token保存在globalDATa中
            this.globalData.token = token;
            this.globalData.openid = res.data[1];
            this.globalData.userid = res.data[0];
            console.log(this.globalData.openid);
            console.log(this.globalData.userid);
            wx.request({
              url: 'http://localhost:8081/reLogin',
              method: 'get',
              data: {
                openid: this.globalData.openid,
                userid: this.globalData.userid,
              },
              success: (res) => {
                console.log(res.data);
                console.log(res.data === 1);
                if (res.data === 1) {
                  console.log("进来了吗");
                  wx.reLaunch({
                    url: '../X/pages/home/home',
                  })
                }
                else {
                  wx.reLaunch({
                    url: '../X/pages/login-wang/login-wang',
                  })
                }

              }
            })
            //进行本地存储
            wx.setStorageSync('token', token);
          }
        })
      },

      // chek_token(token){
      //   console.log("执行了操作2");
      //   wx.request({
      //     url: 'http://localhost:8081/cis',
      //     method:'post',
      //     header:{
      //       token
      //     },
      //     success: function(res){
      //       console.log(res);
      //     },
      //     fail:function(res){
      //       console.log(res);
      //     }
      //   })
      // globalData: {
      //   userInfo: null
      // }
      // },
    })
  },
  chek_token(token) {
    console.log("执行了操作2");
    wx.request({
      url: 'http://localhost:8081/cis',
      method: 'post',
      header: {
        token
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    })
    globalData: {
      userInfo: null
    }
  }
})