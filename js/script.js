window.onload = () => {
    if (areWeCelebrating()) {
        celebrate()
        return;
    }
    
    createCountdown();
    createParticles();
}

const titleElement = document.querySelector('h1');
const newYearDate = new Date("Jan 1, " + (new Date().getFullYear()+1) + " 00:00:00");
//const newYearDate = new Date("Dec 22, 2024 13:57:40");

function createParticles() {
    particlesJS.load('particles-js', 'assets/particles.json');
}

function createCountdown() {
    const interval = setInterval(function () {
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
        
        titleElement.textContent = '';
        let textContent = '';

        if (days > 0) {
            textContent += days + ':';
            textContent += addZero(hours) + ':';
            textContent += addZero(minutes) + ':';
        } else if (hours > 0) {
            textContent += hours + ':';
            textContent += addZero(minutes) + ':';
        } else if (minutes > 0) {
            textContent += addZero(minutes) + ':';
        }
        
        if (days === 0 && hours === 0 && minutes === 0) {
            textContent += seconds;
            
            switch (seconds) {
                case 10:
                    titleElement.style.fontSize = '10vw';
                    break;
                    
                case 9:
                    titleElement.style.fontSize = '12vw';
                    break;
                    
                case 8:
                    titleElement.style.fontSize = '14vw';
                    break;
                    
                case 7:
                    titleElement.style.fontSize = '16vw';
                    break;
                    
                case 6:
                    titleElement.style.fontSize = '18vw';
                    break;
                    
                case 5:
                    titleElement.style.fontSize = '20vw';
                    break;
                    
                case 4:
                    titleElement.style.fontSize = '22vw';
                    break;
                    
                case 3:
                    titleElement.style.fontSize = '24vw';
                    break;
                
                case 2:
                    titleElement.style.fontSize = '28vw';
                    break;
                
                case 1:
                    titleElement.style.fontSize = '30vw';
                    break;
                
                default:
                    break;
            }
        } else {
            textContent += addZero(seconds);
        }

        titleElement.textContent = textContent;
        
    }, 1000)
}

function areWeCelebrating() {
    return new Date().toDateString().includes('Jan 1');
}

function celebrate() {
    document.getElementById('particles-js').remove();
    
    titleElement.style.transition = 'none';
    titleElement.style.fontSize = '5vw';
    titleElement.textContent = 'Happy new year ' + newYearDate.getFullYear() + '!';
    
    sendConfetti();
    sendConfetti();
    sendConfetti();
    setInterval(function () {
        sendConfetti();
    }, 2500)
}

function sendConfetti() {
    const duration = 1 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
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