import { champRowData as champData} from './getCSV.js';

export function createChampImg(champ, rowData = champData) {
    const champName = rowData.map( value => value[0] ),
          EngName = rowData.map( value => value[1] ),
          cost = rowData.map( value => value[2] ),
          ori1 = rowData.map( value => value[3] ),
          ori2 = rowData.map( value => value[4] ),
          class1 = rowData.map( value => value[5] ),
          class2 = rowData.map( value => value[6] );
    
    for(let i = 1; i < champ.length; i++){ 
        const index = champName.indexOf(champ[i]),
              url = `http://ddragon.leagueoflegends.com/cdn/9.18.1/img/champion/${EngName[index]}.png`,
              template = `<div class="champ">
                            <img 
                            src="${url}" 
                            alt="${champName[index]}" 
                            class="champImg">
                          </div>`;
        const a = document.querySelector(`.champ-pool__cost${cost[index]}`);
        a.insertAdjacentHTML('beforeend', template);
    };
}