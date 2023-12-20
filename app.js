const inp = document.querySelector("#inp");
const inp2 = document.querySelector("#inp2");
const kur = document.querySelector("#kur");
const kur2 = document.querySelector("#kur2");
let deyer = "";
let pul = "";
let title = "";
let optionsArray = [];
let wantMoney = 1;
let haveMoney = 1;
let ajax = new XMLHttpRequest();
ajax.open("Get", "https://www.floatrates.com/daily/usd.xml", true);
ajax.send();
ajax.onload = function () {
  if (ajax.readyState == 4 && ajax.status == 200) {
    let data = ajax.responseXML;
    console.log(data);
    let esasItems = data.querySelectorAll("item");
    for (let i = 0; i < esasItems.length; i++) {
      pul = esasItems[i].querySelector("targetCurrency").textContent;
      deyer = esasItems[i].querySelector("inverseRate").textContent;
      title = esasItems[i].querySelector("targetName").textContent;
      optionsArray.push({ pul, deyer, title });
    }
    optionsArray.sort((a, b) => a.pul.localeCompare(b.pul));
    optionsArray.forEach((item) => {
      kur.innerHTML += `<option value=${item.deyer} title=${item.title}>${item.pul}</option>`;
      kur2.innerHTML += `<option value=${item.deyer}>${item.pul}</option>`;
    });

    function calc() {
      haveMoney = kur.value;
      wantMoney = kur2.value;
      let inpPul = +inp.value || 0;
      let result = inpPul * (+haveMoney / +wantMoney);
      inp2.value = result.toFixed(2);
    }
    kur.onchange = () => {
      calc();
    };

    kur2.onchange = () => {
      calc();
    };
    inp.oninput = () => {
      calc();
    };
    inp2.oninput = () => {
      haveMoney = kur.value;
      wantMoney = kur2.value;
      let inpPul2 = +inp2.value || 0;
      let result = inpPul2 * (+wantMoney / +haveMoney);
      inp.value = result.toFixed(2);
    };
  } else {
    console.error("Failed to fetch XML data. Status: " + ajax.status);
  }
};
