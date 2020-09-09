let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// create audio element
let curr_track = document.createElement("audio");

//list of tracks that has to be played

let track_list = [{
        name: "Baptize",
        artist: "RKCB",
        image: "../images/image1.jpg",
        path: "RKCB - Baptize my-free-mp3s.com .mp3"
    },

    {
        name: "Comatose",
        artist: "RKCB",
        image: "../images/image2.jpg",
        path: "RKCB - Comatose my-free-mp3s.com .mp3"
    },

    {
        name: "Elevated",
        artist: "RKCB",
        image: "../images/image3.jpg",
        path: "RKCB - Elevated my-free-mp3s.com .mp3"
    },
];

function random_bg_color() {
    //Getting random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    //constructing a color with the given values
    let bgcolor = "rgb(" + red + ", " + green + ", " + blue + " )";

    //set background color to the new color
    document.body.style.background = bgcolor;
}

function loadTrack(track_index) {
    // clearing the previous seek time
    clearInterval(updateTimer)

    //load new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    //update details of track
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    //setting an interval of 1000 miliseconds for updating seeker
    updateTimer = setInterval(seekUpdate, 1000);

    //move to the next track if the current finishes playing 
    // using the ' ended ' event
    curr_track.addEventListener("ended", nextTrack);

    //applying a random background color
    random_bg_color();
}

//function to reset all values to their default
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

// load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
    //switch between playing and pausing
    //depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    //play the loaded track
    curr_track.play();
    isPlaying = true;

    //replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    //play the loaded track
    curr_track.pause();
    isPlaying = false;

    //replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    //Go back to the first track if the current one is the last in the track list
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;

    //load and play the new track
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    //Go back to the last track if the current one is the first in the track list
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length;

    //load and play the new track
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    //calculate the seek position by the
    //percentage of the the seek slider
    //and get the relative duration to the track

    seekTo = curr_track.duration * (seek_slider.value / 100);

    //set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
}

function setVolume() {
    //set the volume according to the
    //percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    //check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        //Calculating the time left and the duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        //Add a zero to the single digit time value
        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }

        //display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}