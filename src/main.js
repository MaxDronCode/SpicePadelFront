import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeCmp from '@/components/HomeCmp.vue'; 
import LoginCmp from '@/components/LoginCmp.vue';
import LogoutCmp from '@/components/LogoutCmp.vue';
import RegisterCmp from '@/components/RegisterCmp.vue';
import TournamentsCmp from '@/components/TournamentsCmp.vue';
import JoinTournamentCmp from '@/components/JoinTournamentCmp.vue';
import MyAccountCmp from '@/components/MyAccountCmp.vue';
import CalendarCmp from '@/components/CalendarCmp.vue';
import BookingForm from '@/components/BookingForm.vue';
import 'vue-cal/dist/vuecal.css'




const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomeCmp },
        { path: '/login', component: LoginCmp },
        { path: '/logout', component: LogoutCmp },
        { path: '/register', component: RegisterCmp },
        { path: '/tournaments', component: TournamentsCmp },
        { path: '/joinTournament', component: JoinTournamentCmp },
        { path: '/myAccount', component: MyAccountCmp },
        { path: '/reserve', component: BookingForm },
        { path: '/calendar', component: CalendarCmp },
    ],
});

const app = createApp(App);
app.use(router);
app.mount('#app');
