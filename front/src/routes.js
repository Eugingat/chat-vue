import FormAuth from "@/components/FormAuth";
import ChatVue from "@/components/ChatVue";
import NotFound from "@/components/NotFound";

export const routes = [
    {
        path: '/',
        component: FormAuth
    },
    {
        path: '/chat/:login',
        component: ChatVue
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound
    }
]