(async function(document, window) {
    'use strict'

    let angle = 12;
    const scale = .7;
    const canvasWidth = 800;
    const canvasHeight = 600;
    const img = new Image();
    const degToRad = deg => deg * (Math.PI / 180);
    img.src = 'cat.jpg';
    await new Promise(resolve => img.onload = resolve);

    const canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = img.width;
    sourceCanvas.height = img.height;
    const targetWidth = Math.floor(sourceCanvas.width * scale);
    const targetHeight = Math.floor(sourceCanvas.height * scale);
    const xc = targetWidth / 2;
    const yc = targetHeight / 2; 
    const sourceCtx = sourceCanvas.getContext('2d');
    sourceCtx.drawImage(img, 0, 0);
    const sourceImageData = sourceCtx.getImageData(0, 0, img.width, img.height);

    const clearCanvas = () => {
        for (let i = 0; i < canvasWidth * canvasHeight * 4; i++) {
            imgData.data[i] = 255;
        }
    }

    const getRotation = (x, y, angle) => {
        return {
            x: Math.floor((x - xc) * Math.cos(angle) - (y - yc) * Math.sin(angle) + xc),
            y: Math.floor((x - xc) * Math.sin(angle) + (y - yc) * Math.cos(angle) + yc)
        }
    };

    const plotPixel = (x, y, { r, g, b }) => {
        const base = (x + (y * canvasWidth)) * 4;
        imgData.data[base + 0] = r;
        imgData.data[base + 1] = g;
        imgData.data[base + 2] = b;
        imgData.data[base + 3] = 255; // Math.floor(Math.random() * 255);
    };

    const sampleColor = (x, y) => {
        // Scale the coordinates down
        const sx = Math.floor((x / targetWidth) * sourceCanvas.width);
        const sy = Math.floor((y / targetHeight) * sourceCanvas.height);
        const base = (sx + (sy * sourceCanvas.width)) * 4;

        return {
            r: sourceImageData.data[base + 0],
            g: sourceImageData.data[base + 1],
            b: sourceImageData.data[base + 2],
            a: sourceImageData.data[base + 3]
        }
    };

    // let's draw a square.
    let last = new Date();
    const main = (loop = true) => {
        const now = new Date();
        const timeElapsed = now - last;
        const angleInRad = degToRad(angle);

        if (timeElapsed > 10) {
            angle = (angle + 1) % 360;
            last = now;
        }

        clearCanvas();

        // Iterate over the pixels with twice the granularity to avoid "gaps"
        for (let j = 0; j < targetHeight * 2; j++) {
            for (let i = 0; i < targetWidth * 2; i++) {
                const { x, y } = getRotation(i / 2, j / 2, angleInRad);
                const color = sampleColor(i / 2, j / 2);
                plotPixel(50 + x, 80 + y, color); // { r: 255, g: 0, b: 0 });
            }
        };

        ctx.putImageData(imgData, 0, 0);
        if (loop) window.requestAnimationFrame(main);
    }

    main();
})(document, window);