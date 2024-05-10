import JhWidthPage from './JhWidthPage/index.vue'

const comps = [JhWidthPage]
export default {
    install: (Vue) => {
        comps.forEach((comp) => {
            Vue.component(comp.name, comp)
        })
    }
}
