
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const heading = $("header h2");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "1",
      singer: "1",
      path:
        "music/daloyeuemnhieu.mp3",
    },
    {
      name: "2",
      singer: "2",
      path:
        "music/noinaycoanh.mp3",
    },
    {
      name: "3",
      singer: "3",
      path:
        "https://data3.chiasenhac.com/downloads/1751/5/1750325-63589c26/128/Anh%20Nang%20Cua%20Anh%20-%20Duc%20Phuc.mp3",
    },
    {
      name: "4",
      singer: "4",
      path:
        "music/ido.mp3",
    },
    {
      name: "5",
      singer: "5",
      path:
        "music/anhdanhroinguoiyeunay.mp3",
    },
    {
      name: "6",
      singer: "6",
      path:
        "music/muonruoutrochuyen.mp3",
    },
    {
      name: "7",
      singer: "7",
      path:
        "https://data.chiasenhac.com/down2/2277/5/2276758-85a6d3ff/128/Hon%20Ca%20Yeu%20-%20Duc%20Phuc.mp3",
    },
    {
      name: "8",
      singer: "8",
      path:
        "music/thangdien.mp3",
    },
    {
      name: "9",
      singer: "9",
      path:
        "music/yeuemratnhieu.mp3",
    },
    {
      name: "10",
      singer: "10",
      path:
        "https://data.chiasenhac.com/down2/2224/5/2223570-77fd7172/128/Ngay%20Dau%20Tien%20-%20Duc%20Phuc.mp3",
    },
    {
      name: "11",
      singer: "11",
      path:
        "https://data.chiasenhac.com/down2/2179/5/2178586-53a3f17d/128/Yeu%20Duoc%20Khong%20-%20Duc%20Phuc.mp3",
    },
    {
      name: "12",
      singer: "12",
      path:
        "https://ia801807.us.archive.org/15/items/ctcht/Chung%20Ta%20Cua%20Hien%20Tai%20-%20Son%20Tung%20M-TP.mp3",
    },
    {
      name: "13",
      singer: "13",
      path:
        "https://data3.chiasenhac.com/downloads/2119/5/2118238-278309af/128/Em%20Be%20-%20AMee_%20Karik.mp3",
    },
    {
      name: "14",
      singer: "14",
      path:
        "https://data3.chiasenhac.com/downloads/2090/5/2089159-8fcd942c/128/You%20Are%20My%20Crush%20-%20Quan%20A_P.mp3",
    },
    {
      name: "15",
      singer: "15",
      path:
        "https://data.chiasenhac.com/down2/2221/5/2220235-4b2a4af4/128/Thich%20Em%20Hoi%20Nhieu%20-%20Wren%20Evans.mp3",
    },
    {
      name: "16",
      singer: "16",
      path:
        "https://data.chiasenhac.com/down2/2212/5/2211684-5b46ea73/128/Anh%20Se%20Don%20Em%20voi%20Trang_%20-%20Nguyen_.mp3",
    },
    {
      name: "17",
      singer: "17",
      path:
        "https://data.chiasenhac.com/down2/2216/5/2215413-def9e962/128/I%20Love%20You%203000%20-%20Stephanie%20Poetri.mp3",
    },
    {
      name: "18",
      singer: "18",
      path:
        "https://data.chiasenhac.com/down2/2261/5/2260423-d12b3940/128/Bat%20Coc%20Con%20Tim%20-%20Lou%20Hoang.mp3",
    },
    {
      name: "19",
      singer: "19",
      path:
        "https://data.chiasenhac.com/down2/2276/5/2275144-a6d75b68/128/Em%20La%20-%20MONO_%20Onionn.mp3",
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    // const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    // const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
    //   duration: 10000, // 10 seconds
    //   iterations: Infinity
    // });
    // cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    // document.onscroll = function () {
    //   const scrollTop = window.scrollY || document.documentElement.scrollTop;
    //   const newCdWidth = cdWidth - scrollTop;

    //   cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
    //   cd.style.opacity = newCdWidth / cdWidth;
    // };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      // cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      // cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      // _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      // _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
  },
  // scrollToActiveSong: function () {
  //   setTimeout(() => {
  //     $(".song.active").scrollIntoView({
  //       behavior: "smooth",
  //       block: "nearest"
  //     });
  //   }, 300);
  // },
  loadCurrentSong: function () {
    // heading.textContent = this.currentSong.name;
    // cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();




