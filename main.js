let tg = window.Telegram.WebApp;
tg.expand();

const onSubmit = (e) => {
    document.getElementById("error").innerText = '';
    e.preventDefault();
    console.log('Hellooo');
    const zywall = document.getElementById("zywall_ip").value;
    const name = document.getElementById("name").value;
    const mac = document.getElementById("mac").value;
    // const error = document.getElementById("error");
    // const errorMsgs = [];

    if (zywall.length < 10) {
        document.getElementById("error").innerText = 'Ошибка. Вы не выбрали Zywall';
        return;
    }
    if (name.length >= 5) {
        document.getElementById("error").innerText = 'Ошибка в имени';
        return;
    }
    if (mac.length >= 5) {
        document.getElementById("error").innerText = 'Ошибка mac';
        return;
    }

}