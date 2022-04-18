// 1
const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.shimIndexedDB;

if (!indexedDB) {
    console.log("IndexedDB could not be found in this browser.");
}

// 2
const request = indexedDB.open("QRDatabase", 1);

request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
};

request.onupgradeneeded = function () {
    const db = request.result;

    const store = db.createObjectStore("QRs", { keyPath: "key", unique: true });

    store.createIndex("key_and_data", ["key", "data"], { unique: true });
};


request.onsuccess = function () {
    console.log("Database opened successfully");

    // 1
    const db = request.result;
    const transaction = db.transaction("QRs", "readwrite");
    const store = transaction.objectStore("QRs");
};


function getConnection() {
    const db = request.result;
    const transaction = db.transaction("QRs", "readwrite");
    const store = transaction.objectStore("QRs");

    return store;
}


async function searchKey(key) {

    let store = getConnection();

    const keyQuery = store.getKey(key);

    return new Promise((resolve, reject) => {
        keyQuery.onsuccess = function () {

            if (keyQuery.result)
                resolve(true);
            else
                resolve(false);
        }

        keyQuery.onerror = function () {
            reject(false);
        }
    });
}

async function getData(key) {
    let store = getConnection();

    const keyQuery = store.get(key);

    return new Promise((resolve, reject) => {
        keyQuery.onsuccess = function () {

            if (keyQuery.result)
                resolve(keyQuery.result);
            else
                resolve(false);
        }

        keyQuery.onerror = function () {
            reject(false);
        }
    });
}

function closeDB(transaction, db) {
    transaction.oncomplete = function () {
        db.close();
    };
}

function insertData(dataObj) {
    let store = getConnection();

    if (store)
        store.put(dataObj);
    else
        return false;

    return true;
}