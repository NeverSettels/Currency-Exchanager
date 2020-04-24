import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { ExchangeApi } from './currency-service';


let initialPopulate = async () => {
  let exchangeService = new ExchangeApi();
  const response = await exchangeService.exchange()
  let { conversion_rates } = response;
  let currencyArr = Object.entries(conversion_rates)
  let countryArr = Object.keys(conversion_rates)
  let valueArr = Object.values(conversion_rates)
  currencyArr.forEach(currency => {
    $("#currencies-box").append(`<div id="${currency[0]}" class="exchange-pair" ><span class="country-code">${currency[0]}</span> : <span value="${currency[1]}" class=${currency[1] >= 1 ? "up" : "down"}>${currency[1]}</span>  <div>`)
  })
}
let formListener = () => {
  $('#tbc').submit(event => {
    event.preventDefault;
    let amount = parseFloat($('#amount').val())
    $(".exchange-pair.up", ".exchange-pair.down").each(() => {
      let exchangeRate = parseFloat($(this).val())
      $(this).text(exchangeRate * amount);
    })
  })
}
$(document).ready(() => {
  (async () => {
    await initialPopulate();
  })();
  $('#tbc').submit(event => {
    event.preventDefault();
    let amount = parseFloat($('#amount').val())
    $(".exchange-pair .up, .exchange-pair .down").each(function () {
      console.log($(this).text());

      let exchangeRate = parseFloat($(this).text())
      $(this).text(exchangeRate * amount);
    })
  })

});