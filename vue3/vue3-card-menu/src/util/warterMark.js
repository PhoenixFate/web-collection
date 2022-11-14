//创建水印(参数依次为，水印文字内容，选择器，偏转角度，字体颜色)
export function createWatemark({
    text = '水印',
    selectors = 'body',
    rotate = -14,
    color = 'rgba(144,147,153,0.1)'
} = {}) {
    let can = document.createElement('canvas');
    let body = document.body;
    let nodes = document.querySelectorAll(selectors);
    body.appendChild(can);
    // can.width = text.length * 60;
    // can.height = text.length * 60;
    can.width = 600;
    can.height = 600;
    can.style.display = 'none';
    let cans = can.getContext('2d');
    // 弧度偏转
    cans.rotate(rotate * Math.PI / 180);
    cans.font = "16px PingFang SC";
    cans.fontWeight = '400';
    cans.fontFamily = '-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Roboto,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol!important;'
    cans.fillStyle = color;
    cans.fillText(text, 0, can.height / 2);
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].style.backgroundImage = "url(" + can.toDataURL("image/png") + ")" + ",url(" + can.toDataURL("image/png") + ")";
        nodes[i].style.backgroundPosition = '420px 420px,0px 0px'
    }
}