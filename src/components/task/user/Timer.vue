<template>
    <div class="timer">
        <div ref="startTimer">{{timehtml}}</div>
        <div v-if="overtime===true">已超时</div>
    </div>
</template>

<script>
    export default {
        name: 'Timer',
        props: {
            maxtime: {
                type: Number,
                default: 0
            },
        },
        data() {
            return {
                timer: "",
                hour: 0,
                minutes: 0,
                seconds: 0,
                overtime: false,
                timehtml: '',
                maxhour: 0,
                maxmin: 0,
                maxsec: 0,
            }
        },
        created() {
            this.resetMaxTime(this.maxtime)
            this.timer = setInterval(this.startTimer, 1000)
        },
        methods: {
            startTimer() {
                if (this.seconds + 60 * this.minutes + 3600 * this.hour >= this.maxtime) {
                    console.log("time=" + this.seconds + 60 * this.minutes + 3600 * this.hour)
                    console.log("maxtime=" + this.maxtime)
                    this.overtime = true
                    this.stop()
                    return 0
                }
                this.seconds += 1;
                while (this.seconds >= 60) {
                    this.seconds -= 60;
                    this.minutes = this.minutes + 1;
                }
                while (this.minutes >= 60) {
                    this.minutes -= 60;
                    this.hour = this.hour + 1;
                }
                this.timehtml = (this.hour < 10 ? '0' + this.hour : this.hour) + ':' + (this.minutes < 10 ? '0' + this.minutes : this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds)
                    + '/' + (this.maxhour < 10 ? '0' + this.maxhour : this.maxhour)
                    + ':' + (this.maxmin < 10 ? '0' + this.maxmin : this.maxmin)
                    + ':' + (this.maxsec < 10 ? '0' + this.maxsec : this.maxsec)
                ;
            },
            stop() {
                clearInterval(this.timer)
            },
            start() {
                this.timer = setInterval(this.startTimer, 1000)
            },
            resetMaxTime(maxT) {
                this.maxhour = 0
                this.maxmin = 0
                this.maxsec = maxT
                while (this.maxsec >= 60) {
                    this.maxsec -= 60;
                    this.maxmin = this.maxmin + 1;
                }
                while (this.maxmin >= 60) {
                    this.maxmin -= 60;
                    this.maxhour = this.maxhour + 1;
                }
                this.timehtml = (this.hour < 10 ? '0' + this.hour : this.hour) + ':' + (this.minutes < 10 ? '0' + this.minutes : this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds)
                    + '/' + (this.maxhour < 10 ? '0' + this.maxhour : this.maxhour)
                    + ':' + (this.maxmin < 10 ? '0' + this.maxmin : this.maxmin)
                    + ':' + (this.maxsec < 10 ? '0' + this.maxsec : this.maxsec)
                ;
            }
        },
        watch: {
            'maxtime': {
                handler(newData) {
                    if (newData) {
                        this.resetMaxTime(newData)
                    }
                }
            }
        }
    }
</script>