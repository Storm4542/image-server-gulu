export default {
    data() {
        return {
            crap: false,
            previews: {},
            option: {
                img: 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png',
                size: 1,
                full: false, //输出原图比例截图 props名full
                outputType: 'png',
                canMove: true,
                original: false,
                canMoveBox: true,
                autoCrop: true,
                autoCropWidth: 200,
                autoCropHeight: 200,
                fixedBox: true
            },
            downImg: '#',
        };
    },
    methods: {
        changeScale(num) {
            num = num || 1 this.$refs.cropper.changeScale(num)
        },
        rotateLeft() {
            this.$refs.cropper.rotateLeft()
        },
        rotateRight() {
            this.$refs.cropper.rotateRight()
        },
        finish(type) { // 输出 
            var test = window.open('about:blank')
            test.document.body.innerHTML = '图片生成中..'
            if (type === 'blob') {
                this.$refs.cropper.getCropBlob((data) => {
                    var img = window.URL.createObjectURL(data)
                    this.model = true this.modelSrc = img
                })
            } else {
                this.$refs.cropper.getCropData((data) => {
                    this.model = true this.modelSrc = data
                })
            }
        },
        //实时预览函数
        realTime(data) {
            this.previews = data
        },
        down(type) {
            event.preventDefault()
            var aLink = document.createElement('a')
            aLink.download = 'author-img';
            //输出
            if (type === 'blob') {
                this.$refs.cropper.getCropBlob((data) => {
                    console.log(data) this.downImg = window.URL.createObjectURL(data) aLink.download = this.downImg;
                    console.log(this.downImg) aLink.href = window.URL.createObjectURL(data) aLink.click()
                })
            } else {
                this.$refs.cropper.getCropData((data) => {
                    this.downImg = data aLink.href = data aLink.click()
                })
            }
        },
        uploadImg(e, num) {
            //上传图片 this.option.img
            var file = e.target.files[0]
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种') return false
            }
            var reader = new FileReader() reader.onload = (e) => {
                let data
                if (typeof e.target.result === 'object') { // 把Array Buffer转化为blob 如果是base64不需要 
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                } else {
                    data = e.target.result
                }
                if (num === 1) {
                    this.option.img = data
                } else if (num === 2) {
                    this.example2.img = data
                }
            }
            // 转化为base64 
            // reader.readAsDataURL(file)
            // 转化为blob 
            reader.readAsArrayBuffer(file)
        },
        imgLoad(msg) {
            console.log(msg)
        }
    },
    components: {
        VueCropper
    },
}