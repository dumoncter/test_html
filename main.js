const tg = window.Telegram.WebApp;
tg.expand();


const onSubmit = (e) => {
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
          select_mac = document.getElementById("mac");

    error_ip.innerText = "";
    error_mac.innerText = "";
    if (zywall === "") {
        error_ip.innerText = "Выберите ip";
        select_ip.style.border = "1px solid red";
        return;
    }
    if (mac_full.test(mac) || mac_2.test(mac)) {
        console.log("Valid: " + mac);
    } else {
        console.log("InValid: " + mac);
        select_mac.style.border = "1px solid red";
        error_mac.innerText = 'Не верный Mac адрес! Введите последние 4 цифры или полный адрес';
        return;
    }
    block_1.style.display = "none";
    block_2.style.display = "flex";
}