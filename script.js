function openTab(evt, tabName) {
    let tabcontent = document.getElementsByClassName("tab-content");
    let tabbuttons = document.getElementsByClassName("tab-button");

    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    for (let i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

function toggleRows(group) {
    const rows = document.querySelectorAll("." + group);

    rows.forEach(row => {
        row.style.display = (row.style.display === "table-row") ? "none" : "table-row";
    });
}

// Add empty row
function addRow(data = {}) {
    const table = document.getElementById("inputTable").getElementsByTagName('tbody')[0];

    const row = table.insertRow();

    const fields = ['s_no','name','country_code','lat','lng','custom_polygon'];

    fields.forEach(field => {
        const cell = row.insertCell();
        const input = document.createElement("input");
        input.value = data[field] || "";
        input.placeholder = field;
        cell.appendChild(input);
    });

    // Delete button
    const delCell = row.insertCell();
    const btn = document.createElement("button");
    btn.innerText = "❌";
    btn.onclick = () => row.remove();
    delCell.appendChild(btn);
}

// Upload CSV
function uploadCSV(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const rows = e.target.result.split("\n").slice(1);

        rows.forEach(row => {
            if (!row.trim()) return;

            const cols = row.split(",");

            addRow({
                s_no: cols[0],
                name: cols[1],
                country_code: cols[2],
                lat: cols[3],
                lng: cols[4],
                custom_polygon: cols[5]
            });
        });
    };

    reader.readAsText(file);
}

// Download sample CSV
function downloadSample() {
    const csv = `s_no,name,country_code,lat,lng,custom_polygon
1,test1,AE,25.2048,55.2708,
2,test2,AE,25.2769,55.2962,POLYGON((55.27 25.20,55.28 25.21,55.29 25.22))`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_input.csv";
    a.click();
}
