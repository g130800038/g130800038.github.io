queue()
	.defer(d3.json, 'flickr/Color_Selector_json/RainWeather.json')
	.defer(d3.json, 'flickr/Color_Selector_json/EdinburghRedTry.json')
	.defer(d3.json, 'flickr/Color_Selector_json/EdinburghOrange.json')
	.defer(d3.json, 'flickr/Color_Selector_json/EdinburghYellow.json')
	.defer(d3.json, 'flickr/Color_Selector_json/EdinburghGreen.json')
	.defer(d3.json, 'flickr/Color_Selector_json/EdinburghCyan.json')
	.defer(d3.json, 'flickr/Color_Selector_json/EdinburghBlue.json')
	.defer(d3.json, 'flickr/Color_Selector_json/EdinburghPurple.json')
	.await(dataloaded);

var width = 1260;
var height = 800;
var Xbound = 300;
var imageSizeMini = 2.75;
var imageSize = 4.75;
var num = 100; // important to control all data bounding
var zoom = d3.behavior.zoom()
    .scaleExtent([1, 25])
    .on("zoom", zoomed);

function zoomed(){
  container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

var svg = d3.select("#container")
			 .append("svg")
			 .attr("width", width)
			 .attr("height",height)
			 .style("background-color","black")
			 //.attr("transform", "translate(" + width/2 + "," + height/2 + ")")
			 .call(zoom);

var container = svg.append("g");	

var domain = d3.range(1,num + 1) 
var Xscale = d3.scale.ordinal()
			.domain(domain)
			.rangeBands([Xbound,width - Xbound ],0.3);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}	

