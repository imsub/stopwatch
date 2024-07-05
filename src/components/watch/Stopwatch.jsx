/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect ,useState } from "react";

export default function Stopwatch (){
    const [timerId,setTimerId] = useState(null);
    const [toggleState,setToggleState] = useState(false);
    const [stopWatchState,setStopWatchState] = useState({
        timer : 0,
        buttonVal : "start"
    });
    useEffect ( ()=>{
        if(toggleState){
            setTimerId(setInterval(()=>{
                setStopWatchState({...stopWatchState,
                    timer: ++stopWatchState.timer
                });
            },1000));
        }
        else{
            setTimerId(clearInterval(timerId));
        }
    },[toggleState]);
    const startHandler = (e)=>{
        setToggleState(!toggleState);
        setStopWatchState({...stopWatchState,
            buttonVal : e.target.innerText,
        });
    }
    const resetHandler = (e)=>{
        setToggleState(false);
        setTimerId(clearInterval(timerId));
        setStopWatchState({
            timer : 0,
            buttonVal : "start"
        });
    }
    const formatTime = (time)=>{
        const min = Math.floor(time/60);
        const seconds = time%60;
        if(seconds < 10){
            return `${min}:0${seconds}`;
        }
        else{
            return `${min}:${seconds}`;
        }

    }
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <h1>Stopwatch</h1>
            <div>
                <p>Time: {formatTime(stopWatchState.timer)}</p>
            </div>
            <div>
                <button onClick={startHandler}>{!toggleState ? "Start" : "Stop"}</button>
                <button onClick={resetHandler}>Reset</button>
            </div>
        </div>
    );
}