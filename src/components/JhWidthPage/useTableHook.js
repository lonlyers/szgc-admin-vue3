import { reactive, onMounted, computed, toRefs } from 'vue'
import { cloneDeep } from 'lodash'
/**
 * @description table 页面表格操作方法封装
 * @param {Function} api 获取表格数据 api 方法(必传)
 * @param {Object} initParam 获取数据初始化参数(非必传，默认为{})
 * @param {Boolean} isPageable 是否有分页(非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法(非必传)
 * */
export const useTable = (api, initParam, isPageable, dataCallBack) => {
    /**
     * 设计思路(首先要知道这个hook要输出的产物是什么？)
     * 产物：1.获取表格数据的方法getTableData
     * 产物：2.查询条件变量searchParam
     * 产物：3.分页查询条件变量pagination
     * 产物：4.分页pageSize变更的方法handleSizeChange()
     * 产物：5.分页currentPage变更的方法handleCurrentChange()
     * 产物：6.查询方法search()
     * 产物：7.初始化参数的变量searchInitParam
     */
    const state = reactive({
        // 表格数据
        tableData: [],
        // 分页数据
        pagination: {
            // 当前页数
            pageNumber: 1,
            // 每页显示条数
            pageSize: 10,
            // 总条数
            total: 0
        },
        // 查询参数(只包括查询)

        // 总参数(包含分页和查询参数)
        totalParam: {},
        loading: false
    })
    const pageParam = computed({
        get: () => {
            return {
                pageNumber: state.pagination.pageNumber,
                pageSize: state.pagination.pageSize
            }
        },
        set: (newVal) => {
            console.log('我是分页更新之后的值', newVal)
        }
    })

    const getTableData = async () => {
        state.loading = true
        try {
            // 合并查询参数
            Object.assign(state.totalParam, isPageable ? pageParam.value : {}, initParam)

            let { message } = await api(state.totalParam)
            // 回调处理，此处可以满足对特殊数据的处理
            dataCallBack && (message = dataCallBack(message))
            // 根据是否分页，进行赋值
            state.tableData = isPageable ? message.rows : message
            // 对分页参数进行更新
            const { total } = message
            isPageable && updatePagination({ total })
            state.loading = false
        } catch (err) {
            state.loading = false
        }
    }
    const updatePagination = (resPageable) => {
        Object.assign(state.pagination, resPageable)
    }

    const search = () => {
        state.pagination.pageNumber = 1

        getTableData()
    }

    const reset = () => {
        state.pagination.pageSize = 10
        search()
    }
    onMounted(() => {
        reset()
    })
    const handleSizeChange = (val) => {
        state.pagination.pageNumber = 1
        state.pagination.pageSize = val
        getTableData()
    }

    const handleCurrentChange = (val) => {
        state.pagination.pageNumber = val
        getTableData()
    }

    return {
        ...toRefs(state),
        getTableData,
        handleCurrentChange,
        handleSizeChange,
        search,
        reset
    }
}
