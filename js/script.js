let pageWidth = window.innerWidth;

const newYearDate = new Date("Jan 1, " + (new Date().getFullYear()+1) + " 00:00:00");
//const newYearDate = new Date("Dec 23, 2024 15:48:00");

let timerTitleElement = document.getElementById('timer-title');

const daysContainer = document.querySelector('.daysContainer');
const daysElement = document.getElementById('days');
const daysTextElement = document.getElementById('days-text');

const hoursContainer = document.querySelector('.hoursContainer');
const hoursElement = document.getElementById('hours');
const hoursTextElement = document.getElementById('hours-text');

const minutesContainer = document.querySelector('.minutesContainer');
const minutesElement = document.getElementById('minutes');
const minutesTextElement = document.getElementById('minutes-text');

const secondsElement = document.getElementById('seconds');
const secondsTextElement = document.getElementById('seconds-text');

let interval = null;

// Events
window.addEventListener('load', () => {
    if (areWeCelebrating()) {
        celebrate()
        return;
    }
    
    createDots();
    
    loop();
    interval = setInterval(function () {
        loop();
    }, 1000)
    
    createParticles();
})

window.addEventListener('resize', () => {
    pageWidth = window.innerWidth;
});

timerTitleElement.addEventListener('click', (event) => {
    timerTitleElement.remove();
    timerTitleElement = undefined;
})

// Functions
function createDots() {
    for (const dot of document.querySelectorAll('.dots')) {
        dot.textContent = ':';
    }
}

function createParticles() {
    particlesJS.load('particles-js', 'assets/particles.json');
}

function loop() {
    const now = new Date().getTime();
    const t = newYearDate.getTime() - now;
    
    if (t < 1000 || areWeCelebrating()){
        clearInterval(interval);
        celebrate();
        return;
    }
    
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
    const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((t % (1000 * 60)) / 1000);
    
    updateTimerTitle(days, hours, minutes);
    
    if (days === 0) {
        daysContainer.remove();
        
        if (hours === 0) {
            hoursContainer.remove();
        }
        
        if (minutes === 0) {
            minutesContainer.remove();
        }
    }
    
    if (pageWidth <= 599) {
        if (days === 0 && hours === 0) {
            document.querySelector('main').classList.add('always-vertical');
            daysContainer.remove();
            updateDesktopElements(days, hours, minutes, seconds);
        } else {
            daysElement.textContent = ''+days;
            daysTextElement.textContent = plural('day', days);
            
            hoursElement.textContent = ''+hours;
            hoursTextElement.textContent = plural('hour', hours);
            
            minutesElement.textContent = ''+minutes;
            minutesTextElement.textContent = plural('minute', minutes);
            
            secondsElement.textContent = ''+seconds;
            secondsTextElement.textContent = plural('second', seconds);
        }
    } else {
        document.querySelector('main').classList.remove('always-vertical');
        updateDesktopElements(days, hours, minutes, seconds);
    }
}

function plural(word, num) {
    if (num <= 1) {
        return word;
    } else {
        return word + 's';
    }
}

function updateTimerTitle(days, hours, minutes) {
    if (timerTitleElement === undefined) {
        return;
    }
    
    if (days === 0) {
        timerTitleElement.textContent = 'This is the last day...';
        
        if (hours === 0) {
            timerTitleElement.textContent = "Less than an hour!";
            
            if (minutes <= 5) {
                timerTitleElement.textContent = "IT'S THE FINAL COUNTDOWN!";
                
                if (minutes === 0) {
                    timerTitleElement.remove();
                    timerTitleElement = undefined;
                }
            }
        }
    } else {
        timerTitleElement.textContent = 'New year timer!';
    }
}

function updateDesktopElements(days, hours, minutes, seconds) {
    if (days > 0) {
        daysElement.textContent = ''+days;
        hoursElement.textContent = addZero(hours);
        minutesElement.textContent = addZero(minutes);
    } else if (hours > 0) {
        hoursElement.textContent = addZero(hours);
        minutesElement.textContent = addZero(minutes);
    } else if (minutes > 0) {
        minutesElement.textContent = addZero(minutes);
    }
    
    if (days === 0 && hours === 0 && minutes === 0) {
        secondsElement.textContent = seconds;
        secondsElement.className = 'num last-seconds';
        
        switch (seconds) {
            case 5:
                secondsElement.className = 'num last-five';
                break;
            
            case 4:
                secondsElement.className = 'num last-four';
                break;
            
            case 3:
                secondsElement.className = 'num last-three';
                break;
            
            case 2:
                secondsElement.className = 'num last-two';
                break;
            
            case 1:
                secondsElement.className = 'num last-one';
                break;
            
            default:
                break;
        }
    } else {
        secondsElement.textContent = addZero(seconds);
    }
}

function areWeCelebrating() {
    return new Date().toDateString().includes('Jan 1');
}

function celebrate() {
    document.getElementById('particles-js').remove();
    
    if (timerTitleElement !== undefined) {
        timerTitleElement.remove();
    }
    
    const mainContainer = document.querySelector('main');
    
    mainContainer.innerHTML = '';
    
    const happyNewYear = document.createElement('h1');
    happyNewYear.textContent = 'Happy new year ' + newYearDate.getFullYear() + '!';
    happyNewYear.id = 'happy-new-year';
    mainContainer.appendChild(happyNewYear);
    
    sendConfetti();
    sendConfetti();
    sendConfetti();
    sendConfetti();
    setInterval(function () {
        sendConfetti();
    }, 2500)
}

function sendConfetti() {
    const duration = 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: -2 };
    
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        
        const particleCount = 50 * (timeLeft / duration);
        
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 250);
}

function addZero(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}