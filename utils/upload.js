export function chooseImage() {
  let that = this
  uni.chooseImage({
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    count: 9,//默认9
    success: (rem) => {
      that.tempFilePaths = rem.tempFilePaths;
      that.weixin_img(0, rem)
    }
  })
}
export function weixin_img(num, rem) {
  let that = this
  wx.getImageInfo({//获取这个图片 图片压缩
    src: rem.tempFiles[num].path,//需要获取的图片 图片选择不用我说了吧
    success: function (res) {
      var ctx = wx.createCanvasContext('attendCanvasId');//使用一个canvas
      var canvasWidth = res.width//原图宽度 
      var canvasHeight = res.height;//原图高度
      var ratio = 2;
      // 保证宽高均在200以内
      while (canvasWidth > 200 || canvasHeight > 200) {
        //比例取整
        canvasWidth = Math.trunc(res.width / ratio)
        canvasHeight = Math.trunc(res.height / ratio)
        ratio++;
      }
      //绘制新图
      ctx.drawImage(rem.tempFiles[num].path, 0, 0, canvasWidth, canvasHeight)
      ctx.draw(false, () => {
        //获取图像数据， API 1.9.0
        wx.canvasGetImageData({
          canvasId: 'attendCanvasId',
          x: 0,
          y: 0,
          width: canvasWidth,
          height: canvasHeight,
          success: (res) => {
            let platform = wx.getSystemInfoSync().platform
            if (platform == 'ios') {
              // 兼容处理：ios获取的图片上下颠倒
              res = that.reverseImgData(res)
            }
            // 3. png编码
            let pngData = upng.encode([res.data.buffer], canvasWidth, canvasHeight)
            // 4. base64编码
            let base64 = wx.arrayBufferToBase64(pngData)
            // console.log('1111','data:image/jpeg;base64,'+base64)
            rem.tempFiles[num].Base64_Path = base64
            that.materialList = that.materialList.concat(rem.tempFiles[num]);
            //利用递归循环来实现多张图片压缩
            if (num == rem.tempFiles.length - 1) {
              return
            } else {
              that.weixin_img(num + 1, rem)
            }
            console.log('end', that.materialList)
          }
        })
      })
    },
  })


}
// 兼容处理：ios获取的图片上下颠倒
export function reverseImgData(res) {
  var w = res.width
  var h = res.height
  let con = 0
  for (var i = 0; i < h / 2; i++) {
    for (var j = 0; j < w * 4; j++) {
      con = res.data[i * w * 4 + j]
      res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j]
      res.data[(h - i - 1) * w * 4 + j] = con
    }
  }
  return res
}
