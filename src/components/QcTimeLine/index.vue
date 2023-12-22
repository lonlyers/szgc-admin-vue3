<template>
    <div class="time-line">
        <div
            class="item"
            v-for="(item, id) in props.stepList"
            :key="id">
            <div class="left">
                <slot
                    name="left-con"
                    :data="item"
                    :id="id"></slot>
            </div>
            <div class="center">
                <div class="line"></div>
                <div class="status-box">
                    <el-icon><Select /></el-icon>
                </div>
            </div>
            <div class="right">
                <slot
                    name="right-con"
                    :data="item"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    stepList: {
        type: Array,
        default: () => []
    }
})
</script>
<script>
export default {
    name: 'TimeLine'
}
</script>

<style lang="less" scoped>
.time-line {
    margin-top: 37px;
    // background-color: #f4f5f9;/
    .item {
        display: flex;
        justify-content: space-between;
        .left {
            width: 86px;
            text-align: right;
            margin-right: 14px;
        }
        .center {
            width: 43px;
            position: relative;

            .line {
                height: 100%;
                width: 1px;
                background-color: #dee1ed;
                margin: 0 auto;
            }

            .status-box {
                position: absolute;
                width: 22px;
                height: 22px;
                text-align: center;
                padding-top: 3px;
                color: #fff;
                background-image: linear-gradient(180deg, #547dfb 0%, #2952d0 100%);
                box-shadow: 0px 2px 10px 0px rgba(41, 82, 208, 0.25);
                border-radius: 50%;
                // background-color: #17bb87;
                top: 0px;
                left: 50%;
                transform: translateX(-50%);
            }
        }

        .right {
            flex: 1;
            padding-bottom: 64px;
        }
    }

    .item:last-child {
        .line {
            opacity: 0;
        }
    }
}
</style>
