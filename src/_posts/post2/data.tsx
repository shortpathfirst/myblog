const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];

const nCol = 10;
const nRow = 5;

type HeatmapData = { x: string; y: string; value: number }[];
const data: HeatmapData = [];

for (let x = 0; x < nCol; x++) {
    for (let y = 0; y < nRow; y++) {
        data.push({
            x: alphabet[x],
            y: alphabet[y],
            value: Math.random() * 40,
        });
    }
}

export { data };