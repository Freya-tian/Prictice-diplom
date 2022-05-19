import React, { Component } from 'react'
import * as echarts from 'echarts'
import moment from 'moment'
import { Navigate } from 'react-router-dom'
import Background from '../../Component/Background/Background'
import Head from '../../Component/HeadModel/HeadModel'
import './Statistics.scss'
export default class Statistics extends Component {
    constructor(){
        super()
        this.state={
            recordTime:[],
            recordDay:[],
            recordMonth:[],
            recordYear:[],
            Logined:sessionStorage.getItem('access_token')

        }
       
        this.myChartTime = null;
        this.myChartDay = null;
        this.myChartMonth = null;
        this.myChartYear = null;

    }


    // 获取当时销售统计销售记录
    getrecords = ()=>{
        let YY = moment().format('YYYY')
        let DD = moment().format('DD')
        let MM = moment().format('MM')
        fetch(`/api/records/getday?YY=${YY}&MM=${MM}&DD=${DD}`).then(res=>res.json())
        .then(res=>{
            console.log(res);
            this.setState({
                recordTime:[...res]
            })

            this.setEcharts('time')
        })

    }

    // 获取日销售额
    getrecordsDay = ()=>{
        let YY = moment().format('YYYY')
        
        let MM = moment().format('MM')
        fetch(`/api/records/getmonth?YY=${YY}&MM=${MM}`).then(res=>res.json()).then(res=>{
            console.log(res);
            this.setState({
                recordDay:[...res]
            })
            this.setEcharts("day")
        })
        

    }
    // 获取今年每月销售情况
    getrecordsMonth = ()=>{
        let YY = moment().format('YYYY')
        
        
        fetch(`/api/records/geteverymonth?YY=${YY}`).then(res=>res.json()).then(res=>{
            console.log(res);
            this.setState({
                recordMonth:[...res]
            })

            this.setEcharts("month")
        })

    }
    getrecordsYear = ()=>{
        
        
        
        fetch(`/api/records/year`).then(res=>res.json()).then(res=>{
            console.log(res);
            this.setState({
                recordYear:[...res]
            })

            this.setEcharts("year")
        })

    }
    setEcharts = (day)=>{
        let xData = [];
        let yData = [];
        let option = {
            title:{
                text:"",
                x:'center',
                y:'top',
                // textAlign:'center',
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                },
            },
            xAxis:{
                show:true,
                type:"category",
                axisLabel:{                    
                    textStyle: {
                        color:'#fff' //这里用参数代替了
                    },
                },
                axisLine: { lineStyle: {color:'#fff'} }, // 轴线
                
            },
            yAxis:
                {
                    show:true,
                    type:'value',
                    axisLabel:{
                        formatter:'￥{value}',
                        textStyle: {
                            color:'#fff' //这里用参数代替了
                        },
                    }, axisLine: { lineStyle: {color:'#fff'} },
                },
            series:[{
                name:'销量',
                // data:yData,
                type:'line',
               
                emphasis:{
                    itemStyle:{
                        color:'white',    
                    },
                    label:{
                        show:true,
                        size:'20px'    
                    }
                },
            }]
            
        }
        // const {current} = this.timeDom
       
        switch(day){
            case 'time':
                
                this.myChartTime =echarts.init(document.getElementById('pictime'));
                
                xData = this.state.recordTime.map((item)=>item.Time)
                yData = this.state.recordTime.map((item)=>item.Amount)
                console.log(xData);
                console.log(yData); 
                option = {...option,title:{...option.title,text:`Today's income for each time  period`}, xAxis:{...option.xAxis,
                    data:xData,
                }, series:[{...option.series[0],
                    data:yData}]} 
                    console.log(option); 
                this.myChartTime.setOption(option)              
               break;
            case 'day':
                // const {current} = this.timeDom
                
                this.myChartDay = echarts.init(document.getElementById('picDay'));
                xData = this.state.recordDay.map((item)=>item._id)
                yData = this.state.recordDay.map((item)=>item.daysum)
                option = {...option,title:{...option.title,text:'Daily income this month'}, xAxis:{...option.xAxis,
                    data:xData,
                }, series:[{...option.series[0],
                    data:yData}]} 
                this.myChartDay.setOption(option)    
                break;
            case 'month' :
                this.myChartMonth = echarts.init(document.getElementById('picMonth'));
                xData = this.state.recordMonth.map((item)=>item._id)
                yData = this.state.recordMonth.map((item)=>item.monthsum)
                option = {...option,title:{...option.title,text:'monthly income this year'}, xAxis:{...option.xAxis,
                    data:xData,
                }, series:[{...option.series[0],
                    data:yData}]} 
                this.myChartMonth.setOption(option)    
                break;
            case 'year':
                this.myChartYear = echarts.init(document.getElementById('picYear'));
                xData = this.state.recordYear.map((item)=>item._id)
                yData = this.state.recordYear.map((item)=>item.yearsum)
                option = {...option,title:{...option.title,text:'annual income'}, xAxis:{...option.xAxis,
                    data:xData,
                }, series:[{...option.series[0],
                    data:yData}]} 
                this.myChartYear.setOption(option)    
                break;

        }



    }
    
    componentDidMount(){
        this.getrecords()
        this.getrecordsDay()
        this.getrecordsMonth()
        this.getrecordsYear()
        
    }
  render() {
    if(this.state.Logined == null ||this.state.Logined==undefined){
        return <Navigate to='/Login'/>
     }
    return (
      <div className='StatisticsContainer'>
          <Background/>
          <div className='maincontain'>
            <Head progress={"Statistics"}/>
            <div className='pics'>
                <div></div>
                <div className="pictime" id='pictime' >

                </div>
                <div className="picDay" id='picDay'>

                </div>
                <div></div>
                <div></div>
                <div className="picMonth" id='picMonth'>

                </div>
                <div className="picYear" id='picYear'>

                </div>

            </div>
            
            
          </div>
          
      </div>
    )
  }
}
