// pages/home/home.js
import {
    request} from '../../utils/f-request.js'
import cutil from '../../utils/f-calendar.js'
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
    residue:' ',
    sDay:'',
    eDay:'',
    sTime:'',
    eTime:'',
    clickfap:false,
    clickhb:false,
   
},
inti(){
    var fin;
    var fsu;
    request({url:'http://localhost:8080/user',data:{'userid': 1} }).then(res =>{
        console.log(res);
         fin=res.data.fintervalDay;
         fsu=res.data.fsustainDay;
         request({url:'http://localhost:8080/top1',data:{'userid': 1} }).then(res =>{
            console.log(res);
            if(res!=null){
                if(res.data.endTime==null)
                this.setData({
                    start:true
                })
                var now=cutil.getUnixTime(cutil.formatDateThis(new Date()));
                var old=cutil.getUnixTime(res.data.startTime);
                var apart=cutil.dateCompare(now,old);
                var reDay=fin-apart;
                if(reDay<0)
                this.setData({
                    residue:0
                 })
                 else
                 this.setData({
                    residue:reDay
                 })
                 var sDay=cutil.mathChangeDate(res.data.startTime,'+',fin,true); 
                 var eDay=cutil.mathChangeDate(sDay,'+',fsu,true);
                 this.setData({
                   sDay:sDay,
                   eDay:eDay
                 });
            }
           
           
          })
      })
},
start(){
    var start=this.data.start;
    var day=cutil.formatDateThis(new Date());
    var time=day.substring(0,10);
    this.setData({
        start:!start
    })
    if(this.data.start){
        this.setData({
            sTime:time
        });
        request({url:'http://localhost:8080/savetime',data:{'userid': 1} }).then(res =>{
            console.log(res);})
    }
    else{
        this.setData({
            eTime:time
        });
        request({url:'http://localhost:8080/end',data:{'userid': 1} }).then(res =>{
            console.log(res);})
        request({url:'http://localhost:8080/updatef',data:{'userid': 1} }).then(res =>{
                console.log(res);})
        
        this.inti();
    }
   
   
},
level (event) { 
    if(!this.data.clickfap)
    this.data.clickfap=true;
    var dataset=event.currentTarget.dataset;
    var index=dataset.index;
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
    if(!this.data.clickfap)
    this.data.clickfap=true;
    var dataset=event.currentTarget.dataset;
    var index=dataset.index;
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
    if(!this.data.clickhb)
    this.data.clickhb=true;
    var dataset=event.currentTarget.dataset;
    var index=dataset.index;
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
onLoad(){
   this.inti();
},
onHide(){
    var index;
    var indexp;
    for(var i=0;i<5;i++){
        if(!this.data.flows[i]){
            index=i;
            break;
        }
    }
    for(var i=0;i<5;i++){
        if(!this.data.pains[i]){
            indexp=i;
            break;
        }
    }
    console.log(this.data.clickhb)
    if(this.data.clickfap){
        request({url:'http://localhost:8080/savefap',data:{'userid': 1,'flow':index,'pain':indexp} }).then(res =>{
            console.log(res);
            this.data.clickfap=false;
        })       
    }
    if(this.data.clickhb){
        var that=this;
        setTimeout(function () {
            request({url:'http://localhost:8080/savehb',data:{'userid': 1,habbits:that.data.clicks} }).then(res =>{
            console.log(res);
            that.data.clickhb=false;
        })
           }, 3000)
        
    }
}

})