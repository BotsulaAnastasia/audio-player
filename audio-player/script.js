const player = document.querySelector('.player-wrapper'),
        audio = document.querySelector('.audio'),
        cover = document.querySelector('.cover-img'),
        progressWrapper = document.querySelector('.progress-wrapper'),
        progress = document.querySelector('.progress'),
        songArtist = document.querySelector('.song-artist'),
        songTitle = document.querySelector('.song-title'),
        playBtn = document.querySelector('.play-btn'),
        playOrPause = document.querySelector('.play_pause'),
        prevBtn = document.querySelector('.prev-song-btn'),
        nextBtn = document.querySelector('.next-song-btn'),
        currentTime = document.querySelector('.current-time'),
        totalTime = document.querySelector('.total-time');

const artists = ['Rick Astley', 'Queen', 'Lipps Inc.'];
const songs = ['Never Gonna Give You Up', 'Radio Ga Ga', 'Funkytown'];
let artistInd = 0;
let songInd = 0;

// Load songs and songs titles
function loadSong(song) {
        songTitle.innerHTML = song;
        audio.src = `assets/music/${song}.mp3`;
}

// Load covers and artists names
function loadCover(artist) {
        songArtist.innerHTML = artist;
        cover.src = `assets/img/${artist}.jpg`;
        document.body.style.backgroundImage = `url("./assets/img/${artist}.jpg")`;
}
        
loadCover(artists[artistInd]);
loadSong(songs[songInd]);

// Load song duration
audio.addEventListener('loadeddata', () => {
        totalTime.textContent = convertTime(audio.duration);
})

// Play song
function playSong() {
        player.classList.add('play');
        playOrPause.style.backgroundImage = `url("./assets/svg/pause.svg")`;
        audio.play();
}

// Pause song
function pauseSong() {
        player.classList.remove('play');
        playOrPause.style.backgroundImage = `url("./assets/svg/play.svg")`;
        audio.pause();
}

playBtn.addEventListener('click', () => {
        if (player.classList.contains('play')) {
                pauseSong();
        } else {
                playSong();
        }
})

// Next song
function nextSong() {
        songInd++;
        if (songInd > songs.length - 1) songInd = 0; 
        loadSong(songs[songInd]);

        artistInd++;
        if (artistInd > artists.length - 1) artistInd = 0;
        loadCover(artists[artistInd]);
        
        playSong();   
}
nextBtn.addEventListener('click', nextSong);

// Prev song
function prevSong() {
        songInd--;
        if (songInd < 0) songInd = songs.length - 1; 
        loadSong(songs[songInd]);

        artistInd--;
        if (artistInd < 0) artistInd = artists.length - 1;
        loadCover(artists[artistInd]);
        
        playSong();   
}
prevBtn.addEventListener('click', prevSong);

// Progress bar
function updateProgressBar() {
        const progressWidth = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${progressWidth}%`;
        currentTime.textContent = convertTime(audio.currentTime);       
}
audio.addEventListener('timeupdate', updateProgressBar);

function convertTime(time) {
        let min = String(Math.trunc(time / 60));
        let sec = String(Math.floor(time % 60)).padStart(2, '0');
        return `${min}:${sec}`;
}

// Control progress bar
function controlProgressBar(e) {
        const widthWrapper = this.clientWidth;
        const clickWrapperX = e.offsetX;
        audio.currentTime = (clickWrapperX / widthWrapper) * audio.duration;
}
progressWrapper.addEventListener('click', controlProgressBar);

// Autoplay
audio.addEventListener('ended', nextSong);