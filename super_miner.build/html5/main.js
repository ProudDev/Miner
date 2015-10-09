
//Change this to true for a stretchy canvas!
//
var RESIZEABLE_CANVAS=false;

//Start us up!
//
window.onload=function( e ){

	if( RESIZEABLE_CANVAS ){
		window.onresize=function( e ){
			var canvas=document.getElementById( "GameCanvas" );

			//This vs window.innerWidth, which apparently doesn't account for scrollbar?
			var width=document.body.clientWidth;
			
			//This vs document.body.clientHeight, which does weird things - document seems to 'grow'...perhaps canvas resize pushing page down?
			var height=window.innerHeight;			

			canvas.width=width;
			canvas.height=height;
		}
		window.onresize( null );
	}

	BBMonkeyGame.Main( document.getElementById( "GameCanvas" ) );
}

//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_CD="";
CFG_CONFIG="release";
CFG_HOST="winnt";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_INCDIRS="C:/Monkey/MonkeyPro69/modules/monkey/native";
CFG_LANG="js";
CFG_MODPATH=".;C:/Users/Matt/Desktop/SuperMiner;C:/Monkey/MonkeyPro69/modules;C:/Monkey/MonkeyPro69/targets/html5/modules";
CFG_MOJO_AUTO_SUSPEND_ENABLED="0";
CFG_MONKEYDIR="";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="0";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.xml|*.json";
CFG_TRANSDIR="";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[mojo_font.png];type=image/png;width=864;height=13;\n[Media/Graphics/Backgrounds/Sky.png];type=image/png;width=800;height=320;\n[Media/Graphics/Bricks/coal.png];type=image/png;width=64;height=64;\n[Media/Graphics/Bricks/d_silver.png];type=image/png;width=64;height=64;\n[Media/Graphics/Bricks/destroyed.png];type=image/png;width=64;height=64;\n[Media/Graphics/Bricks/dirt.png];type=image/png;width=64;height=64;\n[Media/Graphics/Bricks/gold.png];type=image/png;width=64;height=64;\n[Media/Graphics/Bricks/grass.png];type=image/png;width=64;height=64;\n[Media/Graphics/Bricks/s_coal.png];type=image/png;width=64;height=64;\n[Media/Graphics/Bricks/silver.png];type=image/png;width=64;height=64;\n[Media/Graphics/Bricks/stone.png];type=image/png;width=64;height=64;\n[Media/Graphics/GUI/BuildMode_Deselected.png];type=image/png;width=54;height=54;\n[Media/Graphics/GUI/BuildMode_Selected.png];type=image/png;width=54;height=54;\n[Media/Graphics/GUI/Button.png];type=image/png;width=78;height=78;\n[Media/Graphics/GUI/D-Pad.png];type=image/png;width=210;height=210;\n[Media/Graphics/Items/pickaxe.png];type=image/png;width=64;height=64;\n[Media/Graphics/Player/player.png];type=image/png;width=64;height=64;\n";
//${METADATA_END}

//${TRANSCODE_BEGIN}

// Javascript Monkey runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Monkey Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

function debugLog( str ){
	print( str );
}

function debugStop(){
	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Monkey Exception"; 
}

function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "monkeystate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "monkeystate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Monkey Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}

function BBHtml5Game( canvas ){
	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){
		this._gl=this._canvas.getContext( "webgl" );
		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl" );
		if( !this._gl ) this.Die( "Can't create WebGL" );
		gl=this._gl;
	}
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;

	if( !this._updateRate || this._suspended ) return;
	
	var game=this;
	var updatePeriod=1000.0/this._updateRate;
	var nextUpdate=Date.now()+updatePeriod;
	var seq=game._timerSeq;
	
	function timeElapsed(){
		if( seq!=game._timerSeq ) return;

		var time;		
		var updates;
		
		for( updates=0;updates<4;++updates ){
		
			nextUpdate+=updatePeriod;
			
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			if( nextUpdate-Date.now()>0 ) break;
		}
		
		game.RenderGame();
		if( seq!=game._timerSeq ) return;
		
		if( updates==4 ){
			nextUpdate=Date.now();
			setTimeout( timeElapsed,0 );
		}else{
			var delay=nextUpdate-Date.now();
			setTimeout( timeElapsed,delay>0 ? delay : 0 );
		}
	}

	setTimeout( timeElapsed,updatePeriod );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "monkey://data/" )!=0 ) return "";
	path=path.slice(14);

	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "monkey:" )!=0 ){
		return path;
	}else if( path.indexOf( "monkey://data/" )==0 ) {
		return "data/"+path.slice( 14 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function keyToChar( key ){
		switch( key ){
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	
	function mouseX( e ){
		var x=e.clientX+document.body.scrollLeft;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y;
	}
	
	canvas.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e) );
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}

	canvas.ontouchstart=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}
	}
	
	canvas.onblur=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}
	
	canvas.focus();
	
	game.StartGame();

	game.RenderGame();
}

function BBMonkeyGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBMonkeyGame.prototype=extend_class( BBHtml5Game );

BBMonkeyGame.Main=function( canvas ){

	var game=new BBMonkeyGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}

// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

//***** gxtkGraphics class *****

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	function onloadfun(){
		game.DecLoading();
	}
	
	game.IncLoading();

	var image=new Image();
	image.onload=onloadfun;
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<6 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

//***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

//***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
	return true;
}

//***** gxtkChannel class *****
function gxtkChannel(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

//***** gxtkAudio class *****
function gxtkAudio(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.nextchan=0;
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ) chan.audio.pause();
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ) chan.audio.play();
	}
}

