export default {
    watch:{
        value (val){
            this.$emit('input',val)
        }
    },
}