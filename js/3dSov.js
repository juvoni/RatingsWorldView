var threeSet = function(){
	var scene;

var text3d = [],
	text = [],
	scoreText = [],
	scoreTextObject = [],
	scT = [],
	textMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: true } ),
	textObject = [],
	geoThin = [],
	currentOb = [],
	currentTxt = [];
var randN;

var geometry;



var mesh = [];
var	mesh5;
   	
   	currentObP = function(val){
   		currentOb.push(val);
   	};
   	currentTxtP = function(val){
   		currentTxt.push(val);
   	};


	var stats, renderer, composer;
	var camera, cameraControl;
	// set the scene size
	var WIDTH = 350,
    HEIGHT = 355;
    var scoreVal = [];

	// set some camera attributes
	var VIEW_ANGLE = 65,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

    var bgColor = 'ffffff',
    COLOR = "0x".concat(bgColor);

    
    var group;
		if( !init() )	animate();
		// init the scene
		function init(){


			if( Detector.webgl ){
				renderer = new THREE.WebGLRenderer({
					antialias: true	// to get smoother output
				});
				
			}
			else{
					renderer = new THREE.CanvasRenderer({
					antialias: true,           	// to get smoother output
					preserveDrawingBuffer: true	// to allow screenshot
			});
				Detector.addGetWebGLMessage();
				return true;
			}
			renderer.setClearColorHex( COLOR, 1 );
			renderer.setSize( WIDTH, HEIGHT );
			document.getElementById('threeRender3D').appendChild(renderer.domElement);

			// // add Stats.js - https://github.com/mrdoob/stats.js
			// stats = new Stats();
			// stats.domElement.style.position	= 'absolute';
			// stats.domElement.style.bottom  	= '0px';
			// document.body.appendChild( stats.domElement );

			// create a scene
			scene = new THREE.Scene();
			scene.matrixAutoUpdate = true;

			// put a camera in the scene
			camera	= new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
			camera.position.set(2, 3, 8);
			scene.add(camera);

			var controlArea = document.getElementById('threeRender3D');

			// create a camera contol
			cameraControls	= new THREE.TrackballControls( camera, controlArea);

			// transparently support window resize
			//THREEx.WindowResize.bind(renderer, camera);
			// allow 'p' to make screenshot
			//THREEx.Screenshot.bindKey(renderer);
			// allow 'f' to go fullscreen where this feature is supported
			// if( THREEx.FullScreen.available() ){
			//	THREEx.FullScreen.bindKey();                  		
			//	document.getElementById('inlineDoc').innerHTML	+= "- <i>f</i> for fullscreen";
			// }

			// here you add your objects
			// - you will most likely replace this part by your own
			var light	= new THREE.DirectionalLight(0xCCCC00);
			light.position.set( Math.random(), Math.random(), Math.random() ).normalize();
			scene.add( light );
			var light	= new THREE.DirectionalLight( Math.random() * 0x6fcff3 );
			light.position.set( Math.random(), Math.random(), Math.random() ).normalize();
			scene.add( light );
			var light	= new THREE.DirectionalLight( 0xCCCC00 );
			light.position.set( -Math.random(), -Math.random(), -Math.random() ).normalize();
			scene.add( light );
			var light	= new THREE.PointLight( Math.random() * 0x6fcff3 );
			light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 )
						.normalize().multiplyScalar(1.2);
			scene.add( light );
			// var light	= new THREE.PointLight( Math.random() * 0xffffff );
			// light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 )
			//			.normalize().multiplyScalar(1.2);
			// scene.add( light );
			// var light	= new THREE.PointLight( Math.random() * 0xffffff );
			// light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 )
			//			.normalize().multiplyScalar(1.2);
			// scene.add( light );

			var material 	= new THREE.MeshLambertMaterial({ambient: 0x6fcff3, color:0x66CCFF});//808080
			             	
			var Cmaterial	= new THREE.MeshLambertMaterial({ambient: 0xffffff, color: 0xFFCC00});//808080
		
			for(var de = 0; de<11; de++){
				if(de >=1){
					scoreVal[de]=+ (scoreVal[de-1]+0.5);	
				}
				else{
					scoreVal[de]=+ 0;
				}
			}



			for(var fiveD = 0; fiveD < 5; fiveD++){
				geoThin[fiveD] = [];
				mesh[fiveD] = [];
				scoreText[fiveD] = [];
				scT[fiveD] = [];
				scoreTextObject[fiveD] = [];

				for(var gC = 0 ; gC < scoreVal.length; gC++){
					randN = Math.floor(Math.random()*(8-0 +1)+0);
					scoreText[fiveD][gC] = new THREE.TextGeometry( scoreVal[gC].toString(), {
								size: 0.2,
								height: 0.05,
								curveSegments: 1,
								font: "helvetiker"
					});
					scT[fiveD][gC] = new THREE.Mesh( scoreText[fiveD][gC], textMaterial );
					scoreTextObject[fiveD][gC] = new THREE.Object3D();
					scoreTextObject[fiveD][gC].add(scT[fiveD][gC]);
					switch(fiveD){
						case 0: geoThin[fiveD][gC] = new THREE.CubeGeometry(0.5,0.5,scoreVal[gC]);//monetary
								mesh[fiveD][gC] = new THREE.Mesh( geoThin[fiveD][gC], material );
								mesh[fiveD][gC].position.z = 1.5;					
								scT[fiveD][gC].position.z = 4;
								scT[fiveD][gC].position.y = -0.5;
			
						break;
						case 1: geoThin[fiveD][gC] = new THREE.CubeGeometry(0.5,scoreVal[gC],0.5);//political
								mesh[fiveD][gC] = new THREE.Mesh( geoThin[fiveD][gC], material );
								mesh[fiveD][gC].position.y = 1.5;
								scT[fiveD][gC].position.y = 4;
						break;
						case 2: geoThin[fiveD][gC] = new THREE.CubeGeometry(scoreVal[gC],0.5,0.5);//external
								mesh[fiveD][gC] = new THREE.Mesh( geoThin[fiveD][gC], material );
								mesh[fiveD][gC].position.x = 1.5;					
								scT[fiveD][gC].position.x = 4.0;
								scT[fiveD][gC].position.y = 0;
						break;
						case 3: geoThin[fiveD][gC] = new THREE.CubeGeometry(0.5,scoreVal[gC],0.5); //economic
								mesh[fiveD][gC] = new THREE.Mesh( geoThin[fiveD][gC], material );
								mesh[fiveD][gC].position.y = -1.5;
								scT[fiveD][gC].position.y = -4.5;
								scT[fiveD][gC].position.z = 0;
						break;
						case 4: geoThin[fiveD][gC] = new THREE.CubeGeometry(scoreVal[gC],0.5,0.5); //fiscal
								mesh[fiveD][gC] = new THREE.Mesh( geoThin[fiveD][gC], material );
								mesh[fiveD][gC].position.x = -1.5;
								scT[fiveD][gC].position.x = -4.5;
								scT[fiveD][gC].position.y = 0;
								scT[fiveD][gC].position.z = 0;
						break;
					}

				}
					
			}
				for(var g = 0; g<5 ;g++){
					randOb = Math.floor(Math.random()*(8-0 +1)+0);
					        scene.add(mesh[g][0]); 
					        currentObP(0);

							scene.add(scoreTextObject[g][0]);
							currentTxtP(0);

				}		



			geometry = new THREE.CubeGeometry(2,2,2); //CENTER


			theText = ["Political","Economic","External","Fiscal","Monetary"];

	//----here

		//---end of text	
		                	for(var tCount = 0; tCount< theText.length;tCount++){
		                		text3d.push(new THREE.TextGeometry( theText[tCount], {
		                			size: 0.3,
		                			height: 0.05,
		                			curveSegments: 1,
		                			font: "helvetiker"
		                		}));
		                		text.push(new THREE.Mesh( text3d[tCount], textMaterial ));
		                		textObject.push(new THREE.Object3D());
		                		textObject[tCount].add(text[tCount]);
		                		scene.add(textObject[tCount]);
		                	}

			//Center Cube
		    mesh5 = new THREE.Mesh( geometry, Cmaterial );
			scene.add(mesh5);
			mesh5.position.x = 0;



			text3d[0].computeBoundingBox();
			text3d[1].computeBoundingBox();
			text3d[4].computeBoundingBox();
			var centerOffset = -0.5 * ( text3d[0].boundingBox.max.x - text3d[0].boundingBox.min.x );
			var centerOffset1 = -0.5 * ( text3d[1].boundingBox.max.x - text3d[1].boundingBox.min.x );
			var centerOffset2 = -0.5 * ( text3d[4].boundingBox.max.x - text3d[4].boundingBox.min.x );

			//Political
			text[0].position.x = centerOffset;
			text[0].position.y = 4.5;
			text[0].position.z = 0;


			//Economic
			text[1].position.x = centerOffset1;
			text[1].position.y = -5.0;
			text[1].position.z = 0;


			//External
			text[2].position.x = 2;
			text[2].position.y = 1;

			//Fiscal
			text[3].position.x = -3;
			text[3].position.y = 1;
			text[3].position.z = 0;


			//Monetary
			text[4].position.x = centerOffset2;
			text[4].position.z = 4;


		}

		// animation loop
		function animate() {

			// loop on request animation loop
			// - it has to be at the begining of the function
			// - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
			requestAnimationFrame( animate );

			// do the render
			render();

			// update stats
			//stats.update();
		}

		// render the scene
		function render() {
			// variable which is increase by Math.PI every seconds - usefull for animation
			var PIseconds	= Date.now() * Math.PI;

			// update camera controls
			cameraControls.update();
	
		 	// actually render the scene
		 	renderer.render( scene, camera );
		}	
		this.updateScore = function(a,b,c,d,e){
			for(var k = 0;k<5;k++){
				scene.remove(mesh[k][currentOb[k]]);
				scene.remove(scoreTextObject[k][currentOb[k]]);

				switch(k){
					case 0:
						scene.add(mesh[k][a]);
						scene.add(scoreTextObject[k][a]);
						currentOb[k] = a;
						currentTxt[k] = a;
					break;
					case 1:
						scene.add(mesh[k][b]);
						scene.add(scoreTextObject[k][b]);
						currentOb[k] = b;
						currentTxt[k] = b;
					break;
					case 2:
						scene.add(mesh[k][c]);
						scene.add(scoreTextObject[k][c]);
						currentOb[k] = c;
						currentTxt[k] = c;
					break;
					case 3:
						scene.add(mesh[k][d]);
						scene.add(scoreTextObject[k][d]);
						currentOb[k] = d;
						currentTxt[k] = d;
					break;
					case 4:
						scene.add(mesh[k][e]);
						scene.add(scoreTextObject[k][e]);
						currentOb[k] = e;
						currentTxt[k] = e;
					break;

				}
					
			}
		};


};

var twoDRadar = function(){
			var valu = [0,0,0,0,0];

	        var radar2 = new RGraph.Radar('myRadar', valu);
};
