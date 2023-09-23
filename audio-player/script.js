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

function loadSong(song) {
        songTitle.innerHTML = song;
        audio.src = `assets/music/${song}.mp3`;
}

function loadCover(artist) {
        songArtist.innerHTML = artist;
        cover.src = `assets/img/${artist}.jpg`;
        document.body.style.backgroundImage = `url("./assets/img/${artist}.jpg")`;
}
        
loadCover(artists[artistInd]);
loadSong(songs[songInd]);

function playSong() {
        player.classList.add('play');
        playOrPause.style.backgroundImage = `url("./assets/svg/pause.svg")`;
        audio.play();
}

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