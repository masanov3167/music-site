new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Коз коркак кол батыр",
          artist: "Raim & Adil",
          cover: "https://i.ytimg.com/vi/qKdYM76aFEs/maxresdefault.jpg",
          source: "../mp3/1.mp3",
          url: "https://youtu.be/qKdYM76aFEs",
          favorited: false
        },
        {
          name: "Тойга щащу",
          artist: "Кабдол Тлеков",
          cover: "https://i.ytimg.com/vi/OoBtSU71rks/maxresdefault.jpg",
          source: "../mp3/2.mp3",
          url: "https://youtu.be/OoBtSU71rks",
          favorited: true
        },
        {
          name: "Dancin",
          artist: "Aaron",
          cover: "https://direct.rhapsody.com/imageserver/images/alb.364088627/600x600.jpg",
          source: "../mp3/3.mp3",
          url: "https://t.me/remix_muzikalar/7773",
          favorited: false
        },
        {
          name: "Lily",
          artist: "Shir",
          cover: "https://i.ytimg.com/vi/spfMbor_24I/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA0K-kEGR8rc755P7sacX21Qz7m0A",
          source: "../mp3/4.mp3",
          url: "https://t.me/remix_muzikalar/7689",
          favorited: false
        },
        {
          name: "Memories",
          artist: "Xcho & Macan",
          cover: "https://mp3tik-tok.com/uploads/posts/2020-10/1603659604-11603659603-1.jpg",
          source: "../mp3/5.mp3",
          url: "https://t.me/remix_muzikalar/736",
          favorited: true
        },
        {
          name: "Shahrezad",
          artist: "Al Fakher",
          cover: "https://i.ytimg.com/vi/WRDPzxy1-Sc/maxresdefault.jpg",
          source: "../mp3/6.mp3",
          url: "https://youtu.be/tBDc2By_-uY",
          favorited: false
        },
        {
          name: "Te molla",
          artist: "Arnon & Killua",
          cover: "https://i1.sndcdn.com/artworks-000476712870-fd8gib-t500x500.jpg",
          source: "../mp3/7.mp3",
          url: "https://t.me/remix_muzikalar/322",
          favorited: true
        },
        {
          name: "Музыка",
          artist: "Dj Khazik",
          cover: "https://muzofond.fm/img/collections/329738_big.jpg",
          source: "../mp3/8.mp3",
          url: "https://t.me/remix_muzikalar/2661",
          favorited: false
        },
        {
          name: "Yarala meni",
          artist: "Ka-Re",
          cover: "https://samunas.ru/image/ka-re-kakajan-rejepow-on-na-ney-2018.jpg",
          source: "../mp3/9.mp3",
          url: "https://t.me/remix_muzikalar/4627",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
