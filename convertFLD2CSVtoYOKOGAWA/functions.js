/**********************************************************
 **************		Example developed by:       ***********
 **************		Everton Pereira da Cruz     ***********
 **************   kyry{dot}ix{at}gmail{dot}com  ***********
 **************		http://www.everton.mat.br   ***********
***********************************************************/

var idCanvasAxes  = "canvasAxes";
var idCanvasCurve = "canvasCurve";
var idCanvasPoint = "canvasPoint";
var offset        = 5; //px
var values        = new Array();

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
	var y0 = parseInt((y1+y2)/2.0);
	
	// x axis //
	drawSegment( canvasID, x1, y0,   x2,   y0, color, linewidth );
	drawSegment( canvasID, x2, y0, x2-5, y0-5, color, linewidth );
	drawSegment( canvasID, x2, y0, x2-5, y0+5, color, linewidth );
	drawText( canvasID, 'x', x2-2, parseInt((y2+y1)/2.0)+14, 12, '#000000', '#000000', 1 );

	// y axis //
	drawSegment( canvasID, x1, y1,   x1,   y2, color, linewidth );
	drawSegment( canvasID, x1, y1, x1-5, y1+5, color, linewidth );
	drawSegment( canvasID, x1, y1, x1+5, y1+5, color, linewidth );
	drawText( canvasID, 'y', x1+7, 12, 12, '#000000', '#000000', 1 );
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
// * FUNCTION:  Draw curve                                      * //
// ************************************************************** //
function drawPoints( canvasID, values ){
	var nValues   = values.length;
	var minYReal  = Math.min.apply(Math, values );
	var maxYReal  = Math.max.apply(Math, values );
	var minYPixel = offset;
	var maxYPixel = document.getElementById( canvasID ).height - offset;
	
	var valuesInPixels = values.map( (value) => {
		return convertReal2PixelAxesY( value, minYReal, maxYReal, 0, maxYPixel );
	});
	
	var width = document.getElementById( canvasID ).width;
	var rate  = width / nValues;
	for( var n=0; n<=nValues; n++ ){
		x = rate * n;
		y = convertReal2PixelAxesY( values[n], minYReal, maxYReal, minYPixel, maxYPixel );
		drawCircle( canvasID, x, y, radius=1, fillcolor='red', linecolor='red', linewidth=1 );
	}
}

// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Convert to IEEE float                           * //
// ************************************************************** //
function int32toIEEEFloat( int32Value ){
	// bit 31
	var sign = (int32Value >> 31) & 1;
	// bits 30 ~ 23 => 1111.1111(2) = 0xFF(16)
	var expoent = (int32Value >> 23) & 0xFF;
	// bits 22 ~ 0 => 111.1111..1111.1111..1111.1111(2) = 0x7FFFFF
	//var fraction = int32Value & 0x7FFFFF;
	var fraction = 1;
	for( var i=1; i<=23; i++ ){
		fraction += ((int32Value >> (23-i)) & 1) * Math.pow( 2,(-1)*i );
	}
	
	var value = (sign==1?-1:+1) * Math.pow(2, expoent - 127) * fraction;
	return value;
}

