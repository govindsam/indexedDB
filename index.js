const form = document.querySelector("form");
const submit = document.querySelector(".submit");
const update = document.querySelector(".update");
submit.addEventListener("click", ()=>{
    let idb = indexedDB.open("crud",1);
    idb.onupgradeneeded = ()=>{
        let res = idb.result;
        res.createObjectStore("data", { autoIncrement:true })
    }
    idb.onsuccess = ()=>{
        let res = idb.result;
        let tx = res.transaction("data", "readwrite");
        let store = tx.objectStore("data");
        store.put({
            name :form[0].value,
            email :form[1].value,
            phone :form[2].value,
            address :form[3].value,
        });
    }
});
