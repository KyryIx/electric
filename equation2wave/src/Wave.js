////////////////////////////////////////////
//  Developed by Everton Pereira da Cruz  //
////////////////////////////////////////////

class Wave{
	///////////////////////////////////////////////////////////////////////////////////
	// ***************************************************************************** //
	// * https://slideplayer.com/slide/1486390/                                    * //
	// * https://www.researchgate.net/publication/269935208_Psychophysics_of_music * //
	// * al_elem ents_in_the_discrete-time_representation_of_sound                 * //
	// * https://www.dailymotion.com/video/x5ct2tw                                 * //
	// * http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/WAVE.html       * //
	// * http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/Samples.html    * //
	// * https://blogs.msdn.microsoft.com/dawate/2009/06/22/intro-to-audio-progra  * //
	// *                              mming-part-1-how-audio-data-is-represented/  * //
	// * https://blogs.msdn.microsoft.com/dawate/2009/06/23/intro-to-audio-progra  * //
	// *                                mming-part-2-demystifying-the-wav-format/  * //
	// * http://soundfile.sapp.org/doc/WaveFormat/                                 * //
	// * https://en.wikipedia.org/wiki/Pulse-code_modulation                       * //
	// * https://en.wikipedia.org/wiki/Endianness                                  * //
	// * https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes * //
	// * https://javascript.info/binary                                            * //
	// ***************************************************************************** //
	///////////////////////////////////////////////////////////////////////////////////
	
	constructor(){
		this.filename = 'signal.wav';
		// duration of audio in seconds
		this.duration = 1.0;
		this.equation = '100*sin(1000*x)';
		this.variable = 'x';
		this.minXVariableValue = 0.0;
		this.maxXVariableValue = 2 * Math.PI;
		this.minYVariableValue = -100.0;
		this.maxYVariableValue = 100.0;
		
		// address = 00 (4 bytes) - 1380533830 = 0x52494646 = 'RIFF'
		this.chunkID = 0x52494646;
		// address = 04 (4 bytes) - chunkSize = 4 + (8 + SubChunk1Size) + (8 + SubChunk2Size)
		this.chunkSize = 0; // it doesn't calculate now
		// address = 08 (4 bytes) - 1463899717 = 0x57415645 = 'WAVE'
		this.format = 0x57415645;
		// address = 12 (4 bytes) - 1718449184 = 0x666d7420 = 'fmt'
		this.subChunk1ID = 0x666d7420;
		// address = 16 (4 bytes) - 16 = 0x00000010 -> 16 for PCM
		this.subChunk1Size = 0x00000010;
		// address = 20 (2 bytes) - // 1 = 0x0001 - 1 (PCM)
		this.audioFormat = 0x0001;
		// address = 22 (2 bytes) - // 2 = 0x0002 - 2 channels
		this.numChannels = 0x0002;
		// address = 24 (4 bytes) - 44100 Hz = 0x0000AC44 Hz
		this.sampleRate = 0x0000AC44;
		// address = 28 (4 bytes) - SampleRate * NumChannels * BitsPerSample/8 = 44100*2*16/8
		this.byteRate = 0x0002B110;
		// address = 32 (2 bytes) - NumChannels * BitsPerSample/8 = 2*16/8
		this.blockAlign = 0x0004;
		// address = 34 (2 bytes) - 16 = 0x0010
		this.bitsPerSample = 0x0010;
		//this.extraParamSize = new Array();// address = 36 (2 bytes) if PCM, then doesn't exist 
		//this.extraParams = new Array();	// address = 38 (x bytes) x space for extra parameters
		// address = 36 (4 bytes) - 1684108385 = 0x64617461 = 'data'
		this.subChunk2ID = 0x64617461;
		// numSamples = sampleRate * duration of audio
		var numSamples = parseInt( Math.floor( this.sampleRate * this.duration ) );
		// address = 40 (4 bytes) - subChunk2Size = NumSamples * NumChannels * BitsPerSample/8
		this.subChunk2Size = numSamples * this.numChannels * this.bitsPerSample/8;
		
		this.chunkSize = 4 + (8 + this.subChunk1Size) + (8 + this.subChunk2Size);
		
		// address = 44 (* bytes)
		// number of elements in the sample data = sampleRate * numChannels * duration of audio
		this.data = this.getDataEquation();
	}
	
	setFilename( filename ){ this.filename = filename; }
	getFilename(){ return this.filename; }

	setDuration( duration ){ this.duration = duration; }
	getDuration(){ return this.duration; }
	
	setEquation( equation ){ this.equation = equation; }
	getEquation(){ return this.equation; }
	
	//setVariable( variable ){ this.variable = variable; }
	getVariable(){ return this.variable; }
	
