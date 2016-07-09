// JavaScript Document
// load the external data


queue()
	.defer(d3.json, './flickr/ThirdGraphWeatherCity/JanWeather.json')
	.defer(d3.json, './flickr/ThirdGraphWeatherCity/FebWeather.json')
	.defer(d3.json, './flickr/ThirdGraphWeatherCity/MarWeather.json')
	.defer(d3.json, './flickr/ThirdGraphWeatherCity/AprWeather.json')
	.defer(d3.json, './flickr/ThirdGraphWeatherCity/MayWeather.json')
	.defer(d3.json, './flickr/ThirdGraphWeatherCity/JunWeather.json')
	.defer(d3.json, './flickr/ThirdGraphWeatherCity/JulWeather.json')
	.defer(d3.json, './flickr/ThirdGraphWeatherCity/AugWeather.json')
	.defer(d3.json, './flickr/ThirdGraphWeatherCity/SepWeather.json')
	.defer(d3.json, './flickr/ThirdGraphWeatherCity/OctWeather.json')
	.defer(d3.json, './flickr/ThirdGraphWeatherCity/DecWeather.json')
	.defer(d3.json, './flickr/ThirdGraphWeatherCity/NovWeather.json')
	.defer(d3.json, './flickr/ThirdGraphWeatherCity/RainWeather.json')
	.await(dataloaded);
	
var margin = {t: 50, r: 50, b: 50, l: 50};
var width = 1260;
var height = 800;
var imageSizeMini = 1.75;
//var imageSize = height/2 * 0.016;
var imageSize = height/2 * 0.022;
var imageSpace = imageSize + 1;
var imageSizeEx = height/2 * 0.21;
var imageSpaceEx = imageSizeEx + 3;
var Xbound = 205;
var XboundEx = 100;		
var Ybound = 200;
var Clicked = false;
var ClickedTwo = false; // control ImageDisplay
var minH = height/8;
var maxH = 6*height/8;
var minW = width/6;
var maxW = 5*width/6;	
var ImageDisplay = d3.select("body")
					.append("div")
					.attr("class","tooltip")
					//.style("position", "absolute")
					//.style("padding", "0 10px")
					//.style("background", "none")
					.style("opacity", 0);

var InfDisplay = d3.select("body")
				.append("div")
				.attr("class","tooltip2")
				.style("opacity",0);					

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}	

function getImageColor(r,g,b){
    return d3.rgb(r,g,b);
}

function getImageHue(r,g,b){
	if(( r==g ) && (g==b)){
	 return d3.rgb(r-1,g+1,b).hsl().h;
	}
	else{									
    return d3.rgb(r,g,b).hsl().h;
	}
}	

var zoom = d3.behavior.zoom()
    .scaleExtent([1, 25])
    .on("zoom", zoomed);

