import styles from './Canvas.module.scss';
import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

export default function Canvas(props) {

    useEffect(() => {
        setUpCanvas();
    }, []);

    const svgPath = "M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z";


    function setUpCanvas() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.save();

        //Draw Canvas background
        ctx.fillStyle = '#FFB3B7';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawQuoteMarks(ctx);
        drawTitle(canvas,ctx);
        drawText(ctx);
    };

    function drawQuoteMarks(ctx) {
        ctx.fillStyle = '#ffdadb';

        ///////// Draw the quotemarks
        let quote1 = new Path2D(svgPath);
        let quote2 = new Path2D(svgPath);

        // Size of the quotemarks
        const SCALE_VALUE = 10;

        // Draw 1st quotemark
        ctx.translate(260, 350);

        ctx.rotate((Math.PI / 180) * 180);
        ctx.scale(SCALE_VALUE, SCALE_VALUE);
        ctx.fill(quote1);

        // Restore the previous rotation & scale
        ctx.scale(1 / SCALE_VALUE, 1 / SCALE_VALUE);
        ctx.rotate(-(Math.PI / 180) * 180);

        // Draw 2nd quotemark
        ctx.translate(50, 0);

        ctx.scale(SCALE_VALUE, SCALE_VALUE);
        ctx.fill(quote2);

        // Restore the context
        ctx.restore();
    }

    function drawTitle(canvas, ctx){
        ctx.save();

        const title = "#NosRetraites";

        

        ctx.font = 'bold 40pt Roboto Slab';

        var metrics = ctx.measureText(title);

        // ctx.translate();
        ctx.fillStyle = 'white';
        console.log(metrics);
        ctx.fillRect(canvas.width/2 - metrics.width/2,85, metrics.width, 30);

        ctx.restore();
        ctx.save();

        ctx.fillStyle = '#505D75';
        ctx.font = 'bold 40pt Roboto Slab';
        ctx.textAlign = 'center';

        // ctx.translate(canvas.width/2,100);
        ctx.fillText(title,canvas.width/2,100);


        ctx.restore();
        ctx.save();
    }

    function drawText(ctx){
        ctx.save();

        ctx.font = 'bold 30pt Roboto Slab';
        ctx.fillStyle = '#505D75';

        var maxWidth = 500;
        var lineHeight = 45;
        var x = 50;
        var y = 200;
        const text = "Actuellement, si je travaille jusqu'à 65 ans, j'aurais une surcote de 8%. Avec la réforme, je perdrais cette surcote.";

        wrapText(ctx,text, x, y, maxWidth, lineHeight);
        ctx.restore();
        ctx.save();
    }


    function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        ctx.fillText(line, x, y);
      }


    return (
        <>
        <canvas width="600px" height="600px" className={styles.Canvas} id="canvas"></canvas>
        </>
    )
}