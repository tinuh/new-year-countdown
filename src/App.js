import React from 'react';
import './App.css';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ParticlesBg from "particles-bg";
import { Player } from 'video-react';
import countdown from "./countdown.mp4";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 220,
  strokeWidth: 10
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

export default function App() {

  //const dateFuture = new Date(new Date().getFullYear() + 1, 0, 1);
  //const dateNow = new Date();

  //const remainingTime = Math.floor((dateFuture - dateNow) / 1000);
  const remainingTime = 15;

  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  const [end, setEnding] = React.useState(false);

  const getTimeSeconds = (time) => {
    let seconds = (minuteSeconds - time / 1000) | 0
    if (seconds === 11){
      setEnding(true);
    }
    return seconds;
  }
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time) => (time / daySeconds) | 0;

  return (
    <div className="App">
      {end ? 
        (
          <Player autoPlay = {true}>
            <source src = {countdown}/>
          </Player>
        ) : 
        (<div>
          <ParticlesBg color="random" type="tadpole" bg={true}/>

          <h1 style = {{color: "rgb(192,192,192)", fontSize: "70px"}}>New Year's 2021</h1>

          <div className = "inner">
            <CountdownCircleTimer
              {...timerProps}
              colors={[["#7E2E84"]]}
              duration={daysDuration}
              initialRemainingTime={remainingTime}
            >
              {({ elapsedTime }) =>
                renderTime("days", getTimeDays(daysDuration - elapsedTime / 1000))
              }
            </CountdownCircleTimer>
            <CountdownCircleTimer
              {...timerProps}
              colors={[["#D14081"]]}
              duration={daySeconds}
              initialRemainingTime={remainingTime % daySeconds}
              onComplete={(totalElapsedTime) => [
                remainingTime - totalElapsedTime > hourSeconds
              ]}
            >
              {({ elapsedTime }) =>
                renderTime("hours", getTimeHours(daySeconds - elapsedTime / 1000))
              }
            </CountdownCircleTimer>
            <CountdownCircleTimer
              {...timerProps}
              colors={[["#EF798A"]]}
              duration={hourSeconds}
              initialRemainingTime={remainingTime % hourSeconds}
              onComplete={(totalElapsedTime) => [
                remainingTime - totalElapsedTime > minuteSeconds
              ]}
            >
              {({ elapsedTime }) =>
                renderTime(
                  "minutes",
                  getTimeMinutes(hourSeconds - elapsedTime / 1000)
                )
              }
            </CountdownCircleTimer>
            <CountdownCircleTimer
              {...timerProps}
              colors={[["#218380"]]}
              duration={minuteSeconds}
              initialRemainingTime={remainingTime % minuteSeconds}
              onComplete={(totalElapsedTime) => [
                remainingTime - totalElapsedTime > 0
              ]}
            >
              {({ elapsedTime }) =>
                renderTime("seconds", getTimeSeconds(elapsedTime))
              }
            </CountdownCircleTimer>
          </div>
        </div>
        )}
    </div>
  );
}
