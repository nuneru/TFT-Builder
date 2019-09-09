export function champData(rowData) {
    for(let i = 0; i < rowData.length - 1; i++) {
        let champName = rowData[i][0],    //[row][column]
            EngName = rowData[i][1],
            cost = rowData[i][2],
            org1 = rowData[i][3],
            org2 = rowData[i][4],
            class1 = rowData[i][5],
            class2 = rowData[i][6];
        createChampImg(EngName, cost);
    }
}
function createChampImg(EngName, cost) {
    let url = `http://ddragon.leagueoflegends.com/cdn/9.16.1/img/champion/${EngName}.png`,
        champImg = document.createElement('img'),
        imgBox = document.querySelector(`#champ .cost${cost}`);
    champImg.src = url;
    imgBox.appendChild(champImg);
}