const parent = document.querySelector('.container.theme-showcase');
const timerBody = document.createElement('div');
const timerEnded = document.createElement('div');

timerEnded.className = 'modal-content';
timerBody.className = 'explanation jumbotron';
timerBody.innerText = '00:00:00';
parent.appendChild(timerBody);

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = formatHours(sec_num)
    var minutes = formatMinutes(sec_num, hours)
    var seconds = formatSeconds(sec_num, hours, minutes);

    return hours+':'+minutes+':'+seconds;
}

function formatHours(seconds) {
    const hours = Math.floor(seconds/ 3600);

    return formatTime(hours);
}

function formatMinutes(seconds, hours) {
    const minutes = Math.floor((seconds - (hours * 3600)) / 60);

    return formatTime(minutes);
}

function formatSeconds(seconds, hours, minutes) {
    const sec = seconds - (hours * 3600) - (minutes * 60);

    return formatTime(sec);
}

function formatTime(currentPart) {
    if (currentPart < 10) {
        return currentPart  = "0" + currentPart;
    }

    return currentPart
}


function print(seconds, stopTimer) {
    if(seconds === 0) {
        stopTimer();
        timerBody.innerText = "Promotion has ended";

        return;
    }

    timerBody.innerText = seconds.toString().toHHMMSS();
}

function timeCounter(timeOut) {
    let seconds = timeOut;
    let secondsAsString = timeOut.toString();

    const timeInterval = setInterval(function(){
        seconds -= 1;
        print(seconds, stopTimer.bind(this));
    }, 1000);

    function stopTimer() {
        clearInterval(timeInterval);
    }
}


timeCounter(5);
