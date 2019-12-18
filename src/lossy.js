function runLossy(canvas){

	var canvas = canvas.current

	var ctx = canvas.getContext('2d');
	ctx.imageSmoothingQuality = 'low';
	ctx.imageSmoothingEnabled = false;

	var byte_array;
	var jpg_header_length;

	var glitch_img;

	var base64_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	var base64_map = base64_chars.split( '' );
	var reversed_base64_map = {};
	base64_map.forEach(function(val, key){ 
	  reversed_base64_map[val] = key;
	});

	var mouseX = 0;
	var mouseY = 0;

	var markers  = [];
	var segments = [];

	var quality = 1.0;
	var qluma, qchroma;

	var luma = 0;
	var lumaDir = 1;

	var chroma = 0;
	var chromaDir = 1;



	function base64ToByte(str){
	  var result = [];
	  var digit_num, cur, prev;
	  
	  for (var i = 23, len = str.length; i < len; i++){
		cur = reversed_base64_map[str.charAt(i)];
		digit_num = (i - 23) % 4;
		
		switch(digit_num){
		  case 1:
			result.push(prev << 2 | cur >> 4);
			break;
		  case 2:
			result.push((prev & 0x0f) << 4 | cur >> 2);
			break;
		  case 3:
			result.push((prev & 3) << 6 | cur);
			break;
		}
		
		prev = cur;
	  }
	  
	  return result;
	}

	function byteToBase64(arr){
	  var result = ['data:image/jpeg;base64,'];
	  var byte_num, cur, prev;
	  
	  for (var i = 0, l = arr.length; i < l; i++){
		cur = arr[i];
		byte_num = i % 3;
		
		switch(byte_num){
		  case 0:
			result.push(base64_map[cur >> 2]);
			break;
		  case 1:
			result.push(base64_map[(prev & 3) << 4 | (cur >> 4)]);
			break;
		  case 2:
			result.push(base64_map[(prev & 0x0f) << 2 | (cur >> 6)]);
			result.push(base64_map[cur & 0x3f]);
			break;
		}
		prev = cur;
	  }
	  
	  if (byte_num === 0){
		result.push(base64_map[(prev & 3) << 4]);
		result.push('==');
	  } else if (byte_num === 1){
		result.push(base64_map[(prev & 0x0f) << 2]);
		result.push('=');
	  }
	  
	  return result.join('');
	}

	function glitchBytes(bytes){

		if (Math.random() < 0.25){
			quality = Math.random();
		}

		if (Math.random() < 0.25){
			qluma = markers[0] + Math.floor(Math.random() * (segments[0] - markers[0]));
			luma = parseInt(bytes[qluma]);
		}

		if (Math.random() < 0.25){
			qchroma = markers[1] + Math.floor(Math.random() * (segments[1] - markers[1]));
			chroma = parseInt(bytes[qchroma]);
		}

		luma = luma + lumaDir;
		if (luma < 0 || luma > 255){
			lumaDir *= -1;
			luma = luma + lumaDir;
		}

		bytes[qluma] = luma;

		chroma = chroma + chromaDir;
		if (chroma < 0 || chroma > 255){
			chromaDir *= -1;
			chroma = chroma + chromaDir;
		}

		bytes[qchroma] = chroma;

		if (Math.random() < 0.5){
			var sos = markers[7] + Math.floor(Math.random() * (segments[7] - markers[7]));
			bytes[sos] = Math.floor(Math.random() * 256);
		}
	}

	var interval = 500;
	var timer = Date.now();

	function glitchJpg(){
		if (timer + interval < Date.now()){
			ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);

		  	var img_data = canvas.toDataURL("image/jpeg", quality);

		  	byte_array = base64ToByte(img_data);

			timer = Date.now();
			interval = Math.random() * 500.0 + 500.0;
		}

	  var glitch_copy = byte_array.slice();

	  glitchBytes(glitch_copy);
	  
	  glitch_img = new Image();
	  glitch_img.src = byteToBase64(glitch_copy);

	  glitch_img.onload = function(){
		if (this.width + this.height == 0){
			this.onerror();
			return;
		}

		ctx.save();
		ctx.translate(canvas.width / 2, canvas.height / 2);
		ctx.drawImage(glitch_img, -mouseX / 2 - canvas.width / 2,  -mouseY / 2 - canvas.height / 2, canvas.width + mouseX, canvas.height + mouseY);
		ctx.restore();

		var img_data = canvas.toDataURL("image/jpeg", quality);
		byte_array = base64ToByte(img_data);

		findHeader(byte_array);
		exploreJpeg(byte_array);

		setTimeout(glitchJpg, 1.0/15.0 * 1000.0);
	  };

	  glitch_img.onerror = function(){
	  	console.log("bad data");
		this.src = byteToBase64(byte_array.slice());
	  }
	}

	function findHeader(data){
	  for (var i = 0, l = data.length; i < l; i++){
		if (data[i] === 0xFF && data [i + 1] === 0xDA){
		  jpg_header_length = i + 2;
		  return;
		}
	  }
	}

	function exploreJpeg(data){
		var marker  = 0;
		var segment = 0;

		//DQT Marker 1 (Luma)//////////////////////////////////////////////////////////////////////

		//find first relevant marker (qtable)
		for (var i = 0, l = data.length; i < l; i++){
			if (data[i] === 0xFF && data [i + 1] === 0xDB){
				marker = i;
				break;
			}
		}

		//store qtable luma marker
		markers.push(marker + 2 + 2 + 1); //2 byte marker, 2 byte segment length, 1 byte table id

		//store segment length
		segment = parseInt(data[marker + 2]) + parseInt(data[marker + 3]);
		
		marker = marker + 2 + segment; //skip 2 byte length specifier, then advance to next segment
	  
	    segments[0] = marker; //store end of bendable data per segment

	    //DQT Marker 2 (Chroma)////////////////////////////////////////////////////////////////////

	    //store qtable chroma marker                        
	  	markers[1] = marker + 2 + 2 + 1;

	  	segment = parseInt(data[marker + 2]) + parseInt(data[marker + 3]);

	  	marker = marker + 2 + segment;
	  
	  	segments[1] = marker;

	  	//SOF Marker (Start of Frame)//////////////////////////////////////////////////////////////
	  	//this segment range is returning bad data and varies across browsers...

	  	markers[2] = marker + 2 + 2 + 1;

	  	segment = parseInt(data[marker + 2]) + parseInt(data[marker + 3]);

	  	marker = marker + 2 + segment;

	  	segments[2] = markers[2] + 4;

	  	//DHT Marker 1 (Huffman Table 1)////////////////////////////////////////////////////////////
	  	//Range is 0 - 15 ??

	  	markers[3] = marker + 2 + 2 + 1 + 16;

	  	segment = parseInt(data[marker + 2]) + parseInt(data[marker + 3]);

	  	marker = marker + 2 + segment;

	  	segments[3] = marker;

	  	//DHT Marker 2 (Huffman Table 2)////////////////////////////////////////////////////////////
	  	//Range is 0 - 255 ??

	  	markers[4] = marker + 2 + 2 + 1 + 16;

	  	segment = parseInt(data[marker + 2]) + parseInt(data[marker + 3]);

	  	marker = marker + 2 + segment;

	  	segments[4] = marker;

	  	//DHT Marker 3 (Huffman Table 3)////////////////////////////////////////////////////////////
	  	//Range is 0 - 15 ??

	  	markers[5] = marker + 2 + 2 + 1 + 16;

	  	segment = parseInt(data[marker + 2]) + parseInt(data[marker + 3]);

	  	marker = marker + 2 + segment;

	  	segments[5] = marker;

	  	//DHT Marker 4 (Huffman Table 4)////////////////////////////////////////////////////////////
	  	//Range is 0 - 255 ??

	  	markers[6] = marker + 2 + 2 + 1 + 16;

	  	segment = parseInt(data[marker + 2]) + parseInt(data[marker + 3]);

	  	marker = marker + 2 + segment;

	  	segments[6] = marker;

	  	//SOS Marker (Start of Scan)///////////////////////////////////////////////////////////////

	  	segment = parseInt(data[marker + 2]) + parseInt(data[marker + 3]);

	  	markers[7] = marker + 2 + segment; //skip sos marker and reposition at compressed image data

	  	segments[7] = data.length - 2; //store EOI Marker (end of image)

	  	//init some vars//////////////////////////////////////////////////////////////////////////

	  	qluma = markers[0];
	  	qchroma = markers[1];
	}

	var img = new Image();
	img.src = require("./assets/lena.jpg");

	img.onload = function(){
	  ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);

	  console.log(ctx.canvas.height)

	  var img_data = canvas.toDataURL("image/jpeg", quality);

	  byte_array = base64ToByte(img_data);

	  findHeader(byte_array);
	  exploreJpeg(byte_array);

	  glitchJpg();
	};

	function map(value, low1, high1, low2, high2) {
	  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
	}

}

export {runLossy}