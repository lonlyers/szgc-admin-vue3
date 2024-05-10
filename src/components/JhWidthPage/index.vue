<template>
    <div class="qc-width-Page"></div>
</template>

<script setup>
import { useTable } from './useTableHook'
const props = defineProps({
    initParam: {
        type: Object,
        default: () => ({})
    },
    api: {
        type: Function
    },
    dataCallBack: {
        type: Function
    },
    isPageable: {
        type: Boolean,
        default: true
    }
})
console.log(111)

const { tableData, loading, reset, search } = useTable(props.api, props.initParam, props.isPageable, props.dataCallBack)
defineExpose({
    search,
    reset
})
</script>
<script>
export default {
    name: 'JhWidthPage'
}
</script>

<style lang="less" scoped>
:deep(.el-table) {
    margin-top: 24px;
    margin-bottom: 36px;
    border: solid 1px #e3e7eb;
    border-bottom: none;
    thead th {
        background-color: #f2f3f4;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.9);
        font-weight: normal;
        padding: 16px 0 19px 0;
    }

    td {
        padding: 18px 0;
    }

    .cell {
        line-height: 16px;
    }
}

.pagination {
    display: flex;
    justify-content: space-between;
    > .total {
        line-height: 30px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #707683;
    }
    ::v-deep .el-pagination button {
        width: 30px;
        height: 30px;
        line-height: 30px;
    }
    :deep(.el-pagination) {
        padding: 0 130px 0 0px;
        position: relative;
        .el-pagination__sizes {
            width: 130px;
            overflow: hidden;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            margin: 0;
        }
        .btn-next,
        .btn-prev {
            color: #a4aab9;
            background-color: transparent;
        }
        .el-pager {
            li {
                font-size: 14px;
                color: #333;
                // font-family: MicrosoftYaHei;
                background-color: transparent;
                // width: 30px;
                min-width: 30px;
                height: 30px;
                line-height: 30px;
            }
            .number.is-active {
                width: 32px;
                height: 32px;
                color: #33b3fd;
                background-color: #1c5ee5;
                border-radius: 4px;
                color: #fff;
            }
        }
        .el-pagination__editor,
        .el-pagination__jump {
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #323c47;
            height: 30px;
            line-height: 30px;
        }
        .el-pagination__jump {
            margin-left: 18px;
        }
        .el-pagination__editor.el-input .el-input__inner {
            height: 100%;
            border-width: 0;
            border-bottom-width: 1px;
            border-radius: 0;
            border-color: #d3d8dd;
            background-color: transparent;
            &:focus {
                border-color: #d3d8dd;
            }
        }
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
