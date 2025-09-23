document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO PLAYER E ANIMAÇÕES (igual ao anterior) ---
    const audio = document.getElementById('nossa-musica');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playPauseIcon = playPauseBtn.querySelector('i');
    const progressBar = document.getElementById('progress-bar');
    const heartAnimationArea = document.querySelector('.heart-animation-area');
    const playerContent = document.querySelector('.player-content');

    audio.play().catch(error => { console.log("Autoplay bloqueado.");
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play'); });

    function togglePlayPause() { if (audio.paused) { audio.play();
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause'); } else { audio.pause();
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play'); } }
    playPauseBtn.addEventListener('click', togglePlayPause);
    audio.addEventListener('timeupdate', () => { const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`; });
    audio.addEventListener('ended', () => { playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play'); });

    function createHeart() { const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '&#10084;';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.style.color = `hsl(${Math.random() * 30 + 330}, 80%, 70%)`;
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
        heartAnimationArea.appendChild(heart);
        heart.addEventListener('animationend', () => { heart.remove(); }); }
    const heartStyle = document.createElement('style');
    heartStyle.innerHTML = `.heart { position: absolute; bottom: -50px; opacity: 0; animation: ascend linear infinite; pointer-events: none; text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); z-index: 0; }`;
    document.head.appendChild(heartStyle);
    setInterval(createHeart, 500);
    window.addEventListener('scroll', () => { const scrollY = window.scrollY; const scale = Math.max(0.8, 1 - scrollY / 3000); if (playerContent) { playerContent.style.transform = `scale(${scale})`; } });

    // --- NOVA LÓGICA PARA A TELA DE MEMÓRIAS ---

    // SEU CONTEÚDO AQUI: Adicione suas fotos e textos
    const memories = [
        { image: 'foto-memoria-1.jpg', text: 'Nossa primeira foto juntos. Lembro como se fosse hoje!' },
        { image: 'foto-memoria-2.jpg', text: 'Aquela viagem inesquecível para a praia.' },
        { image: 'foto-memoria-3.jpg', text: 'O dia em que adotamos nosso primeiro pet.' },
        { image: 'foto-memoria-4.jpg', text: 'Celebrando mais um ano ao seu lado.' }
    ];

    const modal = document.getElementById('memories-modal');
    const openCard = document.getElementById('open-memories-card');
    const closeBtn = document.getElementById('close-memories-btn');
    const prevBtn = document.getElementById('prev-memory-btn');
    const nextBtn = document.getElementById('next-memory-btn');
    const memoryImage = document.getElementById('memory-image');
    const memoryText = document.getElementById('memory-text');

    let currentMemoryIndex = 0;

    function showMemory(index) {
        memoryImage.src = memories[index].image;
        memoryText.textContent = memories[index].text;
    }

    openCard.addEventListener('click', () => {
        currentMemoryIndex = 0;
        showMemory(currentMemoryIndex);
        modal.classList.add('visible');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('visible');
    });

    nextBtn.addEventListener('click', () => {
        currentMemoryIndex = (currentMemoryIndex + 1) % memories.length;
        showMemory(currentMemoryIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentMemoryIndex = (currentMemoryIndex - 1 + memories.length) % memories.length;
        showMemory(currentMemoryIndex);
    });
});