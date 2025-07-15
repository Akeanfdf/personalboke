<template>
    <div class="music-player">
        <div class="player-main">
            <!-- 左侧唱片 -->
            <div class="album-side">
                <div
                        class="album-disc"
                        :class="{ spinning: isPlaying }"
                >
                    <img :src="currentTrack.cover || '/default-cover.jpg'" :alt="currentTrack.title" />
                    <div class="center-dot"></div>
                </div>
            </div>
            <!-- 右侧控制区 -->
            <div class="control-side">
                <div class="track-info">
                    <h3 class="track-title">{{ currentTrack.title }}</h3>
                    <p class="track-artist">{{ currentTrack.artist }}</p>
                </div>
                <div class="progress-container">
                    <div class="time-display">
                        <span>{{ formatTime(currentTime) }}</span>
                        <span>{{ formatTime(duration) }}</span>
                    </div>
                    <div class="progress-bar" @click="seekTo">
                        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
                    </div>
                </div>
                <div class="controls">
                    <button class="control-btn" @click="previousTrack" :disabled="playlist.length <= 1">
                        <img :src="imgNext" style="width: 15px;transform: rotate(180deg) ;">
                    </button>
                    <button class="control-btn play-btn" @click="togglePlay">
                        <img :src="isPlaying ? imgPause : imgPlay" alt="播放/暂停" class="icon-btn" />
                    </button>
                    <button class="control-btn" @click="nextTrack" :disabled="playlist.length <= 1">
                        <img :src="imgNext" style="width: 15px;">
                    </button>
                </div>
                <div class="volume-container">
                    <button class="volume-btn" @click="toggleMute">
                        <img :src="isMuted ? sound1 : sound2" alt="播放/暂停" class="icon-btn" />
                    </button>
                    <div class="volume-slider" @click="setVolume">
                        <div class="volume-fill" :style="{ width: volumePercent + '%' }"></div>
                    </div>
                </div>
            </div>
        </div>
        <audio
                ref="audioElement"
                @loadedmetadata="onLoadedMetadata"
                @timeupdate="onTimeUpdate"
                @ended="onTrackEnd"
                @error="onError"
        ></audio>
    </div>
</template>



