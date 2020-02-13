import * as request from "request-promise-native";

(async () => {
  const baseUrl = 'https://api.coinbase.com/v2/exchange-rates';
  const queryString = '?currency=BTC';
  var options = {
    uri: baseUrl + queryString,
  };

  var options2 = {
    uri: 'https://api.coinbase.com/v2/currencies',
  }
  // obtener los resultados y hacerlos leibles
  let result = await request.get(options);
  let result2 = await request.get(options2);
  result = JSON.parse(result);
  result2 = JSON.parse(result2);

  // añadir al select
  for (var i = 0; i < result2.data.length; i++) {
    if (result2.data[i].name == 'Euro') {
      // dejarlo por defecto en euro
      $('#moneda').append(`<option selected value="${result2.data[i].id}">
                                         ${result2.data[i].name}
                                    </option>`);
      $('#valor').text(result.data.rates['EUR']);
      $('#nombreM').text(result2.data[i].name);


    }
    else {
      $('#moneda').append(`<option value="${result2.data[i].id}">
                                         ${result2.data[i].name}
                                    </option>`);
    }

  }
  // cambiar el valor de la moneda
  $(document).on('change', '#moneda', function() {
    $('#valor').text(result.data.rates[$(this).find("option:selected").attr('value')]);
    $('#nombreM').text($(this).find("option:selected").text());
    $('#conversion').text( <any>$('#numero').val() / <any>$('#valor').text());
    
  });

  // poner la conversión de la moneda
  $("#numero").on("input", function() {
    $('#conversion').text( <any>$('#numero').val() / <any>$('#valor').text());
  });

})()
