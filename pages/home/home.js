// pages/home/home.js
Page({

  data: {
    value: '2018-11-11',
    week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    lastMonth: 'lastMonth',
    nextMonth:'nextMonth',
    selectVal: '',
    click:true,
    click1:true,
    click2:true,
    click3:true,
    click4:true,
},
    change () { 
    var click = this.data.click;
    this.setData({
       click: false
    });
},
change1 () { 
    var click1 = this.data.click1;
    this.setData({
       click1: false
    });
},
change2 () { 
    var click2 = this.data.click2;
    this.setData({
       click2: false
    });
},
change3 () { 
    var click3 = this.data.click3;
    this.setData({
       click3: false
    });
},
change4 () { 
    var click4 = this.data.click4;
    this.setData({
       click4: false
    });
},


//组件监听事件
select(e) {
   
    this.setData({
        selectVal:e.detail
    })
},


})