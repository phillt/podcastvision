<template>
    <iframe width="560"
            height="315"
            :src="`https://www.youtube.com/embed/${videoId}?enablejsapi=1&fs=0&playsinline=1`"
            frameborder="0"
            id="video-id-stuff"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture">
    </iframe>
</template>
<script>
    export default {
        name: "YouTubeWrapper",
        props: {
            videoId : {
                type: String,
                default: "W8ASnyzZ534"
            },
            playHeadMoveInterval: {
                type: Number,
                default: 1000,
            }
        },

        data: () =>({
            player: null,
            playing: false,
            pulse: null,
        }),
        watch: {
            playing: function (value) {
                if (value) {
                    this.pulse = setInterval(
                        () =>
                            this.$emit('play-head-move',
                                Math.round(this.player.getCurrentTime()),
                            this.playHeadMoveInterval)
                    )
                } else {
                    clearInterval(this.pulse);
                }
            }
        },
        mounted() {
            // let player;
            window.onYouTubeIframeAPIReady = () => {
                 this.player = new global.YT.Player('video-id-stuff', {
                     playerVars: {
                         playsinline: 1,
                         controls: 0,
                     },
                    events: {
                        'onReady': () => this.$emit("player-ready"),
                        'onStateChange': ({data}) => this.handlePlayerStateChange(data),
                    }
                });
            };
        },

        methods: {
            handlePlayerStateChange: function (player_state) {
                this.playing = (player_state === 1) ;

                this.$emit("player-status-change", player_state)
            }
        }
    }
</script>
