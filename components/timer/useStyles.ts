import { CSSProperties } from "react";

const useStyles = ({
  time,
  isStarted,
}: {
  time: number;
  isStarted: boolean;
}): Record<string, CSSProperties> => {
  const timeControlButtonStyle = {
    padding: "0.5rem 1rem",
    fontSize: "1.5rem",
    color: "white",
    backgroundColor: "green",
    border: "2px solid gray",
  };
  const disabledButtonStyle = {
    color: "dimgray",
    backgroundColor: "lightgrey",
    borderColor: "darkgrey",
  };

  return {
    container: {
      display: "flex",
      height: "100vh",
      alignItems: "stretch",
      justifyContent: "space-between",
    },
    trigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30%",
      fontSize: "2.5rem",
      textAlign: "center",
      color: "white",
      backgroundColor: "steelblue",
    },
    times: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      flex: 1,
    },
    timeRecord: {
      flex: "1 0 30%",
      padding: "1rem 0",
      overflowY: "scroll",
    },
    timeRecordHeading: {
      margin: "0 0 0.5rem",
    },
    timeRecordList: {
      margin: 0,
    },
    timeDisplay: {
      flex: 1,
      fontFamily: "monospace",
      fontSize: "3rem",
    },
    timeControls: {
      flex: "1 0 20%",
      width: "100%",
      padding: "1rem 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    saveTimeButton: {
      ...timeControlButtonStyle,
      ...(isStarted || time === 0 ? disabledButtonStyle : null),
    },
    resetTimeButton: {
      ...timeControlButtonStyle,
      backgroundColor: "red",
      ...(!isStarted ? disabledButtonStyle : null),
    },
  };
};

export default useStyles;
