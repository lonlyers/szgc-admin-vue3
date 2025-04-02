const comps = []
export default {
    install: (Vue) => {
        comps.forEach((comp) => {
            Vue.component(comp.name, comp)
        })
    }
}
