<template>
    <div class="cartoon hb">
        <div class="sky ha"></div>
        <div class="horizon ha"></div>
        <div class="post"></div>
        <div class="umbrella r ha"></div>
        <div class="umbrella-shadow r ha"></div>
    </div>
</template>

<script>
    export default {
        name: "MissingSummer"
    }
</script>

<style scoped>
    .cartoon {
        z-index: -1;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40vmax;
        height: 40vmax;
    }

    .cartoon::before {
        width: 100%;
        height: 100%;
        background-color: #eee;
        background-image: linear-gradient(to right, transparent 99%, gray 0), linear-gradient(to bottom, transparent 99%, gray 0), url();
        background-size: 10% 100%, 100% 10%, cover;
    }


    .cartoon div {
        position: absolute;
        box-sizing: border-box;
    }

    .b {
        border: 0.5vmin solid;
    }

    .r {
        border-radius: 100%;
    }

    .hb::before,
    .ha::after {
        content: "";
        display: block;
        position: absolute;
        box-sizing: border-box;
    }

    /****/
    html, body {
        overflow: hidden;
    }

    .sky {
        bottom: 40%;
        left: 50%;
        width: 100vw;
        height: 100vmax;
        background: skyblue;
        transform: translate(-50%, 0);
        background-image: linear-gradient(-135deg, #0066, transparent), radial-gradient(at 20% 50%, white, transparent);
        background-image: linear-gradient(skyblue, white)
    }

    .sky::after {
        width: 20vmin;
        height: 20vmin;
        background: #fff;
        bottom: 10%;
        left: 20%;
        border-radius: 50%;
        box-shadow: 0 0 100vmin 20vmin #fffff3;
        filter: blur(10px)

    }

    .horizon {
        top: 50%;
        left: 50%;
        transform: translate(-50%, 0) rotate(-2deg);
        width: 110vmax;
        height: 100vmax;
        background: radial-gradient(at 32% 0%, #fffaf8, transparent 50%), linear-gradient(#fda, #631);
        overflow: hidden;
    }

    .horizon::after {
        width: 300%;
        height: 100%;
        left: -90%;
        border-radius: 50%;
        top: 10%;
        box-shadow: -1vmax -1vmax 1vmax white, 0 -20vmax #3bc;
        opacity: 0.4;
        animation: waves 5s infinite;
    }

    @keyframes waves {
        0%, 100% {
            box-shadow: -1vmax -1vmax 0.5vmax white, 0 -20vmax #3bc;
        }
        50% {
            box-shadow: 1vmax -0.5vmax 1vmax white, 0 -20vmax #3bc;
        }
    }

    .post {
        width: 0.2vmax;
        height: 6vmax;
        background: #333;
        top: 90%;
        left: 60%;
        transform: rotate(10deg);
    }

    .post::after {
        content: "";
        position: absolute;
        display: block;
        top: 50%;
        left: 50%;
        transform-origin: center bottom;
        background: rgba(0, 0, 0, 0.25);
        width: 100%;
        height: 50%;
        transform: scaleY(-1) translate(-50%, 0) skewX(-42deg);
        filter: blur(1px)
    }

    .umbrella {
        width: 18vmax;
        height: 16vmax;
        border-radius: 50%;
        overflow: hidden;
        top: 58%;
        left: 45%;
    }

    .umbrella::after {
        width: 50%;
        height: 50%;
        background: #d00;
        border-radius: 50%;
        bottom: -20%;
        left: 10%;
        background: linear-gradient(to right, #d00, #800);
        box-shadow: inset -1.5vmax 0 #eee, inset 1.5vmax 0 white;
        transform: rotate(15deg);
    }

    .umbrella-shadow {
        width: 18vmax;
        height: 16vmax;
        border-radius: 50%;
        overflow: hidden;
        top: 113%;
        left: 49%;
        transform: rotate(120deg);
        filter: blur(2px);
    }

    .umbrella-shadow::after {
        width: 35%;
        height: 80%;
        background: #d00;
        border-radius: 50%;
        bottom: -20%;
        left: 6%;
        background: rgba(0, 0, 0, 0.25);
        transform: rotate(22deg);
        background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.25))
    }
</style>