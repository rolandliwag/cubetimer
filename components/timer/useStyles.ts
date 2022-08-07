import { CSSProperties } from "react";

const useStyles = (): Record<string, CSSProperties> => {
  return {
    container: {
      display: "flex",
      height: "100vh",
      alignItems: "stretch",
      justifyContent: "space-between",
    },
    trigger: {
      height: "100vh",
      alignSelf: "center",
      fontSize: "2.5rem",
      color: "white",
      backgroundColor: "grey",
    },
    times: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
  };
};

export default useStyles;