function zoomed(){
  container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

var drag = d3.behavior.drag()
			.on("drag",function(d){
				d3.select(this)
				   .attr("x",function(){
				   	return d3.event.x - 75;
				   })
				   .attr("y",function(){
				   	return d3.event.y - 75;
				   })

			})

var svg = d3.select("#container")
			 .append("svg")
			 .attr("width", width)
			 .attr("height",height)
			 .style("background-color","black")
			 //.attr("transform", "translate(" + width/2 + "," + height/2 + ")")
			 .call(zoom);
			 //.append("g")
var container = svg.append("g");
				//.attr("transform","translate(" + width/2 + "," + height/2 + ")");

var domain = d3.range(1,13) 
var Xscale = d3.scale.ordinal()
			.domain(domain)
			.rangeBands([Xbound,width - Xbound ],0.3);
var XscaleEx = d3.scale.ordinal()
			.domain(domain)
			.rangeBands([XboundEx,width - XboundEx ],0.3);			

var axis = d3.svg.axis()
			.scale(Xscale)
			.orient("bottom");

var gAxis = container
			.append("g")
			.attr("class","gAxis")
			.attr("transform", "translate(" + 0 + "," + height/2 +  ")")
			.attr("fill","white")
			//.attr("stoke","white")
			//.attr("stroke-width",0.5)
			//.call(axis);
			//.attr("transform", "translate(" + originW + "," + originH + ")");

function dataloaded(err, Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Dec, Nov, MyRain){
	var UpdataController = 0;
	//var Mydata;
	var Mydatas = [Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Dec,Nov]
	// get the hightest X,Y coordinate from images 
    var linePaths =[]
    // get length
    var RainLength = 0;
    var Rainlengths =[];
    Rainlengths[0] = 0;
    //drawJan(UpdataController);
	setInterval(varDraw, 500);

	function varDraw(){
		// use for controll animation
	    if( 0 <= UpdataController && UpdataController <= 11) {
	    	  UpdataController ++;
	          draw(UpdataController);
	         
	    } else if(UpdataController == 12 ) {

	     	UpdataController ++
	     	var dataController = 0 // make clicked circle match the class num of image 
	        clearInterval(varDraw);
	        //console.log(linePaths)
	        drawPath();

	        function drawPath(){
		        var line = d3.svg.line()
		        			 .x(function(d,i){
		        			 	return d[0] + imageSpace/2;
		        			 })
		        			 .y(function(d,i){
		        			 	return d[1] - 15;
		        			 })
	                         .interpolate("linear");
		        var MyPath = container
		        			.append("g")
		         			.append("path")
		         			.attr("class","paths")
		         			.attr("d",line(linePaths))
		         			.attr("stroke","white")
		         			.attr("stroke-width", "1px")	         			
		         			.attr("fill","none")
		         			.attr("opacity",0.25)

		        var totalLength = MyPath.node().getTotalLength();
		        //console.log(linePaths[0])
		        //console.log(linePaths[0][0])
			    MyPath
			        .attr("stroke-dasharray", totalLength + " " + totalLength)
			        .attr("stroke-dashoffset", totalLength)
			        .transition()
			        .duration(5000)
			        .ease("linear")
			        .attr("stroke-dashoffset", 0);	
			    
			    var MyNodes = container
			    			.append("g")
			    			.selectAll("circle")
			    			.data(linePaths)
			    			.enter()
			    			.append("circle")
			    			.attr("class",function(d,i){
			    				return "myCircle" + (i + 1);

			    			})			  
			    			.attr("cx",function(d){
			    				return d[0] + imageSpace/2 ;
			    			})
			    			.attr("cy",function(d){
			    				return d[1] - 15
			    			})
			    			.attr("r",0)
			    			.transition()
			    			//.delay(1000)
			    			.duration(3000)
			    			.attr("r",6.25)
			    			.attr("fill","white")
			    			.attr("opacity", 0.25)

			    var animation = MyNodes
			    				.each("end",function(d,i){
			    					var Mydata = Mydatas[i];
			    					var MyMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"]
			    					var Mytemp  = [5.7,6.2,8.7,10.1,14.2,17.5,18.8,18.5,16.2,13.2,8.7,7.1]
			    					var MyEvent = ["Snow over Edinburgh ","Snow over Edinburgh","Food in Edinburgh","International Science Festival","Hidden door Festival","International Film Festival","Edinburgh Festival Carnival","Edinburgh Festival Fringe And The Royal Edinburgh Military Tattoo","View in Portobello Beach","Landscape view in Edinburgh","Sunset in Edinburgh","Christams Market"]		
									// var minTemp = Math.round(1.1*Mydata.length/10);
									// var skip1 = Math.round(1.8*Mydata.length/10);
									// var maxTemp = Math.round(3.0*Mydata.length/10);
									// var skip2 = Math.round(2.2*Mydata.length/10);
									var minTemp = Math.round(0.8*Mydata.length/10);
									var skip1 = Math.round(1.6*Mydata.length/10);
									var maxTemp = Math.round(2.4*Mydata.length/10);
									var skip2 = Math.round(1.8*Mydata.length/10);
									var skip3 = Math.round(0.5*Mydata.length/10) * getRandomInt(2,3);
									var skip4 = Math.round(Math.round(0.2*Mydata.length/10) * getRandomInt(6,7));
									
									//console.log(dataController);
									

				    				d3.select(this)
				    				.on("mouseover",function(){
				    					
				    					console.log(i)
				    					d3.select(this)
				    					.attr("opacity",1)

				    					InfDisplay
				    					.transition()
										.duration(500)
										.style("opacity",0.75)

				    					InfDisplay	
				    					.html(function(){
				    						
				    						return "Edinburgh Averagely Maximal Temperature in " + MyMonth[i] + ": " + "<br />" + Mytemp[i] + " \u2103" + "<br />" +
				    						"Annually Event in " + MyMonth[i] + ": " + "<br />" +MyEvent[i];

				    						})
				    					.style("left",(d3.event.pageX - 50 ) + "px")
				    					.style("top", (d3.event.pageY + 25) + "px")
			    					})	
			    					.on("mousemove",function(){
			    						InfDisplay	
				    					.html(function(){
				    						//if(i==0)
				    						return "Edinburgh Averagely Maximal Temperature in " + MyMonth[i] + ": " + "<br />" + Mytemp[i] + " \u2103" + "<br />" +
				    						"Annually Event in " + MyMonth[i] + ": " + "<br />" + MyEvent[i];

				    						})
				    					.style("left",(d3.event.pageX - 50) + "px")
				    					.style("top", (d3.event.pageY + 25) + "px")

			    					})
				    				.on("mouseout",function(){
				    					d3.select(this)
				    					.attr("opacity",0.25)

				    					InfDisplay
				    					.transition()
										.duration(500)
										.style("opacity",0)

				    				})

				    				d3.select(this)	
				    				.on("click",function(){	
				    					//setTimeout(draw(dataController),3000)
				    					 // to select image class in draw()
										//draw(dataController);
										//setTimeout(draw(dataController+1),5000);
										//console.log(dataController)

										var classString = ".Image" + (i+1) + " " + ".myImg";
										dataController = i + 1;
										console.log(classString)
										Clicked = !Clicked
										console.log(dataController);
										if(Clicked) {
										//console.log(dataController)
					    					d3.select(this)
					    					.attr("fill","yellow") // circle animation

					    		// 			d3.selectAll(".myImg")
										 //  	.transition()
										 //  	.duration(1000)
											// .attr("opacity",0.75);	
				    					//console.log(classString)
						    				d3.selectAll(classString)
						    					.transition()
						    					.duration(4000)
												.attr("height",imageSizeEx)
						    					.attr("width",imageSizeEx)
						    					.attr("x",function(){

						    						return getRandomInt(minW,maxW)
													//return Math.random()* width * (Math.random() > 0.5 ? 0.25 : 0.75) ;
												})
												.attr("y",function(){
													return getRandomInt(minH,maxH)
													//return Math.random()* height * (Math.random() > 0.5 ? 0.75 : 0.75) ;
												})
												.attr("opacity",0.75)
												.each("end",function(){ // start animation
												 
												 //  d3.selectAll(".myImg")
												 //  	.transition()
												 //  	.duration(1000)
													// .attr("opacity",0.5);	

												  d3.selectAll(classString)
												  	// .call(drag)
													.transition()
													.duration(4000)
													.attr("x",function(){

						    						return getRandomInt(minW,maxW)
													//return Math.random()* width * (Math.random() > 0.5 ? 0.25 : 0.75) ;
													})
													.attr("y",function(){
													return getRandomInt(minH,maxH)
													//return Math.random()* height * (Math.random() > 0.5 ? 0.75 : 0.75) ;
													})
													.each("end",function(){ // second animation
														
														// d3.selectAll(".myImg")
														//   	.transition()
														//   	.duration(1500)
														// 	.attr("opacity",0.5);

														d3.selectAll(classString)
														// .call(drag)
														.transition()
														.delay(800)
														.duration(5000)
														.attr("x",function(d,i){
														if(0<= i && i < minTemp)
														return Xscale(dataController) ;
														if(minTemp<= i && i < minTemp + skip1)
														return Xscale(dataController) + imageSpace;
														if(minTemp + skip1 <= i && i < minTemp + skip1 + maxTemp)
														return Xscale(dataController) + imageSpace * 3 ; // maxTemp column
														if(minTemp + skip1 + maxTemp <= i && i < skip2 + minTemp + skip1 + maxTemp)
														return Xscale(dataController) + imageSpace * 2 ;
														if(skip2 + minTemp + skip1 + maxTemp <= i && i < skip2 + minTemp + skip1 + maxTemp + skip3)
														return Xscale(dataController) + imageSpace * 4 ;
														if(skip2 + minTemp + skip1 + maxTemp + skip3 <= i && i < skip2 + minTemp + skip1 + maxTemp + skip3 + skip4)
														return Xscale(dataController) + imageSpace * 5 ;
														if(skip2 + minTemp + skip1 + maxTemp + skip3 + skip4<= i && i <= Mydata.length )
														return Xscale(dataController) + imageSpace * 6 ;	
														})
														.attr("y",function(d,i){
															if(0<= i && i < minTemp)
															return height/2 + 2*imageSize + (i*imageSize) ;
															if(minTemp<= i && i < minTemp + skip1)
															return height/2 + 2*imageSize + (imageSize * (i - minTemp));
															if(minTemp + skip1 <= i && i < minTemp + skip1 + maxTemp)
															return 	height/2 + 2*imageSize + (imageSize * (i - minTemp - skip1));
															if(minTemp + skip1 + maxTemp <= i && i < skip2 + minTemp + skip1 + maxTemp)
															return height/2 + 2*imageSize + (imageSize * (i - minTemp - skip1 - maxTemp));
															//if(skip2 + minTemp + skip1 + maxTemp <= i && i < Mydata.length)
															if(skip2 + minTemp + skip1 + maxTemp <= i && i < skip2 + minTemp + skip1 + maxTemp + skip3)
															return height/2 + 2*imageSize + (imageSize * (i - minTemp - skip1 - maxTemp - skip2));
															if(skip2 + minTemp + skip1 + maxTemp + skip3 <= i && i < skip2 + minTemp + skip1 + maxTemp + skip3 + skip4)
															return height/2 + 2*imageSize + (imageSize * (i - minTemp - skip1 - maxTemp - skip2 - skip3));
															if(skip2 + minTemp + skip1 + maxTemp + skip3 + skip4<= i && i <= Mydata.length )
															return height/2 + 2*imageSize + (imageSize * (i - minTemp - skip1 - maxTemp - skip2 - skip3 - skip4));
														})
														.attr("height",imageSize)
								    					.attr("width",imageSize)
								    					.attr("opacity",0.5)
								    			// 		.each("end",function(){
								    			// 			d3.selectAll(".myImg")
														 //  	.transition()
														 //  	.duration(1500)
															// .attr("opacity",1);

															// d3.select(classString)
															// .transition()
														 //  	.duration(1500)
															// .attr("opacity",0.5);
								    			// 		})			    				

													}) // end one 
											})	// end two	

				    		
									  }	else { 

									  	d3.select(this)
				    					.attr("fill","white")

				    					d3.selectAll(classString)
				    					.transition()
				    					.duration(2000)
				    					//.ease("in-out")
				    					.attr("height",imageSize)
				    					.attr("width",imageSize)
				    					.attr("x",function(d,i){
				    						if(0<= i && i < minTemp)
														return Xscale(dataController) ;
														if(minTemp<= i && i < minTemp + skip1)
														return Xscale(dataController) + imageSpace;
														if(minTemp + skip1 <= i && i < minTemp + skip1 + maxTemp)
														return Xscale(dataController) + imageSpace * 3 ; // maxTemp column
														if(minTemp + skip1 + maxTemp <= i && i < skip2 + minTemp + skip1 + maxTemp)
														return Xscale(dataController) + imageSpace * 2 ;
														if(skip2 + minTemp + skip1 + maxTemp <= i && i < skip2 + minTemp + skip1 + maxTemp + skip3)
														return Xscale(dataController) + imageSpace * 4 ;
														if(skip2 + minTemp + skip1 + maxTemp + skip3 <= i && i < skip2 + minTemp + skip1 + maxTemp + skip3 + skip4)
														return Xscale(dataController) + imageSpace * 5 ;
														if(skip2 + minTemp + skip1 + maxTemp + skip3 + skip4<= i && i <= Mydata.length )
														return Xscale(dataController) + imageSpace * 6 ;	
											// if(0<= i && i < minTemp)
											// return Xscale(dataController) ;
											// if(minTemp<= i && i < minTemp + skip1)
											// return Xscale(dataController) + imageSpace;
											// if(minTemp + skip1 <= i && i < minTemp + skip1 + maxTemp)
											// return Xscale(dataController) + imageSpace * 3 ; // maxTemp column
											// if(minTemp + skip1 + maxTemp <= i && i < skip2 + minTemp + skip1 + maxTemp)
											// return Xscale(dataController) + imageSpace * 2 ;
											// if(skip2 + minTemp + skip1 + maxTemp <= i && i < Mydata.length)
											// return Xscale(dataController) + imageSpace * 4 ;
										})
										.attr("y",function(d,i){
											if(0<= i && i < minTemp)
															return height/2 - (i*imageSize) ;
															if(minTemp<= i && i < minTemp + skip1)
															return height/2 - (imageSize * (i - minTemp));
															if(minTemp + skip1 <= i && i < minTemp + skip1 + maxTemp)
															return 	height/2 - (imageSize * (i - minTemp - skip1));
															if(minTemp + skip1 + maxTemp <= i && i < skip2 + minTemp + skip1 + maxTemp)
															return height/2 - (imageSize * (i - minTemp - skip1 - maxTemp));
															//if(skip2 + minTemp + skip1 + maxTemp <= i && i < Mydata.length)
															if(skip2 + minTemp + skip1 + maxTemp <= i && i < skip2 + minTemp + skip1 + maxTemp + skip3)
															return height/2 - (imageSize * (i - minTemp - skip1 - maxTemp - skip2));
															if(skip2 + minTemp + skip1 + maxTemp + skip3 <= i && i < skip2 + minTemp + skip1 + maxTemp + skip3 + skip4)
															return height/2 -  (imageSize * (i - minTemp - skip1 - maxTemp - skip2 - skip3));
															if(skip2 + minTemp + skip1 + maxTemp + skip3 + skip4<= i && i <= Mydata.length )
															return height/2 - (imageSize * (i - minTemp - skip1 - maxTemp - skip2 - skip3 - skip4));
											// if(0<= i && i < minTemp)
											// return height/2 - (i*imageSize) ;
											// if(minTemp<= i && i < minTemp + skip1)
											// return height/2 - (imageSize * (i - minTemp));
											// if(minTemp + skip1 <= i && i < minTemp + skip1 + maxTemp)
											// return 	height/2 - (imageSize * (i - minTemp - skip1));
											// if(minTemp + skip1 + maxTemp <= i && i < skip2 + minTemp + skip1 + maxTemp)
											// return height/2 - (imageSize * (i - minTemp - skip1 - maxTemp));
											// if(skip2 + minTemp + skip1 + maxTemp <= i && i < Mydata.length)
											// return height/2 - (imageSize * (i - minTemp - skip1 - maxTemp - skip2)); 
										})
										// .each("end",function(){

										// 	 d3.selectAll(".myImg")
										// 		.attr("opacity",1);
										// })
										.attr("opacity",1)			    				
				    				}

				    	 		}) // click end
					}) // each end
		      } // draw path  		
	     } // else if
	   //   else if (UpdataController == 13){
	   //   	  raindrop();		
	   //   	  function raindrop(){
				//     d3.selectAll(".myImg")
				//     .attr("opacity",function(d,i){
				//     	if(i == getRandomInt(1,1000))
				//     		return 0.3;

				//     })
				// }

	   //   }// else if end
	}; // varDraw
	


	function draw(UpdataController){

		//console.log(UpdataController)
	    var Mydata = Mydatas[UpdataController - 1];		
		// var minTemp = Math.round(1.1*Mydata.length/10);
		// var skip1 = Math.round(1.8*Mydata.length/10);
		// var maxTemp = Math.round(3.0*Mydata.length/10);
		// var skip2 = Math.round(2.2*Mydata.length/10);
		var minTemp = Math.round(0.8*Mydata.length/10);
		var skip1 = Math.round(1.6*Mydata.length/10);
		var maxTemp = Math.round(2.4*Mydata.length/10);
		var skip2 = Math.round(1.8*Mydata.length/10);
		var skip3 = Math.round(0.5*Mydata.length/10) * getRandomInt(2,3);
		var skip4 = Math.round(Math.round(0.2*Mydata.length/10) * getRandomInt(6,7));

		
		console.log(UpdataController)
   		for(var i = UpdataController - 1 ; i < UpdataController; i++){
   			RainLength = RainLength + Mydata.length;

   		}
   		//console.log(Mydata.length)
   		Rainlengths[UpdataController] = Math.round(RainLength/1.5); 
   		console.log(RainLength);
   		console.log(Rainlengths)

   		var RainData = Rainlengths[UpdataController] -Rainlengths[UpdataController-1]
   		var RminTemp = Math.round(0.8*RainData/10);
		var Rskip1 = Math.round(1.6*RainData/10);
		var RmaxTemp = Math.round(2.4*RainData/10);
		var Rskip2 = Math.round(1.8*RainData/10);
		var Rskip3 = Math.round(0.5*RainData/10) * getRandomInt(2,3);
		var Rskip4 = Math.round(Math.round(0.2*RainData/10) * getRandomInt(6,7));

		console.log(RainData)
		var linePath = [];
			linePath = [Xscale(UpdataController) + imageSpace * 3,height/2 - maxTemp * imageSize];
			// get max y coordinate and max x coordinate. and store in linePaths[]
			linePaths[UpdataController-1] = linePath;

			console.log(Mydata.length)

		var updata = container
					// .attr("id",function(){
					// 	return "group" + UpdataController;
					// })
					.selectAll("img")
					.data(Mydata)
					// .data(Mydata.filter(function(d,i){
					// 	if(i%(3+UpdataController) != 0)
					// 		return true;
					// }));

					
		var enter = updata.enter();	
		var exit  = updata.exit();

		
		var Image = enter
					.append("g")
					.attr("class","Image" + UpdataController)
					.append("svg:image")
					.attr("class","myImg")
					.attr("xlink:href", function(d){
						//return d.photo.urls.url[0].myUrl;
						return d.photo.urls.url[0].url_q
						})
					.attr("width",imageSizeMini)
					.attr("height",imageSizeMini)
					.attr("x",function(){

						return Math.random()* width * (Math.random() > 0.5 ? 1 : -1) ;
					})
					.attr("y",function(){

						return Math.random()* height * (Math.random() > 0.5 ? 1 : -1) ;
					})
					.transition()
					.duration(4500)		
					.attr("width",imageSize)
					.attr("height",imageSize)
					.attr("x",function(d,i){
							if(0<= i && i < minTemp)
							return Xscale(UpdataController) ;
							if(minTemp<= i && i < minTemp + skip1)
							return Xscale(UpdataController) + imageSpace;
							if(minTemp + skip1 <= i && i < minTemp + skip1 + maxTemp)
							return Xscale(UpdataController) + imageSpace * 3 ; // maxTemp column
							if(minTemp + skip1 + maxTemp <= i && i < skip2 + minTemp + skip1 + maxTemp)
							return Xscale(UpdataController) + imageSpace * 2 ;
							if(skip2 + minTemp + skip1 + maxTemp <= i && i < skip2 + minTemp + skip1 + maxTemp + skip3)
							return Xscale(UpdataController) + imageSpace * 4 ;
							if(skip2 + minTemp + skip1 + maxTemp + skip3 <= i && i < skip2 + minTemp + skip1 + maxTemp + skip3 + skip4)
							return Xscale(UpdataController) + imageSpace * 5 ;
							if(skip2 + minTemp + skip1 + maxTemp + skip3 + skip4<= i && i <= Mydata.length )
							return Xscale(UpdataController) + imageSpace * 6 ;	
					})
					.attr("y",function(d,i){
						if(0<= i && i < minTemp)
								return height/2 - (i*imageSize) ;
								if(minTemp<= i && i < minTemp + skip1)
								return height/2 - (imageSize * (i - minTemp));
								if(minTemp + skip1 <= i && i < minTemp + skip1 + maxTemp)
								return 	height/2 - (imageSize * (i - minTemp - skip1));
								if(minTemp + skip1 + maxTemp <= i && i < skip2 + minTemp + skip1 + maxTemp)
								return height/2 - (imageSize * (i - minTemp - skip1 - maxTemp));
								//if(skip2 + minTemp + skip1 + maxTemp <= i && i < Mydata.length)
								if(skip2 + minTemp + skip1 + maxTemp <= i && i < skip2 + minTemp + skip1 + maxTemp + skip3)
								return height/2 - (imageSize * (i - minTemp - skip1 - maxTemp - skip2));
								if(skip2 + minTemp + skip1 + maxTemp + skip3 <= i && i < skip2 + minTemp + skip1 + maxTemp + skip3 + skip4)
								return height/2 -  (imageSize * (i - minTemp - skip1 - maxTemp - skip2 - skip3));
								if(skip2 + minTemp + skip1 + maxTemp + skip3 + skip4<= i && i <= Mydata.length )
								return height/2 - (imageSize * (i - minTemp - skip1 - maxTemp - skip2 - skip3 - skip4));
					})
					.attr("opacity",1)

		var ImageAnimation = Image
							.each("end",function(d,i){
								//console.log(i + "pre")
								d3.select(this)
								.on("mouseover",function(){
									var string = d.photo.urls.url[0].url_q;
									d3.select(this)
									.attr("opacity",0.5);
										ImageDisplay
										.transition()
										.duration(200)
										.style("opacity", 1)

							  			ImageDisplay
										.html( 
												 //"<img src =" + string + "/>"  + "<br/>" + "<hr>" +
												d.photo.title._content + "<br/>" +
												//TimeScale(new Date (d.photo.dates.taken)) + "<br/>" +
												d.photo.dates.taken 
												//+ "<br/>" + 
												//HueScale(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])); // when r=b=g, can not get h
											)
									
										.style("left", (d3.event.pageX ) + "px")
										.style("top", (d3.event.pageY  ) + "px");

								})
								.on("mousemove",function(){

						  			ImageDisplay
									.html( 
											 //"<img src =" + string + "/>"  + "<br/>" + "<hr>" +
											d.photo.title._content + "<br/>" +
											//TimeScale(new Date (d.photo.dates.taken)) + "<br/>" +
											d.photo.dates.taken 
											//+ "<br/>" + 
											//HueScale(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])); // when r=b=g, can not get h
										)
								
									.style("left", (d3.event.pageX ) + "px")
									.style("top", (d3.event.pageY  ) + "px")

									d3.select(this)
									.attr("opacity",0.5);

								})
								.on("mouseout",function(){

									  ImageDisplay
									 .transition()
									 .duration(500)
									 //.delay(1000)	 
									 .style("opacity",0);

									 d3.select(this)
									.attr("opacity",1);

								})
				
							//.call(drag);

							}) // each("end") end

		var rainUpdate = container						
						.selectAll("img")
						.data(MyRain.filter(function(d,i){
							return Rainlengths[UpdataController -1] <=i && i <= Rainlengths[UpdataController];
							
						}))

		var rainEnter = rainUpdate.enter();
		
		var rainDrop = rainEnter
						.append("g")
						.attr("class","Rain" + UpdataController)
						.append("svg:image")
						.attr("class","Rain")
						.attr("xlink:href", function(d){
						//return d.photo.urls.url[0].myUrl;
						return d.photo.urls.url[0].url_q
						})
						.attr("width",imageSizeMini)
						.attr("height",imageSizeMini)
						.attr("x",function(){

						return Math.random()* width * (Math.random() > 0.5 ? 1 : -1) ;
						})
						.attr("y",function(){

							return Math.random()* height * (Math.random() > 0.5 ? 1 : -1) ;
						})
						.transition()
						.duration(4500)		
						.attr("width",imageSize)
						.attr("height",imageSize)
						.attr("x",function(d,i){
								if(0<= i && i < RminTemp)
								return Xscale(UpdataController) ;
								if(RminTemp<= i && i < RminTemp + Rskip1)
								return Xscale(UpdataController) + imageSpace;
								if(RminTemp + Rskip1 <= i && i < RminTemp + Rskip1 + RmaxTemp)
								return Xscale(UpdataController) + imageSpace * 3 ; // maxTemp column
								if(RminTemp + Rskip1 + RmaxTemp <= i && i < Rskip2 + RminTemp + Rskip1 + RmaxTemp)
								return Xscale(UpdataController) + imageSpace * 2 ;
								if(Rskip2 + RminTemp + Rskip1 + RmaxTemp <= i && i < Rskip2 + RminTemp + Rskip1 + RmaxTemp + Rskip3)
								return Xscale(UpdataController) + imageSpace * 4 ;
								if(Rskip2 + RminTemp + Rskip1 + RmaxTemp + Rskip3 <= i && i < Rskip2 + RminTemp + Rskip1 + RmaxTemp + Rskip3 + Rskip4)
								return Xscale(UpdataController) + imageSpace * 5 ;
								if(Rskip2 + RminTemp + Rskip1 + RmaxTemp + Rskip3 + Rskip4<= i && i <= RainData )
								return Xscale(UpdataController) + imageSpace * 6 ;	
						})
						.attr("y",function(d,i){
								if(0<= i && i < RminTemp)
								return height/2 + 2*imageSize + (i*imageSize) ;
								if(RminTemp<= i && i < RminTemp + Rskip1)
								return height/2 + 2*imageSize +  (imageSize * (i - RminTemp));
								if(RminTemp + Rskip1 <= i && i < RminTemp + Rskip1 + RmaxTemp)
								return 	height/2 + 2*imageSize + (imageSize * (i - RminTemp - Rskip1));
								if(RminTemp + Rskip1 + RmaxTemp <= i && i < Rskip2 + RminTemp + Rskip1 + RmaxTemp)
								return height/2 + 2*imageSize + (imageSize * (i - RminTemp - Rskip1 - RmaxTemp));
								//if(skip2 + minTemp + skip1 + maxTemp <= i && i < Mydata.length)
								if(Rskip2 + RminTemp + Rskip1 + RmaxTemp <= i && i < Rskip2 + RminTemp + Rskip1 + RmaxTemp + Rskip3)
								return height/2 + 2*imageSize +  (imageSize * (i - RminTemp - Rskip1 - RmaxTemp - Rskip2));
								if(Rskip2 + RminTemp + Rskip1 + RmaxTemp + Rskip3 <= i && i < Rskip2 + RminTemp + Rskip1 + RmaxTemp + Rskip3 + Rskip4)
								return height/2 + 2*imageSize +   (imageSize * (i - RminTemp - Rskip1 - RmaxTemp - Rskip2 - Rskip3));
								if(Rskip2 + RminTemp + Rskip1 + RmaxTemp + Rskip3 + Rskip4<= i && i <= RainData )
								return height/2 + 2*imageSize +  (imageSize * (i - RminTemp - Rskip1 - RmaxTemp - Rskip2 - Rskip3 - Rskip4));
						})
						.attr("opacity",0.375)						

					
		} // draw end


} // dataloaded end	
