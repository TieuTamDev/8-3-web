from flask import Flask, render_template
import random

app = Flask(__name__)

# Danh sách nhạc từ thư mục local
music_list = [
    {"title": "Bạch Nguyệt Quang Và Nốt Chu Sa[KALIMBA]", "url": "static/music/[KALIMBA TAB] Bạch Nguyệt Quang Và Nốt Chu Sa - Đại Tử (白月光与朱砂痣 - 大籽) - Kalimba Cover.mp3"},
    {"title": "Joe Hisaishi - A Town with an Ocean View", "url": "static/music/Joe Hisaishi - A Town with an Ocean View.mp3"},
    {"title": "Love Story - Indila Piano Cover", "url": "static/music/Love Story - Indila Piano Cover.mp3"},
    # {"title": "MAESTRO THEME - REMIX RUMBLE MUSIC - TFT SET 10", "url": "static/music/MAESTRO THEME - REMIX RUMBLE MUSIC - TFT SET 10.mp3"},
    {"title": "MEMORIES VIOLIN & PIANO COVER", "url": "static/music/MEMORIES VIOLIN & PIANO COVER.mp3"},
    {"title": "My Heart Will Go On (Titanic) Taylor Davis - Violin", "url": "static/music/My Heart Will Go On (Titanic) Taylor Davis - Violin Cover.mp3"},
    {"title": "Nỗi nhớ tựa thiên hà", "url": "static/music/Nỗi Nhớ Tựa Thiên Hà-所念皆星河(Enzo LT) Nhạc Buông Tâm Trạng Không Lời.mp3"},
    {"title": "Undertale - His Theme (Orchestral Cover)", "url": "static/music/Undertale - His Theme (Orchestral Cover).mp3"},
    {"title": "Yiruma, (이루마) - River Flows in You", "url": "static/music/Yiruma (이루마) - River Flows in You.mp3"},
    {"title": "ブルーアーカイブ Blue Archive OST 113. Usagi Flap", "url": "static/music/ブルーアーカイブ Blue Archive OST 113. Usagi Flap.mp3"},
    {"title": "告白の夜", "url": "static/music/告白の夜.mp3"},
]

@app.route('/')
def home():
    return render_template('start.html')

@app.route('/index')
def index():
    print("Route /index was accessed")
    random_music = random.choice(music_list) if music_list else {"url": ""}
    return render_template('index.html', music_list=music_list, initial_music=random_music["url"])

if __name__ == '__main__':
    app.run(debug=True)