<script>
import imgNext from '@/camera/Player, next.svg'
import imgPause from '@/camera/Player, pause (1).svg'
import imgPlay from '@/camera/Player, play (1).svg'
import sound1 from '@/camera/Headphones (1).svg'
import sound2 from '@/camera/静音.svg'
export default {
  name: 'MusicPlayer',
  data() {
    return {
      isPlaying: false,
      isMuted: false,
      currentTime: 0,
      duration: 0,
      volume: 1,
      currentTrackIndex: 0,
      showPlaylist: false,
      playlist: [
        {
          title: 'REVIVER',
          artist: '澤野弘之 / SennaRin',
          url: 'http://music.163.com/song/media/outer/url?id=2674417111.mp3',
          cover: 'https://p2.music.126.net/7SpPcjN-jianb1CUaytwgA==/109951170476384694.jpg?param=130y130',
          duration: 180
        },
        {
          title: 'Daisy Crown',
          artist: 'Empty old City / Wuthering Waves',
          url: 'http://music.163.com/song/media/outer/url?id=2676687608.mp3',
          cover: 'https://p1.music.126.net/J0ZfqWmqX3zGJLzTubJ7vg==/109951170498554226.jpg?param=130y130',
          duration: 240
        },
        {
          title: 'Die For You',
          artist: 'VALORANT / Grabbitz',
          url: 'http://music.163.com/song/media/outer/url?id=2621127332.mp3',
          cover: 'https://p2.music.126.net/ETVPC6PXkcNnNk9TAmlBpg==/109951169907554155.jpg?param=130y130',
          duration: 200
        },
          {
              title: '虹の彼方に',
              artist: 'ReoNa',
              url: 'http://music.163.com/song/media/outer/url?id=1343843200.mp3',
              cover: 'https://p1.music.126.net/gfJObVRvDllGL_4fx8cWcQ==/109951169364981571.jpg?param=130y130',
              duration: 200
          },
          {
              title: 'Deadman',
              artist: '蔡徐坤',
              url: 'http://music.163.com/song/media/outer/url?id=2708984802.mp3',
              cover: 'https://p1.music.126.net/wqyd40jQQLVTY9nynOwETg==/109951171031632866.jpg?param=130y130',
              duration: 200
          },
          {
              title: '篝火旁（再启程）',
              artist: '吕大叶 / 旺仔小乔 / 马子林 / 我也想试试兔头',
              url: 'http://music.163.com/song/media/outer/url?id=1869943939.mp3',
              cover: 'https://p2.music.126.net/IFZBIGhfi3KHCINWD7W3jg==/109951166293334231.jpg?param=130y130',
              duration: 200
          },
      ]
    }
  },
  computed: {
    currentTrack() {
      return this.playlist[this.currentTrackIndex] || {}
    },
    progressPercent() {
      return this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0
    },
    volumePercent() {
      return this.volume * 100
    }
  },
  methods: {
    togglePlay() {
      const audio = this.$refs.audioElement
      if (this.isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      this.isPlaying = !this.isPlaying
    },

    previousTrack() {
      if (this.playlist.length <= 1) return
      this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length
      this.loadTrack()
    },

    nextTrack() {
      if (this.playlist.length <= 1) return
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length
      this.loadTrack()
    },

    playTrack(index) {
      this.currentTrackIndex = index
      this.loadTrack()
    },

    loadTrack() {
      const audio = this.$refs.audioElement
      audio.src = this.currentTrack.url
      audio.load()
      this.isPlaying = false
      this.currentTime = 0
    },

    seekTo(event) {
      const audio = this.$refs.audioElement
      const rect = event.currentTarget.getBoundingClientRect()
      const percent = (event.clientX - rect.left) / rect.width
      const newTime = percent * this.duration
      audio.currentTime = newTime
      this.currentTime = newTime
    },

    setVolume(event) {
      const rect = event.currentTarget.getBoundingClientRect()
      const percent = (event.clientX - rect.left) / rect.width
      this.volume = Math.max(0, Math.min(1, percent))
      this.$refs.audioElement.volume = this.volume
      this.isMuted = this.volume === 0
    },

    toggleMute() {
      this.isMuted = !this.isMuted
      this.$refs.audioElement.muted = this.isMuted
    },

    togglePlaylist() {
      this.showPlaylist = !this.showPlaylist
    },

    formatTime(seconds) {
      if (!seconds || isNaN(seconds)) return '0:00'
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    },

    onLoadedMetadata() {
      const audio = this.$refs.audioElement
      this.duration = audio.duration || this.currentTrack.duration || 0
    },

    onTimeUpdate() {
      const audio = this.$refs.audioElement
      this.currentTime = audio.currentTime
    },

    onTrackEnd() {
      this.nextTrack()
    },

    onError() {
      console.error('音频加载失败')
    }
  },

  mounted() {
    this.loadTrack()
  },
    setup() {
        return {
            imgNext,
            imgPause,
            imgPlay,
            sound1,
            sound2,
        }
    }
}
</script>

<style scoped>
.music-player {
    width: 200px;
    height: 150px;
    border-radius: 20px;
    padding: 18px;
    color: white;
    font-family: 'Arial', sans-serif;
}
.player-main {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 18px;
}
.icon-btn{
    width:15px
}
.album-side {
    flex: 0 0 110px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.album-disc {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #222;
    border: 6px solid #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.3s;
}
.album-disc img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
}
.center-dot {
    position: absolute;
    left: 50%; top: 50%;
    width: 18px; height: 18px;
    background: #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid #aaa;
    z-index: 2;
}
.album-disc.spinning {
    animation: spin 2s linear infinite;
}
@keyframes spin {
    100% { transform: rotate(360deg); }
}
.control-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.track-info {
    text-align: left;
}
.track-title {
    margin: 0 0 2px 0;
    font-size: 1.1rem;
    font-weight: bold;
}
.track-artist {
    margin: 0;
    font-size: 0.85rem;
    opacity: 0.8;
}
.progress-container {
    display: flex;
    flex-direction: column;
    gap: 2px;
}
.time-display {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    opacity: 0.8;
}
.progress-bar {
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    cursor: pointer;
    position: relative;
}
.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4CAF50, #8BC34A);
    border-radius: 3px;
    transition: width 0.1s;
}
.controls {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
}
.control-btn {
    background: rgba(255, 255, 255, 0.1);
    width: 20px;
    height: 20px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}
.control-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
}
.control-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.play-btn {
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    font-size: 1.2rem;
}
.volume-container {
    display: flex;
    align-items: center;
    gap: 8px;
}
.volume-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1rem;
}
.volume-slider {
    flex: 1;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    cursor: pointer;
    position: relative;
}
.volume-fill {
    height: 100%;
    background: white;
    border-radius: 2px;
    transition: width 0.1s;
}
.playlist-container {
    position: relative;
}
.playlist-toggle {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 5px;
    padding: 6px 10px;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
}
.playlist-toggle:hover {
    background: rgba(255, 255, 255, 0.2);
}
.playlist {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 10px;
    margin-top: 5px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
}
.playlist-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;
    transition: background 0.3s;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.playlist-item:hover {
    background: rgba(255, 255, 255, 0.1);
}
.playlist-item.active {
    background: rgba(76, 175, 80, 0.3);
}
.track-number {
    width: 24px;
    font-size: 0.8rem;
    opacity: 0.7;
}
.track-name {
    flex: 1;
    font-size: 0.9rem;
}
.track-duration {
    font-size: 0.8rem;
    opacity: 0.7;
}
@media (max-width: 200px) {
    .music-player {
        width: 100vw;
        min-width: 0;
        padding: 8px;
    }
    .player-main {
        flex-direction: column;
        gap: 8px;
    }
    .album-side {
        margin-bottom: 8px;
    }
}
</style>