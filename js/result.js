let qrKey = document.querySelector("#qrkey");
let qrData = document.querySelector("#qr_data");

let key = location.search.substring(1);
let parts = key.split("&");
let value = null;

if (parts[0].includes("key"))
    value = parts[0].substring(parts[0].indexOf('=') + 1)

qrKey.innerText = value;

let qr_data = document.querySelector("textarea");


setTimeout(() => {
    getData(value).then(result => {
        if (!result) {
            qrData.value = "Error: Key not found in Database.";
        }
        else
            qrData.value = result.data;

        qr_data.style.height = qr_data.scrollHeight + "px";
        qr_data.style.overflow = "hidden";

    }).catch(err => {
        qrData.value = err;
    });
}, 1000);

qr_data.style.height = qr_data.scrollHeight + "px";
qr_data.addEventListener("input", OnInput, false);

function OnInput() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
    this.style.overflow = "hidden";
}