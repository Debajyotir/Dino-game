score = 0;
cross = true;
over = true;
playing = true;

audio = new Audio ("music.mp3");
audioOver = new Audio ("gameover.mp3");


document.onkeydown = function(e){
    audio.play();
    if(e.keyCode == 38){
        dino = document.querySelector('.dino');
        dino.classList.add('animatedino');
        setTimeout(() => {
            dino.classList.remove('animatedino');
        }, 700);
    }
    if(e.keyCode == 39){
        dino = document.querySelector('.dino');
        dinox = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = dinox + 112 + "px";
    }
    if(e.keyCode == 37){
        dino = document.querySelector('.dino');
        dinox = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = (dinox - 112) + "px";
    }
}

setInterval(() => {

    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle =  document.querySelector('.obstacle');


    dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

    offsetx = Math.abs(dx-ox);
    offsety = Math.abs(dy-oy);

    if(offsetx<75 && offsety<52){
        gameOver.style.visibility = 'visible'
        obstacle.classList.remove('obstacleani');
        
        
        if(over && score>0){
            score = score - 1;
        }
        updateScore(score);

        audio.pause();

        if(over){
            audioOver.play();
            setTimeout(() => {
                audioOver.pause();
            }, 1000);
            over = false;
        }

        playing = true;
    }
    else if(offsetx<145 && cross){
        score+=1;
        updateScore(score);
        cross = false;

        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            durationOfAnimation = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newDuration = durationOfAnimation - 0.1;
            obstacle.style.animationDuration = newDuration + 's';

        }, 500);
    }
}, 10);

function updateScore (score){
    scoreCount.innerHTML = "Your score: " +score;
}