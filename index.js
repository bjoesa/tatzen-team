// Service worker 
window.addEventListener('load', () => {
    registerSW();
});

async function registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./sw.js');
      } catch (e) {
        console.log(`SW registration failed`);
      }
    }
}

// Alarm logic
let alarm = new Audio('sounds/feuerwehr-sirene.mp3');
let policealarm = new Audio('sounds/polizei-sirene.mp3');
let timerStarted = false;


        function startTimer() {
            if (!timerStarted) {
                let startTime = new Date().getTime();
                let fiveMinutes = 1000 * 60 * 1;    // change the 1 to 5 if it should be five minutes instead of the current one
                let endTime = startTime + fiveMinutes;


                var myInterval = setInterval(function() {
                    let timeLeft = endTime - new Date().getTime();


                    if (timeLeft > 0) {
                        let minutes = timeLeft / (1000 * 60);
                        minutes = Math.floor(minutes);
                        let seconds = (timeLeft / 1000) % 60;
                        seconds = Math.round(seconds);
                        seconds = ('0' + seconds).slice(-2);
                        let text = '0' + minutes + ' : ' + seconds;
                        timer.innerHTML = text;
                        document.getElementById('blaulicht').className = 'blinker';
                        
                    } else {
                        alarm.play();
                        timer.innerHTML = '00 : 00';
                    }
                }, 1000);
                timerStarted = true;
            }
        }

        // Soundsteuerung
        // +++ TODO +++ insert sound loop
        function fireAlarm() {
            alarm.play();
            document.getElementById('blaulicht').className = 'roterblinker';
        }

        function policeAlarm() {
            policealarm.play();
            document.getElementById('blaulicht').className = 'blinker';
        }

        function sirenePause() {
            alarm.pause();
            policealarm.pause();
        }

function sireneReset() {
    alarm.currentTime = 0;
    policealarm.currentTime = 0;
    alarm.pause();
    policealarm.pause();
}

// reset page to reset timer (workaround)
function resetPage() {
    window.location.reload(true);
}