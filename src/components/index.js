
import QcWidthPage from './QcWidthPage/index.vue'
import QcUpload from './QcUpload/index.vue'
import QcTimeline from './QcTimeLine/index.vue'
import QcNoData from './QcNoData/index.vue'
const comps = [QcWidthPage, QcUpload, QcTimeline, QcNoData]
export default {
    install: (Vue) => {
        comps.forEach((comp) => {
            Vue.component(comp.name, comp)
        })
    }
}
