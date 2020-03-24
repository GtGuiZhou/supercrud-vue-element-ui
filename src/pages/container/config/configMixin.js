export default {
    props: {
        value: {
            type: Object,
            required: true
        }
    },
    watch:{
        value (val){
            this.$emit('input',val)
        }
    },
}