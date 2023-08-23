// const url = 'https://randomuser.me/api/?results=10'
//
// async function getUsers() {
//  let response = await fetch(url);
//  if (response.ok) {
//    let data = await response.json();
//    console.log(data);
//    return document.getElementById('authors').innerHTML = JSON.stringify(data)
//  } else {
//    alert('error', response.status);
//  }
// }
//
// fetch()
// http://83.242.237.130:35800/api/v1/telegram_web/ip/
$(document).ready(function (){
    fetch('http://192.168.203.9:45100/api/v1/telegram_web/ip/')
    .then(res => {
        console.log(res)
        return res.json();
    })
    .then(data => {

        data.forEach(ip => {
            const ip_local = ip.ip_local
            const ip_name = ip.name
            const markup = "<option value='" + ip_local + "'>" + ip_name + " - " + ip_local + "</option>";
            document.querySelector('option').insertAdjacentHTML('afterend', markup)
        });
    })
    .catch(error => console.log(error));
});


