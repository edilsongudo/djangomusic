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


$(document).ready(function() {
  $.ajax({
      url: `/song-list/${unique_id}`,
      type: 'get',
      success: function(response) {
        const songs = response

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
              audio.src = obj['music'];
              audio.id = song
              songIndex = songs.indexOf(obj)
              console.log(songIndex)

            const cover = document.querySelector('.img-container')
            const playericon = document.querySelector('#player-fas-fa-music')
            const footerimg = document.querySelector('#footer-img')
            const footericon = document.querySelector('#footer-img i')

            if (obj['artwork'] != null) {
              playericon.style.opacity = '0'
              footericon.style.opacity = '0'
              cover.style.backgroundImage = `url(${obj['artwork']})`
              footerimg.style.backgroundImage = `url(${obj['artwork']})`
            } else {
              playericon.style.opacity = '1'
              footericon.style.opacity = '1'
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







          //////////////////////// SECOND SCRIPT ///////////////////////



          // needs to be the first script loaded in the page
          const input = document.getElementById("id_music")
          if (input != null) {
              input.hidden = true

              // another script
              // const sounds = document.getElementsByTagName('audio')
              // for (i=0; i < sounds.length; i++) {sounds[i].pause()}

              // third script
              const actualBtn = document.getElementById('id_music')
              const fileChosen = document.getElementById('file-chosen')

              actualBtn.addEventListener('change', function() {
                  fileChosen.textContent = this.files[0].name
                  this.form.submit() })
          }



          const buttonplayer = document.querySelector('button.toggleplayer')
          const buttonhome = document.querySelector('button.togglehome')
          const player = document.querySelector('div.player')
          const list = document.querySelector('div.home')

          buttonplayer.addEventListener('click', function () {
              list.style.display = 'none'
              player.style.display = 'block'

          })
          buttonhome.addEventListener('click', function () {
              player.style.display = 'none'
              list.style.display = 'block'

          })

          const musicinfo = document.querySelectorAll('div.music-info')
          const imgcontainer = document.querySelectorAll('div.img-container')

          // BE CAREFULL TO NOT REACT TO FOOTER TOO, BECAUSE IT DOESNT HAVE SONG ID AND WILL CAUSE A VERY CRITICAL AND HARD TO DETECT BUG
          musicinfo.forEach(mc => {
              mc.addEventListener('click', function() {
                  list.style.display = 'none'
                  player.style.display = 'block'
                  if (audio.id != mc.id && mc.id != "footer-music") {
                      loadSong(mc.id)
                      playSong()
                  }

              })
          })

          // BE CAREFULL TO NOT REACT TO FOOTER TOO, BECAUSE IT DOENST HAVE SONG ID AND WILL CAUSE A VERY CRITICAL AND HARD TO DETECT BUG
          imgcontainer.forEach(mc => {
              mc.addEventListener('click', function() {
                  list.style.display = 'none'
                  player.style.display = 'block'
                  if (audio.id != mc.id && mc.id != "footer-img") {
                      loadSong(mc.id)
                      playSong()
                  }
              })
          })

          function showlyrics() {
              document.querySelector('.lyrics').style.display = 'block'
          }

          function closelyrics() {
              document.querySelector('.lyrics').style.display = 'none'

          }


          optionsbtn = document.querySelectorAll('#options')

          optionsbtn.forEach(btn => {
              btn.addEventListener('click', function() {
                  this.parentElement.childNodes[3].classList.toggle('visible')
                  audio.pause()
          })
          })

          function closedropdown(e) {
              dd = document.querySelectorAll('.dropdownsong')
              dd.forEach(d => {
                  d.classList.remove('visible')
                  audio.play()
              })

          }











          } catch(err) {
            console.log('An error ocurred', err)
        } //end of try/catch : this is just to keep page functionality working even if user does not have any songs uploaded
        //delete this line in development



      }
  })
});

