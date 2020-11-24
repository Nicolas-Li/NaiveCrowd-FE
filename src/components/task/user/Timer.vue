<template>
    <div class="timer">
        <div ref="startTimer">{{timeHtml}}</div>
        <div v-if="overtime">已超时</div>
    </div>
</template>

<script>
    export default {
        name: 'Timer',
        props: {
            maxTime: {
                type: Number,
                default: 0
            },
        },
        data() {
            return {
                timer: null,
                hour: 0,
                minutes: 0,
                seconds: 0,
                overtime: false,
                timeHtml: '',
                maxHour: 0,
                maxMin: 0,
                maxSec: 0,
            }
        },
        created() {
            this.timer = setInterval(this.startTimer, 1000)
            this.resetMaxTime(this.maxTime)
        },
        methods: {
            startTimer() {
                if (this.seconds + 60 * this.minutes + 3600 * this.hour >= this.maxTime) {
                    this.overtime = true
                    this.$emit("timeIsOut")
                    this.stop()
                    return 0
                }
                this.seconds += 1
                while (this.seconds >= 60) {
                    this.seconds -= 60
                    this.minutes = this.minutes + 1
                }
                while (this.minutes >= 60) {
                    this.minutes -= 60
                    this.hour = this.hour + 1
                }
                this.timeHtml = (this.hour < 10 ? '0' + this.hour : this.hour)
                    + ':' + (this.minutes < 10 ? '0' + this.minutes : this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds)
                    + '/' + (this.maxHour < 10 ? '0' + this.maxHour : this.maxHour)
                    + ':' + (this.maxMin < 10 ? '0' + this.maxMin : this.maxMin)
                    + ':' + (this.maxSec < 10 ? '0' + this.maxSec : this.maxSec)
            },
            stop() {
                clearInterval(this.timer)
            },
            start() {
                this.timer = setInterval(this.startTimer, 1000)
            },
            resetMaxTime(maxT) {
                this.maxHour = 0
                this.maxMin = 0
                this.maxSec = maxT
                while (this.maxSec >= 60) {
                    this.maxSec -= 60
                    this.maxMin = this.maxMin + 1
                }
                while (this.maxMin >= 60) {
                    this.maxMin -= 60
                    this.maxHour = this.maxHour + 1
                }
                this.timeHtml = (this.hour < 10 ? '0' + this.hour : this.hour)
                    + ':' + (this.minutes < 10 ? '0' + this.minutes : this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds)
                    + '/' + (this.maxHour < 10 ? '0' + this.maxHour : this.maxHour)
                    + ':' + (this.maxMin < 10 ? '0' + this.maxMin : this.maxMin)
                    + ':' + (this.maxSec < 10 ? '0' + this.maxSec : this.maxSec)
            }
        },
        watch: {
            'maxTime': {
                handler(newData) {
                    if (newData) {
                        this.resetMaxTime(newData)
                    }
                }
            }
        },
        beforeDestroy() {
            this.stop()
        }
    }
</script>