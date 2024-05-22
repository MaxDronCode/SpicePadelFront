<template>
    <NavCmp/>
    <h1>Login</h1>
    <form @submit.prevent="login">
        <label for="dni">DNI/NIF: </label>
        <input type="text" v-model="dni" id="dni" required><br>
        <label for="password">Contraseña: </label>
        <input type="text" v-model="password" id="password" required><br>
        <button type="submit">Iniciar Sesión</button>
        <router-link to="/register" class="register-link">Inscríbete</router-link>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
</template>

<script>
import NavCmp from '@/components/NavCmp.vue'

export default {
    name: "LoginCmp",
    components: {
        NavCmp
    },
    data(){
        return {
            dni: "",
            password: "",
            errorMessage: "",
            availableFields: []
            
        }
    },
    methods:{
        async login() {
            try {
                const response = await fetch ('http://localhost/spicepadel_api/api/login.php', {
                    method: 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        dni: this.dni,
                        password: this.password
                    })
                })
                const data = await response.json()
                if (data.success) {
                    localStorage.setItem('spicetoken', JSON.stringify({'user_mail': data.user_mail, 'token': data.token}))
                    this.$router.push('/') 
                } else {
                    this.errorMessage = data.message
                }
            } catch (error) {
                this.errorMessage = "Error en la conexión con el servidor"
            }
        }
        
    }
}

</script>

<style scoped>

.time-section{
        padding: 10px;
        .sec-search{
            display: flex;
        }
        .sea-left{
            flex: 1;
            display: flex;
        }
        .sea-right{
            display: flex;
        }
        .calendar-cont{
            border: 1px solid rgb(235, 238, 245);
            padding: 5px 10px;
            margin-top: 10px;
            .calendar-header{
                display: flex;
                padding-bottom: 5px;
                .ehader-left{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    span{
                        color: #000;
                    }
                }
                .ehader-right{
                    .select-month{
                        display: flex;
                        > div{
                            border: 1px solid rgb(235, 238, 245);
                            cursor: pointer;
                        }
                        :nth-child(2){
                            border-left: 0;
                            border-right: 0;
                        }
                    }
                }
            }
            .calendar-body{
                border: 1px solid rgb(235, 238, 245);
                .calendar-table{
                    table{
                        width: 100%;
                        th{
                            padding: 10px 0;
                            color: rgb(96, 98, 102);    
                        }
                        tr{
                            .is-selected{
                                background-color: rgb(242, 248, 254);
                                color: rgb(64, 158, 255);;
                            }
                            .is-today{
                                color: rgb(64, 158, 255);;
                            }
                            .prev{
                                color: rgb(192, 196, 204);
                            }
                            .current{
                                color: rgb(192, 196, 204);
                            }
                            td{
                                vertical-align: top;
                                border-top: 1px solid rgb(235, 238, 245);
                                border-right: 1px solid rgb(235, 238, 245);
                                transition: background-color 0.2s ease 0s;
                                div{
                                    height: 85px;
                                    padding: 8px;
                                    display: flex;
                                    span:first-child{
                                        flex: 1;
                                    }
                                    .xiu{
                                        color: #198FFF;
                                    }
                                    .work{
                                        color:red;
                                    }
                                }
                                &:hover{
                                    cursor: pointer;
                                    background-color: rgb(242, 248, 254);
                                }
                            }
                            
                        }
                    }
                    
                }
            }
        }
    }
    .dialog-set{
        position: fixed;
        left: 50%;
        top: 50%;
        ul{
            border-radius: 8px;
            border: 1px solid rgb(228, 231, 237);
            overflow: hidden;
            li{
                padding: 10px 15px;
                cursor: pointer;
                background: #fff;
                &:hover{
                    background: rgb(245, 247, 250);
                }
                span{
                    color: rgb(96, 98, 102);
                }
            }
        }
    }
</style>