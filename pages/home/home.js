// pages/home/home.js
Page({

  data: {
    value: '2018-11-11',
    week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    lastMonth: 'lastMonth',
    nextMonth:'nextMonth',
    selectVal: '',
    clicks:[true,true,true,true,true],
    flows:[false,false,false,false,false],
    pains:[false,false,false,false,false],
    start:false,
   
},
start(){
    var start=this.data.start;
    this.setData({
        start:!start
    })
},
level (event) { 
    var dataset=event.currentTarget.dataset;
    var index=dataset.index;
    var flows = this.data.flows;
    for(var i=0;i<5;i++){
        var temp='flows['+i+']';
        if(i<=index){
            this.setData({
                [temp]:true
             });
        } else{
            this.setData({
                [temp]:false
             });      
        }
    }        
},
level1 (event) { 
    var dataset=event.currentTarget.dataset;
    var index=dataset.index;
    var pains = this.data.pains;
    for(var i=0;i<5;i++){
        var temp='pains['+i+']';
        if(i<=index){
            this.setData({
                [temp]:true
             });
        } else{
            this.setData({
                [temp]:false
             });      
        }
    }        
},

change (event) { 
    var dataset=event.currentTarget.dataset;
    var index=dataset.index;
    var clicks = this.data.clicks;
    var temp='clicks['+index+']'
       this.setData({
           [temp]:false
        });
},



//组件监听事件
select(e) {
   
    this.setData({
        selectVal:e.detail
    })
},


})