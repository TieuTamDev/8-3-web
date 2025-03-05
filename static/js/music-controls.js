// Hiển thị alert khi trang tải và chờ người dùng xác nhận
document.addEventListener('DOMContentLoaded', function() {
    alert("Sau khi OK thì hãy click bất kỳ chỗ nào trên trang để nhạc mở nhé! Có thể chọn nhạc ở chỗ 🎵 này nhé! ");
    var audio = document.getElementById('background-music');
    if (audio) {
        audio.volume = 0.2; // Đặt âm lượng ban đầu là 20% (thay vì 50% trong startPage để nhất quán)
    }
    if (audio) {
        setupAutoPlayNext(audio);
    }
    startPage(); // Khởi động trang sau khi người dùng nhấp OK trên alert
});

document.addEventListener('click', function playMusicOnce() {
    var audio = document.getElementById('background-music');

    if (audio && audio.paused) {
        audio.play().then(() => {
            console.log("Nhạc bắt đầu phát");
            document.removeEventListener("click", playMusicOnce);
        }).catch(error => {
            console.log("Không thể phát nhạc: ", error);
        });
    }
});

function startPage() {
    var audio = document.getElementById('background-music');
    var body = document.body;
    var volumeSlider = document.getElementById('volume-slider');
    var volumeIcon = document.querySelector('.volume-icon');

    if (audio) {
        setupAutoPlayNext(audio);
    }
    
    if (audio && body) {
        audio.volume = 0.2; // Đặt âm lượng ban đầu là 20% (thay vì 50% để nhất quán với DOMContentLoaded)
        audio.play().then(() => {
            console.log("Nhạc bắt đầu phát và trang được kích hoạt");
            body.classList.remove('not-loaded'); // Hiển thị toàn bộ nội dung

            // Đồng bộ thanh slider với âm lượng 20%
            if (volumeSlider) {
                volumeSlider.value = 20; // Đặt giá trị slider về 20 (tương ứng 20%)
            }

            // Đảm bảo không có trạng thái mute ban đầu
            if (volumeIcon) {
                volumeIcon.classList.remove('muted'); // Xóa gạch chéo nếu có
            }

            // Khởi động lại các hiệu ứng trong script.js (giả định)
            if (window.initFireworks) window.initFireworks(); // Khởi tạo pháo hoa nếu có
            if (window.initFlowers) window.initFlowers(); // Khởi tạo hoa nếu có
            if (window.initAnimations) window.initAnimations(); // Khởi tạo animation text nếu có

            // Thêm sự kiện để chuyển bài khi bài hiện tại kết thúc
            setupAutoPlayNext(audio);
        }).catch(error => {
            console.log("Không thể phát nhạc: ", error);
        });
    }
}

function setupAutoPlayNext(audio) {
    if (!audio) {
        console.error("Audio element is null in setupAutoPlayNext");
        return;
    }
    
    console.log("Setting up auto play next");
    
    // Xóa tất cả event listener cũ để tránh trùng lặp
    audio.removeEventListener('ended', handleAudioEnded);
    
    // Thêm event listener mới
    audio.addEventListener('ended', handleAudioEnded);
    
    console.log("Auto play next setup completed");
}

function handleAudioEnded() {
    console.log("Audio ended event triggered");
    
    var audio = document.getElementById('background-music');
    if (!audio) {
        console.error("Audio element not found in handleAudioEnded");
        return;
    }
    
    // Lấy tất cả các phần tử link
    const links = document.querySelectorAll('.dropdown-content a');
    if (links.length === 0) {
        console.error("No music links found");
        return;
    }
    
    // Tìm bài hát hiện tại và bài tiếp theo
    let currentIndex = -1;
    const currentSrc = audio.src;
    console.log("Current audio src:", currentSrc);
    
    // Tìm bài hát hiện tại bằng cách kiểm tra tất cả các URL
    for (let i = 0; i < links.length; i++) {
        const dataUrl = links[i].getAttribute('data-url');
        const fullUrl = new URL(dataUrl, window.location.origin).href;
        const relativePath = dataUrl.startsWith('/') ? dataUrl : '/' + dataUrl;
        
        console.log(`Checking ${i}: data-url=${dataUrl}, fullUrl=${fullUrl}`);
        
        // Kiểm tra nhiều cách khác nhau
        if (currentSrc === fullUrl || 
            currentSrc.endsWith(dataUrl) || 
            currentSrc.endsWith(relativePath)) {
            currentIndex = i;
            console.log("Found match at index:", i);
            break;
        }
    }
    
    // Nếu không tìm thấy, thử cách khác
    if (currentIndex === -1) {
        console.log("No exact match found, using filename comparison");
        const currentFile = currentSrc.split('/').pop();
        for (let i = 0; i < links.length; i++) {
            const dataUrl = links[i].getAttribute('data-url');
            const dataFile = dataUrl.split('/').pop();
            if (currentFile === dataFile) {
                currentIndex = i;
                console.log("Found match by filename at index:", i);
                break;
            }
        }
    }
    
    // Xác định bài tiếp theo
    let nextIndex;
    if (currentIndex === -1 || currentIndex >= links.length - 1) {
        // Nếu không tìm thấy hoặc là bài cuối cùng, quay lại bài đầu tiên
        nextIndex = 0;
        console.log("Moving to first song (index 0)");
    } else {
        // Chuyển sang bài tiếp theo
        nextIndex = currentIndex + 1;
        console.log(`Moving to next song (index ${nextIndex})`);
    }
    
    // Lấy URL của bài tiếp theo
    const nextUrl = links[nextIndex].getAttribute('data-url');
    console.log("Next song URL:", nextUrl);
    
    // Chuyển sang bài tiếp theo
    changeMusic(nextUrl);
}

