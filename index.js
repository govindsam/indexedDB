const form = document.querySelector("form");
const submit = document.querySelector(".submit");
const updates = document.querySelector(".update");
const tbody = document.querySelector("table>tbody");
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
function read(){
    let idb = indexedDB.open("crud", 1);
    idb.onsuccess= ()=>{
        let res = idb.result;
        let tx = res.transaction("data", "readonly");
        let store = tx.objectStore("data");
        let cursor = store.openCursor();
        cursor.onsuccess = ()=>{
            let curRes = cursor.result;
            if(curRes){
                console.log(curRes.value.name);
                tbody.innerHTML += `
                    <tr>
                        <td>${curRes.value.name}</td>
                        <td>${curRes.value.email}</td>
                        <td>${curRes.value.phone}</td>
                        <td>${curRes.value.address}</td>
                        <td onclick ="update(${curRes.key})">update</td>
                        <td onclick ="del(${curRes.key})">delete</td>
                    </tr>
                `;
                curRes.continue();

            }
        }
    }
}
function del(e){
    let idb = indexedDB.open("crud", 1);
    idb.onsuccess= ()=>{
        let res = idb.result;
        let tx = res.transaction("data", "readwrite");
        let store = tx.objectStore("data");
        store.delete(e);
        location.reload();
        alert("data has been deleted");
    }
}
function update(e){
    submit.style.display = "none";
    updates.style.display ="block";
}
read();