function dataloaded(err,white,red,Orange,Yellow,Green,Cyan,Blue,Purple){
	var UpdataController = 0;
	var datas = [white,red,Orange,Yellow,Green,Cyan,Blue,Purple]
	var lengths = [] // each Xscale length for global 
		lengths[0] = 0;
	var coordinations = [] // each draw's y coordination on each Xscale will be stored here
	var tempCo = []
	for(var i = 0; i <= num-1 ; i++){

		tempCo[i] = height/2;
	}
	coordinations[0] = tempCo;	
	console.log(coordinations)

	for(var i = 1 ; i <= num ; i++){
		if(1 <= i && i<=2)
		lengths[i] = getRandomInt(1,2)/num ;
		if(2 < i && i<=4)
		lengths[i] = getRandomInt(1,5)/num ;
		if(5 <= i && i<= 10)
		lengths[i] = getRandomInt(3,10)/num ;
		if(11 <= i && i<=20)
		lengths[i] = getRandomInt(7,15)/num ;
		if(21 <= i && i<=30)
		lengths[i] = getRandomInt(10,20)/num ;
		if(31 <= i && i<=36)
		lengths[i] = getRandomInt(13,25)/num ;
		if(37 <= i && i<=41)
		lengths[i] = getRandomInt(16,28)/num;
		if(42 <= i && i<=50)
		lengths[i] = getRandomInt(20,30)/num;
		if(51<= i && i<=55)
		lengths[i] = getRandomInt(16,28)/num;
		if(56 <= i && i<=61)
		lengths[i] = getRandomInt(13,25)/num ;
		if(62 <= i && i<=71)
		lengths[i] = getRandomInt(10,20)/num ;
		if(72 <= i && i<=81)
		lengths[i] = getRandomInt(7,15)/num ;
		if(82 <= i && i<= 90)
		lengths[i] = getRandomInt(3,10)/num ;
		if(91 <= i && i<=96)
		lengths[i] = getRandomInt(1,5)/num ;
		if(97 <= i && i<=100)
		lengths[i] = getRandomInt(1,2)/num ;
	}

	// lengthSum for global
	var lengthSum  = d3.sum(lengths,function(d){
						return d;
						})
	//console.log(lengths)
	//console.log(lengthSum)
	//draw(UpdataController);
	setInterval(varDraw,100);


	function varDraw(){

	  	if( 0 <= UpdataController && UpdataController <= 7) {
    	 
    	  UpdataController ++;
          draw(UpdataController);

          

		} else if (UpdataController == 8 ) {

			UpdataController ++;
			clearInterval(varDraw);

		} // else if end

	}// varDraw end	
	//console.log(UpdataController)

	function draw(UpdataController){
	
		//console.log("works")
		console.log(UpdataController)
		//	UpdataController ++;
	 	var updataDates = 1 ; // control 

		// 	setInterval(updateDate,100);
		// 	//updateDate();
	 	var myData = datas[UpdataController - 1] // bounding data for this draw
	 	
	 	// var sortMydata = myData.sort(function(a,b){ 
			// 				return  d3.descending(a.photo.HSV[0],b.photo.HSV[0]);
			// 			});
	 	console.log(myData.length)
	 	var newSum = []; // Length for this draw, to calculate y coordinate for this draw
	 	newSum[0] = 0;
	 	var newLength = 0; // sum length for i-1 th ,i th , i+1 th ....	
	 	var coordination = [];
	 	coordination[0] = 0;

	 	updateDate();
		function updateDate(){ // to get this draw's elements like y coordination on each Xscale

		  if( 0 <= UpdataController && UpdataController <= 8) {
	    	  	
	    	  	for(var k = 0 ; k <= num - 1 ; k++ ){

					if(1 <= updataDates && updataDates <= num){ // get each length for this draw like ( Xscale[1], y[1]; Xscale[2],y[2])
						
						newLength = newLength + lengths[updataDates]
						newSum[updataDates] = newLength;
						// previou draw's y coordination - this draw's y length
						
						// coordination[updataDates-1] = (height/2 - lengths[updataDates]/lengthSum * myData.length * imageSize) - (height/2 - coordinations[UpdataController - 1][updataDates-1]);
						coordination[updataDates-1] = coordinations[UpdataController - 1][updataDates-1] - (lengths[updataDates]/lengthSum * myData.length * imageSize);
						updataDates ++ ;

						//coordination[updataDates] = [Xscale(updataDates),height/2 - lengths[updataDates]/lengthSum * myData.length * imageSize];
						//console.log(coordination[updataDates-1])
					}
					if ( updataDates == num + 1){

						//UpdataController ++ 
						updataDates = 1;
						
						//clearInterval(updateDate)	// only execute for 45 times 					
					}// if updataDates end

					
					

						// var updata = container
						// 			.selectAll("img")
						// 			.data(myData.filter(function(d,i){
						// 				return newSum[updataDates - 1]/lengthSum * myData.length <= i && i <= newSum[updataDates]/lengthSum * myData.length
						// 			}))
						// var enter = updata.enter();	
						// var exit  = updata.exit();

						
						// var Image = enter
						// 		.append("g")
						// 		.attr("class","Image" + UpdataController)
						// 		.append("svg:image")
						// 		.attr("class","myImg")
						// 		.attr("xlink:href", function(d){
						// 			//return d.photo.urls.url[0].myUrl;
						// 			return d.photo.urls.url[0].url_q;
						// 			})
						// 		.attr("width",imageSize)
						// 		.attr("height",imageSize)
						// 		.attr("x",function(d,i){
						// 			if( 1 <= updataDates && updataDates <= num)
						// 			return Xscale(updataDates + 1)
						// 		})
						// 		.attr("y",function(d,i){
						// 			if( 1 <= updataDates && updataDates <= num)
						// 			return height/2  - (i*imageSize) ;
						// 		})			
						// 	console.log(Image)	
							//console.log(newLenth)
							//console.log(newSum)
						    //console.log(updataDates)

				} // for k loop end
		

			} // if 0 <= UpdataController && UpdataController <= 1 end
			//console.log(coordination)
			coordinations[UpdataController]	= coordination;	 // get the next draw's initial y coordination					
		} // updateDate end
		// start to append images
		//console.log(newSum)
		//console.log(coordinations)
		//var drawImageController = 0;
		var Up = 0;
		setInterval(varImage,100)
		function varImage(){
			if(0 <= Up && Up <= num - 1){
				Up ++ 
				//drawImageController ++ ;
				drawImage()

			} else if ( Up == num){
				Up ++ ;
				clearInterval(varImage);			
			}

		}
			function drawImage(){
				var updata = container
							.selectAll("img")
							.data(myData.filter(function(d,i){
								return Math.floor(newSum[Up - 1]/lengthSum * myData.length) <= i && i <= Math.floor(newSum[Up]/lengthSum * myData.length);
							}))
				var enter = updata.enter();	
				var exit  = updata.exit();

				
				var Image = enter
						.append("g")
						.attr("class","Image" + UpdataController)
						.append("svg:image")
						.attr("class","myImg")
						.attr("xlink:href", function(d){
							//return d.photo.urls.url[0].myUrl;
							return d.photo.urls.url[0].url_q;
							})
						.attr("width",imageSize)
						.attr("height",imageSize)
						.attr("x",function(d,i){
							return Xscale(Up)
						})
						.attr("y",function(d,i){
							//return height/2 ;
							return getRandomInt(100,height- 100);
						})
						.attr("opacity",1)			
						.transition()
						.duration(3000)
						.attr("x",function(d,i){
							return Xscale(Up)
						})
						.attr("y",function(d,i){
							return coordinations[UpdataController-1][Up-1]  - (i*imageSize) ;
						})
						.attr("opacity",0.75)			


		} // drawImage End			
	 } // draw end	
	//console.log(coordinations)	 			
} // dataloaded end