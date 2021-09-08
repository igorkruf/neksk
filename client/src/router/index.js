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
import FormGenCsv from "@/components/Admin/Moodle/FormGenCsv.vue";
const routes = [

    {
        path: "/quasar",
        name: "Quasar",
        component: Quasar,
        children: [
            {
                path: "addservice",
                name: "addservice",
                component: FormAddService,
                meta: { title: 'Добавление Услуги Черепенникова Игоря' },
            },

            {
                path: "test",
                name: "test",
                component: Children1,
                meta: { title: 'Добавление Услуги Черепенникова Игоря' },
            },

            {
                path: "moodle/:id",
                name: "Moodle",
                component: FormGenCsv,
                meta: { title: 'Генерация файла(списка) учеников' },
            },

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