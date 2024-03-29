
function prayerTime(latitude, longitude) {
    fetch('http://api.aladhan.com/v1/calendar?latitude=' + latitude + '&longitude=' + longitude + '&method=4')
        .then(response => response.json())
        .then(function (response) {
            let date = new Date();
            let today = date.getDate() - 1;
            let data = response.data[today].timings;

            let app = document.getElementById('app');
            let table = document.createElement('table');
            let tableTbody = document.createElement('tbody');


            for (i in data) {
                let row = tableTbody.insertRow();
                let name = row.insertCell(0);
                let time = row.insertCell(1);

                name.innerHTML = i;
                time.innerHTML = data[i];
                tableTbody.appendChild(row);
            }

            table.appendChild(tableTbody);
            app.appendChild(table);

        })
}

function success(position) {
    prayerTime(position.coords.latitude, position.coords.longitude);
}

function error() {
    // set def latitude and longtitude jakarta
    prayerTime('-6.200000', '106.816666');
}

function userLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation tidak didukung oleh browser anda!');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function index() {
    let app = document.getElementById('app');
    let h3 = document.createElement('h3');

    h3.innerHTML = 'Prayer Times';
    app.appendChild(h3);

    userLocation();
}

index();