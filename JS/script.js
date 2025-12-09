const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

function updateThemeIcon() {
    if (body.classList.contains('dark-theme')) {
        themeBtn.innerText = "☀️"; 
    } else {
        themeBtn.innerText = "🌙"; 
    }
}

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
}
if (themeBtn) updateThemeIcon();

if(themeBtn) {
    themeBtn.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        updateThemeIcon();
        
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}


function startEventTimer() {
    const timerContainer = document.getElementById("event-timer");
    
    if (!timerContainer) return;

    const dateString = timerContainer.getAttribute("data-date");
    if (!dateString) {
        console.error("تاریخ برای تایمر تنظیم نشده است!");
        return;
    }

    const countDownDate = new Date(dateString).getTime();

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if(daysEl) daysEl.innerText = days < 10 ? "0" + days : days;
        if(hoursEl) hoursEl.innerText = hours < 10 ? "0" + hours : hours;
        if(minutesEl) minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        if(secondsEl) secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;

        if (distance < 0) {
            clearInterval(x);
            timerContainer.style.display = "none";
            const msg = document.getElementById("timer-message");
            if (msg) msg.style.display = "block";
        }
    }, 1000);
}

startEventTimer();


const surveyForm = document.getElementById('surveyForm');

    if (surveyForm) {
        loadFormData();

        surveyForm.addEventListener('input', function() {
            saveFormData();
        });

        surveyForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const eventName = document.getElementById('eventName').value;
            const email = document.getElementById('email').value;
            const score = document.getElementById('score').value;
            const comment = document.getElementById('comment').value;
            const quality = document.querySelector('input[name="quality"]:checked');

            const errorMsg = document.getElementById('error-msg');
            const successMsg = document.getElementById('success-msg');

            errorMsg.style.display = 'none';
            successMsg.style.display = 'none';

            if (eventName === "" || email === "" || score === "" || comment === "" || !quality) {
                errorMsg.innerText = "لطفاً تمام فیلدها را تکمیل کنید.";
                errorMsg.style.display = 'block';
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                errorMsg.innerText = "فرمت ایمیل صحیح نیست.";
                errorMsg.style.display = 'block';
                return;
            }

            if (score < 1 || score > 10) {
                errorMsg.innerText = "امتیاز باید بین ۱ تا ۱۰ باشد.";
                errorMsg.style.display = 'block';
                return;
            }

            successMsg.style.display = 'block';
            
            localStorage.removeItem('surveyData');
            surveyForm.reset();
        });
    }


    function saveFormData() {
        const qualityChecked = document.querySelector('input[name="quality"]:checked');
        const data = {
            eventName: document.getElementById('eventName').value,
            email: document.getElementById('email').value,
            score: document.getElementById('score').value,
            comment: document.getElementById('comment').value,
            quality: qualityChecked ? qualityChecked.value : ""
        };
        localStorage.setItem('surveyData', JSON.stringify(data));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('surveyData');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            if(data.eventName) document.getElementById('eventName').value = data.eventName;
            if(data.email) document.getElementById('email').value = data.email;
            if(data.score) document.getElementById('score').value = data.score;
            if(data.comment) document.getElementById('comment').value = data.comment;
            
            if (data.quality) {
                const radio = document.querySelector(`input[name="quality"][value="${data.quality}"]`);
                if (radio) radio.checked = true;
            }
        }
    }


let slideIndex = 1;
if (document.querySelector(".slider-container")) {
    showSlides(slideIndex);
    
    setInterval(function() {
        plusSlides(1);
    }, 5000);
}

window.plusSlides = function(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (slides.length === 0) return;

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "block";  
}
