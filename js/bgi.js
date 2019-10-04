import { itemRowData, champRowData } from "./CSV_js/getCSV.js";

export function bgiP() { 
    const div = document.querySelector('body'),
          random1 = Math.round( Math.random()*itemRowData.length ),
          random2 = Math.round( Math.random()*10 ),
          url = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champRowData[random1][1]}_${random2}.jpg`;
    fetch(url)
        .then(res => {
            if(res.ok){
                div.style.background = `url(${url}) no-repeat `;
                div.style.backgroundSize = "cover";
                div.style.backgroundAttachment = "fixed";
                const illustName = document.querySelector('.illustName');
                illustName.innerText = champRowData[random1][1] + "_" + random2;
            } else {
                bgiP();
            }
         });
}

export function bgiS() { 
    const div = document.querySelector('body'),
          random1 = Math.round( Math.random()*itemRowData.length ),
          random2 = Math.round( Math.random()*10 ),
          url = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champRowData[random1][1]}_${random2}.jpg`;
    fetch(url)
        .then(res => {
            if(res.ok){
                div.style.background = `url(${url}) no-repeat `;
                div.style.backgroundSize = "cover";
                div.style.backgroundAttachment = "fixed";
                const illustName = document.querySelector('.illustName');
                illustName.innerText = champRowData[random1][1] + "_" + random2;
            } else {
                bgiS();
            }
         });
}

