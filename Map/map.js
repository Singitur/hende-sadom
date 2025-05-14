data = [
  { id: "region-1", value: 10 },
  { id: "region-2", value: 45 },
  { id: "region-3", value: 90 },
]

const values = data.map(d => parseFloat(d.value));
const min = Math.min(...values);  // e.g., 10
const max = Math.max(...values);  // e.g., 90




function changeColour() {
         document.getElementById("jh-ws-17").setAttribute("fill", "yellow");
         document.getElementById("comment").innerText = "dskfsk";
      }

    document.getElementById('fileInput').addEventListener('change', handleFile);

    function handleFile(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);

        // Assume structure: [{ id: 'region-1', value: 10 }, ...]
        updateMapColors(json);
      };

      reader.readAsArrayBuffer(file);
    }

    function updateMapColors(data) {
      data.forEach(row => {
        const region = document.getElementById(row.id);
        if (region) {
          // Simple color scale: higher value = darker red
          const value = parseFloat(row.value);
          const color = `rgb(${255 - value * 10}, 50, 50)`;
          region.setAttribute('fill', color);
        }
      });
    }
