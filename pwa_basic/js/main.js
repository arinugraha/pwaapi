var _url = "https://my-json-server.typicode.com/arinugraha/pwaapi/products";
var dataResult = "";
var catResult = "";
var category = [];

$(document).ready(function () {

 // var _url = "https://my-json-server.typicode.com/arinugraha/pwaapi/products";




    $("#cat_select").on('change', function () {

      updateProduct($(this).val())
    });



    caches.match(_url).then(function(response) {
      if(!response) throw Error('no  data cache')
      return response.json();
    }).then(function(data){
      if(!networkDataReceived) {
        randerData(data);
        console.log('render data from cache')
      }
    }).catch(function(){
      return neteworkUpate;
    })

});


  function randerData(data) {
    $.each(data, (k, v) => {

      dataResult += `<div>
        <h4>${v.name} </h4>
        <p>${v.category}</p>
        `
      if ($.inArray(v.category, category) == -1) {
        category.push(v.category)
        catResult += `<option value="${v.category}">${v.category}</option>`
      }

      $('#products').html(dataResult);
      $("#cat_select").html(`<option value="all">Semua</option>` + catResult);

    })
  }


updateProduct = (cat) => {
 
  var newUrl = _url;
  if (cat != 'all')
    newUrl = newUrl + '?category=' + cat

  var dataResult = "";
  var catResult = "";
  var category = [];

  $.get(newUrl, function (data) {

    $.each(data, (k, v) => {

      dataResult += `<div>
      <h4>${v.name} </h4>
      <p>${v.category}</p>
      `
      if ($.inArray(v.category, category) == -1) {
        category.push(v.category)
        catResult += `<option value="${v.category}">${v.category}</option>`
      }
    });


    $('#products').html(dataResult);

  })

}

var networkDataReceived = false;

//fresh data from online 
var neteworkUpate = fetch(_url).then(function(response){
  return response.json()
}).then(function(data){
  networkDataReceived = true;
  randerData(data)
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

