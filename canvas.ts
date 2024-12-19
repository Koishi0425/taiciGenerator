const imageUpload = document.getElementById('imageUpload') as HTMLInputElement;
const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
const fontSizeInput = document.getElementById('fontSize') as HTMLInputElement;
const downloadBtn = document.getElementById('downloadBtn') as HTMLButtonElement;
const canvas = document.getElementById('imageCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let uploadedImage: HTMLImageElement | null = null;

document.addEventListener('DOMContentLoaded', () => {
    // 处理图片上传
    imageUpload.addEventListener('change', (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evevt) => {
                uploadedImage = new Image();
                uploadedImage.src = evevt.target?.result as string;
                uploadedImage.onload = () => {
                    // console.log("图片加载成功");
                    if (uploadedImage) { // 显式检查 uploadedImage 是否为 null
                        drawImageWithText();
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    });

    textInput.addEventListener('input', () => {
        drawImageWithText();
    });

    fontSizeInput.addEventListener('input', () => {
        drawImageWithText();   
    });
    
    // 下载图片
    downloadBtn.addEventListener('click', () => {
        if (canvas.width && canvas.height) {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');  // 使用原始尺寸的画布数据
            link.download = 'generated_image.png';
            link.click();
        }
    });    
});

function drawImageWithText() {
    if (uploadedImage) {
        const text = textInput.value.trim().split('\n').filter(line => line.trim() !== '');
        const fontSize = parseInt(fontSizeInput.value) || 24;
        // console.log("Font size: ", fontSize);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        // 计算文字每行宽度和高度，宽度取最大宽度
        const lineWidth = ctx.measureText(text.join(' ')).width;
        const lineHeight = fontSize * 1.8;

        // 计算图片需要扩展的行数（除第一行外）
        const additionalLines = text.length > 1 ? text.length - 1 : 0;
        const repeatHeight = additionalLines * lineHeight;  // 计算图片需要扩展的高度

        // 计算图片扩展后的高度和宽度，宽度取源图片宽度和最大宽度比较
        const originalWidth = uploadedImage.width;
        const originalHeight = uploadedImage.height;
        const newHeight = originalHeight + repeatHeight;
        const newWidth = Math.max(lineWidth, uploadedImage.width);

        // 设置画布尺寸
        // 获取设备像素比
        const ratio = window.devicePixelRatio || 1;
        canvas.width = newWidth * ratio;
        canvas.height = newHeight * ratio;
        ctx.scale(ratio, ratio);  // 处理高 DPI

        // console.log("Canvas size: ", newWidth, newHeight); 

        // 绘制图片
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(uploadedImage, 0, 0, originalWidth, originalHeight);

        // 对额外高度重复绘制原图片底部内容
        if (additionalLines > 0) {
            for (let i = 0; i <= additionalLines; i++) {
                const y = originalHeight + i * lineHeight;

                ctx.drawImage(
                    uploadedImage,
                    0,
                    originalHeight - lineHeight, // 重复绘制的起始位置
                    originalWidth,
                    lineHeight, // 重复绘制的高度
                    0,
                    y, // 重复绘制的目标位置
                    newWidth,
                    lineHeight // 重复绘制的宽度
                );
            }
        }
        ctx.font = `${fontSize}px Arial`;
        ctx.strokeStyle = 'black';
        // console.log("Font size:", ctx.font); // 查看当前的字体设置
        // 绘制文字
        const padding = fontSize * 0.5;
        text.forEach((line, index) => {
            const x = newWidth / 2 - ctx.measureText(line).width / 2;
            let y: number;

            if (index === 0) {
                y = originalHeight - padding;
            } else {
                y = originalHeight + index * lineHeight - padding;
            }
            ctx.fillText(line, x, y);
            ctx.strokeText(line, x, y);
        });
    }
}