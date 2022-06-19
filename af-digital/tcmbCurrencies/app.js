// async function getData(url) {
//   Default options are marked with *
//   const response = await fetch(url, {
//     method: 'GET', // *GET, POST, PUT, DELETE, etc.
//     mode: 'no-cors', // no-cors, *cors, same-origin
//     cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'include', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });
//   console.log(response);

//   return response.json(); // parses JSON response into native JavaScript objects
// }

// getData('https://www.tcmb.gov.tr/kurlar/202201/17012022.xml')
//   .then(response =>  console.log(response))
//   .then(data => console.log(data));// JSON data parsed by `data.json()` call

let xmlYears = [];

let currencies = [];

function getXmlFile(xml, year) {
  fetch(xml)
    .then((response) => response.text())
    .then((data) => {
      currencies = [];
      if (data !== null && data.trim().length !== 0) {
        try {
          xmlData = $.parseXML(data);
        } catch (e) {
          throw e;
        }
        var x2js = new X2JS();
        data = x2js.xml2json(xmlData);

        for (i = 0; i < data.Tarih_Date.Currency.length; ++i) {
          // console.log(data.Tarih_Date.Currency[i].Isim);
          // console.log(data.Tarih_Date.Currency[i].ForexBuying);
          let xmlObj = {
            name: data.Tarih_Date.Currency[i].Isim,
            price: data.Tarih_Date.Currency[i].ForexBuying,
          };
          currencies.push(xmlObj);
        }
        let newYear = { year: year, currencies: currencies };

        // console.log(year2022);
        xmlYears.push(newYear);
        return xmlYears;
      }
    });
}

for (j = 2012; j <= 2022; ++j) {
  getXmlFile(j + ".xml", j);
}
console.log(xmlYears);


