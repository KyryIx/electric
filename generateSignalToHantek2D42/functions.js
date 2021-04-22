// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Clean CANVAS                                    * //
// ************************************************************** //
function clear( canvasID ){
	for( var i=0; i<canvasID.length; i++ ){
		var cwidth  = window.document.getElementById( canvasID[i] ).width;
		var cheight = window.document.getElementById( canvasID[i] ).height;
		var cxt = window.document.getElementById( canvasID[i] ).getContext( '2d' );
		cxt.clearRect( 0, 0, cwidth, cheight );
		cxt.beginPath();
	}
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Draw rect segment                                * //
// ************************************************************** //
function drawSegment( canvasID, x1, y1, x2, y2, color, linewidth ){
	var cxt = window.document.getElementById( canvasID ).getContext( '2d' );
	cxt.beginPath();
	cxt.strokeStyle = color;
	cxt.lineWidth = linewidth;
	cxt.moveTo( x1, y1 );
	cxt.lineTo( x2, y2 );
	cxt.closePath();
	cxt.stroke();
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION: Draw text                                        * //
// ************************************************************** //
function drawText( canvasID, string, x1, y1, fontsize, fillcolor, linecolor, linewidth ){
	var cxt = window.document.getElementById( canvasID ).getContext( "2d" );
	cxt.lineWidth = linewidth;
	cxt.fillStyle = fillcolor;
	cxt.lineStyle = linecolor;
	cxt.font = 'italic ' + fontsize + 'px Times';
	cxt.fillText( string, x1, y1 );
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Draw circle                                     * //
// ************************************************************** //
function drawCircle( canvasID, x, y, radius, fillcolor, linecolor, linewidth ){
	var cxt         = window.document.getElementById( canvasID ).getContext( "2d" );
	cxt.beginPath();
	cxt.fillStyle   = fillcolor;
	cxt.strokeStyle = linecolor;
	cxt.lineWidth   = linewidth;
	cxt.arc( x, y, radius, 0, 2*Math.PI, true );
	cxt.fill();
	cxt.closePath();
	cxt.stroke();
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Draw axis                                        * //
// ************************************************************** //
function drawAxis( canvasID, x1, y1, x2, y2, color, linewidth ){
	var x0 = parseInt((x1+x2)/2.0);
	var y0 = parseInt((y1+y2)/2.0);
	// x axis //
	drawSegment( canvasID, x1, y0,   x2,   y0, color, linewidth );
	drawSegment( canvasID, x2, y0, x2-5, y0-5, color, linewidth );
	drawSegment( canvasID, x2, y0, x2-5, y0+5, color, linewidth );
	drawText( canvasID, 'x', x2-2, parseInt((y2+y1)/2.0)+14, 12, '#000000', '#000000', 1 );
	// y axis //
	drawSegment( canvasID, x0, y1,   x0,   y2, color, linewidth );
	drawSegment( canvasID, x0, y1, x0-5, y1+5, color, linewidth );
	drawSegment( canvasID, x0, y1, x0+5, y1+5, color, linewidth );
	drawText( canvasID, 'y', x0+7, 12, 12, '#000000', '#000000', 1 );
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Conversion pixel value to real value            * //
// ************************************************************** //
function convertPixel2RealAxesX( valuePixel, lowRealValue, highRealValue, lowPixelValue, highPixelValue ){
// ************************************************************** //
//                                                                //
//  xR    => value real                                           //
//  xP    => value pixel                                          //
//  lowX  => value min to interval real                           //
//  highX => value max to interval real                           //
//  lowP  => value min to interval pixel                          //
//  highP => value max to interval pixel                          //
//                                                                //
//      lowX                0                    highX            //
//      |------------------ xR ------------------|                //
//                                                                //
//      lowP                                     high_p           //
//      |------------------ xP ------------------|                //
//                                                                //
//                xR - lowX      xP - lowP                        //
//              ------------ = ------------                       //
//              highX - lowX   highP - lowP                       //
//                                                                //
//  xR = (highX - lowX)*(xP - lowP)/(highP - lowP) + lowX         //
//                                                                //
// ************************************************************** //
	return (highRealValue - lowRealValue)*(valuePixel - lowPixelValue)/(highPixelValue - lowPixelValue) + lowRealValue;
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Conversion real value to pixel value            * //
// ************************************************************** //
function convertReal2PixelAxesY( valueReal, lowRealValue, highRealValue, lowPixelValue, highPixelValue ){
// ************************************************************** //
//                                                                //
//  yR    => value real                                           //
//  yP    => value pixel                                          //
//  lowY  => value min to interval real                           //
//  highY => value max to interval real                           //
//  lowP  => value min to interval pixel                          //
//  highP => value max to interval pixel                          //
//                                                                //
//           --- highY                    --- lowP                //
//            |                            |                      //
//            |                            |                      //
//            |                            |                      //
//            yR   0                       yP                     //
//            |                            |                      //
//            |                            |                      //
//            |                            |                      //
//           --- lowY                    --- highP                //
//                                                                //
//                    yR - lowY     yP - highP                    //
//                  ------------ = ------------                   //
//                  highY - lowY   lowP - highP                   //
//                                                                //
// yP = (lowP - highP)*(yR - lowY)/(highY - lowY) + highP         //
//                                                                //
// ************************************************************** //
	return parseInt( (lowPixelValue - highPixelValue)*(valueReal - lowRealValue)/(highRealValue - lowRealValue) + highPixelValue );
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Functions                                       * //
// ************************************************************** //
function functions(){
	var myWindow = window.open( "", "MsgWindow", "width=320, height=240" );
	myWindow.document.write( "<p><b>x+y</b> 		Returns the value of x add y</p>" );
	myWindow.document.write( "<p><b>x-y</b> 		Returns the value of x subtract y</p>" );
	myWindow.document.write( "<p><b>x*y</b> 		Returns the value of x multiply y</p>" );
	myWindow.document.write( "<p><b>x/y</b> 		Returns the value of x divide y</p>" );
	myWindow.document.write( "<p><b>x^y</b> 		Returns the value of x to the power of y</p>" );
	myWindow.document.write( "<p><b>~x</b> 		    Returns the value of NOT x</p>" );
	myWindow.document.write( "<p><b>x&y</b> 		Returns the value of x AND y</p>" );
	myWindow.document.write( "<p><b>x|y</b> 		Returns the value of x OR y</p>" );
	
	myWindow.document.write( "<p><b>abs(x)</b>		Returns the absolute value of x</p>" );
	myWindow.document.write( "<p><b>acos(x)</b> 	Returns the arccosine of x, in radians</p>" );
	myWindow.document.write( "<p><b>asin(x)</b> 	Returns the arcsine of x, in radians</p>" );
	myWindow.document.write( "<p><b>atan(x)</b> 	Returns the arctangent of x as a numeric value between -PI/2 and PI/2 radians</p>" );
	myWindow.document.write( "<p><b>atan2(y,x)</b> 	Returns the arctangent of the quotient of its arguments</p>" );
	myWindow.document.write( "<p><b>ceil(x)</b> 	Returns x, rounded upwards to the nearest integer</p>" );
	myWindow.document.write( "<p><b>cos(x)</b>		Returns the cosine of x (x is in radians)</p>" );
	myWindow.document.write( "<p><b>cosh(x)</b>		Returns the hyperbolic cosine of x</p>" );
	myWindow.document.write( "<p><b>exp(x)</b>		Returns the value of Ex</p>" );
	myWindow.document.write( "<p><b>floor(x)</b> 	Returns x, rounded downwards to the nearest integer</p>" );
	myWindow.document.write( "<p><b>log(x)</b>		Returns the natural logarithm (base E) of x</p>" );
	myWindow.document.write( "<p><b>log(x,b)</b>	Returns the logarithm of x in base b</p>" );
	myWindow.document.write( "<p><b>max(x,y,z,...,n)</b> Returns the number with the highest value</p>" );
	myWindow.document.write( "<p><b>min(x,y,z,...,n)</b> Returns the number with the lowest value</p>" );
	myWindow.document.write( "<p><b>PI</b>			Returns the ratio of a circle's area to the square of its radius, approximately 3.14</p>" );
	myWindow.document.write( "<p><b>pow(x,y)</b> 	Returns the value of x to the power of y</p>" );
	myWindow.document.write( "<p><b>random()</b> 	Returns a random number between 0 and 1</p>" );
	myWindow.document.write( "<p><b>random(max)</b>	Returns a random number between 0 and max</p>" );
	myWindow.document.write( "<p><b>random(min,max)</b>	Returns a random number between min and max</p>" );
	myWindow.document.write( "<p><b>round(x)</b> 	Rounds x to the nearest integer</p>" );
	myWindow.document.write( "<p><b>round(x,n)</b> 	Rounds x to the nearest integer, where n is number of decimals</p>" );
	myWindow.document.write( "<p><b>sin(x)</b> 		Returns the sine of x (x is in radians)</p>" );
	myWindow.document.write( "<p><b>sinh(x)</b> 	Returns the hyperbolic sine of x</p>" );
	myWindow.document.write( "<p><b>sqrt(x)</b> 	Returns the square root of x</p>" );
	myWindow.document.write( "<p><b>tan(x)</b> 		Returns the tangent of an angle</p>" );
	myWindow.document.write( "<p><b>tanh(x)</b> 		Returns the hyperbolic tangent of x</p>" );
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Treatment of expression math                    * //
// ************************************************************** //
function evalExpression( expression, value ){
	try{
		return math.eval( expression, {x:value} );
	}
	catch(err){
		return 0.0;
	}
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Draw curve                                      * //
// ************************************************************** //
function drawCurve( canvasID, expression, limRealX, limRealY, limPixelX, limPixelY, color, linewidth ){
	var realXLow   = limRealX[0];
	var realXHigh  = limRealX[1];
	var realYLow   = limRealY[0];
	var realYHigh  = limRealY[1];
	
	var pixelXLow  = limPixelX[0];
	var pixelXHigh = limPixelX[1];
	var pixelYLow  = limPixelY[0];
	var pixelYHigh = limPixelY[1];
	
	var xP1 = pixelXLow;
	var x   = convertPixel2RealAxesX( xP1, realXLow, realXHigh, pixelXLow, pixelXHigh );
	var y   = evalExpression( expression, x );
	var yP1 = convertReal2PixelAxesY( y, realYLow, realYHigh, pixelYLow, pixelYHigh );
	
	var xPn, yPn, xP2, yP2;
	var limitPixel = pixelXHigh;
	
	for( var xPn = pixelXLow; xPn <= limitPixel; xPn++ ){
		x   = convertPixel2RealAxesX( xPn, realXLow, realXHigh, pixelXLow, pixelXHigh );
		y   = evalExpression( expression, x );
		yPn = convertReal2PixelAxesY( y, realYLow, realYHigh, pixelYLow, pixelYHigh );
		xP2 = xPn;
		yP2 = yPn;
		
		drawSegment( canvasID, xP1, yP1, xP2, yP2, color, linewidth );
		xP1 = xP2;
		yP1 = yP2;
	}
}

function drawPoint( canvasID, expression, xPixel, limRealX, limRealY, limPixelX, limPixelY, color, radius ){
	clear( [canvasID] );
	
	var x  = convertPixel2RealAxesX( xPixel, limRealX[0], limRealX[1], limPixelX[0], limPixelX[1] );
	var y  = evalExpression( expression, x );
	var yP = convertReal2PixelAxesY( y, limRealY[0], limRealY[1], limPixelY[0], limPixelY[1] );
	
	drawCircle( canvasID, xPixel, yP, radius, color, color, '1' );
}

// ************************************************************** //
// * DEVELOPER: https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server/18197341#18197341?newreg=d42f55ec6dac4d308a47cca810425c22 * //
// *            Adapted by Everton Pereira da Cruz
// * FUNCTION:  Generate contents to DDS-3X25                   * //
// ************************************************************** //
function download( filename, string ){
	var element_temp = window.document.createElement( 'a' );
	element_temp.setAttribute( 'href', 'data:text/csv;charset=utf-8,' + encodeURIComponent( string ) );
	element_temp.setAttribute( 'download', filename );
	element_temp.style.display = 'none';
	window.document.body.appendChild( element_temp );
	element_temp.click();
	window.document.body.removeChild( element_temp );
}
			
// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Generate contents to Hantek2D42                 * //
// ************************************************************** //
function generateFile( expressionFieldId, frequencyFieldId, voltagePeekFieldId, filename ){
	var expression  = window.document.getElementById( expressionFieldId ).value;
	var frequency   = parseInt( window.document.getElementById( frequencyFieldId ).value );
	var voltagePeek = parseFloat( window.document.getElementById( voltagePeekFieldId ).value );
	
	var result      = '';
	result         += 'SIZE:,' + quantPoints + '\r\n';
	result         += 'FREQ(Hz):,' + frequency + '\r\n';
	result         += 'Vpp(V):,' + voltagePeek + '\r\n';
	result         += 'Index,Value(-1.0---1.0)' + '\r\n';
	
	var values      = [];
	
	var xTemp, yTemp;
	for( var i=0; i<quantPoints; i++ ){
		xTemp = limLowerX + deltaX * i;
		try{
			// https://mathjs.org/
			//yTemp = math.eval( expression, {x:xTemp} ).toFixed(6);
			yTemp = math.eval( expression, {x:xTemp} );
			
			if( yTemp < limLowerY ){
				yTemp = limLowerY;
			}
			else if( yTemp > limUpperY ){
				yTemp = limUpperY;
			}
		}
		catch(err){
			yTemp = 0.0;
		}
		
		values.push( yTemp );
		
	}
	
	var max = values.reduce( function(a, b) {
		return Math.max(a, b);
	});
	var min = values.reduce( function(a, b) {
		return Math.min(a, b);
	});
	
	var greastValue = Math.max( Math.abs(max), Math.abs(min) );
	
	for( var i=0; i<quantPoints; i++ ){
		result += i + ',' + (values[i] / greastValue).toFixed(6) + ',\r\n';
	}
	
	download( filename + '.csv', result );
}