gxtkAudio.prototype.LoadSample=function( path ){

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;

	var chan=this.channels[channel];

	if( chan.state!=0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;
	
	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state!=0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state!=0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

//***** gxtkSample class *****

function gxtkSample( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}

function BBThread(){
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}

function BBAsyncImageLoaderThread(){
	BBThread.call(this);
}

BBAsyncImageLoaderThread.prototype=extend_class( BBThread );

BBAsyncImageLoaderThread.prototype.Start=function(){

	var thread=this;

	var image=new Image();
	
	image.onload=function( e ){
		image.meta_width=image.width;
		image.meta_height=image.height;
		thread._surface=new gxtkSurface( image,thread._device )
		thread.running=false;
	}
	
	image.onerror=function( e ){
		thread._surface=null;
		thread.running=false;
	}
	
	thread.running=true;
	
	image.src=BBGame.Game().PathToUrl( thread._path );
}


function BBAsyncSoundLoaderThread(){
	BBThread.call(this);
}

BBAsyncSoundLoaderThread.prototype=extend_class( BBThread );

BBAsyncSoundLoaderThread.prototype.Start=function(){
	this._sample=this._device.LoadSample( this._path );
}
function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	if((bb_app__app)!=null){
		error("App has already been created");
	}
	bb_app__app=this;
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	bb_app__game.SetDelegate(bb_app__delegate);
	return this;
}
c_App.prototype.p_OnCreate=function(){
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	return 0;
}
c_App.prototype.p_OnResume=function(){
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	return 0;
}
c_App.prototype.p_OnRender=function(){
	return 0;
}
function c_Game(){
	c_App.call(this);
	this.m_player=null;
	this.m_img_dirtBrick=null;
	this.m_img_stoneBrick=null;
	this.m_img_grassBrick=null;
	this.m_img_coalBrick=null;
	this.m_img_silverBrick=null;
	this.m_img_goldBrick=null;
	this.m_img_destroyedBrick=null;
	this.m_img_player=null;
	this.m_img_pickaxe=null;
	this.m_img_sky=null;
	this.m_img_dpad=null;
	this.m_img_bModeEnabled=null;
	this.m_img_bModeDisabled=null;
	this.m_img_button=null;
}
c_Game.prototype=extend_class(c_App);
c_Game.m_new=function(){
	c_App.m_new.call(this);
	return this;
}
c_Game.prototype.p_OnCreate=function(){
	bb_app_SetUpdateRate(60);
	bb_autofit_SetVirtualDisplay(800,480,1.0);
	this.m_player=c_player.m_new.call(new c_player,384.0,192.0);
	bb_super_miner_mapList=c_StringMap.m_new.call(new c_StringMap);
	bb_super_miner_offsetX=0.0;
	bb_super_miner_offsetY=0.0;
	this.m_img_dirtBrick=bb_graphics_LoadImage("Media/Graphics/Bricks/dirt.png",1,c_Image.m_DefaultFlags);
	this.m_img_stoneBrick=bb_graphics_LoadImage("Media/Graphics/Bricks/stone.png",1,c_Image.m_DefaultFlags);
	this.m_img_grassBrick=bb_graphics_LoadImage("Media/Graphics/Bricks/grass.png",1,c_Image.m_DefaultFlags);
	this.m_img_coalBrick=bb_graphics_LoadImage("Media/Graphics/Bricks/coal.png",1,c_Image.m_DefaultFlags);
	this.m_img_silverBrick=bb_graphics_LoadImage("Media/Graphics/Bricks/silver.png",1,c_Image.m_DefaultFlags);
	this.m_img_goldBrick=bb_graphics_LoadImage("Media/Graphics/Bricks/gold.png",1,c_Image.m_DefaultFlags);
	this.m_img_destroyedBrick=bb_graphics_LoadImage("Media/Graphics/Bricks/destroyed.png",1,c_Image.m_DefaultFlags);
	this.m_img_player=bb_graphics_LoadImage("Media/Graphics/Player/player.png",1,c_Image.m_DefaultFlags);
	this.m_img_pickaxe=bb_graphics_LoadImage("Media/Graphics/Items/pickaxe.png",1,c_Image.m_DefaultFlags);
	this.m_img_sky=bb_graphics_LoadImage("Media/Graphics/Backgrounds/Sky.png",1,c_Image.m_DefaultFlags);
	this.m_img_dpad=bb_graphics_LoadImage("Media/Graphics/GUI/D-Pad.png",1,c_Image.m_DefaultFlags);
	this.m_img_bModeEnabled=bb_graphics_LoadImage("Media/Graphics/GUI/BuildMode_Selected.png",1,c_Image.m_DefaultFlags);
	this.m_img_bModeDisabled=bb_graphics_LoadImage("Media/Graphics/GUI/BuildMode_Deselected.png",1,c_Image.m_DefaultFlags);
	this.m_img_button=bb_graphics_LoadImage("Media/Graphics/GUI/Button.png",1,c_Image.m_DefaultFlags);
	bb_super_miner_generateMap();
	this.m_player.p_Fog();
	return 0;
}
c_Game.prototype.p_OnUpdate=function(){
	this.m_player.p_Input();
	this.m_player.p_Update();
	return 0;
}
c_Game.prototype.p_drawMap=function(){
	var t_x=bb_super_miner_offsetX*-1.0;
	var t_y=bb_super_miner_offsetY*-1.0;
	while(t_y<bb_super_miner_offsetY*-1.0+512.0){
		while(t_x<bb_super_miner_offsetX*-1.0+832.0){
			var t_b=bb_super_miner_mapList.p_Get(String(t_x)+"_"+String(t_y));
			if(t_b!=null){
				if(t_b.m_broken==false){
					if(t_b.m_fog==false){
						if(t_b.m_y==256.0){
							bb_graphics_DrawImage(this.m_img_grassBrick,t_b.m_x,t_b.m_y,0);
						}else{
							if(t_b.m_type==0){
								bb_graphics_DrawImage(this.m_img_dirtBrick,t_b.m_x,t_b.m_y,0);
							}else{
								if(t_b.m_type==1){
									bb_graphics_DrawImage(this.m_img_coalBrick,t_b.m_x,t_b.m_y,0);
								}else{
									if(t_b.m_type==2){
										bb_graphics_DrawImage(this.m_img_silverBrick,t_b.m_x,t_b.m_y,0);
									}else{
										if(t_b.m_type==3){
											bb_graphics_DrawImage(this.m_img_goldBrick,t_b.m_x,t_b.m_y,0);
										}
									}
								}
							}
						}
					}
				}else{
					if(t_b.m_fog==false){
						bb_graphics_DrawImage(this.m_img_destroyedBrick,t_b.m_x,t_b.m_y,0);
					}
				}
			}
			t_x=t_x+64.0;
		}
		t_x=bb_super_miner_offsetX*-1.0;
		t_y=t_y+64.0;
	}
}
c_Game.prototype.p_drawSky=function(){
	if(this.m_player.m_y-bb_super_miner_offsetY<480.0){
		bb_graphics_DrawImage(this.m_img_sky,this.m_player.m_x-bb_super_miner_offsetX-384.0,-64.0,0);
	}
}
c_Game.prototype.p_OnRender=function(){
	bb_autofit_UpdateVirtualDisplay(true,true);
	bb_graphics_Cls(0.0,0.0,0.0);
	bb_graphics_Translate(bb_super_miner_offsetX,bb_super_miner_offsetY);
	this.p_drawMap();
	this.p_drawSky();
	this.m_player.p_Draw(this.m_img_player,this.m_img_pickaxe);
	bb_graphics_SetAlpha(0.35);
	bb_graphics_DrawImage(this.m_img_dpad,bb_super_miner_offsetX*-1.0+10.0,bb_super_miner_offsetY*-1.0+260.0,0);
	if(bb_super_miner_buildMode==true){
		bb_graphics_SetAlpha(1.0);
		for(var t_fx=0;t_fx<=13;t_fx=t_fx+1){
			bb_graphics_DrawRect(bb_super_miner_offsetX*-1.0+(t_fx*64),bb_super_miner_offsetY*-1.0,1.0,512.0);
			if(t_fx<8){
				bb_graphics_DrawRect(bb_super_miner_offsetX*-1.0,bb_super_miner_offsetY*-1.0+(t_fx*64),832.0,1.0);
			}
		}
		bb_graphics_DrawImage(this.m_img_button,bb_super_miner_offsetX*-1.0+505.0,bb_super_miner_offsetY*-1.0+377.0,0);
		bb_graphics_DrawImage(this.m_img_bModeEnabled,bb_super_miner_offsetX*-1.0+517.0,bb_super_miner_offsetY*-1.0+389.0,0);
		bb_graphics_DrawImage(this.m_img_button,bb_super_miner_offsetX*-1.0+249.0,bb_super_miner_offsetY*-1.0+377.0,0);
		if(bb_super_miner_selectedBrick==0){
			bb_graphics_DrawImage(this.m_img_dirtBrick,bb_super_miner_offsetX*-1.0+256.0,bb_super_miner_offsetY*-1.0+384.0,0);
		}
	}else{
		if(bb_super_miner_buildMode==false){
			bb_graphics_DrawImage(this.m_img_button,bb_super_miner_offsetX*-1.0+505.0,bb_super_miner_offsetY*-1.0+377.0,0);
			bb_graphics_DrawImage(this.m_img_bModeDisabled,bb_super_miner_offsetX*-1.0+517.0,bb_super_miner_offsetY*-1.0+389.0,0);
		}
	}
	bb_graphics_SetAlpha(1.0);
	return 0;
}
var bb_app__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	this.m__graphics=(new gxtkGraphics);
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	bb_graphics_SetFont(null,32);
	this.m__audio=(new gxtkAudio);
	bb_audio_SetAudioDevice(this.m__audio);
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	bb_input_SetInputDevice(this.m__input);
	bb_app__app.p_OnCreate();
}
c_GameDelegate.prototype.SuspendGame=function(){
	bb_app__app.p_OnSuspend();
	this.m__audio.Suspend();
}
c_GameDelegate.prototype.ResumeGame=function(){
	this.m__audio.Resume();
	bb_app__app.p_OnResume();
}
c_GameDelegate.prototype.UpdateGame=function(){
	this.m__input.p_BeginUpdate();
	bb_app__app.p_OnUpdate();
	this.m__input.p_EndUpdate();
}
c_GameDelegate.prototype.RenderGame=function(){
	var t_mode=this.m__graphics.BeginRender();
	if((t_mode)!=0){
		bb_graphics_BeginRender();
	}
	if(t_mode==2){
		bb_app__app.p_OnLoading();
	}else{
		bb_app__app.p_OnRender();
	}
	if((t_mode)!=0){
		bb_graphics_EndRender();
	}
	this.m__graphics.EndRender();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	this.m__input.p_KeyEvent(t_event,t_data);
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	this.m__graphics.DiscardGraphics();
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	c_Game.m_new.call(new c_Game);
	return 0;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	bb_graphics_device=t_dev;
	return 0;
}
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	this.m_tx=t_tx;
	this.m_ty=t_ty;
	this.m_flags=this.m_flags&-2;
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	this.m_flags=t_iflags;
	if((this.m_flags&2)!=0){
		var t_=this.m_frames;
		var t_2=0;
		while(t_2<t_.length){
			var t_f=t_[t_2];
			t_2=t_2+1;
			t_f.m_x+=1;
		}
		this.m_width-=2;
	}
	if((this.m_flags&4)!=0){
		var t_3=this.m_frames;
		var t_4=0;
		while(t_4<t_3.length){
			var t_f2=t_3[t_4];
			t_4=t_4+1;
			t_f2.m_y+=1;
		}
		this.m_height-=2;
	}
	if((this.m_flags&1)!=0){
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	if(this.m_frames.length==1 && this.m_frames[0].m_x==0 && this.m_frames[0].m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		this.m_flags|=65536;
	}
	return 0;
}
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
	this.m_surface=t_surf;
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	this.m_height=this.m_surface.Height();
	this.m_frames=new_object_array(t_nframes);
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Grab=function(t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_source){
	this.m_source=t_source;
	this.m_surface=t_source.m_surface;
	this.m_width=t_iwidth;
	this.m_height=t_iheight;
	this.m_frames=new_object_array(t_nframes);
	var t_ix=t_x;
	var t_iy=t_y;
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		if(t_ix+this.m_width>t_source.m_width){
			t_ix=0;
			t_iy+=this.m_height;
		}
		if(t_ix+this.m_width>t_source.m_width || t_iy+this.m_height>t_source.m_height){
			error("Image frame outside surface");
		}
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_ix+t_source.m_frames[0].m_x,t_iy+t_source.m_frames[0].m_y);
		t_ix+=this.m_width;
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_GrabImage=function(t_x,t_y,t_width,t_height,t_frames,t_flags){
	if(this.m_frames.length!=1){
		return null;
	}
	return (c_Image.m_new.call(new c_Image)).p_Grab(t_x,t_y,t_width,t_height,t_frames,t_flags,this);
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_firstChar=0;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
	this.m_matrixStack=new_number_array(192);
}
c_GraphicsContext.m_new=function(){
	return this;
}
c_GraphicsContext.prototype.p_Validate=function(){
	if((this.m_matDirty)!=0){
		bb_graphics_renderDevice.SetMatrix(bb_graphics_context.m_ix,bb_graphics_context.m_iy,bb_graphics_context.m_jx,bb_graphics_context.m_jy,bb_graphics_context.m_tx,bb_graphics_context.m_ty);
		this.m_matDirty=0;
	}
	return 0;
}
var bb_graphics_context=null;
function bb_data_FixDataPath(t_path){
	var t_i=t_path.indexOf(":/",0);
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		return t_path;
	}
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		return t_path;
	}
	return "monkey://data/"+t_path;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	this.m_x=t_x;
	this.m_y=t_y;
	return this;
}
c_Frame.m_new2=function(){
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
	}
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	var t_atlas=bb_graphics_LoadImage(t_path,1,0);
	if((t_atlas)!=null){
		return t_atlas.p_GrabImage(0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags);
	}
	return null;
}
function bb_graphics_SetFont(t_font,t_firstChar){
	if(!((t_font)!=null)){
		if(!((bb_graphics_context.m_defaultFont)!=null)){
			bb_graphics_context.m_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		t_font=bb_graphics_context.m_defaultFont;
		t_firstChar=32;
	}
	bb_graphics_context.m_font=t_font;
	bb_graphics_context.m_firstChar=t_firstChar;
	return 0;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	bb_audio_device=t_dev;
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		this.m__joyStates[t_i]=c_JoyState.m_new.call(new c_JoyState);
	}
	return this;
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		var t_state=this.m__joyStates[t_i];
		if(!BBGame.Game().PollJoystick(t_i,t_state.m_joyx,t_state.m_joyy,t_state.m_joyz,t_state.m_buttons)){
			break;
		}
		for(var t_j=0;t_j<32;t_j=t_j+1){
			var t_key=256+t_i*32+t_j;
			if(t_state.m_buttons[t_j]){
				if(!this.m__keyDown[t_key]){
					this.m__keyDown[t_key]=true;
					this.m__keyHit[t_key]+=1;
				}
			}else{
				this.m__keyDown[t_key]=false;
			}
		}
	}
}
c_InputDevice.prototype.p_EndUpdate=function(){
	for(var t_i=0;t_i<512;t_i=t_i+1){
		this.m__keyHit[t_i]=0;
	}
	this.m__charGet=0;
	this.m__charPut=0;
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	var t_=t_event;
	if(t_==1){
		this.m__keyDown[t_data]=true;
		this.m__keyHit[t_data]+=1;
		if(t_data==1){
			this.m__keyDown[384]=true;
			this.m__keyHit[384]+=1;
		}else{
			if(t_data==384){
				this.m__keyDown[1]=true;
				this.m__keyHit[1]+=1;
			}
		}
	}else{
		if(t_==2){
			this.m__keyDown[t_data]=false;
			if(t_data==1){
				this.m__keyDown[384]=false;
			}else{
				if(t_data==384){
					this.m__keyDown[1]=false;
				}
			}
		}else{
			if(t_==3){
				if(this.m__charPut<this.m__charQueue.length){
					this.m__charQueue[this.m__charPut]=t_data;
					this.m__charPut+=1;
				}
			}
		}
	}
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y){
	var t_=t_event;
	if(t_==4){
		this.p_KeyEvent(1,1+t_data);
	}else{
		if(t_==5){
			this.p_KeyEvent(2,1+t_data);
			return;
		}else{
			if(t_==6){
			}else{
				return;
			}
		}
	}
	this.m__mouseX=t_x;
	this.m__mouseY=t_y;
	this.m__touchX[0]=t_x;
	this.m__touchY[0]=t_y;
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	var t_=t_event;
	if(t_==7){
		this.p_KeyEvent(1,384+t_data);
	}else{
		if(t_==8){
			this.p_KeyEvent(2,384+t_data);
			return;
		}else{
			if(t_==9){
			}else{
				return;
			}
		}
	}
	this.m__touchX[t_data]=t_x;
	this.m__touchY[t_data]=t_y;
	if(t_data==0){
		this.m__mouseX=t_x;
		this.m__mouseY=t_y;
	}
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	var t_=t_event;
	if(t_==10){
	}else{
		return;
	}
	this.m__accelX=t_x;
	this.m__accelY=t_y;
	this.m__accelZ=t_z;
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyDown[t_key];
	}
	return false;
}
c_InputDevice.prototype.p_TouchX=function(t_index){
	if(t_index>=0 && t_index<32){
		return this.m__touchX[t_index];
	}
	return .0;
}
c_InputDevice.prototype.p_TouchY=function(t_index){
	if(t_index>=0 && t_index<32){
		return this.m__touchY[t_index];
	}
	return .0;
}
c_InputDevice.prototype.p_KeyHit=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyHit[t_key];
	}
	return 0;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	bb_input_device=t_dev;
	return 0;
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	bb_graphics_context.m_ix=t_ix;
	bb_graphics_context.m_iy=t_iy;
	bb_graphics_context.m_jx=t_jx;
	bb_graphics_context.m_jy=t_jy;
	bb_graphics_context.m_tx=t_tx;
	bb_graphics_context.m_ty=t_ty;
	bb_graphics_context.m_tformed=((t_ix!=1.0 || t_iy!=.0 || t_jx!=.0 || t_jy!=1.0 || t_tx!=.0 || t_ty!=.0)?1:0);
	bb_graphics_context.m_matDirty=1;
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	bb_graphics_SetMatrix(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	bb_graphics_context.m_color_r=t_r;
	bb_graphics_context.m_color_g=t_g;
	bb_graphics_context.m_color_b=t_b;
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	bb_graphics_context.m_alpha=t_alpha;
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	bb_graphics_context.m_blend=t_blend;
	bb_graphics_renderDevice.SetBlend(t_blend);
	return 0;
}
function bb_graphics_DeviceWidth(){
	return bb_graphics_device.Width();
}
function bb_graphics_DeviceHeight(){
	return bb_graphics_device.Height();
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	bb_graphics_context.m_scissor_x=t_x;
	bb_graphics_context.m_scissor_y=t_y;
	bb_graphics_context.m_scissor_width=t_width;
	bb_graphics_context.m_scissor_height=t_height;
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	return 0;
}
function bb_graphics_BeginRender(){
	bb_graphics_renderDevice=bb_graphics_device;
	bb_graphics_context.m_matrixSp=0;
	bb_graphics_SetMatrix(1.0,.0,.0,1.0,.0,.0);
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetBlend(0);
	bb_graphics_SetScissor(.0,.0,(bb_graphics_DeviceWidth()),(bb_graphics_DeviceHeight()));
	return 0;
}
function bb_graphics_EndRender(){
	bb_graphics_renderDevice=null;
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	bb_app__updateRate=t_hertz;
	bb_app__game.SetUpdateRate(t_hertz);
	return 0;
}
function c_VirtualDisplay(){
	Object.call(this);
	this.m_vwidth=.0;
	this.m_vheight=.0;
	this.m_vzoom=.0;
	this.m_lastvzoom=.0;
	this.m_vratio=.0;
	this.m_multi=.0;
	this.m_lastdevicewidth=0;
	this.m_lastdeviceheight=0;
	this.m_device_changed=0;
	this.m_fdw=.0;
	this.m_fdh=.0;
	this.m_dratio=.0;
	this.m_heightborder=.0;
	this.m_widthborder=.0;
	this.m_zoom_changed=0;
	this.m_realx=.0;
	this.m_realy=.0;
	this.m_offx=.0;
	this.m_offy=.0;
	this.m_sx=.0;
	this.m_sw=.0;
	this.m_sy=.0;
	this.m_sh=.0;
	this.m_scaledw=.0;
	this.m_scaledh=.0;
	this.m_vxoff=.0;
	this.m_vyoff=.0;
}
c_VirtualDisplay.m_Display=null;
c_VirtualDisplay.m_new=function(t_width,t_height,t_zoom){
	this.m_vwidth=(t_width);
	this.m_vheight=(t_height);
	this.m_vzoom=t_zoom;
	this.m_lastvzoom=this.m_vzoom+1.0;
	this.m_vratio=this.m_vheight/this.m_vwidth;
	c_VirtualDisplay.m_Display=this;
	return this;
}
c_VirtualDisplay.m_new2=function(){
	return this;
}
c_VirtualDisplay.prototype.p_VTouchX=function(t_index,t_limit){
	var t_touchoffset=bb_input_TouchX(t_index)-(bb_graphics_DeviceWidth())*0.5;
	var t_x=t_touchoffset/this.m_multi/this.m_vzoom+bb_autofit_VDeviceWidth()*0.5;
	if(t_limit){
		var t_widthlimit=this.m_vwidth-1.0;
		if(t_x>.0){
			if(t_x<t_widthlimit){
				return t_x;
			}else{
				return t_widthlimit;
			}
		}else{
			return .0;
		}
	}else{
		return t_x;
	}
}
c_VirtualDisplay.prototype.p_VTouchY=function(t_index,t_limit){
	var t_touchoffset=bb_input_TouchY(t_index)-(bb_graphics_DeviceHeight())*0.5;
	var t_y=t_touchoffset/this.m_multi/this.m_vzoom+bb_autofit_VDeviceHeight()*0.5;
	if(t_limit){
		var t_heightlimit=this.m_vheight-1.0;
		if(t_y>.0){
			if(t_y<t_heightlimit){
				return t_y;
			}else{
				return t_heightlimit;
			}
		}else{
			return .0;
		}
	}else{
		return t_y;
	}
}
c_VirtualDisplay.prototype.p_UpdateVirtualDisplay=function(t_zoomborders,t_keepborders){
	if(bb_graphics_DeviceWidth()!=this.m_lastdevicewidth || bb_graphics_DeviceHeight()!=this.m_lastdeviceheight){
		this.m_lastdevicewidth=bb_graphics_DeviceWidth();
		this.m_lastdeviceheight=bb_graphics_DeviceHeight();
		this.m_device_changed=1;
	}
	if((this.m_device_changed)!=0){
		this.m_fdw=(bb_graphics_DeviceWidth());
		this.m_fdh=(bb_graphics_DeviceHeight());
		this.m_dratio=this.m_fdh/this.m_fdw;
		if(this.m_dratio>this.m_vratio){
			this.m_multi=this.m_fdw/this.m_vwidth;
			this.m_heightborder=(this.m_fdh-this.m_vheight*this.m_multi)*0.5;
			this.m_widthborder=.0;
		}else{
			this.m_multi=this.m_fdh/this.m_vheight;
			this.m_widthborder=(this.m_fdw-this.m_vwidth*this.m_multi)*0.5;
			this.m_heightborder=.0;
		}
	}
	if(this.m_vzoom!=this.m_lastvzoom){
		this.m_lastvzoom=this.m_vzoom;
		this.m_zoom_changed=1;
	}
	if(((this.m_zoom_changed)!=0) || ((this.m_device_changed)!=0)){
		if(t_zoomborders){
			this.m_realx=this.m_vwidth*this.m_vzoom*this.m_multi;
			this.m_realy=this.m_vheight*this.m_vzoom*this.m_multi;
			this.m_offx=(this.m_fdw-this.m_realx)*0.5;
			this.m_offy=(this.m_fdh-this.m_realy)*0.5;
			if(t_keepborders){
				if(this.m_offx<this.m_widthborder){
					this.m_sx=this.m_widthborder;
					this.m_sw=this.m_fdw-this.m_widthborder*2.0;
				}else{
					this.m_sx=this.m_offx;
					this.m_sw=this.m_fdw-this.m_offx*2.0;
				}
				if(this.m_offy<this.m_heightborder){
					this.m_sy=this.m_heightborder;
					this.m_sh=this.m_fdh-this.m_heightborder*2.0;
				}else{
					this.m_sy=this.m_offy;
					this.m_sh=this.m_fdh-this.m_offy*2.0;
				}
			}else{
				this.m_sx=this.m_offx;
				this.m_sw=this.m_fdw-this.m_offx*2.0;
				this.m_sy=this.m_offy;
				this.m_sh=this.m_fdh-this.m_offy*2.0;
			}
			this.m_sx=bb_math_Max2(0.0,this.m_sx);
			this.m_sy=bb_math_Max2(0.0,this.m_sy);
			this.m_sw=bb_math_Min2(this.m_sw,this.m_fdw);
			this.m_sh=bb_math_Min2(this.m_sh,this.m_fdh);
		}else{
			this.m_sx=bb_math_Max2(0.0,this.m_widthborder);
			this.m_sy=bb_math_Max2(0.0,this.m_heightborder);
			this.m_sw=bb_math_Min2(this.m_fdw-this.m_widthborder*2.0,this.m_fdw);
			this.m_sh=bb_math_Min2(this.m_fdh-this.m_heightborder*2.0,this.m_fdh);
		}
		this.m_scaledw=this.m_vwidth*this.m_multi*this.m_vzoom;
		this.m_scaledh=this.m_vheight*this.m_multi*this.m_vzoom;
		this.m_vxoff=(this.m_fdw-this.m_scaledw)*0.5;
		this.m_vyoff=(this.m_fdh-this.m_scaledh)*0.5;
		this.m_vxoff=this.m_vxoff/this.m_multi/this.m_vzoom;
		this.m_vyoff=this.m_vyoff/this.m_multi/this.m_vzoom;
		this.m_device_changed=0;
		this.m_zoom_changed=0;
	}
	bb_graphics_SetScissor(.0,.0,(bb_graphics_DeviceWidth()),(bb_graphics_DeviceHeight()));
	bb_graphics_Cls(.0,.0,.0);
	bb_graphics_SetScissor(this.m_sx,this.m_sy,this.m_sw,this.m_sh);
	bb_graphics_Scale(this.m_multi*this.m_vzoom,this.m_multi*this.m_vzoom);
	if((this.m_vzoom)!=0.0){
		bb_graphics_Translate(this.m_vxoff,this.m_vyoff);
	}
	return 0;
}
function bb_autofit_SetVirtualDisplay(t_width,t_height,t_zoom){
	c_VirtualDisplay.m_new.call(new c_VirtualDisplay,t_width,t_height,t_zoom);
	return 0;
}
function c_player(){
	Object.call(this);
	this.m_x=.0;
	this.m_y=.0;
	this.m_direction=0;
	this.m_lastInput=0;
	this.m_isJumping=false;
	this.m_jumpStart=0;
	this.m_isFalling=false;
	this.m_lastFall=0;
	this.m_isMining=false;
	this.m_miningStart=0;
	this.m_miningTimer=0;
	this.m_pickaxeX=.0;
	this.m_pickaxeY=.0;
	this.m_brickMined=null;
}
c_player.m_new=function(t_xLoc,t_yLoc){
	this.m_x=t_xLoc;
	this.m_y=t_yLoc;
	this.m_direction=0;
	this.m_lastInput=0;
	this.m_isJumping=false;
	this.m_jumpStart=0;
	this.m_isFalling=false;
	this.m_lastFall=0;
	this.m_isMining=false;
	this.m_miningStart=0;
	this.m_miningTimer=0;
	this.m_pickaxeX=0.0;
	this.m_pickaxeY=0.0;
	return this;
}
c_player.m_new2=function(){
	return this;
}
c_player.prototype.p_Fog=function(){
	var t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX-128.0)+"_"+String(this.m_y-bb_super_miner_offsetY));
	if(t_b!=null){
		t_b.m_fog=false;
	}
	t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX-64.0)+"_"+String(this.m_y-bb_super_miner_offsetY));
	if(t_b!=null){
		t_b.m_fog=false;
	}
	t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX+64.0)+"_"+String(this.m_y-bb_super_miner_offsetY));
	if(t_b!=null){
		t_b.m_fog=false;
	}
	t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX+128.0)+"_"+String(this.m_y-bb_super_miner_offsetY));
	if(t_b!=null){
		t_b.m_fog=false;
	}
	t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX-64.0)+"_"+String(this.m_y-bb_super_miner_offsetY-64.0));
	if(t_b!=null){
		t_b.m_fog=false;
	}
	t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX)+"_"+String(this.m_y-bb_super_miner_offsetY-64.0));
	if(t_b!=null){
		t_b.m_fog=false;
	}
	t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX+64.0)+"_"+String(this.m_y-bb_super_miner_offsetY-64.0));
	if(t_b!=null){
		t_b.m_fog=false;
	}
	t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX)+"_"+String(this.m_y-bb_super_miner_offsetY-128.0));
	if(t_b!=null){
		t_b.m_fog=false;
	}
	t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX-64.0)+"_"+String(this.m_y-bb_super_miner_offsetY+64.0));
	if(t_b!=null){
		t_b.m_fog=false;
	}
	t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX)+"_"+String(this.m_y-bb_super_miner_offsetY+64.0));
	if(t_b!=null){
		t_b.m_fog=false;
	}
	t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX+64.0)+"_"+String(this.m_y-bb_super_miner_offsetY+64.0));
	if(t_b!=null){
		t_b.m_fog=false;
	}
	t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX)+"_"+String(this.m_y-bb_super_miner_offsetY+128.0));
	if(t_b!=null){
		t_b.m_fog=false;
	}
}
c_player.prototype.p_checkCollisions=function(t_direction){
	var t_b=null;
	if(t_direction==1){
		t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX+64.0)+"_"+String(this.m_y-bb_super_miner_offsetY));
	}else{
		if(t_direction==3){
			t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX-64.0)+"_"+String(this.m_y-bb_super_miner_offsetY));
		}else{
			if(t_direction==2){
				t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX)+"_"+String(this.m_y-bb_super_miner_offsetY-64.0));
			}else{
				if(t_direction==0){
					t_b=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX)+"_"+String(this.m_y-bb_super_miner_offsetY+64.0));
				}
			}
		}
	}
	if(t_b==null || t_b.m_broken==true){
		return false;
	}else{
		return true;
	}
}
c_player.prototype.p_Mine=function(t_t){
	var t_x=Math.floor((bb_autofit_VTouchX(t_t,true)-bb_super_miner_offsetX)/64.0);
	t_x=t_x*64.0;
	var t_y=Math.floor((bb_autofit_VTouchY(t_t,true)-bb_super_miner_offsetY)/64.0);
	t_y=t_y*64.0;
	var t_b=bb_super_miner_mapList.p_Get(String(t_x)+"_"+String(t_y));
	if(t_b!=null){
		if(t_b.m_broken==false){
			if(t_b.m_x>=this.m_x-bb_super_miner_offsetX-64.0){
				if(t_b.m_x<=this.m_x-bb_super_miner_offsetX+64.0){
					if(t_b.m_y>=this.m_y-bb_super_miner_offsetY-64.0){
						if(t_b.m_y<=this.m_y-bb_super_miner_offsetY+64.0){
							this.m_brickMined=t_b;
							this.m_pickaxeX=t_x;
							this.m_pickaxeY=t_y;
							this.m_isMining=true;
							this.m_miningStart=bb_app_Millisecs();
							if(t_b.m_type==0){
								this.m_miningTimer=750;
							}else{
								this.m_miningTimer=750;
							}
						}
					}
				}
			}
		}
	}
}
c_player.prototype.p_Input=function(){
	if(bb_app_Millisecs()>=this.m_lastInput+200){
		if(this.m_isMining==false && bb_super_miner_buildMode==false){
			if(((bb_input_KeyDown(39))!=0) || ((bb_input_KeyDown(68))!=0) || bb_super_miner_checkTouchInput(1)){
				if(this.p_checkCollisions(1)==false){
					bb_super_miner_offsetX=bb_super_miner_offsetX-64.0;
					this.m_direction=1;
					this.m_lastInput=bb_app_Millisecs();
					this.p_Fog();
				}
			}
			if(((bb_input_KeyDown(37))!=0) || ((bb_input_KeyDown(65))!=0) || bb_super_miner_checkTouchInput(3)){
				if(this.p_checkCollisions(3)==false){
					bb_super_miner_offsetX=bb_super_miner_offsetX+64.0;
					this.m_direction=3;
					this.m_lastInput=bb_app_Millisecs();
					this.p_Fog();
				}
			}
			if(((bb_input_KeyDown(32))!=0) || ((bb_input_KeyDown(87))!=0) || ((bb_input_KeyDown(38))!=0) || bb_super_miner_checkTouchInput(2)){
				if(this.m_isJumping==false){
					if(this.p_checkCollisions(2)==false){
						bb_super_miner_offsetY=bb_super_miner_offsetY+64.0;
						this.m_direction=2;
						this.m_lastInput=bb_app_Millisecs();
						this.m_jumpStart=bb_app_Millisecs();
						this.m_isJumping=true;
						this.p_Fog();
					}
				}
			}
			if(((bb_input_KeyDown(40))!=0) || ((bb_input_KeyDown(83))!=0) || bb_super_miner_checkTouchInput(0)){
				if(this.p_checkCollisions(0)==false){
					bb_super_miner_offsetY=bb_super_miner_offsetY-64.0;
					this.m_direction=0;
					this.m_lastInput=bb_app_Millisecs();
					this.p_Fog();
				}
			}
			if((bb_input_TouchHit(0))!=0){
				this.p_Mine(0);
			}
			if((bb_input_KeyHit(112))!=0){
				var t_start=bb_app_Millisecs();
				bb_super_miner_saveMap();
				print("Map Saved In: "+String(bb_app_Millisecs()-t_start));
			}
			if((bb_input_KeyHit(113))!=0){
				var t_start2=bb_app_Millisecs();
				bb_super_miner_loadMap();
				print("Map Loaded In: "+String(bb_app_Millisecs()-t_start2));
			}
		}
		if(this.m_isMining==false){
			if(((bb_input_KeyHit(13))!=0) || bb_super_miner_checkTouchInput(4)){
				if(bb_app_Millisecs()>=bb_super_miner_lastBuildModeHit+150){
					if(bb_super_miner_buildMode==false){
						bb_super_miner_buildMode=true;
					}else{
						if(bb_super_miner_buildMode==true){
							bb_super_miner_buildMode=false;
						}
					}
					bb_super_miner_lastBuildModeHit=bb_app_Millisecs();
				}
			}
		}
		if(bb_super_miner_buildMode==true){
			for(var t_i=0;t_i<=4;t_i=t_i+1){
				if((bb_input_TouchHit(t_i))!=0){
					var t_x=Math.floor((bb_autofit_VTouchX(t_i,true)-bb_super_miner_offsetX)/64.0);
					t_x=t_x*64.0;
					var t_y=Math.floor((bb_autofit_VTouchY(t_i,true)-bb_super_miner_offsetY)/64.0);
					t_y=t_y*64.0;
					var t_b=bb_super_miner_mapList.p_Get(String(t_x)+"_"+String(t_y));
					if(t_b==null){
						t_b=c_brick.m_new.call(new c_brick,bb_super_miner_selectedBrick,t_x,t_y,false);
						t_b.m_type=bb_super_miner_selectedBrick;
						t_b.m_broken=false;
						t_b.m_fog=false;
						bb_super_miner_mapList.p_Set(String(t_x)+"_"+String(t_y),t_b);
					}else{
						if(t_b.m_broken==true){
							t_b.m_type=bb_super_miner_selectedBrick;
							t_b.m_broken=false;
							t_b.m_fog=false;
							bb_super_miner_mapList.p_Set(String(t_x)+"_"+String(t_y),t_b);
						}
					}
				}
			}
		}
	}
}
c_player.prototype.p_Update=function(){
	if(bb_super_miner_buildMode==false){
		if(this.m_isJumping==true){
			if(bb_app_Millisecs()>=this.m_jumpStart+500){
				this.m_isJumping=false;
			}
		}
		if(this.m_isJumping==false){
			if(bb_app_Millisecs()>=this.m_lastFall+150){
				var t_brickBelow=bb_super_miner_mapList.p_Get(String(this.m_x-bb_super_miner_offsetX)+"_"+String(this.m_y-bb_super_miner_offsetY+64.0));
				if(t_brickBelow==null || t_brickBelow.m_broken==true){
					bb_super_miner_offsetY=bb_super_miner_offsetY-64.0;
					this.m_direction=0;
					this.m_lastFall=bb_app_Millisecs();
					this.m_lastInput=bb_app_Millisecs();
					this.p_Fog();
				}
			}
		}
		if(this.m_isMining==true){
			if(bb_app_Millisecs()>=this.m_miningStart+this.m_miningTimer){
				this.m_brickMined.m_broken=true;
				this.m_isMining=false;
			}
		}
	}
}
c_player.prototype.p_Draw=function(t_playerImage,t_pickaxeImage){
	bb_graphics_DrawImage(t_playerImage,this.m_x-bb_super_miner_offsetX,this.m_y-bb_super_miner_offsetY,0);
	if(this.m_isMining==true){
		bb_graphics_DrawImage(t_pickaxeImage,this.m_pickaxeX,this.m_pickaxeY,0);
	}
}
function c_brick(){
	Object.call(this);
	this.m_type=0;
	this.m_broken=false;
	this.m_x=.0;
	this.m_y=.0;
	this.m_fog=false;
}
c_brick.m_new=function(t_t,t_xLoc,t_yLoc,t_v){
	this.m_type=t_t;
	this.m_x=t_xLoc;
	this.m_y=t_yLoc;
	this.m_broken=t_v;
	if(this.m_y==256.0){
		this.m_fog=false;
	}else{
		this.m_fog=true;
	}
	return this;
}
c_brick.m_new2=function(){
	return this;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map.prototype.p_RotateLeft=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map.prototype.p_Set=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map.prototype.p_Count=function(){
	if((this.m_root)!=null){
		return this.m_root.p_Count2(0);
	}
	return 0;
}
c_Map.prototype.p_Values=function(){
	return c_MapValues.m_new.call(new c_MapValues,this);
}
c_Map.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
function c_StringMap(){
	c_Map.call(this);
}
c_StringMap.prototype=extend_class(c_Map);
c_StringMap.m_new=function(){
	c_Map.m_new.call(this);
	return this;
}
c_StringMap.prototype.p_Compare=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
var bb_super_miner_mapList=null;
var bb_super_miner_offsetX=0;
var bb_super_miner_offsetY=0;
function bb_app_GetDate(t_date){
	bb_app__game.GetDate(t_date);
	return 0;
}
function bb_app_GetDate2(){
	var t_date=new_number_array(7);
	bb_app_GetDate(t_date);
	return t_date;
}
function bb_app_Millisecs(){
	return bb_app__game.Millisecs();
}
var bb_random_Seed=0;
function c_Node(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node.m_new2=function(){
	return this;
}
c_Node.prototype.p_Count2=function(t_n){
	if((this.m_left)!=null){
		t_n=this.m_left.p_Count2(t_n);
	}
	if((this.m_right)!=null){
		t_n=this.m_right.p_Count2(t_n);
	}
	return t_n+1;
}
c_Node.prototype.p_NextNode=function(){
	var t_node=null;
	if((this.m_right)!=null){
		t_node=this.m_right;
		while((t_node.m_left)!=null){
			t_node=t_node.m_left;
		}
		return t_node;
	}
	t_node=this;
	var t_parent=this.m_parent;
	while(((t_parent)!=null) && t_node==t_parent.m_right){
		t_node=t_parent;
		t_parent=t_parent.m_parent;
	}
	return t_parent;
}
function bb_random_Rnd(){
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	return (bb_random_Seed>>8&16777215)/16777216.0;
}
function bb_random_Rnd2(t_low,t_high){
	return bb_random_Rnd3(t_high-t_low)+t_low;
}
function bb_random_Rnd3(t_range){
	return bb_random_Rnd()*t_range;
}
function bb_super_miner_generateMap(){
	var t_rndSeed=0;
	var t_da=bb_app_GetDate2();
	for(var t_i=0;t_i<=6;t_i=t_i+1){
		t_rndSeed=t_rndSeed+t_da[t_i];
	}
	bb_random_Seed=t_rndSeed+bb_app_Millisecs();
	print("SEED:"+String(bb_random_Seed));
	var t_d=0;
	var t_c=0;
	var t_s=0;
	var t_g=0;
	var t_e=0;
	var t_size=200;
	var t_x=((t_size/2)|0)*64.0*-1.0;
	var t_y=256.0;
	for(var t_i2=0;t_i2<=t_size+50-1;t_i2=t_i2+1){
		for(var t_i22=0;t_i22<=t_size-1;t_i22=t_i22+1){
			var t_b=null;
			if(t_y>256.0){
				var t_b1=bb_super_miner_mapList.p_Get(String(t_x-64.0)+"_"+String(t_y));
				var t_b2=bb_super_miner_mapList.p_Get(String(t_x-64.0)+"_"+String(t_y-64.0));
				var t_b3=bb_super_miner_mapList.p_Get(String(t_x)+"_"+String(t_y-64.0));
				var t_b4=bb_super_miner_mapList.p_Get(String(t_x+64.0)+"_"+String(t_y-64.0));
				var t_rndType=0;
				if(t_b1!=null && t_b1.m_type!=0){
					t_rndType=t_b1.m_type;
				}else{
					if(t_b2!=null && t_b2.m_type!=0){
						t_rndType=t_b2.m_type;
					}else{
						if(t_b3!=null && t_b3.m_type!=0){
							t_rndType=t_b3.m_type;
						}else{
							if(t_b4!=null && t_b4.m_type!=0){
								t_rndType=t_b4.m_type;
							}else{
								var t_broke=false;
								if(t_b1!=null){
									if(t_b1.m_broken==true){
										t_rndType=10;
										t_broke=true;
									}
								}
								if(t_broke==false){
									if(t_b3!=null){
										if(t_b3.m_broken==true){
											t_rndType=10;
											t_broke=true;
										}
									}
								}
							}
						}
					}
				}
				if(t_rndType==0){
					var t_rndBrick=((bb_random_Rnd2(0.0,100.0))|0);
					if(t_rndBrick<=5.0){
						t_b=c_brick.m_new.call(new c_brick,1,t_x,t_y,false);
						t_c=t_c+1;
					}else{
						if(t_rndBrick>=6.0 && t_rndBrick<=8.0){
							t_b=c_brick.m_new.call(new c_brick,2,t_x,t_y,false);
							t_s=t_s+1;
						}else{
							if(t_rndBrick==9.0){
								t_b=c_brick.m_new.call(new c_brick,3,t_x,t_y,false);
								t_g=t_g+1;
							}else{
								if(t_rndBrick>=10.0 && t_rndBrick<=12.0){
									t_b=c_brick.m_new.call(new c_brick,0,t_x,t_y,true);
									t_e=t_e+1;
								}else{
									t_b=c_brick.m_new.call(new c_brick,0,t_x,t_y,false);
									t_d=t_d+1;
								}
							}
						}
					}
				}else{
					if(t_rndType==1){
						var t_rndBrick2=((bb_random_Rnd2(0.0,50.0))|0);
						if(t_rndBrick2<=5.0){
							t_b=c_brick.m_new.call(new c_brick,1,t_x,t_y,false);
							t_c=t_c+1;
						}else{
							t_b=c_brick.m_new.call(new c_brick,0,t_x,t_y,false);
							t_d=t_d+1;
						}
					}else{
						if(t_rndType==2){
							var t_rndBrick3=((bb_random_Rnd2(0.0,65.0))|0);
							if(t_rndBrick3<=5.0){
								t_b=c_brick.m_new.call(new c_brick,2,t_x,t_y,false);
								t_s=t_s+1;
							}else{
								t_b=c_brick.m_new.call(new c_brick,0,t_x,t_y,false);
								t_d=t_d+1;
							}
						}else{
							if(t_rndType==3){
								var t_rndBrick4=((bb_random_Rnd2(0.0,75.0))|0);
								if(t_rndBrick4<=5.0){
									t_b=c_brick.m_new.call(new c_brick,3,t_x,t_y,false);
									t_g=t_g+1;
								}else{
									t_b=c_brick.m_new.call(new c_brick,0,t_x,t_y,false);
									t_d=t_d+1;
								}
							}else{
								if(t_rndType==10){
									var t_rndBrick5=((bb_random_Rnd2(0.0,12.0))|0);
									if(t_rndBrick5<=5.0 && t_y>=384.0){
										t_b=c_brick.m_new.call(new c_brick,0,t_x,t_y,true);
										t_e=t_e+1;
									}else{
										t_b=c_brick.m_new.call(new c_brick,0,t_x,t_y,false);
										t_d=t_d+1;
									}
								}
							}
						}
					}
				}
			}else{
				if(t_y==256.0){
					t_b=c_brick.m_new.call(new c_brick,0,t_x,t_y,false);
					t_d=t_d+1;
				}
			}
			bb_super_miner_mapList.p_Set(String(t_x)+"_"+String(t_y),t_b);
			t_x=t_x+64.0;
		}
		t_x=((t_size/2)|0)*64.0*-1.0;
		t_y=t_y+64.0;
	}
	print("Dirt bricks: "+String(t_d));
	print("Coal bricks: "+String(t_c));
	print("Silver bricks: "+String(t_s));
	print("Gold bricks: "+String(t_g));
	print("Empty bricks: "+String(t_e));
	print("Total bricks: "+String(t_d+t_c+t_s+t_g+t_e));
}
var bb_super_miner_buildMode=false;
function bb_input_KeyDown(t_key){
	return ((bb_input_device.p_KeyDown(t_key))?1:0);
}
function bb_input_TouchDown(t_index){
	return ((bb_input_device.p_KeyDown(384+t_index))?1:0);
}
function bb_input_TouchX(t_index){
	return bb_input_device.p_TouchX(t_index);
}
function bb_autofit_VDeviceWidth(){
	return c_VirtualDisplay.m_Display.m_vwidth;
}
function bb_autofit_VTouchX(t_index,t_limit){
	return c_VirtualDisplay.m_Display.p_VTouchX(t_index,t_limit);
}
function bb_input_TouchY(t_index){
	return bb_input_device.p_TouchY(t_index);
}
function bb_autofit_VDeviceHeight(){
	return c_VirtualDisplay.m_Display.m_vheight;
}
function bb_autofit_VTouchY(t_index,t_limit){
	return c_VirtualDisplay.m_Display.p_VTouchY(t_index,t_limit);
}
function bb_super_miner_checkTouchInput(t_type){
	for(var t_i=0;t_i<=4;t_i=t_i+1){
		if((bb_input_TouchDown(t_i))!=0){
			if(t_type==1){
				for(var t_t=0;t_t<=4;t_t=t_t+1){
					if(bb_autofit_VTouchX(t_t,true)>=142.0){
						if(bb_autofit_VTouchX(t_t,true)<=217.0){
							if(bb_autofit_VTouchY(t_t,true)>=330.0){
								if(bb_autofit_VTouchY(t_t,true)<=397.0){
									return true;
								}
							}
						}
					}
				}
				return false;
			}else{
				if(t_type==3){
					for(var t_t2=0;t_t2<=4;t_t2=t_t2+1){
						if(bb_autofit_VTouchX(t_t2,true)>=9.0){
							if(bb_autofit_VTouchX(t_t2,true)<=79.0){
								if(bb_autofit_VTouchY(t_t2,true)>=330.0){
									if(bb_autofit_VTouchY(t_t2,true)<=397.0){
										return true;
									}
								}
							}
						}
					}
					return false;
				}else{
					if(t_type==2){
						for(var t_t3=0;t_t3<=4;t_t3=t_t3+1){
							if(bb_autofit_VTouchX(t_t3,true)>=79.0){
								if(bb_autofit_VTouchX(t_t3,true)<=142.0){
									if(bb_autofit_VTouchY(t_t3,true)>=260.0){
										if(bb_autofit_VTouchY(t_t3,true)<=330.0){
											return true;
										}
									}
								}
							}
						}
						return false;
					}else{
						if(t_type==0){
							for(var t_t4=0;t_t4<=4;t_t4=t_t4+1){
								if(bb_autofit_VTouchX(t_t4,true)>=79.0){
									if(bb_autofit_VTouchX(t_t4,true)<=142.0){
										if(bb_autofit_VTouchY(t_t4,true)>=397.0){
											if(bb_autofit_VTouchY(t_t4,true)<=471.0){
												return true;
											}
										}
									}
								}
							}
							return false;
						}else{
							if(t_type==4){
								for(var t_t5=0;t_t5<=4;t_t5=t_t5+1){
									if(bb_autofit_VTouchX(t_t5,true)>=505.0){
										if(bb_autofit_VTouchX(t_t5,true)<=583.0){
											if(bb_autofit_VTouchY(t_t5,true)>=377.0){
												if(bb_autofit_VTouchY(t_t5,true)<=455.0){
													return true;
												}
											}
										}
									}
								}
								return false;
							}
						}
					}
				}
			}
		}
	}
	return false;
}
function bb_input_TouchHit(t_index){
	return bb_input_device.p_KeyHit(384+t_index);
}
function bb_input_KeyHit(t_key){
	return bb_input_device.p_KeyHit(t_key);
}
function c_MapValues(){
	Object.call(this);
	this.m_map=null;
}
c_MapValues.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapValues.m_new2=function(){
	return this;
}
c_MapValues.prototype.p_ObjectEnumerator=function(){
	return c_ValueEnumerator.m_new.call(new c_ValueEnumerator,this.m_map.p_FirstNode());
}
function c_ValueEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_ValueEnumerator.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_ValueEnumerator.m_new2=function(){
	return this;
}
c_ValueEnumerator.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_ValueEnumerator.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_value;
}
function bb_super_miner_saveBricks(){
	var t_arr=new_string_array(bb_super_miner_mapList.p_Count());
	var t_i=0;
	var t_=bb_super_miner_mapList.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_b=t_.p_NextObject();
		t_arr[t_i]=String(t_b.m_type)+","+String(t_b.m_x)+","+String(t_b.m_y)+","+String((t_b.m_broken)?1:0)+","+String((t_b.m_fog)?1:0);
		t_i=t_i+1;
	}
	return t_arr;
}
function bb_app_SaveState(t_state){
	return bb_app__game.SaveState(t_state);
}
function bb_super_miner_saveMap(){
	var t_MAPFILE=",";
	t_MAPFILE=bb_super_miner_saveBricks().join(t_MAPFILE);
	bb_app_SaveState(t_MAPFILE);
}
function bb_app_LoadState(){
	return bb_app__game.LoadState();
}
function bb_super_miner_loadBrick(t_arr,t_pos){
	var t_b=c_brick.m_new.call(new c_brick,parseInt((t_arr[t_pos]),10),parseFloat(t_arr[t_pos+1]),parseFloat(t_arr[t_pos+2]),false);
	if(parseInt((t_arr[t_pos+3]),10)>0){
		t_b.m_broken=true;
	}
	if(parseInt((t_arr[t_pos+4]),10)>0){
		t_b.m_fog=true;
	}else{
		t_b.m_fog=false;
	}
	return t_b;
}
function bb_super_miner_loadMap(){
	bb_super_miner_mapList=null;
	bb_super_miner_mapList=c_StringMap.m_new.call(new c_StringMap);
	var t_data=bb_app_LoadState();
	var t_arr=t_data.split(",");
	for(var t_i=0;t_i<=t_arr.length-2;t_i=t_i+1){
		var t_b=bb_super_miner_loadBrick(t_arr,t_i);
		bb_super_miner_mapList.p_Set(String(t_b.m_x)+"_"+String(t_b.m_y),t_b);
		t_i=t_i+4;
	}
}
var bb_super_miner_lastBuildModeHit=0;
var bb_super_miner_selectedBrick=0;
function bb_math_Max(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Min(t_x,t_y){
	if(t_x<t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Min2(t_x,t_y){
	if(t_x<t_y){
		return t_x;
	}
	return t_y;
}
function bb_graphics_Cls(t_r,t_g,t_b){
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	var t_ix2=t_ix*bb_graphics_context.m_ix+t_iy*bb_graphics_context.m_jx;
	var t_iy2=t_ix*bb_graphics_context.m_iy+t_iy*bb_graphics_context.m_jy;
	var t_jx2=t_jx*bb_graphics_context.m_ix+t_jy*bb_graphics_context.m_jx;
	var t_jy2=t_jx*bb_graphics_context.m_iy+t_jy*bb_graphics_context.m_jy;
	var t_tx2=t_tx*bb_graphics_context.m_ix+t_ty*bb_graphics_context.m_jx+bb_graphics_context.m_tx;
	var t_ty2=t_tx*bb_graphics_context.m_iy+t_ty*bb_graphics_context.m_jy+bb_graphics_context.m_ty;
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	return 0;
}
function bb_graphics_Transform2(t_m){
	bb_graphics_Transform(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	bb_graphics_Transform(t_x,.0,.0,t_y,.0,.0);
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	bb_graphics_Transform(1.0,.0,.0,1.0,t_x,t_y);
	return 0;
}
function bb_autofit_UpdateVirtualDisplay(t_zoomborders,t_keepborders){
	c_VirtualDisplay.m_Display.p_UpdateVirtualDisplay(t_zoomborders,t_keepborders);
	return 0;
}
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	return 0;
}
function bb_graphics_PushMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp;
	bb_graphics_context.m_matrixStack[t_sp+0]=bb_graphics_context.m_ix;
	bb_graphics_context.m_matrixStack[t_sp+1]=bb_graphics_context.m_iy;
	bb_graphics_context.m_matrixStack[t_sp+2]=bb_graphics_context.m_jx;
	bb_graphics_context.m_matrixStack[t_sp+3]=bb_graphics_context.m_jy;
	bb_graphics_context.m_matrixStack[t_sp+4]=bb_graphics_context.m_tx;
	bb_graphics_context.m_matrixStack[t_sp+5]=bb_graphics_context.m_ty;
	bb_graphics_context.m_matrixSp=t_sp+6;
	return 0;
}
function bb_graphics_Rotate(t_angle){
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),.0,.0);
	return 0;
}
function bb_graphics_PopMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp-6;
	bb_graphics_SetMatrix(bb_graphics_context.m_matrixStack[t_sp+0],bb_graphics_context.m_matrixStack[t_sp+1],bb_graphics_context.m_matrixStack[t_sp+2],bb_graphics_context.m_matrixStack[t_sp+3],bb_graphics_context.m_matrixStack[t_sp+4],bb_graphics_context.m_matrixStack[t_sp+5]);
	bb_graphics_context.m_matrixSp=t_sp;
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_x,t_y);
	bb_graphics_Rotate(t_rotation);
	bb_graphics_Scale(t_scaleX,t_scaleY);
	bb_graphics_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,.0,.0);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,.0,.0,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	bb_graphics_PopMatrix();
	return 0;
}
function bb_graphics_DrawRect(t_x,t_y,t_w,t_h){
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawRect(t_x,t_y,t_w,t_h);
	return 0;
}
function bbInit(){
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_graphics_renderDevice=null;
	bb_app__updateRate=0;
	c_VirtualDisplay.m_Display=null;
	bb_super_miner_mapList=null;
	bb_super_miner_offsetX=.0;
	bb_super_miner_offsetY=.0;
	bb_random_Seed=1234;
	bb_super_miner_buildMode=false;
	bb_super_miner_lastBuildModeHit=0;
	bb_super_miner_selectedBrick=0;
}
//${TRANSCODE_END}
