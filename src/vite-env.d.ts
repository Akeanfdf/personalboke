// src/shims-vue.d.ts
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
// src/shims-less.d.ts
declare module '*.less' {
    const content: { [className: string]: string }
    export default content
}
// src/shims-css.d.ts
declare module '*.css'