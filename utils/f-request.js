
const request = ( options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url, 
      method: options.method||'GET',
      data:options.data||{},
       success(res) { //监听成功后的操作
        resolve(res)
      },
      fail(error) {  //返回失败也同样传入reject()方法
        reject(error)
      }
    })
  })
}





module.exports = {
  request
 }