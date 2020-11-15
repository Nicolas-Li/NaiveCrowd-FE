<template>
    <div class="timer">
        <div ref="startTimer">00:00:00</div>
        <div v-if="overtime==true">已超时</div>
    </div>
</template>

<script>
export default {
    name:'Timer',
    props:{
      time:{
        type:Number
      },
      maxtime: {
        type:Number,
        default:10
      },
    },
    data() {
        return {
            timer: "",
            hour: 0,
            minutes: 0,
            seconds: 0,
            cr: '',
            overtime: false,
        }
    },
    created() {
        this.timer = setInterval(this.startTimer, 1000);
    },
    methods: {
        startTimer() {
            if(this.seconds + 60 * this.minutes + 3600 * this.hour > this.maxtime){
                this.overtime = true
                return 0
            }
            this.seconds += 1;
            if (this.seconds >= 60) {
                this.seconds = 0;
                this.minutes = this.minutes + 1;
            }
            if (this.minutes >= 60) {
                this.minutes = 0;
                this.hour = this.hour + 1;
            }
            this.$refs.startTimer.innerHTML = (this.hour < 10 ? '0' + this.hour: this.hour) + ':' + (this.minutes < 10 ? '0' + this.minutes: this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds: this.seconds);
            this.cr =  this.seconds
        },
        stop () {
            clearInterval(this.timer)
        },
        start () {
            this.timer = setInterval(this.startTimer, 1000)
        }
    }
}
</script>