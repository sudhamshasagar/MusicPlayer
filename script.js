document.addEventListener('DOMContentLoaded', function () {
    const greetElement = document.querySelector('#greet');

    // Check if the URL contains name parameter
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('name');

    let greet = 'Welcome';
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        greet = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
        greet = 'Good Afternoon';
    } else {
        greet = 'Good Evening';
    }

    if (userName && userName.trim() !== '') {
        greetElement.textContent = `${greet}, ${userName}!`;
    } else {
        greetElement.textContent = greet;
    }


    displayDate();
    setInterval(displayDate, 1000);
});

function displayDate(){
    const dateElement = document.querySelector('#date');
    const now = new Date();
    const formattedDate = now.toLocaleTimeString();
    dateElement.textContent = formattedDate;
    
}



const randomIndex = Math.floor(Math.random() * topPicJson.length);
const randomSong = topPicJson[randomIndex];
let isPlaying = false
let resumeTime = 0;

// Select the existing footer element




const songContainer = document.querySelector('.right-lower');
    let currentlyPlaying = null; // Keeps track of the currently playing audio element

    topPicJson.forEach(songs => {
        const audioElement = document.createElement('audio');
        audioElement.src = songs.source;

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        songContainer.appendChild(cardContainer);

        const songPosterContainer = document.createElement('div');
        songPosterContainer.classList.add('song-poster');
        cardContainer.appendChild(songPosterContainer);

        const songPoster = document.createElement('img');
        songPoster.setAttribute('src', songs.image);
        songPosterContainer.appendChild(songPoster);

        const songDetailsContainer = document.createElement('div');
        songDetailsContainer.classList.add('song-details');
        cardContainer.appendChild(songDetailsContainer);

        const songTitle = document.createElement('h2');
        songTitle.textContent = songs.title;
        songDetailsContainer.appendChild(songTitle);

        const artistName = document.createElement('h3');
        artistName.textContent = songs.artists;
        songDetailsContainer.appendChild(artistName);

        cardContainer.addEventListener('click', function () {
            if (currentlyPlaying) {
                currentlyPlaying.pause(); // Pause the currently playing song
            }
            audioElement.play(); // Start the new song
            currentlyPlaying = audioElement; // Update the currentlyPlaying variable

            // Remove the existing footer content
            const footerElement = document.querySelector('.footer');
            footerElement.innerHTML = '';

            // Create the individual elements and set their attributes
            const playingSongImage = document.createElement('div');
            playingSongImage.classList.add('playing-song-image');
            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', songs.image);
            playingSongImage.appendChild(imgElement);

            const controlBars = document.createElement('div');
            controlBars.classList.add('control-bars');

            const controlButtons = document.createElement('div');
            controlButtons.classList.add('control-buttons');
            const backwardButton = document.createElement('i');
            backwardButton.classList.add('fa-solid', 'fa-backward');
            const playButton = document.createElement('i');
            playButton.classList.add('fa-solid', 'fa-play');
            const forwardButton = document.createElement('i');
            forwardButton.classList.add('fa-solid', 'fa-forward');
            controlButtons.appendChild(backwardButton);
            controlButtons.appendChild(playButton);
            controlButtons.appendChild(forwardButton);
            controlBars.appendChild(controlButtons);

            const bar = document.createElement('div');
            bar.classList.add('bar');
            const barPercentage = document.createElement('div');
            barPercentage.classList.add('barpercentage');
            bar.appendChild(barPercentage);
            controlBars.appendChild(bar);

            const userButtons = document.createElement('div');
            userButtons.classList.add('user-buttons');
            const volumeHighIcon = document.createElement('i');
            volumeHighIcon.classList.add('fa-solid', 'fa-volume-high');
            const heartIcon = document.createElement('i');
            heartIcon.classList.add('fa-regular', 'fa-heart');
            userButtons.appendChild(volumeHighIcon);
            userButtons.appendChild(heartIcon);

            // Append the created elements to the footer element
            footerElement.appendChild(playingSongImage);
            footerElement.appendChild(controlBars);
            footerElement.appendChild(userButtons);

            // Function to update the progress bar
            function updateProgressBar() {
                const currentTime = audioElement.currentTime;
                const duration = audioElement.duration;
                const percentage = (currentTime / duration) * 100;
                barPercentage.style.width = percentage + '%';
            }

            // Add an event listener to update the progress bar as the song plays
            audioElement.addEventListener('timeupdate', updateProgressBar);

            // Play and pause button functionality
            playButton.addEventListener('click', function () {
                if (audioElement.paused) {
                    audioElement.play();
                    playButton.classList.remove('fa-play');
                    playButton.classList.add('fa-pause');
                } else {
                    audioElement.pause();
                    playButton.classList.remove('fa-pause');
                    playButton.classList.add('fa-play');
                }
            });

            // Forward and backward buttons functionality 
            backwardButton.addEventListener('click', function () {
                if (audioElement.currentTime > 5) { // Go back 5 seconds if possible
                    audioElement.currentTime -= 5;
                }
            });
            
            forwardButton.addEventListener('click', function () {
                if (audioElement.currentTime < audioElement.duration - 5) { // Go forward 5 seconds if possible
                    audioElement.currentTime += 5;
                }
            });
            volumeHighIcon.addEventListener('click', function () {
                if (audioElement.muted) {
                    audioElement.muted = false; // Unmute the audio
                    volumeHighIcon.classList.remove('fas', 'fa-volume-off');
                    volumeHighIcon.classList.add('fas', 'fa-volume-high');
                } else {
                    audioElement.muted = true; // Mute the audio
                    volumeHighIcon.classList.remove('fas', 'fa-volume-high');
                    volumeHighIcon.classList.add('fas', 'fa-volume-off');
                }
            });
            heartIcon.addEventListener('click', function () {
                alert("Oops! It seems the love button is under maintenance by our resident Cupid. Please check back tomorrow for some lovely surprises! 😄❤️");
            });
            
            
            

            // Handle song end
            audioElement.addEventListener('ended', function () {
                playButton.classList.remove('fa-pause');
                playButton.classList.add('fa-play');
                barPercentage.style.width = '0%';
            });
            playButton.classList.remove('fa-play');
            playButton.classList.add('fa-pause');
            audioElement.play();
            footerElement.style.display = 'flex';
        });
    });



        





