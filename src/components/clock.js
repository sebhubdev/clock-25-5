import React from 'react'
import '../assets/css/clock.css'
import PlayIcon from '../assets/svg/play'
import PauseIcon from '../assets/svg/pause'
import ResetIcon from '../assets/svg/reset'
import ArrowIcon from '../assets/svg/arrow'


const initialState=
{
    break:5,
    session:25,
    current:0,  
    timer:'',
    status:'stop',
    type:'',
    timeout:1000,
    time:0,
    timeoutFn:null
}
export default class Clock extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state=initialState;  
    } 
    componentDidMount()
    {
        this.setTimer(this.state.session,'Session');
    }
    setTimer=(minutes,type)=>
    {
        this.setState({
            current:minutes*60,
            timer:this.calculateTimer(minutes*60),
            type:type
        })
    }
    
    calculateTimer=(seconds)=>
    {
        let minutes=Math.floor(seconds/60);
        seconds=seconds%60;
        if(seconds<10){seconds='0'+seconds} 
        if(minutes<10){minutes='0'+minutes}         
        return minutes+':'+seconds      
    }   
    
    changeBreak=(operator)=>
    {
        if(this.state.status==='stop')
        {
            let breakVal=this.state.break;
            if(breakVal<60 && operator==='+')breakVal++;
            if(breakVal>1 && operator==='-')breakVal--;
            this.setState({break:breakVal})
        }
    }
    changeSession=(operator)=>    
    {        
        if(this.state.status==='stop')
        {
            let session=this.state.session;
            if(session<60 && operator==='+')session++;
            if(session>1 && operator==='-')session--;
            this.setState({session:session})
            this.setTimer(session,'Session')
        }  
    }
    changeStatus=()=>
    {        
        const status=this.state.status;
        if(status==='stop')
        {            
            this.setState({status:'play'});
            this.countDown();
        }
        else if(status==='play')
        {
            clearTimeout(this.state.timeoutFn)
            this.setState(
                {
                    status:'stop',
                    timeoutFn:null,
                    timeout:new Date().getTime()-this.state.time
                });  
        }
    }
    changeType=(type)=>
    {
        this.setState(
            {
                type:type,
                current:this.state[type.toLowerCase()]*60,
                timer:this.calculateTimer(this.state[type.toLowerCase()]*60),
                timeout:1000,
                timeoutFn:null
            })
    }
    reset=()=>
    {                
        this.setState(initialState);
        this.resetBeep();
        clearTimeout(this.state.timeoutFn);
        this.setTimer(initialState.session,'Session');        
    }
    countDown=()=>
    {    
        let current=this.state.current
        current--;
        this.setState({
            time:new Date().getTime(),
            timeout:initialState.timeout,
            timeoutFn:setTimeout(()=>{
                this.setState(
                    {
                        current:current,
                        timer:this.calculateTimer(current)
                    }
                    )      
                return this.countDown();
            },this.state.timeout)            
        })
        if(this.state.current<0)
        {
            this.playBeep()
            clearTimeout(this.state.timeoutFn)
            this.state.type==='Session' ?
            this.changeType('Break') :                    
            this.changeType('Session');
            this.countDown();                
        }
    }   
    playBeep=()=>
    {
        document.getElementById('beep').currentTime=0
        document.getElementById('beep').play()
    }
    resetBeep=()=>
    {
        document.getElementById('beep').pause()
        document.getElementById('beep').currentTime=0
    }
    render()
    {
        return(
            <div id="clock-container">
                <div className="length-controls">
                    <div id="break-label" className="label">Break Length</div>
                    <div className="controls">
                        <div className="arrow" id="break-increment" onClick={()=>{this.changeBreak('+')}}>
                            <ArrowIcon/>
                            <span className="shadow"><ArrowIcon/></span>
                        </div> 
                        <div id="break-length">{this.state.break}</div>
                        <div className="arrow" id="break-decrement" onClick={()=>{this.changeBreak('-')}}>
                            <ArrowIcon/>
                            <span className="shadow"><ArrowIcon/></span>
                        </div>                        
                    </div>
                </div>
                <div className="center">
                    <div id="timer-label">{this.state.type}</div>
                    <div id="time-left">
                        {this.state.timer}
                    </div>
                    <div id="session-controls">
                            <span id="start_stop" onClick={()=>this.changeStatus()}>
                                {
                                    this.state.status==='stop' ?
                                    <PlayIcon/> :
                                    <PauseIcon/>
                                }                                
                            </span>  
                            <span id="reset" onClick={this.reset}><ResetIcon/></span>  
                            
                    </div>
                    <div id="session-controls-shadow">
                            {
                                this.state.status==='stop' ?
                                <PlayIcon/> :
                                <PauseIcon/>
                            }
                            <ResetIcon/>
                    </div>
                </div>
                <div className="length-controls">
                    <div className="controls">
                        <div className="arrow" id="session-increment" onClick={()=>{this.changeSession('+')}}>
                            <ArrowIcon/>
                            <span className="shadow"><ArrowIcon/></span>
                        </div>
                        <div id="session-length">{this.state.session}</div>
                        <div className="arrow" id="session-decrement" onClick={()=>{this.changeSession('-')}}>
                            <ArrowIcon/>
                            <span className="shadow"><ArrowIcon/></span>
                        </div>                     
                    </div>
                    <div id="session-label" className="label">Session Length</div>
                </div>
                <audio id="beep" src="https://www.demos.sebastianneumann.fr/commons/audio/back_to_the_future.mp3"></audio>
            </div>
        )
    }
}

