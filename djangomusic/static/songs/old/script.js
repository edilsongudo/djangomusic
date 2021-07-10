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
  // audio.src = `../static/music/${song}.mp3`;
    audio.src = `../static/music/${song}`; // flask sends the audio with the extension
    audio.id = song

  // cover.src = `../static/images/${song}.jpg`;
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

          // document.querySelector('.togglelyrics').style.opacity = '0'
          // //get lyrics from song
          // if (obj['title'] != "" && obj['artist'] != "") {
          //     const dict = {"song": obj['title'], "artist": obj['artist']}
          //     const json = JSON.stringify(dict)

          //      $.ajax({
          //         url: '/lyrics',
          //         // headers: {'X-CSRFToken': csrfToken},
          //         dataType: 'json',
          //         data: json,
          //         type: 'POST',
          //         contentType: "application/json",
          //         success: function(response) {
          //           document.querySelector('.togglelyrics').style.opacity = '1'
          //           lyricsdivcontainer.innerHTML = response['lyrics']
          //         }
          //     })
          //     } else {
          //           lyricsdivcontainer.innerHTML = 'This song does not have enough metadata to help us search lyrics :('
          //     }


  const musicinfodivs = document.querySelectorAll('div.music-info')
  musicinfodivs.forEach(mid => {
    if (mid.id == audio.id) {
      mid.style.color = audioonplayingtextcolor //'#c85d34'
    } else {
      mid.style.color = 'white'
    }
  })


    // playBtns.forEach(btn => {

    // if (`${btn.parentElement.id}` == audio.id) {

    //   if (btn.children[0].classList.contains('fa-play')) {
    //       btn.children[0].classList.remove('fa-play')
    //       btn.children[0].classList.add('fa-pause')
    //       currentPlaying = '../static/music/' + audio.id

    //       }

    //       } else {

    //         if (btn.children[0].id != 'footerbutton') {
    //             btn.children[0].classList.remove('fa-pause')
    //             btn.children[0].classList.add('fa-play')
    //           }

    //         }

    // })

}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  // playBtns.forEach(btn => {
  //   if (`${btn.parentElement.id}` == audio.id) {

  //     if (btn.children[0].classList.contains('fa-pause')) {
  //         btn.children[0].classList.remove('fa-pause')
  //         btn.children[0].classList.add('fa-play')
  //         }
  //   }
  // })

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


// const playBtns = document.querySelectorAll('#play2');
// var currentPlaying = ""

// playBtns.forEach(btn => {
//   btn.addEventListener('click', event => {

//         if (currentPlaying == '../static/music/' + event.currentTarget.parentElement.parentElement.childNodes.item('span').nextElementSibling.className) {
//           console.log('Already playing audio')
//         } else {
//           console.log('Changed')
//           loadSong(event.currentTarget.parentElement.parentElement.childNodes.item('span').nextElementSibling.className)
//             currentPlaying = '../static/music/' + event.currentTarget.parentElement.parentElement.childNodes.item('span').nextElementSibling.className
//             audio.src = '../static/music/' + event.currentTarget.parentElement.parentElement.childNodes.item('span').nextElementSibling.className
//         }

//     if (event.currentTarget.children[0].classList.contains('fa-play')) {

//       // Pause all other btns
//         playBtns.forEach(btn => {
//           if (btn.children[0].classList.contains('fa-pause')) {
//               btn.children[0].classList.remove('fa-pause')
//               btn.children[0].classList.add('fa-play')
//               }
//         })

//       event.currentTarget.children[0].classList.remove('fa-play')
//       event.currentTarget.children[0].classList.add('fa-pause')
//       playSong()

//     } else {
//       event.currentTarget.children[0].classList.remove('fa-pause')
//       event.currentTarget.children[0].classList.add('fa-play')
//       pauseSong()
//     }

//   })
// })
