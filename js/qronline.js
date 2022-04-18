let qrImageContainer = document.getElementById("qrimage")
    , exportQRImageBtn = document.getElementById("exportImageQRCodeOutputBtn")
    , qrDataInput = document.getElementById("qr_data")
    , textAreaLength = document.querySelector("#textAreaLength")
    , qrHeight = 256
    , qrWidth = 256
    , qrimage = new QRCode("qrimage", {
        text: document.getElementById("qr_data").value,
        width: qrWidth,
        height: qrHeight,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
qrDataInput.oninput = (ev) => {
    textAreaLength.value = qrDataInput.textLength + "/" + qrDataInput.maxLength
}
function create(url) {
    qrimage.makeCode(url);
}
qrimage.clear(),
    qrimage.makeCode(qrDataInput.value),
    exportQRImageBtn.onclick = function (e) {
        var t = qrImageContainer.getElementsByTagName("img")[0].src;
        if (window.Blob) {
            let e = document.createElement("a");
            e.download = "qr_code.png",
                e.innerHTML = "Download File",
                e.href = t,
                e.style.display = "none",
                document.body.appendChild(e),
                e.click(),
                document.body.removeChild(e)
        } else
            alert("Your browser does not support HTML5 'Blob' function required to save a file.")
    }
    ;
let qr_data = document.querySelector("textarea");
qr_data.style.height = qr_data.scrollHeight + "px";
qr_data.addEventListener("input", OnInput, false);

function OnInput() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
    this.style.overflow = "hidden";
}

String.prototype.hashCode = function () {
    return this.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
}

function Generate() {
    let random = Math.random().toString();
    let key = random.hashCode();
    let b = btoa(key);
    let url = location.origin + "/html/result.html?key=" + b;

    searchKey(b).then(result => {
        if (!result) {
            create(url);
            insertData({ key: b, data: qrDataInput.value });
        }
    }).catch(err => {
        console.error(err);
    });
}