export const capitalizeFirstLetter = string => {
  return isNullOrEmpty(string) ? "" : string.charAt(0).toUpperCase() + string.slice(1);
};

export const isNullOrEmpty = str => {
  if (typeof str === "undefined") return true;

  if (str === null) return true;

  var string = str.toString();
  if (!string) return true;
  return string === null || string.match(/^ *$/) !== null;
};
