// pages/remind/remind.js
const app = getApp()
const lessonTmplId = 'PrSnBvof7jQZT8gifDUbfUo3doeF4OcE6irRL8kq688';

const formatDate = dateTime => {
  const date = new Date(dateTime);
  return `${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

const habits = [
  {
    id: 1,
    startTime: new Date().getTime() + 32 * 60 * 1000,
    icon: 'cart.png',
    title: '姨妈开始',
    checked: false,
    description: '好好休息，好好养生哦',
  },
  {
    id: 2,
    startTime: new Date().getTime() + 32 * 60 * 1000,
    icon: 'cart.png',
    title: '姨妈结束',
    checked: false,
    description: '记录一下最近的状态吧',
  },
  {
    id: 3,
    startTime: new Date().getTime() + 32 * 60 * 1000,
    icon: 'cart.png',
    title: '喝水',
    checked: false,
    description: '多喝熱水對姑娘身体好噢',
  },
  {
    id: 4,
    startTime: new Date().getTime() + 60 * 60 * 1000,
    icon: 'cart.png',
    title: '运动',
    checked: false,
    description: '稍微动一动吧',
  },
  {
    id: 5,
    title: '早睡',
    icon: 'cart.png',
    startTime: new Date().getTime() + 24 * 60 * 60 * 1000,
    checked: false,
    description: '熬夜会变丑呀',
  },
  {
    id: 6,
    title: '阅读',
    icon: 'cart.png',
    startTime: new Date().getTime() + 24 * 60 * 60 * 1000,
    checked: false,
    description: '知识就是力量',
  },
  {
    id: 7,
    title: '吃早餐',
    icon: 'cart.png',
    startTime: new Date().getTime() + 24 * 60 * 60 * 1000,
    checked: false,
    description: '美好的一天从吃早餐开始',
  },
].map(habit => ({
  ...habit,
  startTimeString: formatDate(habit.startTime),
}));

Page({
  data: {
    habits,
  },
  // TODO 出bug的话可以回头看看openId大小写
  onLaunch: function () {
    console.log(app.openID)
    console.log(app.openid)
    wx.request({
      url: 'http://127.0.0.1:8081/getStatus',
      openID: app.openid,

      date: {
        openID
      },
      success(res) {
        console.log("cg")
      }
    })
  },

  onSubscribe: function (e) {
    // console.log(e)
    // console.log(habits)
    // console.log(e.currentTarget.dataset.item.checked) false->false
    // console.log(e.detail.value) true
    let index = e.currentTarget.dataset.item.id - 1
    let checked = `habits[${index}].checked`
    console.log(this.data.habits[index])
    this.setData({
      [checked]: e.detail.value
    })
    if (e.detail.value) {
      // 获取课程信息
      const item = e.currentTarget.dataset.item;

      // 调用微信 API 申请发送订阅消息
      wx.requestSubscribeMessage({
        // 传入订阅消息的模板id，模板 id 可在小程序管理后台申请
        tmplIds: [lessonTmplId],
        success: (res) => {
          // 申请订阅成功
          if (res.errMsg === 'requestSubscribeMessage:ok') {
            // 这里将订阅的课程信息调用云函数存入云开发数据
            var lessonTmplId = this.data.lessonTmplId
            wx.cloud
              .callFunction({
                name: 'subscribe',
                data: {
                  data: item,
                  templateId: lessonTmplId,
                },
              })
              .then(() => {
                wx.showToast({
                  title: '订阅成功',
                  icon: 'success',
                  duration: 2000,
                });
              })
              .catch(() => {
                wx.showToast({
                  title: '订阅失败',
                  icon: 'success',
                  duration: 2000,
                });
              });
          }
        },
      });
    }
  },

})