	setMinXVariableValue( minXVariableValue ){ this.minXVariableValue = minXVariableValue; }
	getMinXVariableValue(){ return this.minXVariableValue; }
	
	setMaxXVariableValue( maxXVariableValue ){ this.maxXVariableValue = maxXVariableValue; }
	getMaxXVariableValue(){ return this.maxXVariableValue; }
	
	setMinYVariableValue( minYVariableValue ){ this.minYVariableValue = minYVariableValue; }
	getMinYVariableValue(){ return this.minYVariableValue; }
	
	setMaxYVariableValue( maxYVariableValue ){ this.maxYVariableValue = maxYVariableValue; }
	getMaxYVariableValue(){ return this.maxYVariableValue; }

	//setChunkID( chunkID ){ this.chunkID = (chunkID & 0xFFFFFFFF); }
	getChunkID(){ return this.chunkID; }
	
	//setChunkSize( chunkSize ){ this.chunkSize = (chunkSize & 0xFFFFFFFF); }
	getChunkSize(){ return this.chunkSize; }
	
	//setFormat( format ){ this.format = (format & 0xFFFFFFFF); }
	getFormat(){ return this.format; }
	
	//setSubChunk1ID( subChunk1ID ){ this.subChunk1ID = (subChunk1ID & 0xFFFFFFFF); }
	getSubChunk1ID(){ return this.subChunk1ID; }
	
	//setSubChunk1Size( subChunk1Size ){ this.subChunk1Size = (subChunk1Size & 0xFFFFFFFF); }
	getSubChunk1Size(){ return this.subChunk1Size; }

	//setAudioFormat( audioFormat ){ this.audioFormat = (audioFormat & 0xFFFF); }
	getAudioFormat(){ return this.audioFormat; }
	
	//setNumChannels( numChannels ){ this.numChannels = (numChannels & 0xFFFF); }
	getNumChannels(){ return this.numChannels; }
	
	//setSampleRate( sampleRate){ this.sampleRate = (sampleRate & 0xFFFFFFFF); }
	getSampleRate(){ return this.sampleRate; }
	
	//setByteRate( byteRate ){ this.byteRate = (byteRate & 0xFFFFFFFF); }
	getByteRate(){ return this.byteRate; }
	
	//setBlockAlign( blockAlign ){ this.blockAlign = (blockAlign & 0xFFFF); }
	getBlockAlign(){ return this.blockAlign; }
	
	//setBitsPerSample( bitsPerSample ){ this.bitsPerSample = (bitsPerSample & 0xFFFF); }
	getBitsPerSample(){ return this.bitsPerSample; }
		
	//setExtraParamSize( extraParamSize ){ this.extraParamSize = extraParamSize; }
	//getExtraParamSize(){ return this.extraParamSize; }
	
	//setExtraParams( extraParams ){ this.extraParams = extraParams; }
	//getExtraParams(){ return this.extraParams; }
	
	//setSubChunk2ID( subChunk2ID ){ this.subChunk2ID = (subChunk2ID & 0xFFFFFFFF); }
	getSubChunk2ID(){ return this.subChunk2ID; }
	
	//setSubChunk2Size( subChunk2Size){ this.subChunk2Size = (subChunk2Size & 0xFFFFFFFF); }
	getSubChunk2Size(){ return this.subChunk2Size; }
	
	//setData( data ){ this.data = data; }
	getData(){ return this.data; }
	
	getNumberSamples(){
		return parseInt( Math.floor( this.getSampleRate() * this.getDuration() ) );
	}
	
	getBytesInBigEndian( /*integer number*/number, /*size numbers in integer number*/size ){
		var bytes = new Array();
		var tempNumber = 0;
		for( var i=size-1; i>=0; i-- ){
			bytes.push( (number >> (8*i)) & 0xFF );
		}
		return bytes;
	}
	
	getBytesInLittleEndian( /*integer number*/number, /*size numbers in integer number*/size ){
		var bytes = new Array();
		var tempNumber = 0;
		for( var i=size-1; i>=0; i-- ){
			bytes.unshift( (number >> (8*i)) & 0xFF );
		}
		return bytes;
	}
	
	evalExpression( expression, value ){
		try{
			return math.evaluate( expression, {x:value} );
		}
		catch(err){
			return 0.0;
		}
	}
	
