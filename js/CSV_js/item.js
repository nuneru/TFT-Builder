import { itemRowData as itemData} from "./getCSV.js";

export function createItemImg(items, div, rowData = itemData) { 
    const itemName = rowData.map( value => value[0] ),
              id = rowData.map( value => value[1] ),
              subId = rowData.map( value => value[2] ),
              ele1 = rowData.map( value => value[3] ),
              ele2 = rowData.map( value => value[4] ),
              itemEffect = rowData.map( value => value[5] );
   
    for(let i = 0; i < items.length; i++){ 
        const index = itemName.indexOf(items[i]),
              itemwrapper = document.createElement('div'),
              url = src(index, id, subId),
              template = `<div class="item__img">
                            <img 
                            src="${url}" 
                            alt="${itemName[index]}" 
                            class="itemImg">
                          </div>`;

        let itemDetail;
        if(index < 9) {
            itemDetail = `<div class='item__detail--base'>
                            <p>${itemName[index]}</p>
                            <p>${itemEffect[index]}</p>
                          </div>`;    
        } else {
            const ele1Index = itemName.indexOf(ele1[index]),
                  ele2Index = itemName.indexOf(ele2[index]),
                  url1 = src(ele1Index, id, subId),
                  url2 = src(ele2Index, id, subId);
                  itemDetail = `<div class='item__detail--combined'>
                                    <p>${itemName[index]}</p>
                                    <p>${itemEffect[index]}</p>
                                    <div>
                                        <div class="item__img">
                                            <img 
                                            src="${url1}"  
                                            alt="${itemName[ele1Index]}" 
                                            class="itemImg">
                                        </div>
                                        <span class="a">+</span>
                                        <div class="item__img">
                                            <img 
                                            src="${url2}" 
                                            alt="${itemName[ele2Index]}" 
                                            class="itemImg">
                                        </div>
                                    </div>
                                </div>`;
        }

        itemwrapper.className = 'item';
        itemwrapper.innerHTML = template;
        itemwrapper.insertAdjacentHTML('beforeend', itemDetail);
        div.appendChild(itemwrapper);
    }
}

function src(index, id, subId) {
    if(id[index]) {
        return `http://ddragon.leagueoflegends.com/cdn/9.18.1/img/item/${id[index]}.png`;
    } else {
        return `images/${subId[index]}.png`;
    }
}