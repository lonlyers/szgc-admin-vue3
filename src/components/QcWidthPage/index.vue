<template>
    <div
        class="qc-width-Page"
        v-loading="loading">
        <slot
            :table="tableData"
            :loading="loading"
            :page="pageConfig">
        </slot>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
    searchInfo: {
        type: Object,
        default: () => ({})
    },
    getTableData: {
        type: Function
    },
    dataText: {
        type: String,
        default: 'rows'
    }
})
const pageConfig = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
})

const loading = ref(false)
const tableData = ref([])
const getTableInfo = () => {
    if (!props.getTableData) return
    loading.value = true
    props
        .getTableData({
            ...props.searchInfo,
            pageNumber: pageConfig.currentPage,
            pageSize: pageConfig.pageSize
        })
        .then((res) => {
            pageConfig.total = res.message?.total
            tableData.value = res.message[props.dataText] || []
        })
        .finally(() => {
            loading.value = false
        })
}

const handleSizeChange = (val) => {
    pageConfig.pageSize = val
    pageConfig.currentPage = 1
    getTableInfo()
}

const handleCurrentChange = (val) => {
    pageConfig.currentPage = val
    getTableInfo()
}
watch(() => props.getTableData, getTableInfo, {
    immediate: true
})
watch(
    () => props.searchInfo,
    (val, a) => {
        getTableInfo()
    },
    {
        deep: true
    }
)
defineExpose({
    loading,
    getTableInfo,
    tableData
})
</script>
<script>
export default {
    name: 'QcWidthPage'
}
</script>

<style lang="less" scoped>
:deep(.el-table) {
    margin-top: 24px;
    margin-bottom: 36px;

    thead th {
        background-color: #f5f6fa;
        font-size: 16px;
        color: #707683;
        font-weight: normal;
        padding: 19px 0;
    }

    td {
        padding: 19px 0;
    }

    .cell {
        line-height: 15px;
    }
}

:deep(.el-pagination) {
    justify-content: flex-end;

    .el-pager li.is-active {
        background-color: #3b76ef;
        box-shadow: 0px 4px 16px 0px rgba(41, 82, 208, 0.28);
        border-radius: 4px;
        color: #ffffff;
    }
}

.qc-width-Page {
    position: relative;
}

:deep(.no-data) {
    display: flex;
    justify-content: center;
}
</style>
