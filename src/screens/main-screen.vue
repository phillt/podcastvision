<template>
    <div>
        <div class="card">
            <div class="embed-responsive embed-responsive-16by9">
                <you-tube-wrapper v-on:player-status-change="handleStatusChanged"
                                  v-on:play-head-move="handlePlayHeadMove"
                                  :video-id="$route.params.script"/>
            </div>
            <div class="card-body">
                <presenter-wrapper v-if="script" :duration="duration" :script="script" />
            </div>
        </div>
       <br />
       <br />
        <code>
            <p>currentStatus : {{status}}</p>
            <p>duration : {{duration}}</p>
        </code>
    </div>
</template>
<script>
    import YouTubeWrapper from "../components/you-tube-wrapper";
    import PresenterWrapper from "../components/presenter-wrapper";

    export default {
        name: "Main",
        components: {YouTubeWrapper, PresenterWrapper},
        data: () => ({
            status : "nothing",
            duration: 0,
            script: null,
        }),
        async mounted() {
            if (!this.$route.params.script) {
                return;
            }
            try {
                const {s} = await import(/* webpackIgnore: true */`../${this.$route.params.script}.js`);
                this.script = s;
            } catch (err) {
                throw `Failed to load script ${this.$route.params.script}: ${err}`;
            }

        },
        methods: {
            handlePlayHeadMove: function (duration) {
                this.duration = duration
            },
            handleStatusChanged: function (playerStatus) {
                if (playerStatus == -1) {
                    this.status = "unstarted";
                } else if (playerStatus == 0) {
                    this.status = "ended";
                } else if (playerStatus == 1) {
                    this.status = "playing";
                } else if (playerStatus == 2) {
                    this.status = "paused";
                } else if (playerStatus == 3) {
                    this.status = "buffering";
                } else if (playerStatus == 5) {
                    this.status = "video_cued";
                } else {
                    this.status = "none";
                }
            }
        }
    }
</script>

<style>
    @import "~animate.css";
    .card-body {
        min-height: 100px;
    }
</style>