// Hàm xử lý âm lượng (gộp toggleMute và adjustVolume, thêm gạch chéo khi mute)
function handleVolume() {
    var audio = document.getElementById('background-music');
    var volumeSlider = document.getElementById('volume-slider');
    var volumeIcon = document.querySelector('.volume-icon');
    if (audio && volumeSlider && volumeIcon) {
        if (audio.muted) {
            audio.muted = false; // Bật tiếng
            volumeIcon.classList.remove('muted'); // Xóa gạch chéo
            volumeSlider.value = audio.volume * 100; // Đồng bộ với âm lượng hiện tại
        } else {
            audio.muted = true; // Tắt tiếng
            volumeIcon.classList.add('muted'); // Thêm gạch chéo
            volumeSlider.value = 0; // Đặt thanh kéo về 0
        }
    }
}

// Hàm giảm âm lượng
function decreaseVolume() {
    var audio = document.getElementById('background-music');
    var volumeSlider = document.getElementById('volume-slider');
    var volumeIcon = document.querySelector('.volume-icon');
    if (audio && volumeSlider && volumeIcon) {
        if (audio.volume > 0.0) {
            audio.volume = Math.max(0.0, audio.volume - 0.1);
            volumeSlider.value = audio.volume * 100;
            audio.muted = (audio.volume === 0); // Tự động tắt tiếng nếu âm lượng về 0
            if (audio.muted) {
                volumeIcon.classList.add('muted'); // Thêm gạch chéo nếu mute
            } else {
                volumeIcon.classList.remove('muted'); // Xóa gạch chéo nếu không mute
            }
        }
    }
}

// Hàm điều chỉnh âm lượng từ thanh kéo
function adjustVolume() {
    var audio = document.getElementById('background-music');
    var volumeSlider = document.getElementById('volume-slider');
    var volumeIcon = document.querySelector('.volume-icon');
    if (audio && volumeSlider && volumeIcon) {
        audio.volume = volumeSlider.value / 100;
        audio.muted = (audio.volume === 0);
        if (audio.muted) {
            volumeIcon.classList.add('muted'); // Thêm gạch chéo nếu mute
        } else {
            volumeIcon.classList.remove('muted'); // Xóa gạch chéo nếu không mute
        }
    }
}

// Hàm thay đổi bài hát khi chọn từ dropdown
function changeMusic(url) {
    console.log("Changing music to:", url);
    var audio = document.getElementById('background-music');
    if (!audio) {
        console.error("Audio element not found in changeMusic");
        return;
    }
    
    // Đảm bảo URL đúng format
    const formattedUrl = url.startsWith('/') ? url : '/' + url;
    console.log("Formatted URL:", formattedUrl);
    
    // Dừng phát hiện tại nếu đang phát
    audio.pause();
    
    // Thiết lập source mới
    audio.src = formattedUrl;
    
    // Phát nhạc
    audio.load();
    const playPromise = audio.play();
    if (playPromise) {
        playPromise.then(() => {
            console.log("Playing new song successfully");
        }).catch(error => {
            console.error("Error playing new song:", error);
        });
    }
    
    // Tô sáng bài đang phát trong dropdown
    const links = document.querySelectorAll('.dropdown-content a');
    links.forEach(function(link) {
        const linkUrl = link.getAttribute('data-url');
        if (linkUrl === url || 
            ('/' + linkUrl === url) || 
            (linkUrl === '/' + url) || 
            (formattedUrl === '/' + linkUrl) || 
            (formattedUrl === linkUrl)) {
            link.style.backgroundColor = '#ddd';
        } else {
            link.style.backgroundColor = '';
        }
    });
    
    // Đảm bảo event listener cho bài tiếp theo được thiết lập
    setupAutoPlayNext(audio);
}