<template>
    <div>
        <Theme/>
        <router-view/>
        <Footer/>
    </div>
</template>

<script>
    import Theme from "@/components/theme/MissingSummer"
    import Footer from "@/components/footer/footer";
    export default {
        name: 'App',
        components: {
            Footer,
            Theme,
        }
    }
</script>

<style>
</style>
