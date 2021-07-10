const audioonplayingtextcolor = "lightblue"
const musicContainer = document.getElementById('music-container2');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist')
const cover = document.getElementById('cover');
const currentTimeDiv = document.querySelector('.current')
const durationDiv = document.querySelector('.duration')
const lyricsdivcontainer = document.querySelector('.lyricstextcontainer')
const footerbutton = document.querySelector('#footericon')

const footersongPlaying = document.querySelector('#footersong')
const footerartistPlaying = document.querySelector('#footerartist')

// Keep track of song
var songIndex = 0

try {

  // Initially load song details into DOM
  loadSong(songs[songIndex]['filename']);
  audio.id = songs[songIndex]['filename']

  const footericon = document.querySelector('i#footericon')
  const footerplay = document.querySelector('button#playbtnfooter')

  footerplay.addEventListener('click', function() {
      if (footericon.classList.contains('fa-play')) {
          footericon.classList.remove('fa-play')
          footericon.classList.add('fa-pause')
          playSong()
      } else {
          footericon.classList.remove('fa-pause')
          footericon.classList.add('fa-play')
          pauseSong()
      }
  })


  // Update song details
  function loadSong(song) {

    var obj = songs.find(x => x.filename === song)

    if (obj['title'] != "") {
      var song_title = obj['title']
    } else {
      var song_title = obj['filename']
    }

    if (obj['artist'] != "") {
      artist.innerText = obj['artist']
    } else {
      artist.innerText = 'Unknown Artist'
    }

    if (song_title.length > 25 ) {
          title.innerHTML = '<marquee behaviour="left" id="title">' + song_title + '</marquee>'
    } else {
        title.innerHTML = '<p id="title">' + song_title + '</p>'
    }
      audio.src = `${get_media_prefix}${user}/${song}`;
      audio.id = song
      songIndex = songs.indexOf(obj)
      console.log(songIndex)

    const cover = document.querySelector('.img-container')
    const playericon = document.querySelector('#player-fas-fa-music')
    const footerimg = document.querySelector('#footer-img')

    if (obj['artwork'] != "") {
      playericon.style.opacity = '0'
      cover.style.backgroundImage = `url(${get_media_prefix}albumarts/${user}/${obj['artwork']}`
      footerimg.style.backgroundImage = `url(${get_media_prefix}albumarts/${user}/${obj['artwork']}`
    } else {
      playericon.style.opacity = '1'
      cover.style.backgroundImage = ``
      footerimg.style.backgroundImage = ``
    }

  }

  // Play song
  function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();

            var obj = songs.find(x => x.filename === audio.id)

            if (footerbutton.classList.contains('fa-play')) {
              footerbutton.classList.remove('fa-play')
              footerbutton.classList.add('fa-pause')
            }


            if (obj['title'] != "") {
              footersongPlaying.innerText = obj['title']
            } else {
              footersongPlaying.innerText = obj['filename']
              if (footersongPlaying.innerText.length > 20) {
                footersongPlaying.innerText = footersongPlaying.innerText.slice(0, 20) + '...'
              }
            }

            if (obj['artist'] != "") {
              footerartistPlaying.innerText = obj['artist']
            } else {
              footerartistPlaying.innerText = 'Unknown Artist'
            }


    const musicinfodivs = document.querySelectorAll('div.music-info')
    musicinfodivs.forEach(mid => {
      if (mid.id == audio.id) {
        mid.style.color = audioonplayingtextcolor //'#c85d34'
      } else {
        mid.style.color = 'white'
      }
    })


  }

  // Pause song
  function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();

    if (footerbutton.classList.contains('fa-pause')) {
      footerbutton.classList.remove('fa-pause')
      footerbutton.classList.add('fa-play')
    }
  }

  // Previous song
  function prevSong() {
    songIndex--;

    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]['filename']);

    playSong();
  }

  // Next song
  function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }

    loadSong(songs[songIndex]['filename']);

    playSong();
  }

  // Update progress bar
  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;

    var minutes = Math.floor(currentTime / 60)
    var seconds = Math.floor(currentTime % 60)
    currentTimeDiv.innerHTML = `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`

    var minutes2 = Math.floor(duration / 60)
    var seconds2 = Math.floor(duration % 60)
    durationDiv.innerHTML = `${('0' + minutes2).slice(-2)}:${('0' + seconds2).slice(-2)}`

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }

  // Set progress bar
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  }

  // Event listeners
  playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });

  // Change song
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);

  // Time/song update
  audio.addEventListener('timeupdate', updateProgress);

  // Click on progress bar
  progressContainer.addEventListener('click', setProgress);

  // Song ends
  audio.addEventListener('ended', nextSong);

  } catch {
    console.log('An error ocurred')
} //end of try/catch : this is just to keep page functionality working even if user does not have any songs uploaded
//delete this line in development
