export let itemRowData;
export let champRowData;


export async function getItemCSV() {
    return new Promise((resolve) => {
        const req = new XMLHttpRequest();
        req.open('get', '../../TST_Data/Item.csv', true);
        req.send(null);
        req.onload = () => {
            resolve(itemCSVtoArray(req.responseText));
        };
    });
}
function itemCSVtoArray(CSVData) {
    let ArrayData = CSVData.split("\n");
    itemRowData = ArrayData.map( value => value.split(',') );
}


export async function getChampCSV() {
    return new Promise((resolve) => {
        const req = new XMLHttpRequest();
        req.open('get', '../../TST_Data/Champion.csv', true);
        req.send(null);
        req.onload = () => {
            resolve(champCSVtoArray(req.responseText));
        };
    });
}
function champCSVtoArray(CSVData) {
    let ArrayData = CSVData.split("\n");
    champRowData = ArrayData.map( value => value.split(',') );
}
