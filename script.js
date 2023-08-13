console.log("Welcome to spotify");


//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));





let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "test1-Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "test2-Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "33Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "4Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "5Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
];


songItems.forEach((element,i)=>{
    
    element.getElementsByTagName("Img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerHTML = `<span class="duration">0:00</span><i id="${i}" class="far songItemPlay button fa-play-circle"></i>`;
    


})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })

    
}
const makeAllPause = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
    })

    
}


// gana play ho jaega varna
// audioElement.play(); isse play ho jata hai

//Handle play/pause click

//yha ek function bna ke songItemPlay ke sath kuch aisa karo ki chhota wala button sync ho jae bade


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        // Update individual button for the currently playing song
        const currentSongPlayButton = document.getElementById(`song${songIndex}`);
        if (currentSongPlayButton) {
            currentSongPlayButton.classList.remove('fa-play-circle');
            currentSongPlayButton.classList.add('fa-pause-circle');
            makeAllPause();
            
        }    
        

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        // Update individual button for the currently playing song
        const currentSongPlayButton = document.getElementById(`song${songIndex}`);
        if (currentSongPlayButton) {
            currentSongPlayButton.classList.remove('fa-pause-circle');
            currentSongPlayButton.classList.add('fa-play-circle');
            makeAllPause();
        }
        

    }
});


//Listen to events
audioElement.addEventListener('timeupdate', () =>{
    
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    
    myProgressBar.value = progress;


}) 

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})






Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
    element.addEventListener('click',(e)=>{
        if(songIndex === parseInt(e.target.id) && !audioElement.paused){
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
        }
        else{
         makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        
        audioElement.addEventListener('loadedmetadata', () => {
            durationSpan.innerText = songs[songIndex].duration;
            
        })
        
        }
        
    })
})


let startX = null;

document.getElementById('bottom').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.getElementById('bottom').addEventListener('touchend', (e) => {
    if (startX !== null) {
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;

        if (deltaX > 50) { 
            playPreviousSong();
        } else if (deltaX < -50) {
            playNextSong();
        }

        startX = null;
    }
});


document.getElementById('next').addEventListener('click',()=>{
    
    if(songIndex >= 9){
        songIndex = 0;
        console.log(songIndex);
    }
    if(songIndex == 10){
        audioElement.src = `songs/${songIndex}.mp3`;
        console.log(songIndex);
    }
    else{
        songIndex +=1;
        console.log(songIndex);
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    

})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex = 0;
        console.log(songIndex);
    }
    else{
        songIndex -=1;
        console.log(songIndex);
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex+1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    

})