const tg = window.Telegram.WebApp;
tg.expand();
let btn1 = document.getElementById('button1');
let btn2 = document.getElementById('button_zabbix');
let count_info = 0;

// get api with insert option
fetch('https://expo-torg.ddns.me:45100/api/v1/telegram_web/ip/')
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
    .catch(e => console.error('EXCEPTION: ', e));

// listener first button
btn1.addEventListener('click', (e) => {
    e.preventDefault();
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
          api_block2 = document.getElementById("select_api"),
          button_error = document.getElementById("button_error");

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

    block_1.style.display = "none";
    block_2.style.display = "none";
    api_block.style.display = 'block';


fetch('https://expo-torg.ddns.me:45100/api/v1/telegram_web/find_mac/', {
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
    block_2.style.display = "flex";


   })
  .catch(err => {
      console.log(err);
      button_error.style.display = ""
      document.getElementById("ring").innerText = 'ERROR';
      document.getElementById("error_ring").innerText = err;
  });
});

  const checkboxYes = document.getElementById('YES'),
        checkboxNo = document.getElementById('NO'),
        zabbix_name = document.getElementById("zabbix_name")
        zabbix_name_input = document.getElementById("zabbix_name_input")
        zabbix_tags = document.getElementById("zabbix_tags")
        zabbix_tags_text = document.getElementById("zabbix_tags_text")

  checkboxYes.addEventListener('change', function() {
    if (this.checked) {
      checkboxNo.checked = false;
      zabbix_name.style.display = "";
      zabbix_name_input.style.display = "";
      zabbix_tags.style.display = "";
      zabbix_tags_text.style.display = "";
    }
  });

  checkboxNo.addEventListener('change', function() {
    if (this.checked) {
      checkboxYes.checked = false;
      zabbix_name.style.display = "none";
      zabbix_name_input.style.display = "none";
      zabbix_tags.style.display = "none";
      zabbix_tags_text.style.display = "none";
    }
  });

    const checkboxes = document.querySelectorAll('#zabbix_tags input[type="checkbox"]');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      checkboxes.forEach(otherCheckbox => {
        if (otherCheckbox !== this) {
          otherCheckbox.checked = false;
        }
      });
    }
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

