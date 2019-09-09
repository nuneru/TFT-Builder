import { getItemCSV, getChampCSV, itemRowData, champRowData } from "./CSV_js/getCSV.js";
import { createItemImg } from "./CSV_js/item.js";

itemRender();

// ***********　初期レイアウト
async function itemRender() {
    await getItemCSV();
    elementItemImg(itemRowData);
    compoItemImg(itemRowData);
}

async function elementItemImg(rowData) {
    const items = rowData.map( value => value[0] ),
          imgBoxEle = document.querySelector(`#itemEle`),
          elementItem = items.slice(1,9);  // 合成前アイテム
    await createItemImg(elementItem, imgBoxEle);

    const itemImg = document.querySelectorAll(`#itemEle img`),
          div = document.querySelector('#have_item');
    
    
    itemImg.forEach( (item, key) => {
        item.addEventListener('click', () => {
            const copy = item.cloneNode();
            div.appendChild(copy);

        });
    });
}

const NG = [];
function compoItemImg(rowData) {
    let items = rowData.map( value => value[0] ),
        imgBoxCompo = document.querySelector(`#itemComp`),
        compoItem = items.slice(9); //合成後アイテム
    createItemImg(compoItem, imgBoxCompo);
    const itemImg = document.querySelectorAll(`#itemComp img`);
    itemImg.forEach( item => {
        item.addEventListener('click', () => {
            NG.push(item.alt);
            item.style.opacity = 0.5;
        })
    })
}


const btn = document.querySelector('#have button');
btn.addEventListener('click', () => {
    // リセット
    const resultBox = document.querySelector('#result_item');
    resultBox.innerHTML = '';

    // アイテム取得
    const element = document.querySelectorAll('#have_item img');
    let items = [];
    for (let i = 0; i < element.length; i++) {
        items.push(element[i].alt);
    }

    // アイテム合成
    const result = [];
    searchPattern(items, result);
    const composition = result.map( value => {
            return value.map( block => {
                if (Array.isArray(block)) {
                    return block.map( ele => {
                        for (let i = 0; i < itemRowData.length; i++){
                            if (itemRowData[i][3] === ele[0] && itemRowData[i][4] === ele[1] || 
                                itemRowData[i][3] === ele[1] && itemRowData[i][4] === ele[0]) {
                                return     itemRowData[i][0];
                            } 
                        }
                    });
                } else {
                    return block;
                }
            });
    });

    // 合成アイテム表示
    const flatCompo = composition.map( value => value.flat());

    let count = 1;
    console.log(flatCompo);

    flatCompo.forEach( value => {  
        const bool = [];
        for(let i = 0; i < NG.length; i++){
            bool.push(value.indexOf( NG[i]));
        }
        
        const judge = bool.every( value => value === -1);  // true: NG なし
        if ( !judge ){
            return;
        }

        const wrraper = document.createElement('div'),
              number = document.createElement('span');
        number.innerText = `候補${count}`;
        wrraper.appendChild(number);
        createItemImg(value, wrraper);
        resultBox.appendChild(wrraper);
        count += 1;
    });
})

function searchPattern(array = [], result = [], block = [], counter = 0) {
    if(array.length % 2 === 0) {
        for (let i = 1; i < array.length; i++) {
            const first = array[0],
                  second = array[i],
                  copy = array.slice(),
                  del1 = copy.splice(i,1),
                  del2 = copy.splice(0,1);
            block.push([first, second]);
            if (copy.length > 0){
                searchPattern(copy, result, block, counter);
            } else {
                result.push([block.slice()]);
                block.pop();
            }
        }
    } else {
        for (let j = 0; j < array.length; j++) {
            const last = array[j],
                  copy = array.slice(),
                  del1 = copy.splice(j,1);
            if (copy.length > 0){
                searchPattern(copy, result, block, counter);
            } 
            for (let k = counter; k < result.length; k++) {
                result[counter].push(last);
                counter += 1;
            }
        }
    }
    block.pop();
}


// https://github.com/vovotamu/TFT-Builder.git

