// Tạo hiệu ứng hạt nền
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Kích thước ngẫu nhiên
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Vị trí ngẫu nhiên
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Thời gian animation khác nhau
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Độ mờ ngẫu nhiên
        particle.style.opacity = Math.random() * 0.6 + 0.2;
        
        particlesContainer.appendChild(particle);
    }
}

// Tạo hiệu ứng trái tim bay lên
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floating-hearts');
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        // Kích thước ngẫu nhiên
        const size = Math.random() * 12 + 8;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        // Vị trí ngẫu nhiên
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.bottom = '-20px';
        
        // Thời gian animation khác nhau
        heart.style.animationDuration = `${Math.random() * 8 + 4}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        
        heartsContainer.appendChild(heart);
    }
}

// Hiệu ứng chờ văn bản xuất hiện
function animateOnScroll() {
    const text = document.querySelector('.text1');
    
    // Đợi 1 giây rồi mới hiển thị văn bản
    setTimeout(() => {
        text.style.opacity = "1";
    }, 1000);
}

// Thêm hiệu ứng click vào phong bì
function addEnvelopeEffect() {
    const envelope = document.querySelector('.envelope');
    
    envelope.addEventListener('click', function() {
        // Thêm class hiệu ứng zoom khi click
        this.classList.add('clicked');
        
        // Tạo thêm trái tim bay lên khi click
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('floating-heart');
                
                const size = Math.random() * 15 + 10;
                heart.style.width = `${size}px`;
                heart.style.height = `${size}px`;
                
                heart.style.left = `${40 + Math.random() * 20}%`;
                heart.style.bottom = '20%';
                
                heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
                
                document.getElementById('floating-hearts').appendChild(heart);
            }, i * 200);
        }
    });
}

// Chạy tất cả các hàm khi trang tải xong
window.onload = function() {
    createParticles();
    createFloatingHearts();
    animateOnScroll();
    addEnvelopeEffect();
};