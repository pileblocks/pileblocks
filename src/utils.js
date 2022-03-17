export function _dataToNumbers(rawData, newData) {
    for (const packedFragment of rawData) {
        for (const col in packedFragment[1]) {
            for (let row in packedFragment[1][col]) {
                packedFragment[1][col][row] = parseInt(packedFragment[1][col][row]);
            }
        }
        newData[packedFragment[0]] = packedFragment[1]
    }
}
