The Wave class is to use to create WAVE files sound using equations as sine, cosine, tangent, power, and other functions.

### **Methods in Wave Object**

|    Tipo    | Function/method name                             | Description                                                  |
| :--------: | :----------------------------------------------- | :----------------------------------------------------------- |
|    void    | setFilename( filename:string )                   | Set the file name with **wav** extension.                    |
|   string   | getFilename()                                    | Return the file name. The value default is **signal.wav**.   |
|    void    | setDuration( duration:float )                    | Set the audio duration in seconds. The value is greatest than zero. |
|   float    | getDuration()                                    | Return the seconds of the audio. The value default is **1.0** second. |
|    void    | setEquation( equation:string )                   | Set the equation. The functions permitted are in [https://mathjs.org/](https://mathjs.org/). |
|   string   | getEquation()                                    | Return the equation. The value default is **100 * sin(1000 * x)**. |
|   string   | getVariable()                                    | Return the variable. The value default is **x**.             |
|    void    | setMinXVariableValue( minXVariableValue:float )  | Set the value to minimum value to variable **x**.            |
|   float    | getMinXVariableValue()                           | Return the minimum value of variable **x**. The value default is **0.0**. |
|    void    | setMaxXVariableValue( maxXVariableValue:float )  | Set the value of maximum value to variable **x**.            |
|   float    | getMaxXVariableValue()                           | Return the maximum value of variable **x**. The value default is  **2*π***. |
|    void    | setMinYVariableValue( minYVariableValue :float ) | Set the minimum value to **axes y**.                         |
|   float    | getMinYVariableValue()                           | Return the minimum value to **axes y**. The default value is **-100.0**. |
|    void    | setMaxYVariableValue( maxYVariableValue )        | Set the maximum value to **axes y**.                         |
|   float    | getMaxYVariableValue()                           | Return the maximum value to **axes y**. The value is **100.0**. |
|    int     | getChunkID()                                     | Return the chunk id in 4 bytes. The value is ***0x52494646*** in [big-endian](https://en.wikipedia.org/wiki/Endianness) form that is represent the letters "RIFF" in ASCII form. |
|    int     | getChunkSize()                                   | Return the chunk size in 4 bytes. The value is<br/>*4 + (8 + subChunk1Size) + (8 + subChunk2Size)* |
|    int     | getFormat()                                      | Return the format audio in 4 bytes. The value is ***0x57415645*** in [big-endian](https://en.wikipedia.org/wiki/Endianness) form that is represent the letters "WAVE" in ASCII form. |
|    int     | getSubChunk1ID()                                 | Return the sub chunck id in 4 bytes. The value is ***0x666d7420*** in [big-endian](https://en.wikipedia.org/wiki/Endianness) form that is represent the letters "fmt" in ASCII form. |
|    int     | getSubChunk1Size()                               | Return the sub chunck size in 4 bytes. The value is ***0x00000010*** for PCM (Pulse Code Modulation). |
|    int     | getAudioFormat()                                 | Return the audio format in 2 bytes. The value is ***0x0001*** to Linear quantization and indicate don't have some form of compression. |
|    int     | getNumChannels()                                 | Return the number channels in 2 bytes. The value is ***0x0002*** to represent Stereo (Mono = 1, Stereo = 2, etc). |
|    int     | getSampleRate()                                  | Return the sample rate in 4 bytes. The value is ***0x0000AC44*** that represent 44100 Hz. |
|    int     | getByteRate()                                    | Return the byte rate in 4 bytes. The value is <br/>***sampleRate*** * ***numChannels*** * (***bitsPerSample*** / 8). |
|    int     | getBlockAlign()                                  | Return the block align in 2 bytes. The value is<br/>***numChannels*** * (***bitsPerSample*** / 8) that represent the number of bytes for one sample including all channels. |
|    int     | getBitsPerSample()                               | Return the bits per sample in 2 bytes. The value default ***0x0010*** (16 bits). |
|    int     | getSubChunk2ID()                                 | Return the sub chunk id in 4 bytes. The value default is ***0x64617461*** big-endian form or "data" in ASCII form. |
|    int     | getSubChunk2Size()                               | Return the number of bytes in the data in 4 bytes. The value is<br/>***numSamples*** * ***numChannels*** * (***bitsPerSample*** / 8). |
|   int[]    | getData()                                        | Return the sound data in integer array.                      |
|    int     | getNumberSamples()                               | Return the number of samples. The value is<br/>&lceil;sampleRate * duration&rceil;. |
|   int[]    | getBytesInBigEndian( number, size )              | Return the number in size (number of bytes) in big-endian format. |
|   int[]    | getBytesInLittleEndian( number, size )           | Return the number in size (number of bytes) in big-little format. |
|   float    | evalExpression( expression, value )              | Return evaluate to expression with value "value".            |
|   int[]    | getDataEquation()                                | Return the values about expression math.                     |
| Uint8Array | getContentWaveFile()                             | Return the values about content of file Wave. The values is integer array. |
|    void    | getWaveFile()                                    | Download to file Wave.                                       |

See [The Canonical WAVE file format](http://soundfile.sapp.org/doc/WaveFormat/) to learn about this format.