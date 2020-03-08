<template>
    <sp-form :form="form" url="/admin/password" method="put">
        <el-form-item label="新密码">
            <el-input v-model="new_password"></el-input>
        </el-form-item>
    </sp-form>
</template>

<script>
    import SpForm from "../../../components/SpForm";
    export default {
        name: "UpdatePasswordForm",
        components: {SpForm},
        props: {
          username: {
              type: String,
              required: true,
              credentials_type: '',
              credentials_value: ''
          }
        },
        data(){
            return {
                new_password: ''
            }
        },
        computed: {
            form () {
                return {
                    username: this.username,
                    new_password: this.new_password,
                    credentials_type: this.credentials_type,
                    credentials_value: this.credentials_value
                }
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>