	getDataEquation(){
		var equation = this.getEquation();
		var variable = this.getVariable();
		
		// xMin         x             xMax
		// |            |               |
		// +------------+---------------+
		// |            |               |
		// 0            n               N
		//
		//     x - xMin   n - 0
		//  ----------- = -----
		//  xMax - xMin   N - 0
		//
		//  x = (n / N) * (xMax - xMin) + xMin
		//  x = n * ((xMax - xMin) / N) + xMin
		//
		//  x = n * A + xMin, where A = ((xMax - xMin) / N)
		
		// For 16 bits per sample
		//
		//     (2^(16-1))-1 --+-- yMax
		//                    |
		//                    |
		//                    |
		//               yn   +   y
		//                    |
		//                    |
		//                    |
		//  (-1)*(2^(16-1)) --+-- yMin
		//
		//  yn - Q    y - yMin
		//  ------ = ------------, where
		//   P - Q    yMax - yMin
		//
		//          P = (2^(16-1)) - 1
		//              and
		//          Q = (-1) * (2^(16-1))
		//  
		//  yn = ((P - Q) / (yMax - yMin)) * (y - yMin) + Q
		//
		//  yn = B * y + C, where
		//
		//          B = (P - Q) / (yMax - yMin)
		//                and
		//          C = Q - yMin * ((M - N) / (yMax - yMin))
		//          C = Q - yMin * B
		
		var xMin = this.getMinXVariableValue();
		var xMax = this.getMaxXVariableValue();
		var yMin = this.getMinYVariableValue();
		var yMax = this.getMaxYVariableValue();
		
		var b = this.getBitsPerSample();
		var N = this.getNumberSamples();
		var P = Math.pow( 2, b - 1 ) - 1;
		var Q = (-1) * Math.pow( 2, b - 1 );
		
		var A = (xMax - xMin) / N;
		var B = (P - Q) / (yMax - yMin);
		var C = Q - yMin * B;
		
		var x=0, y=0, yn=0;
		var byte1=0, byte2=0, data = new Array();
		
		for( var n=0; n <=N; n++ ){
			x  = n * A + xMin;
			
			y = this.evalExpression( this.getEquation(), x );
			
			yn = B * y + C;
			yn = ( yn<Q ? Q : (yn>P ? P : yn) );
			yn = yn | 0;
		
			byte1 = yn & 0xFF;
			byte2 = (yn >> 8) & 0xFF;
			
			data.push( byte1 ); // left channel
			data.push( byte2 ); // left channel
			
			data.push( byte1 ); // right channel
			data.push( byte2 ); // right channel
		}
		
		return data;
	}
	
	getContentWaveFile(){
		// numSamples = sampleRate * duration of audio
		var numSamples = parseInt( Math.floor( this.sampleRate * this.duration ) );
		// address = 40 (4 bytes) - subChunk2Size = NumSamples * NumChannels * BitsPerSample/8
		this.subChunk2Size = numSamples * this.numChannels * this.bitsPerSample/8;
		// chunkSize = 4 + (8 + SubChunk1Size) + (8 + SubChunk2Size)
		this.chunkSize = 4 + (8 + this.subChunk1Size) + (8 + this.subChunk2Size);
		this.data = this.getDataEquation();
	
		var content = new Array();
		content = content.concat( this.getBytesInBigEndian( this.getChunkID(), 4 ) );
		content = content.concat( this.getBytesInLittleEndian( this.getChunkSize(), 4 ) );
		content = content.concat( this.getBytesInBigEndian( this.getFormat(), 4 ) );
		content = content.concat( this.getBytesInBigEndian( this.getSubChunk1ID(), 4 ) );
		content = content.concat( this.getBytesInLittleEndian( this.getSubChunk1Size(), 4 ) );
		content = content.concat( this.getBytesInLittleEndian( this.getAudioFormat(), 2 ) );
		content = content.concat( this.getBytesInLittleEndian( this.getNumChannels(), 2 ) );
		content = content.concat( this.getBytesInLittleEndian( this.getSampleRate(), 4 ) );
		content = content.concat( this.getBytesInLittleEndian( this.getByteRate(), 4 ) );
		content = content.concat( this.getBytesInLittleEndian( this.getBlockAlign(), 2 ) );
		content = content.concat( this.getBytesInLittleEndian( this.getBitsPerSample(), 2 ) );
		//content = content.concat( this.extraParamSize );
		//content = content.concat( this.extraParams );
		content = content.concat( this.getBytesInBigEndian( this.getSubChunk2ID(), 4 ) );
		content = content.concat( this.getBytesInLittleEndian( this.getSubChunk2Size(), 4 ) );
		content = content.concat( this.getData() );
		return new Uint8Array(content);
	}
	
	getWaveFile(){
		var file = this.getContentWaveFile();
		var elementTemp = window.document.createElement( 'a' );
		var blob = new Blob( [file], {type: "octet/stream"} );
		var url = window.URL.createObjectURL( blob );
		elementTemp.setAttribute( 'href', url );
		elementTemp.setAttribute( 'download', this.getFilename() );
		elementTemp.style.display = 'none';
		window.document.body.appendChild( elementTemp );
		elementTemp.click();
		window.document.body.removeChild( elementTemp );
	}
}