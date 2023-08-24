const tg = window.Telegram.WebApp;
tg.expand();
let btn1 = document.getElementById('button1');
let btn2 = document.getElementById('button_zabbix');
let count_info = 0;



btn1.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Hellooo');
    const zywall = document.getElementById("zywall_ip").value,
          mac = document.getElementById("mac").value,
          mac_full = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i,
          mac_2 = /^(([A-Fa-f0-9]{2}[:]){1}[A-Fa-f0-9]{2}[,]?)+$/i,
          error_ip = document.getElementById("error_ip"),
          error_mac = document.getElementById("error_mac"),
          block_1 = document.getElementById("form"),
          block_2 = document.getElementById("zabbix.add"),
          select_ip = document.getElementById("zywall_ip"),
          select_mac = document.getElementById("mac"),
          api_block = document.getElementById("ring"),
          api_block2 = document.getElementById("select_api");

    error_ip.innerText = "";
    error_mac.innerText = "";
    if (zywall === "") {
        error_ip.innerText = "Выберите ip";
        select_ip.style.border = "1px solid red";
        return;
    } else {
        select_ip.style.border = "1px solid white";
    }

    if (mac_full.test(mac) || mac_2.test(mac)) {
        select_ip.style.border = "1px solid white";
        console.log("Valid: " + mac);
    } else {
        console.log("InValid: " + mac);
        select_mac.style.border = "1px solid red";
        error_mac.innerText = 'Не верный Mac адрес! Введите последние 4 цифры или полный адрес';
        return;
    }
    console.log(mac, zywall)

    block_1.style.display = "none";
    block_2.style.display = "flex";
    api_block.style.display = 'block';


fetch('https://83.242.237.130:35800/api/v1/telegram_web/find_mac/', {
  method: 'POST',
  mode: 'cors',
  body: JSON.stringify({
    ip: zywall,
    mac: mac
    }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json()
  )
  .then((data) => {
    const valuesOnly = Object.values(data);
    for (let i = 0; i < valuesOnly.length; i++) {
        count_info += 1
        const element = data[i];
        const markup = "<option value='" + element.ip + "'>" + element.mac + " - " + element.ip + "</option>";
        document.getElementsByTagName('select')[1].insertAdjacentHTML('afterbegin', markup)
}
    document.getElementById("error_ring").innerHTML = 'Найдено совпадений: ' + '<b style="color: #ffa500">' + count_info +'</b>';
    api_block.style.display = "none"; //ring
    api_block2.style.display = "flex"; //api div

   })
  .catch(err => {
      console.log(err);
      document.getElementById("ring").innerText = 'ERROR';
      document.getElementById("error_ring").innerText = err;
  });
});

btn2.addEventListener('click', (e) => {
    e.preventDefault();
    const
          block_1 = document.getElementById("form"),
          block_2 = document.getElementById("zabbix.add"),
          select_ip = document.getElementById("zywall_ip"),
          select_mac = document.getElementById("mac");


});
