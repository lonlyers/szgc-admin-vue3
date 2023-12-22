<template>
    <el-upload
        action=""
        list-type="picture-card"
        v-model:file-list="bindFileList"
        :auto-upload="true"
        :http-request="uploadFile"
        :on-success="onSuccess"
        :on-change="onChange"
        ref="uploadRef"
        v-bind="$attrs"
        v-loading="loading">
        <el-icon>
            <Plus />
        </el-icon>
        <div class="text">或拖至此处上传</div>

        <template #file="{ file }">
            <div class="file-con">
                <img
                    v-if="file.raw.type.includes('image')"
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt="" />
                <img
                    v-if="file.raw.type.includes('pdf')"
                    class="el-upload-list__item-thumbnail_file"
                    :src="pdfimg"
                    alt="" />
                <img
                    v-if="file.raw.type.includes('word')"
                    class="el-upload-list__item-thumbnail_file"
                    :src="wordimg"
                    alt="" />
                <img
                    v-if="file.raw.type.includes('excel')"
                    class="el-upload-list__item-thumbnail_file"
                    :src="excel_img"
                    alt="" />
                <video
                    v-if="file.raw.type.includes('video')"
                    :src="file.url"
                    controls></video>
                <div
                    v-if="
                        file.raw.type.includes('pdf') ||
                        file.raw.type.includes('word') ||
                        file.raw.type.includes('excel')
                    "
                    class="file-name"
                    :title="file.name"
                    @click="downFile(file.url)">
                    {{ file.name }}
                </div>
                <el-icon @click="handleRemove(file)">
                    <Close />
                </el-icon>
            </div>
        </template>
    </el-upload>
</template>
<script setup>
import { computed, watch, ref } from 'vue'
import { Plus, Close } from '@element-plus/icons-vue'
import pdfimg from '@/assets/img/pdf_img.png'
import wordimg from '@/assets/img/word_img.png'
import excel_img from '@/assets/img/excel_img.png'
import { upFile } from '@/api/common'

const props = defineProps({
    limit: {
        type: [Number, Boolean],
        default: 1
    },
    fileList: {
        type: Array,
        default: undefined
    },
    fileId: {
        type: [Array, String]
    }
})

const emits = defineEmits(['update:fileList', 'update:fileId'])

const localFileList = ref([])
const loading = ref(false)

const bindFileList = computed({
    get() {
        if (Array.isArray(props.fileList)) {
            return props.fileList
        } else {
            return localFileList.value
        }
    },
    set(v) {
        emits('update:fileList', v)
        localFileList.value = v
    }
})

watch(
    bindFileList,
    () => {
        const codes = bindFileList.value.map((item) => item.fileCode)
        if (props.limit) {
            emits('update:fileId', codes[0] || undefined)
        } else {
            emits('update:fileId', codes)
        }
    },
    { deep: true }
)

function uploadFile(file) {
    loading.value = true
    const data = new FormData()
    data.append('file', file.file)
    data.append('fileSource', 'drsp')
    return upFile(data)
        .then((res) => {
            return res
        })
        .finally(() => {
            loading.value = false
        })
}

function onSuccess(response, uploadFile) {
    if (response.message?.fileId) {
        uploadFile.fileId = response.message?.fileId
        uploadFile.url = response.message?.relativeUrl
    }
}

function onChange() {
    // console.log(e)
}

const uploadRef = ref()
function handleRemove(file) {
    uploadRef.value.handleRemove(file)
    // const fileCode = file.fileCode
    // const newFileList = bindFileList.value.filter((el) => el.fileCode !== fileCode)
    // localFileList.value = newFileList
    // emits('update:fileList', newFileList)
}
</script>
<script>
export default {
    name: 'qc-upload'
}
</script>
<style lang="less" scoped>
:deep(.el-upload--picture-card) {
    width: 120px;
    height: 148px;
    flex-direction: column;

    .text {
        font-size: 12px;
        color: #cbd8e2;
        margin-top: 16px;
    }
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
    width: 120px;
    height: 148px;
}

.el-upload-list__item-thumbnail_file {
    width: 48px;
}

video {
    width: 100%;
    height: 100%;
}

.file-con {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

    //   position: relative;
    .file-name {
        text-align: center;
        font-size: 14px;
        margin-top: 6px;
        color: #818e9b;
        line-height: 14px;
        width: 100%;
    }

    .el-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #99a6b7;
        cursor: pointer;
    }
}
</style>
