import FileSaver from 'file-saver'
import image from '@/assets/img/fileType/image.png'
import excel from '@/assets/img/fileType/excel.png'
import folder from '@/assets/img/fileType/folder.png'
import other from '@/assets/img/fileType/other.png'
import pdf from '@/assets/img/fileType/pdf.png'
import ppt from '@/assets/img/fileType/ppt.png'
import video from '@/assets/img/fileType/video.png'
import word from '@/assets/img/fileType/word.png'

const fileTypeImg = [
    {
        type: 'image/png,image/jpg,image/jpeg,svg',
        img: image
    },
    {
        type: 'xls,xlsx',
        img: excel
    },
    {
        type: 'doc,docx',
        img: word
    },
    {
        type: 'pdf',
        img: pdf
    },
    {
        type: 'files',
        img: folder
    },
    {
        type: 'ppt,pptx',
        img: ppt
    },
    {
        type: 'mp3,mp4,avi,dat,mkv,flv,vob',
        img: video
    }
]
// 根据类型返回图片
export const typeToImg = (el) => {
    let type = ''
    if (el.fileType) {
        const suffix = el.fileUrl.split('.')
        type = suffix[suffix.length - 1]
    } else {
        type = 'files'
    }
    const filter = fileTypeImg.find((cl) => cl.type.includes(type))
    return filter ? filter.img : other
}
export const dnLoadMultipleFiles = (urls) => {
    if (typeof urls !== 'object' || urls.length === 0) return
    urls.forEach((item) => {
        FileSaver.saveAs(item.url, item.name.split('.')[0])
    })
}
