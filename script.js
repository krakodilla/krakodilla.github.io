// Анимация заголовка вкладки
const titleText = "krakodilla";
let currentChar = 0;

function typeTitle() {
  if (currentChar < titleText.length) {
    document.title = titleText.substring(0, currentChar + 1);
    currentChar++;
    setTimeout(typeTitle, 650);
  } else {
    setTimeout(resetTitleAnimation, 2000);
  }
}

function resetTitleAnimation() {
  currentChar = 0;
  document.title = "k";
  setTimeout(typeTitle, 500);
}

// Основной код, выполняемый после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация элементов
  const introScreen = document.getElementById('intro-screen');
  const mainContent = document.querySelector('main');
  const starsCanvas = document.getElementById('stars');
  const musicPlayer = document.getElementById('background-music');
  const videoBackground = document.querySelector('.video-background video');
  const playPauseBtn = document.getElementById('btn-play-pause');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');

  // Запуск анимации заголовка
  setTimeout(typeTitle, 20);

  // Обработчик клика по заставке
  introScreen.addEventListener('click', () => {
    // Анимация исчезновения заставки
    introScreen.style.opacity = '0';
    setTimeout(() => {
      introScreen.style.display = 'none';
      mainContent.setAttribute('aria-hidden', 'false');
    }, 500);

    // Функция запуска медиа
    const playMedia = () => {
      // Запуск видео (с обработкой ошибок)
      videoBackground.play()
        .then(() => console.log('Video started'))
        .catch(e => console.error('Video play error:', e));
      
      // Запуск музыки (с обработкой ошибок)
      musicPlayer.play()
        .then(() => {
          console.log('Audio started');
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'block';
        })
        .catch(e => console.error('Audio play error:', e));
    };

    // Для мобильных устройств - ждем жеста пользователя
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      const handler = () => {
        playMedia();
        document.body.removeEventListener('touchstart', handler);
      };
      document.body.addEventListener('touchstart', handler);
    } else {
      playMedia();
    }
  });

  // Управление воспроизведением
  playPauseBtn.addEventListener('click', () => {
    if (musicPlayer.paused) {
      musicPlayer.play();
      videoBackground.play();
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    } else {
      musicPlayer.pause();
      videoBackground.pause();
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
  });

  // Инициализация звёздного фона
  if (starsCanvas) {
    const ctx = starsCanvas.getContext('2d');
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;

    const stars = [];
    const starCount = 100; // Количество звёзд

    // Создание звёзд
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        radius: Math.random() * 1.5,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25
      });
    }

    // Отрисовка звёзд
    function drawStars() {
      ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
      ctx.fillStyle = 'white';

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Обновление позиций звёзд
    function updateStars() {
      stars.forEach(star => {
        star.x += star.vx / 100;
        star.y += star.vy / 100;

        if (star.x < 0 || star.x > starsCanvas.width) star.vx = -star.vx;
        if (star.y < 0 || star.y > starsCanvas.height) star.vy = -star.vy;
      });
    }

    // Анимация звёзд
    function animate() {
      drawStars();
      updateStars();
      requestAnimationFrame(animate);
    }

    animate();

    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
      starsCanvas.width = window.innerWidth;
      starsCanvas.height = window.innerHeight;
    });
  }
});

// Запуск при полной загрузке страницы
window.addEventListener('load', () => {
  console.log('Page fully loaded');
});
