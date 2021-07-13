export const TimeFormatter = (seconds) => {
    if (isNaN(seconds)) {
        return `00:00`;
      }
      
      const date = new Date(seconds * 1000);

      const hh = date.getUTCHours();
      const mm = date.getUTCMinutes();
      const ss = date.getUTCSeconds().toString().padStart(2, "0");

      if (hh) {
        let returnValue = `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
        return returnValue;
      }
      let returnValue = `${mm}:${ss}`;
      return returnValue;
}