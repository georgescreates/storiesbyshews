// import WaveSurfer from '../shews/node_modules/wavesurfer.js/dist/wavesurfer.js';

var shewsCards = document.getElementsByClassName('shews-card');
let previousTiltLeft = Math.random() < 0.5; // Random start direction

// Store original transforms for each card
const cardTransforms = [];

for(let i = 0; i < shewsCards.length; i++) {
    // Alternate between left and right tilt
    let tiltLeft = !previousTiltLeft;
    let randomAngle;
    
    if(tiltLeft) {
        randomAngle = Math.floor(Math.random() * 30) - 45; // -45 to -15 for left tilt
    } else {
        randomAngle = Math.floor(Math.random() * 30) + 15;  // 15 to 45 for right tilt
    }
    
    var randomX = Math.floor(Math.random() * 8) - 4;
    var randomZ = Math.floor(Math.random() * 3) + 1;
    
    // Store the original transform
    const transform = `rotate(${randomAngle}deg) translateX(${randomX}px)`;
    cardTransforms[i] = transform;
    
    shewsCards[i].style.transform = transform;
    shewsCards[i].style.zIndex = randomZ;
    
    // Add hover event listeners
    shewsCards[i].addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(0deg) scale(1.1)'; // Straighten and enlarge on hover
        this.style.zIndex = 10; // Bring to front
        this.style.filter = 'hue-rotate(0deg)';
    });

    shewsCards[i].addEventListener('mouseleave', function() {
        this.style.transform = cardTransforms[i]; // Restore original transform
        this.style.zIndex = randomZ; // Restore original z-index
        this.style.filter = 'hue-rotate(-90deg)';
    });
    
    previousTiltLeft = tiltLeft;
}

var audioTracks = [
    '../assets/audio/audio-patch04.mp3',
    '../assets/audio/audio-patch01.mp3',
    '../assets/audio/audio-patch02.mp3',
    '../assets/audio/audio-patch00.mp3',
    '../assets/audio/audio-patch03.mp3',
    '../assets/audio/audio-patch04.mp3',
    '../assets/audio/audio-patch01.mp3',
    '../assets/audio/audio-patch02.mp3',
    '../assets/audio/audio-patch00.mp3',
    '../assets/audio/audio-patch03.mp3'
];

const wavesurfers = [];

