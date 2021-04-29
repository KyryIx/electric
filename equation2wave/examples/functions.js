var offset         = 5; // pixel
				   
var idExpression   = 'expression';
var idMinXvalue    = 'minXvalue';
var idMaxXvalue    = 'maxXvalue';
var idMinYvalue    = 'minYvalue';
var idMaxYvalue    = 'maxYvalue';
var idMyCanvas     = 'myCanvas';
var idDuration     = 'duration';
var idFilename     = 'filename';

var idCanvasWidth  = 'widthCanvasValue';
var idCanvasHeight = 'heightCanvasValue';

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Treatment of expression math                    * //
// ************************************************************** //
function evalExpression( expression, value ){
	try{
		return math.evaluate( expression, {x:value} );
	}
	catch(err){
		return 0.0;
	}
}

////////////////////////////////////////////////////////////////////
// ************************************************************** //
// *                                                            * //
// *                       +------------+                       * //
// *                       |   AXES X   |                       * //
// *                       +------------+                       * //
// *                                                            * //
// * xR    => value real                                        * //
// * xP    => value pixel                                       * //
// * lowR  => value min to interval real                        * //
// * highR => value max to interval real                        * //
// * lowP  => value min to interval pixel                       * //
// * highP => value max to interval pixel                       * //
// *                                                            * //
// *     lowR                                     highR         * //
// *     |------------------ xR ------------------|             * //
// *                                                            * //
// *     lowP                                     highP         * //
// *     |------------------ xP ------------------|             * //
// *                                                            * //
// *               xR - lowR      xP - lowP                     * //
// *             ------------ = ------------                    * //
// *             highR - lowR   highP - lowP                    * //
// *                                                            * //
// * xR = (highR - lowR)*(xP - lowP)/(highP - lowP) + lowR      * //
// *                                                            * //
// * xP = (highP - lowP)*(xR - lowR)/(highR - lowR) + lowP      * //
// *                                                            * //
// *                       +------------+                       * //
// *                       |   AXES Y   |                       * //
// *                       +------------+                       * //
// *                                                            * //
// * yR    => value real                                        * //
// * yP    => value pixel                                       * //
// * lowR  => value min to interval real                        * //
// * highR => value max to interval real                        * //
// * lowP  => value min to interval pixel                       * //
// * highP => value max to interval pixel                       * //
// *                                                            * //
// *          --- highR                    --- lowP             * //
// *           |                            |                   * //
// *           |                            |                   * //
// *           |                            |                   * //
// *           yR                           yP                  * //
// *           |                            |                   * //
// *           |                            |                   * //
// *           |                            |                   * //
// *          --- lowR                    --- highP             * //
// *                                                            * //
// *                   yR - lowR     yP - highP                 * //
// *                 ------------ = ------------                * //
// *                 highR - lowR   lowP - highP                * //
// *                                                            * //
// * yR = (highR - lowR)*(yP - highP)/(lowP - highP) + lowR     * //
// *                                                            * //
// * yP = (lowP - highP)*(yR - lowR)/(highR - lowR) + highP     * //
// *                                                            * //
// ************************************************************** //
////////////////////////////////////////////////////////////////////

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Conversion real value to pixel value            * //
// ************************************************************** //
function convertREAL2PIXELaxesX( value, lowReal, highReal, lowPixel, highPixel ){
	return ((highPixel - lowPixel)*(value - lowReal)/(highReal - lowReal) + lowPixel) | 0;
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Conversion pixel value to real value            * //
// ************************************************************** //
function convertPIXEL2REALaxesX( value, lowReal, highReal, lowPixel, highPixel ){
	return (highReal - lowReal)*(value - lowPixel)/(highPixel - lowPixel) + lowReal;
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Conversion real value to pixel value            * //
// ************************************************************** //
function convertREAL2PIXELaxesY( value, lowReal, highReal, lowPixel, highPixel ){
	return ( (lowPixel - highPixel)*(value - lowReal)/(highReal - lowReal) + highPixel ) | 0;
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Conversion pixel value to real value            * //
// ************************************************************** //
function convertPIXEL2REALaxesY( value, lowReal, highReal, lowPixel, highPixel ){
	return (highReal - lowReal)*(value - highPixel)/(lowPixel - highPixel) + lowReal;
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Clear canvas area                               * //
// ************************************************************** //
function clear( canvasID ){
	var cxt = window.document.getElementById( canvasID ).getContext( '2d' );
	cxt.clearRect(	0, 0, 
					window.document.getElementById( canvasID ).width,
					window.document.getElementById( canvasID ).height );
	cxt.beginPath();
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
// * FUNCTION:  Draw axis                                        * //
// ************************************************************** //
function drawAxis( canvasID, xCenter, yCenter, width, height, color, linewidth ){
	// x axis //
	drawSegment( canvasID, xCenter, yCenter,   width,   yCenter, color, linewidth );
	drawSegment( canvasID,       0, yCenter, xCenter,   yCenter, color, linewidth );
	drawSegment( canvasID,   width, yCenter, width-5, yCenter-5, color, linewidth );
	drawSegment( canvasID,   width, yCenter, width-5, yCenter+5, color, linewidth );
	drawText( canvasID, 't', width-8, yCenter+23, 20, '#000000', '#000000', 1 );
	//// y axis //
	drawSegment( canvasID, xCenter, yCenter,   xCenter,  height, color, linewidth );
	drawSegment( canvasID, xCenter,       5,   xCenter, yCenter, color, linewidth );
	drawSegment( canvasID, xCenter,       5, xCenter-5,     5+5, color, linewidth );
	drawSegment( canvasID, xCenter,       5, xCenter+5,     5+5, color, linewidth );
	drawText( canvasID, 'x(t)', xCenter-34, 15, 18, '#000000', '#000000', 1 );
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Draw curve                                      * //
// ************************************************************** //
function drawCurve( canvasID, expression,
                              lowRealX,  lowRealY,  highRealX,  highRealY,
							  lowPixelX, lowPixelY, highPixelX, highPixelY,
							  color, linewidth ){
	
	var xP1 = lowPixelX;
	var x   = convertPIXEL2REALaxesX( xP1, lowRealX, highRealX, lowPixelX, highPixelX );
	var y   = evalExpression( expression, x );
	var yP1 = convertREAL2PIXELaxesY( y, lowRealY, highRealY, lowPixelY, highPixelY );
	
	var xPn, yPn, xP2, yP2;
	
	for( var xPn = lowPixelX+1; xPn <= highPixelX; xPn++ ){
		x   = convertPIXEL2REALaxesX( xPn, lowRealX, highRealX, lowPixelX, highPixelX );
		y   = evalExpression( expression, x );
		yPn = convertREAL2PIXELaxesY( y, lowRealY, highRealY, lowPixelY, highPixelY );
		xP2 = xPn;
		yP2 = yPn;
		
		drawSegment( canvasID, xP1, yP1, xP2, yP2, color, linewidth );
		xP1 = xP2;
		yP1 = yP2;
	}
}

function plot(){
	var valueCanvasWidth  = window.document.getElementById(idCanvasWidth).value | 0;
	var valueCanvasHeight = window.document.getElementById(idCanvasHeight).value | 0;
	
	window.document.getElementById(idMyCanvas).width  = valueCanvasWidth;
	window.document.getElementById(idMyCanvas).height = valueCanvasHeight;

	var limLowerXReal = evalExpression( window.document.getElementById(idMinXvalue).value, 0 );
	var limUpperXReal = evalExpression( window.document.getElementById(idMaxXvalue).value, 0 );
	var limLowerYReal = evalExpression( window.document.getElementById(idMinYvalue).value, 0 );
	var limUpperYReal = evalExpression( window.document.getElementById(idMaxYvalue).value, 0 );
	
	var limLowerXPixel = offset;
	var limUpperXPixel = valueCanvasWidth - offset;
	var limLowerYPixel = offset;
	var limUpperYPixel = valueCanvasHeight - offset;
				   
	var expression     = window.document.getElementById(idExpression).value;
	
	var centerXpixel = convertREAL2PIXELaxesX( 0.0, limLowerXReal, limUpperXReal, limLowerXPixel, limUpperXPixel );
	var centerYpixel = convertREAL2PIXELaxesY( 0.0, limLowerYReal, limUpperYReal, limLowerYPixel, limUpperYPixel );
	
	clear( idMyCanvas );
	drawAxis( idMyCanvas, centerXpixel, centerYpixel, limUpperXPixel + offset, limUpperYPixel + offset, 'black', 2 );
	drawCurve( idMyCanvas, expression,
					limLowerXReal,  limLowerYReal,  limUpperXReal,  limUpperYReal,
					limLowerXPixel, limLowerYPixel, limUpperXPixel, limUpperYPixel,
					'blue', 1 );
}

function generateWaveFile(){
	var filename   = window.document.getElementById(idFilename).value + '.wav';
	var duration   = parseFloat( window.document.getElementById(idDuration).value );
	var expression = window.document.getElementById(idExpression).value;
	var minX       = evalExpression( window.document.getElementById(idMinXvalue).value, 0 );
	var maxX       = evalExpression( window.document.getElementById(idMaxXvalue).value, 0 );
	var minY       = evalExpression( window.document.getElementById(idMinYvalue).value, 0 );
	var maxY       = evalExpression( window.document.getElementById(idMaxYvalue).value, 0 );
	
	var wave = new Wave();
	wave.setFilename( filename );
	wave.setDuration( duration );
	wave.setEquation( expression );
	wave.setMinXVariableValue( minX );
	wave.setMaxXVariableValue( maxX );
	wave.setMinYVariableValue( minY );
	wave.setMaxYVariableValue( maxY );
	wave.getWaveFile();
}

window.onload = plot;