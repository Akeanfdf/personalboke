import type {RouteRecordRaw} from "vue-router";
const routes:RouteRecordRaw[]=[
    {
        path:"/",
        name:"Home",
        component:()=>import("@/views/Home.vue"),
        redirect:"/Title",
        children:[
            {
            path:"/About",
            name:"About",
            component:()=>import("@/views/About.vue"),

        },
            {
                path:"/Title",
                name:"Title",
                component:()=>import("@/views/Title.vue"),

            },
            {
                path:"/Website",
                name:"Website",
                component:()=>import("@/views/Website.vue"),

            },
            {
                path:"/Css",
                name:"Css",
                component:()=>import("@/views/Css.vue"),

            },
        ]
    },

    {
        path:"/:pathMatch(.*)*",
        name:"404",
        component:()=>import("@/views/layout.vue")

    }
]
export default routes