document.addEventListener('DOMContentLoaded', () => {
    var audioPatches = document.getElementsByClassName('audio-patch');
    var playBtns = document.getElementsByClassName('audio-patch-play-pause-btn');
    var timeDisplays = document.getElementsByClassName('audio-countdown');
    const waveContainers = Array.from(document.getElementsByClassName('audio-soundwave-container'));
    var audioPatchesSliders = document.querySelectorAll('.audio-patches-slider');

    function initializeAudio() {
        waveContainers.forEach((container, index) => {
            // Create wavesurfer instance
            const wavesurfer = WaveSurfer.create({
                container: container,
                waveColor: '#ececec',
                progressColor: '#cb6fac',
                height: 32,
                barWidth: 4,
                barHeight: 2,
                barRadius: 16,
                minPxPerSec: 1,
                cursorWidth: 0,
                normalize: true,
                url: audioTracks[index]
            });

            // Store instance in array
            wavesurfers[index] = wavesurfer;

            // Setup play button listener
            playBtns[index].addEventListener('click', (e) => {
                wavesurfers.forEach((ws, i) => {
                    if (i !== index && ws.isPlaying()) {  // If it's not the current audio and it's playing
                        ws.pause();  // Pause it
                        playBtns[i].dataset.status = 'to-play';  // Reset its button status
                        playBtns[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#cb6fac"><path d="M340-302.23v-355.54q0-15.84 10.87-26 10.87-10.15 25.37-10.15 4.53 0 9.5 1.31 4.97 1.3 9.49 3.92l279.84 178.15q8.24 5.62 12.35 13.46 4.12 7.85 4.12 17.08 0 9.23-4.12 17.08-4.11 7.84-12.35 13.46L395.23-271.31q-4.53 2.62-9.52 3.92-4.98 1.31-9.51 1.31-14.51 0-25.35-10.15-10.85-10.16-10.85-26Z" /></svg>';

                        audioPatchesSliders[0].style.animationPlayState = "running";
                        audioPatchesSliders[1].style.animationPlayState = "running";

                        audioPatches[index].classList.remove('active');
                    }
                });

                wavesurfer.playPause();

                if(playBtns[index].dataset.status === 'to-play') {
                    playBtns[index].dataset.status = 'to-pause';
                    playBtns[index].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#cb6fac"><path d="M620-220q-24.54 0-42.27-17.73Q560-255.46 560-280v-400q0-24.54 17.73-42.27Q595.46-740 620-740h30q24.54 0 42.27 17.73Q710-704.54 710-680v400q0 24.54-17.73 42.27Q674.54-220 650-220h-30Zm-310 0q-24.54 0-42.27-17.73Q250-255.46 250-280v-400q0-24.54 17.73-42.27Q285.46-740 310-740h30q24.54 0 42.27 17.73Q400-704.54 400-680v400q0 24.54-17.73 42.27Q364.54-220 340-220h-30Z"/></svg>';
                    audioPatchesSliders[0].style.animationPlayState = "paused";
                    audioPatchesSliders[1].style.animationPlayState = "paused";

                    audioPatches[index].classList.add('active');
                } else {
                    playBtns[index].dataset.status = 'to-play';
                    playBtns[index].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#cb6fac"><path d="M340-302.23v-355.54q0-15.84 10.87-26 10.87-10.15 25.37-10.15 4.53 0 9.5 1.31 4.97 1.3 9.49 3.92l279.84 178.15q8.24 5.62 12.35 13.46 4.12 7.85 4.12 17.08 0 9.23-4.12 17.08-4.11 7.84-12.35 13.46L395.23-271.31q-4.53 2.62-9.52 3.92-4.98 1.31-9.51 1.31-14.51 0-25.35-10.15-10.85-10.16-10.85-26Z" /></svg>';

                    audioPatchesSliders[0].style.animationPlayState = "running";
                    audioPatchesSliders[1].style.animationPlayState = "running";

                    audioPatches[index].classList.remove('active');
                }
            });

            // Setup finish event
            wavesurfer.on('finish', () => {
                playBtns[index].dataset.status = 'to-play';
                playBtns[index].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#cb6fac"><path d="M340-302.23v-355.54q0-15.84 10.87-26 10.87-10.15 25.37-10.15 4.53 0 9.5 1.31 4.97 1.3 9.49 3.92l279.84 178.15q8.24 5.62 12.35 13.46 4.12 7.85 4.12 17.08 0 9.23-4.12 17.08-4.11 7.84-12.35 13.46L395.23-271.31q-4.53 2.62-9.52 3.92-4.98 1.31-9.51 1.31-14.51 0-25.35-10.15-10.85-10.16-10.85-26Z" /></svg>';

                audioPatchesSliders[0].style.animationPlayState = "running";
                audioPatchesSliders[1].style.animationPlayState = "running";

                audioPatches[index].classList.remove('active');

                wavesurfer.stop();
            });

            // Setup ready event
            wavesurfer.on('ready', () => {
                const trackLength = wavesurfer.getDuration();
                const minutes = Math.floor(trackLength / 60);
                const seconds = Math.floor(trackLength % 60);
                timeDisplays[index].textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            });

            // Setup audioprocess event
            wavesurfer.on('audioprocess', () => {
                const trackLength = wavesurfer.getDuration();
                const currentTime = wavesurfer.getCurrentTime();
                const timeLeft = trackLength - currentTime;
                
                const minutes = Math.floor(timeLeft / 60);
                const seconds = Math.floor(timeLeft % 60);
                timeDisplays[index].textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            });

        });
    }
    initializeAudio();
});

const connexionsModalTriggerBtn = document.getElementById('connexions-modal-trigger-btn');
const connexionsModalCloseBtn = document.getElementById('connexions-modal-close-btn');
const connexionsModal = document.getElementById('connexions-modal');

connexionsModalTriggerBtn.addEventListener('click', (e) => {
    connexionsModal.dataset.triggered = "true";
});

connexionsModalCloseBtn.addEventListener('click', (e) => {
    connexionsModal.dataset.triggered = "false";
});