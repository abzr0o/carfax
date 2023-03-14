const alphabet: { [key: string]: string } = {
  Z: "A",
  W: "B",
  D: "C",
  X: "D",
  Y: "E",
  G: "F",
  A: "G",
  V: "H",
  B: "I",
  H: "J",
  M: "K",
  U: "L",
  O: "M",
  P: "N",
  N: "O",
  T: "P",
  R: "Q",
  C: "R",
  J: "S",
  L: "T",
  F: "U",
  S: "V",
  K: "W",
  I: "X",
  E: "Y",
  Q: "Z",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "0": "0",
};

const dehash = (text: string): string => {
  const lane = text.split("").reduce((prev, curr) => {
    return prev.concat(alphabet[curr]);
  }, "");
  return lane;
};

export default dehash;
