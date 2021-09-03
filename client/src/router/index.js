import { createWebHistory, createRouter } from "vue-router";
// import Home from "@/components/Home.vue";
// import About from "@/components/About.vue";
// import Services from "@/components/Uslugi.vue";
// import Intereses from "@/components/Forms/formaddinteres.vue";
// import MainAdmin from "@/components/MainPage";
// import TestList from "@/components/TestList";
import Quasar from "@/components/Quasar";
import FormAddService from "@/components/Admin/FormAddService.vue";
import Children1 from "@/components/Children1.vue";
const routes = [
    // {
    //     path: "/quasar",
    //     name: "Quasar",
    //     component: Quasar,
    // },
    // {
    //     path: "/",
    //     name: "Home",
    //     component: Home,
    // },
    // {
    //     path: "/about",
    //     name: "About",
    //     component: About,
    //     meta: { title: 'О Черепенникове Игоре' }
    // },
    // {
    //     path: "/services",
    //     name: "Services",
    //     component: Services,

    //     meta: { title: 'Услуги Черепенникова Игоря' }
    // },

    // {
    //     path: "/intereses",
    //     name: "Intereses",
    //     component: Intereses,
    //     //meta: { title: ' Черепенникова Игоря' }
    // },
    // {
    //     path: "/admin",
    //     name: "Admin",
    //     component: MainAdmin,
    // children: [{
    //     path: "/services",
    //     component: Services,
    //     meta: { title: 'Услуги Черепенникова Игоря' },
    // },
    // {
    //     path: "/intereses",
    //     component: Intereses,
    //     meta: { title: ' Админим интересы Черепенникова Игоря' }
    // },
    // ],
    //     meta: { title: ' Администрирование сайта Игоря' }
    // },
    // {
    //     path: "/list",
    //     name: "List",
    //     component: TestList,
    // children: [{
    //     path: "/services",
    //     component: Services,
    //     meta: { title: 'Услуги Черепенникова Игоря' },
    // },
    // {
    //     path: "/intereses",
    //     component: Intereses,
    //     meta: { title: ' Админим интересы Черепенникова Игоря' }
    // },
    // ],
    //     meta: { title: ' Test Quasar' }
    // },

    {
        path: "/quasar",
        name: "Quasar",
        component: Quasar,
        children: [{
            path: "addservice",
            component: FormAddService,
            meta: { title: 'Добавление Услуги Черепенникова Игоря' },
        },

        {
            path: "test",
            component: Children1,
            meta: { title: 'Добавление Услуги Черепенникова Игоря' },
        },
            // {
            //     path: "/intereses",
            //     component: Intereses,
            //     meta: { title: ' Админим интересы Черепенникова Игоря' }
            // },
        ],
        meta: { title: ' Test Quasar' }
    },

];


const router = createRouter({
    history: createWebHistory(),
    routes,
});
////////Меняем title страницы после перехода по роуту
const DEFAULT_TITLE = 'Сайт Черепеникова Игоря Викторовича (vuex)';
router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;