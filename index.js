document.getElementById("humburger").addEventListener("click", function() {
    const menu = document.getElementById("menu");
    menu.style.width = '50%';
    menu.style.display = "flex"; 
});
document.getElementById("icone-x").addEventListener("click", function() {
    const menu = document.getElementById("menu");
        menu.style.display = "none"; 
});
let downs=document.querySelectorAll('i.fas.fa-chevron-down');
document.querySelectorAll('.item i.fas.fa-chevron-down').forEach((chevron) => {
    chevron.onclick = function () {
      const details = this.parentElement.querySelector('.details');
        //console.log(details)
      if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        this.className = "fas fa-chevron-up";
      } else {
        details.style.display = 'none';
        this.className = "fas fa-chevron-down";
      }
    };
  });
  
  let video = document.querySelector("video");
  let progressDisplay = document.getElementById("porcentage");
  let timeDisplay = document.getElementById("time-video");
  let playlisTitleDisplay = document.getElementById("Titlle");
  
  const playlists = document.querySelectorAll(".butt");
  const prevPlaylistButton = document.getElementById("prevPlaylist");
  const nextPlaylistButton = document.getElementById("nextPlaylist");
  const playlistTitle = document.getElementById("playlist-title");
  
  let currentPlaylistIndex = 0;
  
  function formatDuration(totalSeconds) {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      return hours > 0
          ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          : `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
    
  // Update playlist visibility and title
  function updatePlaylistVisibility() {
      playlists.forEach((playlist) => {
          const playlistId = parseInt(playlist.getAttribute("data-playlist"), 10);
          playlist.style.display = playlistId === currentPlaylistIndex + 1 ? "flex" : "none";
      });
      
      if (currentPlaylistIndex === 0) {
          playlistTitle.innerHTML = "Nature Playlist";
          playlisTitleDisplay.innerHTML = "Nature Playlist";
      } else if (currentPlaylistIndex === 1) {
          playlistTitle.innerHTML = "Random";
          playlisTitleDisplay.innerHTML = "Random";
      } else if (currentPlaylistIndex === 2) {
          playlistTitle.innerHTML = "Anime Edits";
          playlisTitleDisplay.innerHTML = "Anime Edits";
      }
  
      calculatePlaylistStats(playlists[currentPlaylistIndex]);
  }
  
 
  function calculatePlaylistStats(playlistDiv) {
      const buttons = playlistDiv.querySelectorAll("button");
      let totalDuration = 0;
      let loadedDurations = 0;
  
      buttons.forEach((button) => {
          const videoSrc = button.getAttribute("data-video");
  
          if (videoSrc && videoSrc !== "") {
              const tempVideo = document.createElement("video");
              tempVideo.src = videoSrc;
  
              tempVideo.onloadedmetadata = () => {
                  const duration = Math.floor(tempVideo.duration);
                  totalDuration += duration;
  
                  const durationSpan = button.querySelector("span");
                  if (durationSpan) {
                      durationSpan.textContent = ` (${formatDuration(duration)})`;
                  }
  
                  loadedDurations++;
                  if (loadedDurations === buttons.length) {
                      updateProgress(totalDuration, buttons.length);
                  }
              };
          } else {
              loadedDurations++;
              if (loadedDurations === buttons.length) {
                  updateProgress(totalDuration, buttons.length);
              }
          }
      });
  }
  
  function updateProgress(totalDuration, totalVideos) {
      const progressPercentage = totalVideos > 0 ? (100 / totalVideos).toFixed() : 0;
       document.getElementById('total_timing').innerHTML=`${formatDuration(totalDuration)}`  
    }
  
  // Attach click events to each playlist button
  playlists.forEach((playlistDiv) => {
      const buttons = playlistDiv.querySelectorAll("button");
  
      buttons.forEach((button) => {
          button.onclick = function () {
              const videoSrc = button.getAttribute("data-video") || "Unknown";
              button.style.background = "linear-gradient(to right, #feae00a2, #ff560ea3)";
                updateProgress()
              if (videoSrc !== "Unknown") {
                  video.src = videoSrc;
  
                  video.onloadedmetadata = () => {
                      const totalSeconds = Math.floor(video.duration);
                      const formattedDuration = formatDuration(totalSeconds);
                      timeDisplay.textContent = formattedDuration;
                    //console.log(formattedDuration)
                      const durationSpan = button.querySelector("span");
                      if (durationSpan) {
                          durationSpan.textContent = ` (${formattedDuration})`;
                      }
  
                      video.play();
                  };
              } else {
                  console.warn("No video source associated with this button.");
              }
          };
      });
  });
  
  // Playlist navigation buttons
  prevPlaylistButton.addEventListener("click", () => {
      if (currentPlaylistIndex > 0) {
          currentPlaylistIndex--;
          updatePlaylistVisibility();
      }
  });
  
  nextPlaylistButton.addEventListener("click", () => {
      if (currentPlaylistIndex < playlists.length - 1) {
          currentPlaylistIndex++;
          updatePlaylistVisibility();
      }
  });
  
  // Initialize the first playlist
  updatePlaylistVisibility();
  
let count = 0;
function loadComments() {
    let savedComments = localStorage.getItem('comments');
    if (savedComments) {
        document.getElementById('jjs').innerHTML = savedComments;
        
        
        count = document.getElementsByClassName('commenatire').length;
        document.getElementById('c-n').textContent = `${count} ${count === 1 ? 'comment' : 'comments'}`;
    }
}
function saveComments() {
    let commentsHTML = document.getElementById('jjs').innerHTML;
    localStorage.setItem('comments', commentsHTML);
}
document.getElementById('sub').addEventListener('click', function () {
    // Get the textarea value
    let commentText = document.getElementById('txt').value;

    if (commentText.trim() === '') {
        return; 
    }
    let commentHTML = `
    <div class="commenatire">
        <div class="userinfo-place">
            <div class="user-info-comment-group">
                <div class="user-pic">
                    <img src="profile.png" alt="">
                </div>
                <div class="span-column">
                    <span>UserName</span>
                    <span>1j</span>
                </div>
            </div>
        </div>
        <div class="comment-contenu">
            <label for="" id="comment">${commentText}</label>
        </div>
    </div>
    `;

   
    document.getElementById('jjs').innerHTML += commentHTML;
    
    
    count++;
    if (count === 1) {
        document.getElementById('c-n').textContent = `${count} comment`;
    } else {
        document.getElementById('c-n').textContent = `${count} comments`;
    }

   
    saveComments();

    document.getElementById('txt').value = '';
});

window.addEventListener('load', loadComments);



