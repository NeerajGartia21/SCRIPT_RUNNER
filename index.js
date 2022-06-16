
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = csvFile.files[0];
    const freq = document.getElementById('freq').value;
    const url = document.getElementById('url').value;
    const deviceId = document.getElementById('deviceId').value;
    const line=document.getElementById('line').value;
    if (input) {
        const reader = new FileReader();

        reader.onload = function (e) {
            let data = JSON.parse(e.target.result);
            if(data.features){
                updateLocation(url, deviceId, freq, data.features[0].geometry.coordinates[0], 0);
            }else{
                document.getElementById('error').innerHTML='Please upload valid json file'
            }
        };
        reader.readAsText(input);
    } else {
        fetch(`./gpx/${line}.json`).then(res => res.json()).then(data => {
            updateLocation(url, deviceId, freq, data.features[0].geometry.coordinates[0], 0);
        })
    }
    function updateLocation(url, deviceID, freq, data, i) {
        setTimeout(function () {
            let row = data[i]
            let URL = url + '?id=' + deviceID + '&lat=' + row[1] + '&lon=' + row[0];
            console.log(url)
            fetch(URL, {
                method: 'POST'
            }).then(res => res.json()).then(data => console.log(data));
            i++;
            if (data[i]) {
                updateLocation(url, deviceID, freq, data, i);
            } else { return }
        }, freq)
    }
});
