document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('myAudio');
    const playPauseButton = document.getElementById('playPauseButton');
    const playPauseImage = playPauseButton.querySelector('img'); // Pega a imagem dentro do botão
    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');

    // Caminhos das imagens
    const playIcon = './assets/start-btn.png'; // Sua imagem de play (o triângulo)
    const pauseIcon = './assets/stop-btn.png'; // Você precisará de uma imagem para o pause (as duas barras)

    let isPlaying = false; // Estado inicial: não tocando

    // Função para alternar play/pause
    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
            playPauseImage.src = playIcon; // Muda para o ícone de play
        } else {
            audio.play();
            playPauseImage.src = pauseIcon; // Muda para o ícone de pause
        }
        isPlaying = !isPlaying; // Inverte o estado
    }

    // Função para voltar 10 segundos
    function skipBackward() {
        audio.currentTime = Math.max(0, audio.currentTime - 10); // Garante que não vá para tempo negativo
    }

    // Função para avançar 10 segundos
    function skipForward() {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10); // Garante que não ultrapasse a duração
    }

    // Event Listeners para os botões
    playPauseButton.addEventListener('click', togglePlayPause);
    backButton.addEventListener('click', skipBackward);
    nextButton.addEventListener('click', skipForward);

    // Opcional: Atualizar o ícone se o áudio for pausado/tocado por outros meios
    audio.addEventListener('play', () => {
        isPlaying = true;
        playPauseImage.src = pauseIcon;
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        playPauseImage.src = playIcon;
    });

    // Opcional: Quando a música termina, resetar o botão para play
    audio.addEventListener('ended', () => {
        isPlaying = false;
        playPauseImage.src = playIcon;
        audio.currentTime = 0; // Reinicia o áudio para o começo
    });

    // Pré-carrega a imagem de pause para evitar atrasos visuais na primeira vez
    const preLoadPauseImage = new Image();
    preLoadPauseImage.src = pauseIcon;
});