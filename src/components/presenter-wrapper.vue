<template>
    <div class="presenter-wrapper">
        <component v-for="(options, index) in present"
                   :key="index"
                   :is="componentType(options).component_name"
                   v-bind="componentType(options).props"/>
    </div>
</template>
<script>
    import PresentTwitterCard from "./present-twitter-card"
    import PresentGenericCard from "./present-generic-card";
    import Word from "./word";

    export default {
        components: {PresentTwitterCard, PresentGenericCard, Word},
        data: () => ({
            present:() => []
        }),
        props: {
            script: {
                type: Object,
                default: ()=>({})
            },
            duration: {
                type: Number,
                default: 0,
            }
        },
        watch: {
            duration: function (value) {
                let new_present = [];

                Object.keys(this.script).map(times => {
                   const [start, end] = times.split(",")

                    if (value >= start && value <= end) {
                        new_present = [...new_present, ...this.script[times]];
                    }
                });

                this.present = new_present;
            }
        },
        methods: {
            componentType(options) {
                if (typeof options == "string") {
                    return {
                        component_name: "Word",
                            props: {
                            content: options
                        }
                    }
                }

                if (options.component_name) {
                    return  options
                }

                throw "Unknown component type."
            }
        },
    }
</script>
<style lang="scss">
    .presenter-wrapper {
        text-align: center;
    }
</style>