// ************************************************************** //
// * DEVELOPER: https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server/18197341#18197341?newreg=d42f55ec6dac4d308a47cca810425c22 * //
// *            Adapted by Everton Pereira da Cruz
// * FUNCTION:  Generate contents to CSV                        * //
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
// * FUNCTION:  Treatment file FLD                              * //
// ************************************************************** //
function loadFile( object ) {
	// https://www.html5rocks.com/en/tutorials/file/dndfiles/ //
	// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Basico_sobre_HTTP/MIME_types
	// https://developer.mozilla.org/en-US/docs/Web/API/FileReader
	// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer
	// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString
	// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
	// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL //
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/byteLength
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array
	// https://pt.wikipedia.org/wiki/IEEE_754
	// https://en.wikipedia.org/wiki/Single-precision_floating-point_format
	// https://www.mimosa.org/ieee-floating-point-format/
	// https://tmi.yokogawa.com/br/library/resources/faqs/how-can-i-read-and-access-the-data-of-a-dl850-fld-file/
	// https://tmi.yokogawa.com/library/resources/faqs/xviewer-fld-floating-data-format-information/
	if( window.File && window.FileReader && window.FileList && window.Blob ){
		//var file   = document.querySelector('input[type=file]').files[0];
		var file   = object.files[0];
		var reader = new FileReader();
		reader.addEventListener( "load", function (){
			const view = new Int32Array( reader.result );
			values     = new Array();
			
			for( var i=0; i<view.length; i++ ){
				values[i] = int32toIEEEFloat( view[i] );
			}
			
			var offset = 5;
			var x1     = offset;
			var y1     = offset;
			var x2     = document.getElementById(idCanvasAxes).width - offset;
			var y2     = document.getElementById(idCanvasAxes).height - offset;
			
			clear( [idCanvasAxes, idCanvasCurve, idCanvasPoint] );
			//drawAxis( 'canvasAxes', x1+5, y1+5, x2-5, y2-5, colorAxis='#abb0ab', widthAxis=1 );
			drawPoints( 'canvasCurve', values );
		}, false );
		
		if( file ){
			reader.readAsArrayBuffer(file);
			//reader.readAsBinaryString(file);
			//reader.readAsText(file, 'UTF-8');
			//reader.readAsDataURL(file);
		}
	}
	else {
		alert( 'The File APIs are not fully supported in this browser.' );
	}
}

function exportFile( idFieldName ){
	if( values.length == 0 ){
		alert( "File don't load OR file generate a problem in app!" );
		return;
	}
	
	var name = document.getElementById( idFieldName ).value;
	var result = '';
	for( var i=0; i<values.length; i++ ){
		result += i + ',' + values[i] + '\r\n';
	}
	download( name, result );
}

/*
// ************************************************************** //
// * DEVELOPER: Everton Pereira da Cruz                         * //
// * FUNCTION:  Convert to binary                               * //
// ************************************************************** //
function toBinary( int32Value ){
	var result = '';
	for( var i=0; i<32; i++ ){
		if( (i % 4 == 0) && (i != 0) ){
			result = '.' + result;
		}
		result = ((int32Value >>i) & 1) + result;
	}
	return result;
}

function init(){
	// https://en.wikipedia.org/wiki/Single-precision_floating-point_format
	var values = [ 1042284544, 1071029508, 1071015527, -1071015528, -2134720672 ]; //  s    expoent                 fraction
	//  1042284544(10) = 0011.1110..0010.0000..0000.0000..0000.0000(2) => [0] [0111.1100] [010.0000..0000.0000..0000.0000] // Get in wikipedia
	//  1071029508(10) = 0011.1111..1101.0110..1001.1101..0000.0100(2) => [0] [0111.1111] [101.0110..1001.1101..0000.0100]
	//  1071015527(10) = 0011.1111..1101.0110..0110.0110..0110.0111(2) => [0] [0111.1111] [101.0110..0110.0110..0110.0111]
	// -1071015528(10) = 1100.0000..0010.1001..1001.1001..1001.1000(2) => [1] [1000.0000] [010.1001..1001.1001..1001.1000] // I make
	// -2134720672(10) = 1000.0000..1100.0010..1011.1111..0110.0000(2) => [1] [0000.0001] [100.0010..1011.1111..0110.0000] // I make
	//window.document.write( values[0] + ': ' );
	//window.document.write( int32toIEEEFloat( values[0] ) + '<br/>\n' );
	
	for( var i=0; i<values.length; i++ ){
		window.document.write( values[i] + ' ==> ' + toBinary(values[i]) + ' ==> ' + int32toIEEEFloat(values[i]) + '<br/>\n' );
	}
}
window.onload=init;
*/