import { getItemCSV, getChampCSV, itemRowData, champRowData } from "./CSV_js/getCSV.js";
import { createItemImg } from "./CSV_js/item.js";
import { createChampImg } from "./CSV_js/champ.js";
import { bgiP, bgiS} from "./bgi.js";

itemRender();

async function itemRender() {
    await getItemCSV();
    await getChampCSV();
    if(window.innerHeight < window.innerWidth) {
        bgiP();
    } else {
        bgiS(); 
    }
    champImg(champRowData);
    elementItemImg(itemRowData);
    compoItemImg(itemRowData);
}

window.onresize = function() { //いる？
    if(window.innerHeight < window.innerWidth) {
        bgiP();
    } else {
        bgiS(); 
    }
}


async function champImg(rowData) {
    const champ = rowData.map( value => value[0] );
    await createChampImg(champ);
}

async function elementItemImg(rowData) {
    const items = rowData.map( value => value[0] ),
          wrraper = document.querySelector(`.base-item__list`),
          elementItem = items.slice(1,9);  // base item
    await createItemImg(elementItem, wrraper);
    

    const itemImg = document.querySelectorAll(`.base-item__list img`),
          div = document.querySelector('.have-item__list');
    // アイテムの追加・削除
    itemImg.forEach( (item, key) => {
        item.addEventListener('click', () => {
            const copy = item.cloneNode();
            copy.addEventListener('click', function(){
                this.remove();
                conbine();
            })
            div.appendChild(copy);
            conbine();
        });
    });
}



const NG = [];
function compoItemImg(rowData) {
    // フィルターの表示・非表示
    const filter = document.querySelector('.combined-item__filter'),
          wrraper = document.querySelector(`.combined-item__list`);
    filter.addEventListener('click', () => {
        wrraper.classList.toggle('hidden');
    })

    const items = rowData.map( value => value[0] ),
          compoItem = items.slice(9); //合成後アイテム
    createItemImg(compoItem, wrraper);

    // NGリスト追加・削除
    const itemImg = document.querySelectorAll(`.combined-item__list img`); //入り子
    itemImg.forEach( item => {
        item.addEventListener('click', () => {
            item.classList.toggle('NG');
            if(item.classList.contains('NG')){
                NG.push(item.alt);
            } else {
                NG.splice(NG.indexOf(item.alt), 1);
            }
            conbine();
        });
    });

}

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
            const rest = array[j],
                  copy = array.slice(),
                  del1 = copy.splice(j,1);
            if (copy.length > 0){
                searchPattern(copy, result, block, counter);
            } 
            for (let k = counter; k < result.length; k++) {
                result[counter].push(rest);
                counter += 1;
            }
        }
    }
    block.pop();
}



function conbine() {
    // リセット
    const resultBox = document.querySelector('.result__list');
    resultBox.innerHTML = '';

    // アイテム取得
    const element = document.querySelectorAll('.have-item__list img');
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

    // 次元の調整
    const flatCompo = composition.map( value => value.flat()),
          notDupli　= [...flatCompo];
    
    // 重複削除 未完
    for (let i = 0; i < notDupli.length; i++) {
        for (let j = 0; j < notDupli.length; j++) {
            if (i === j) continue;
            const newArray = [...notDupli[i], ...notDupli[j]],
                       set = new Set(newArray),
                       result = Array.from(set);
                 if (result.length <= notDupli[i].length) {
                    notDupli.splice(j, 1);
                     j -= 1;
                 }
        }
    }

    // 合成アイテム表示
    let count = 0;
    notDupli.forEach( value => {  
        const bool = [];
        for(let i = 0; i < NG.length; i++){
            bool.push(value.indexOf( NG[i]));
        }
        
        const judge = bool.every( value => value === -1);  // true: NG なし
        if ( !judge ){
            return;
        }

        const wrraper = document.createElement('div'),
              number = document.createElement('p');
        count += 1;
        wrraper.className = 'item'
        number.innerText = `候補${count}`;
        wrraper.appendChild(number);
        createItemImg(value, wrraper);
        resultBox.appendChild(wrraper);
    });

    if (items.length === 1) {
        resultBox.innerHTML = '素材アイテムを２つ選択してね！';
    } else if( notDupli.length === 0) {
        resultBox.innerHTML = '素材アイテムをクリックしてね！';
        return ;
    } else if(count === 0) {
        resultBox.innerHTML = '候補なし！ NGが多すぎるかも！';
    }
}

// リセットボタン
const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', () => {
    const haveList = document.querySelector('.have-item__list'),
          result = document.querySelector('.result__list')
    haveList.innerHTML = "";
    result.innerHTML = "";
});