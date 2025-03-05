// Hiển thị alert khi trang tải và chờ người dùng xác nhận
document.addEventListener('DOMContentLoaded', function() {
    alert("Sau khi OK thì hãy click bất kỳ chỗ nào trên trang để nhạc mở nhé! Có thể chọn nhạc ở chỗ 🎵 này nhé! ");
    var audio = document.getElementById('background-music');
    if (audio) {
        audio.volume = 0.2; // Đặt âm lượng ban đầu là 0.2
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
    if (audio) {
        audio.src = url;
        audio.play().catch(function(error) {
            console.log("Play failed:", error);
        });

        // Tô sáng bài đang phát trong dropdown
        var links = document.querySelectorAll('.dropdown-content a');
        links.forEach(function(link) {
            if (link.getAttribute('data-url') === url) {
                link.style.backgroundColor = '#ddd';
            } else {
                link.style.backgroundColor = '';
            }
        });
    } else {
        console.error("Audio element not found in changeMusic!");
    }
}