import {
  MutableRefObject,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import useStyles from "./useStyles";

const THRESHOLD = 100;

type TimerState = {
  time: number;
  initialTime: number;
  isStarted: boolean;
  previousTimes: number[];
};

const Timer = (): ReactElement => {
  const styles = useStyles();
  const [{ time, isStarted, previousTimes }, setTimer] = useState({
    time: 0,
    initialTime: Date.now(),
    isStarted: false,
    previousTimes: [],
  } as TimerState);
  const leftTimerRef = useRef<NodeJS.Timeout>();
  const rightTimerRef = useRef<NodeJS.Timeout>();
  const leftButtonDown = useRef<string>("released");
  const rightButtonDown = useRef<string>("released");

  useEffect(() => {
    if (!isStarted) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((state) => {
        if (state.isStarted) {
          return { ...state, time: Date.now() - state.initialTime };
        } else {
          return state;
        }
      });
    }, 1);

    return () => clearInterval(interval);
  }, [isStarted]);

  useEffect(() => {
    clearTimeout(leftTimerRef.current);
    clearTimeout(rightTimerRef.current);
  }, []);

  const handleButtonDown = (button: string) => {
    let thisButton: MutableRefObject<string>;
    let otherButton: MutableRefObject<string>;

    if (button === "left") {
      thisButton = leftButtonDown;
      otherButton = rightButtonDown;
    } else {
      thisButton = rightButtonDown;
      otherButton = leftButtonDown;
    }

    return () => {
      thisButton.current = "pressed";
      if (thisButton.current === otherButton.current) {
        setTimer((state) => {
          if (state.isStarted) {
            return {
              ...state,
              isStarted: false,
            };
          }

          return state;
        });
      }
    };
  };

  const handleButtonRelease = (button: string) => {
    let thisButton: MutableRefObject<string>;
    let otherButton: MutableRefObject<string>;
    let timerRef: MutableRefObject<NodeJS.Timeout | undefined>;

    if (button === "left") {
      thisButton = leftButtonDown;
      otherButton = rightButtonDown;
      timerRef = leftTimerRef;
    } else {
      thisButton = rightButtonDown;
      otherButton = leftButtonDown;
      timerRef = rightTimerRef;
    }

    return () => {
      thisButton.current = "releasing";
      if (thisButton.current === otherButton.current && time === 0) {
        setTimer((state) => {
          if (!state.isStarted) {
            return {
              ...state,
              initialTime: Date.now(),
              isStarted: true,
            };
          }

          return state;
        });
      }

      timerRef.current = setTimeout(() => {
        thisButton.current = "released";
      }, THRESHOLD);
    };
  };

  const handleClickSaveTime = () => {
    setTimer((state) => ({
      ...state,
      previousTimes: state.previousTimes.concat(state.time),
      time: 0,
    }));
  };

  const handleClickResetTime = () => {
    setTimer((state) => ({
      ...state,
      time: 0,
      isStarted: false,
    }));
  };

  return (
    <div style={styles.container}>
      <div
        role="button"
        style={styles.trigger}
        onTouchStart={handleButtonDown("left")}
        onTouchEnd={handleButtonRelease("left")}
      >
        Left hand here
      </div>
      <div style={styles.times}>
        <div className="App__previous-times">
          {previousTimes.map((previous, index) => (
            <div className="App__previous-time" key={`${previous}-${index}`}>
              {renderTime(previous)}
            </div>
          ))}
        </div>
        <div className="App__timer">{renderTime(time)}</div>
        <div className="App__time-controls">
          <button
            className="App__time-control-button"
            onClick={handleClickSaveTime}
            disabled={time === 0 || isStarted}
          >
            Save time
          </button>
          <button
            className="App__time-control-button App__time-control-button--reset"
            onClick={handleClickResetTime}
            disabled={time === 0}
          >
            Reset
          </button>
        </div>
      </div>
      <div
        role="button"
        style={styles.trigger}
        onTouchStart={handleButtonDown("right")}
        onTouchEnd={handleButtonRelease("right")}
      >
        Right hand here
      </div>
    </div>
  );
};

export default Timer;

const renderTime = (time: number) => {
  const minutes = `${Math.floor(time / 1000 / 60)}`.padStart(2, "0");
  const seconds = `${Math.floor(time / 1000) % 60}`.padStart(2, "0");
  const milliseconds = `${time % 1000}`.padStart(3, "0");

  return `${minutes}:${seconds}.${milliseconds}`;
};
