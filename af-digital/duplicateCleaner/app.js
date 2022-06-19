let results = document.getElementById("results");

const stringToInt = (arrString, arrInteger) => {
  for (var a = 0; a < arrString.length; ++a) {
    arrInteger.push(parseInt(arrString[a]));
  }
};

const userSubmit = () => {
  const userRatios = document.getElementById("ratios").value.split(",");
  const userPrices = document.getElementById("prices").value.split(",");
  const userCodes = document.getElementById("codes").value.split(",");

  let pricesInted = [];
  let ratiosInted = [];
  let codesTrimmed = [];

  stringToInt(userPrices, pricesInted);
  stringToInt(userRatios, ratiosInted);

  for (b = 0; b < userCodes.length; ++b) {
    codesTrimmed[b] = userCodes[b].replace(/\s/g, "");
  }

  for (i = 0; i < ratiosInted.length; ++i) {
    for (j = i + 1; j < ratiosInted.length; ++j) {
      if (
        ratiosInted[i] === ratiosInted[j] &&
        codesTrimmed[i] === codesTrimmed[j]
      ) {
        pricesInted[i] = pricesInted[i] + pricesInted[j];

        ratiosInted.splice(j, j);
        pricesInted.splice(j, j);
        codesTrimmed.splice(j, j);
      }
    }
  }
  console.log("Oran : [" + ratiosInted + "]");
  console.log("Tutar : [" + pricesInted + "]");
  console.log("Kod : [" + codesTrimmed + "]");

  const addItemToHtml = () => {
    let addedItemHtml = `
    <div>
        <div class="result-label">Oran : </div>
        <div class="result result-ratios"id="result-ratios">${ratiosInted}</div>
    </div>
    <div>
        <div class="result-label">Tutar : </div>
        <div class="result result-prices"id="result-prices">${pricesInted}</span>
    </div>
    <div>
        <div class="result-label" >Kod : </div>
        <div class="result result-codes"id="result-codes">${codesTrimmed}</div>
    </div>
  `;
    results.innerHTML = addedItemHtml;
  };

  addItemToHtml();

  
};
const userClear =() => {
    document.querySelector("#form").reset();
    document.getElementById("results").innerHTML =  `<span class="result-message">Sonuçlar burada gözükecektir</span>`;

};

