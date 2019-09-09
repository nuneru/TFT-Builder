import { itemRowData as Data} from "./getCSV.js";

export function createItemImg(items, div, rowData = Data) { 
    for(let i = 0; i < items.length; i++){ 
        
        const itemName = rowData.map( value => value[0] ),
              id = rowData.map( value => value[1] ),
              subId = rowData.map( value => value[2] ),
              index = itemName.indexOf(items[i]);
        
        const itemImg = document.createElement('img');
        let   url;
        if(id[index]){
            url = `http://ddragon.leagueoflegends.com/cdn/9.16.1/img/item/${id[index]}.png`
        } else {
            url = `images/${subId[index]}.png`;
        }

        itemImg.src = url;
        itemImg.alt = itemName[index];

        div.appendChild(itemImg);
    }
}