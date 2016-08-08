// JavaScript Document
// this javascript is for 
queue()
	.defer(d3.json, 'flickr/SecondGraph2013_2015Christams/EdinburghYear2015Christmas.json')
	.defer(d3.json, 'flickr/SecondGraph2013_2015Christams/EdinburghYear2014Christmas.json')
	.defer(d3.json, 'flickr/SecondGraph2013_2015Christams/EdinburghYear2013Christmas.json')
	.await(dataloaded);

var margin = {t: 50, r: 50, b: 50, l: 50};
var width = 800,
	height = 800;
	originW = width/2; 
	originH = height/2; 
	imagesize = 5; 
	BigImage = 16;
	textsize = 12;	
	radius = (width - margin.l - margin.r)/3
var Clicked = false;
// tooltip for image 
var ImageDisplay = d3.select("body")
					.append("div")
					.attr("class","tooltip")
					.style("position", "absolute")
					//.style("padding", "0 10px")
					.style("background", "none")
					.style("opacity", 0);	

	

var zoom = d3.behavior.zoom()
    .scaleExtent([1, 50])
    .on("zoom", zoomed);

var zoom2 = d3.behavior.zoom()
    .scaleExtent([0.1, 10])
    .on("zoom", zoomed2); 
var zoom3 = d3.behavior.zoom()
    .scaleExtent([0.1, 10])
    .on("zoom", zoomed3); 
var zoom4 = d3.behavior.zoom()
    .scaleExtent([0.1, 10])
    .on("zoom", zoomed4);            

function zoomed(){
  container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function zoomed2(){
  DayListDisplay2013.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
function zoomed3(){
  DayListDisplay2014.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
function zoomed4(){
  DayListDisplay2015.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}								
// append svg 
var svg = d3.select("#container")
		.append("svg")
		.attr("width",width)
		.attr("height",height)
		.style("background", "black")
		.append("g")
		//.attr("transform", "translate(" + originW + "," + originH + ")");	
		.call(zoom)
		// append axis
var TilesSVG2013 = d3.select("#List2013")	
					.append("svg")
					.attr("width",256)
					.attr("height",100)
					.style("background", "black")
					.append("g")
					.call(zoom2)

var TilesSVG2014 = d3.select("#List2014")	
					.append("svg")
					.attr("width",256)
					.attr("height",100)
					.style("background", "black")
					.append("g")
					.call(zoom3)

var TilesSVG2015 = d3.select("#List2015")	
					.append("svg")
					.attr("width",256)
					.attr("height",100)
					.style("background", "black")
					.append("g")
					.call(zoom4)										

var container = svg.append("g");
var DayListDisplay2013 = TilesSVG2013.append("g");
var DayListDisplay2014 = TilesSVG2014.append("g");
var DayListDisplay2015 = TilesSVG2015.append("g");

function dataloaded(err, data2015 , data2014, data2013){
	// to controll data seperately loaded and processed
	var updataController = 0 
	var dataYears = 0;
	// set delay time to data loaded and processed
	var delayTime
	var Mydatas = [data2015,data2014,data2013]
	// perse time(date) in order to be readable by all broswers
	var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse; 
	
	data2013.forEach(function(d) {
		        d.photo.dates.taken = parseDate(d.photo.dates.taken);		        
		   	});
	data2014.forEach(function(d) {
		        d.photo.dates.taken = parseDate(d.photo.dates.taken);		        
		   	});	
	data2015.forEach(function(d) {
		        d.photo.dates.taken = parseDate(d.photo.dates.taken);		        
		   	});	
	// call varDraw for three times and each time dealyed delyaTime
	setInterval(varDraw,200) 
	drawAxis()
	Slider()
	function Slider(){
		// when the input range changes update the circle 
		d3.select("#Transparency2013").on("input", function() {
		  update(+this.value);
		});
		// Initial starting radius of the circle 
		update(25);

		// update the elements
		function update(Transparency2013) {

		  // adjust the text on the range slider
		  d3.select("#Transparency-value").text(Transparency2013/100);
		  d3.select("#Transparency2013").property("value", Transparency2013);

		  // update the circle radius
		  container.selectAll(".group2 .myImg") 
		    .attr("opacity", Transparency2013/100);
		}

		d3.select("#Transparency2014").on("input", function() {
		  update1(+this.value);
		});
		// Initial starting radius of the circle 
		update1(50);

		// update the elements
		function update1(Transparency2014) {

		  // adjust the text on the range slider
		  d3.select("#Transparency-value1").text(Transparency2014/100);
		  d3.select("#Transparency2014").property("value", Transparency2014);

		  // update the circle radius
		  container.selectAll(".group1 .myImg") 
		    .attr("opacity", Transparency2014/100);
		}

		d3.select("#Transparency2015").on("input", function() {
		  update2(+this.value);
		});
		// Initial starting radius of the circle 
		update2(75);

		// update the elements
		function update2(Transparency2015) {

		  // adjust the text on the range slider
		  d3.select("#Transparency-value2").text(Transparency2015/100);
		  d3.select("#Transparency2015").property("value", Transparency2015);

		  // update the circle radius
		  container.selectAll(".group0 .myImg") 
		    .attr("opacity", Transparency2015/100);
		}


	}

	//yearControl()
	// function yearControl(){
	// 	var yearButton = container
	// 					.append("g")
	// 					.attr("class","yearButton")
	// 					.selectAll("g")
	// 					.data(d3.range(0,3,1))
	// 					.enter()
	// 					.append("g")

	// 	var Button =    yearButton				
	// 					.append("circle")
	// 					.attr("r",15)
	// 					.attr("cx",50)
	// 					.attr("cy",function(d,i){
	// 						return (i+1)*100
	// 					})
	// 					.style("fill","white")
	// 					.attr("opacity",0)
	// 					.transition()
	// 					.delay(3000)
	// 					.duration(1000)	
	// 					.attr("opacity",1)


	// 	var animation = Button
	// 					.each("end",function(d,i){
	// 						d3.select(this)
	// 							.on("click",function(){
	// 								Clicked = !Clicked
	// 								var string = [0,1,2]
	// 								var year = Mydatas[i]
	// 								var classString = ".group" + string[i] + " " + ".myImg"

	// 								d3.select(this)
	// 									.transition()
	// 									.duration(1000)
	// 									.attr("opacity",0.5)

	// 								if(Clicked) {
	// 								d3.selectAll(classString)
	// 									.transition()
	// 									.duration(1000)
	// 									.attr("opacity",0)	
	// 									}
	// 								else {

	// 								d3.select(this)
	// 									.transition()
	// 									.duration(1000)
	// 		    						.attr("opacity",1)

	// 		    					d3.selectAll(classString)
	// 		    						.transition()
	// 									.duration(1000)
	// 									.attr("opacity",1)

	// 								}				
	// 							})
									
	// 					})							
	// }
	function drawAxis(){

		//var radius = (width - margin.l - margin.r)/3
		var axisGroup = container
						.append("g")
						.attr("transform", "translate(" + originW + "," + originH + ")")
		var axis =axisGroup
				//.attr("transform", "translate(" + (width - margin.l - margin.r)/2 + "," + (height - margin.l - margin.r)/2 + ")")
				.append("g")
		    	.attr("class", "a axis")
		  		.selectAll("g")
		   	 	.data(d3.range(0, 360, 360/31))
		  		.enter()
		  		.append("g")
		    	.attr("transform", function(d) { return "rotate(" + -d + ")"; })

		var axisText = axis.append("text")
					    .attr("x", radius + 30 )
					    //.attr("y", radius2)
					    //.attr("dx", ".1em")
					    //.attr("dy", ".35em")
					    .style("fill", "white")
					    .style("font-size", "10px")
					    .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
					    .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (radius + 30) + ",0)" : null; })
					    .text(function(d,i) { 
					    	return 31 - i + "  Dec. " 
			 
						}); 
		var featureCircle = axisGroup
							.append("g")
					  		.selectAll("g")
					   	 	.data(d3.range(0, 2* Math.PI, 2* Math.PI/ 31))
					   	 	//.data(d3.range(0, 360, 12))
					  		.enter()
					  		.append("g")
							.append("circle")
							.attr("class", function(d,i){
								return "featureCircle" + (31-i)
							})	
							.attr("cx",function(d,i){
								return	Math.cos(d) * (radius + 85) ;
							})
							.attr("cy",function(d,i){
								return	Math.sin(d) * (radius + 85);
							})
							.attr("r", 12)
							.style("fill","white")
							.style("stroke","none")
							.style("stroke-width", 0.5)
							.attr("opacity",0)
							.transition()
							.duration(1000)
							.attr("opacity",0.5)

		var TimeScaleForFliter2013 = d3.time.scale()
		        .domain(d3.extent(data2013, function(d) { return d.photo.dates.taken }))
				.nice(d3.time.minute)
		        .range([0 * Math.PI, 2 * Math.PI]);
		var TimeScaleForFliter2014 = d3.time.scale()
		        .domain(d3.extent(data2014, function(d) { return d.photo.dates.taken }))
				.nice(d3.time.minute)
		        .range([0 * Math.PI, 2 * Math.PI]);	
		var TimeScaleForFliter2015 = d3.time.scale()
		        .domain(d3.extent(data2015, function(d) { return d.photo.dates.taken }))
				.nice(d3.time.minute)
		        .range([0 * Math.PI, 2 * Math.PI]);	                					

		var featureCircleAnimation = featureCircle
								.each("end",function(d,i){
									d3.select(this)
	
									.on("click",function(){
										Clicked = !Clicked
										var	DayString = i
										console.log(i)
										if(Clicked) {
											// var NewData2015= d3.selectAll(".myImg")
											// 					.filter(function(d,i){
											// 						//console.log(d.photo.dates.taken)
											// 						//return d.photo.datas
											// 						return TimeScaleForFliter(d.photo.dates.taken) >= DayString/ 31 * 2 * Math.PI && TimeScaleForFliter(d.photo.dates.taken) <= (DayString + 1)/ 31* 2* Math.PI; 
											// 					})
															

											DayListDisplay2013
											  .selectAll("img")
											  .data(data2013.filter(function(d,i){
											  	return TimeScaleForFliter2013(d.photo.dates.taken) >= DayString/ 31 * 2 * Math.PI && TimeScaleForFliter2013(d.photo.dates.taken) <= (DayString + 1)/ 31* 2* Math.PI; 
											  }))
											  .enter()
											  .append("svg:image")
											  .attr("class","TempImg")
											  .attr("xlink:href", function(d){
											  	return d.photo.urls.url[0].url_q;

											  })
											  .attr("x",function(d,i){return    BigImage*(i% 16) })
											  .attr("y", function(d,i){return   BigImage* Math.floor(i / 16) })
											
											  .attr("width",BigImage)
											  .attr("height",BigImage)
											  .attr("opacity",0)
											  .transition()
											  .duration(1500)
											  .attr("opacity",1)

											DayListDisplay2014
											  .selectAll("img")
											  .data(data2014.filter(function(d,i){
											  	return TimeScaleForFliter2014(d.photo.dates.taken) >= DayString/ 31 * 2 * Math.PI && TimeScaleForFliter2014(d.photo.dates.taken) <= (DayString + 1)/ 31* 2* Math.PI; 
											  }))
											  .enter()
											  .append("svg:image")
											  .attr("class","TempImg")
											  .attr("xlink:href", function(d){
											  	return d.photo.urls.url[0].url_q;

											  })
											  .attr("x",function(d,i){return    BigImage*(i% 16) })
											  .attr("y", function(d,i){return   BigImage* Math.floor(i / 16) })
											
											  .attr("width",BigImage)
											  .attr("height",BigImage)
											  .attr("opacity",0)
											  .transition()
											  .duration(1500)
											  .attr("opacity",1)

											DayListDisplay2015
											  .selectAll("img")
											  .data(data2015.filter(function(d,i){
											  	return TimeScaleForFliter2015(d.photo.dates.taken) >= DayString/ 30 * 2 * Math.PI && TimeScaleForFliter2015(d.photo.dates.taken) <= (DayString + 1)/ 30* 2* Math.PI; 
											  }))
											  .enter()
											  .append("svg:image")
											  .attr("class","TempImg")
											  .attr("xlink:href", function(d){
											  	return d.photo.urls.url[0].url_q;

											  })
											  .attr("x",function(d,i){return    BigImage*(i% 16) })
											  .attr("y", function(d,i){return   BigImage* Math.floor(i / 16) })
											
											  .attr("width",BigImage)
											  .attr("height",BigImage)
											  .attr("opacity",0)
											  .transition()
											  .duration(1500)
											  .attr("opacity",1)
											//console.log(DayListDisplay)  
									
										} else {
											DayListDisplay2013
											 .selectAll(".TempImg")
											  .transition()
											 .duration(1000)
											 .attr("opacity",0)
											 .remove()

											DayListDisplay2014
											 .selectAll(".TempImg")
											  .transition()
											 .duration(1000)
											 .attr("opacity",0)
											 .remove()
											
											DayListDisplay2015
											 .selectAll(".TempImg")
											 .transition()
											 .duration(1000)
											 .attr("opacity",0)
											 .remove()  
										}	  
									}) // on click

								}) //each

		//console.log(featureCircle)						
		var axisCircle = axisGroup
						.append("circle")
						.attr("r",radius + 15)
						.style("fill","none")
						.style("stroke","white")
						.style("stroke-width", 0.5)		
	
	}



	function varDraw(){

		if ( 0 <= updataController && updataController <= 44){
			updataController ++;
			drawData(updataController)
			if(updataController%15 == 0){
				dataYears ++ ;
			}	
		} else if (updataController == 45) {
			clearInterval(varDraw)
		}	

	}// varDraw End

	// draw 2015
	function drawData(updataController){
		var Mydata = Mydatas[dataYears]

		// get time range for the axis
		var timeData = []
		for(var i = 0 ; i<Mydata.length ; i++){	
			timeData[i] = Mydata[i].photo.dates.taken;
			}
		var timeDomainMin = d3.min(timeData);
		var timeDomainMax = d3.max(timeData);

		var TimeScale = d3.time.scale()
		        .domain(d3.extent(Mydata, function(d) { return d.photo.dates.taken; }))
				.nice(d3.time.minute)
		        .range([0 * Math.PI, 2 * Math.PI]);
	        
		// get hue range for axis
		var hueData = [] 
		for(var i = 0 ; i<Mydata.length ; i++){
			hueData[i] = getImageHue(Mydata[i].photo.color[0],Mydata[i].photo.color[1],Mydata[i].photo.color[2]);	
			}	

		var hueDomain = d3.extent(hueData);     
		var HueScale = d3.scale.linear()
		        .domain(hueDomain)
		        .range([0,radius]);	


		// build MOD in HTML
		var DataGroup = container
						.append("g")
						.attr("class",function(){
							return "group" + dataYears
						}) //+ updataController)
						.attr("transform", "translate(" + originW + "," + originH + ")");


		var upMydata = DataGroup.selectAll("img")
						.attr("class", "myImg") //+  updataController)
						.data(Mydata.filter(function(d,i){
							for(var j=0; j<= Mydata.length; j++){
								if (j == (updataController - 1)%15 ) {
									return 200*j <= i && i < 200*(j+1)
								}

							}
						 }))
				
		var enterData = upMydata.enter()

		var exitData  = upMydata.exit();

		// processing the MOD
		var updataI = upMydata
					//.transition()
					// .duration(2000)
					.attr("xlink:href", function(d){
						return d.photo.urls.url[0].url_q;
						})	
					.attr("width",imagesize)
					.attr("height",imagesize)
					.attr("x",function(d,i){
						
						return Math.cos(TimeScale(d.photo.dates.taken))*HueScale(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
					})
					.attr("y", function(d,i){
						
						return  Math.sin(TimeScale(d.photo.dates.taken))*HueScale(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
					})

		var enterI = enterData
					.append("svg:image")
					.attr("class","myImg")
					.attr("xlink:href", function(d){
						//return d.photo.urls.url[0].url_sq;
						return d.photo.urls.url[0].url_q;
						})	
					.attr("width",imagesize)
					.attr("height",imagesize)
					.attr("x",function(d,i){
				
						return Math.cos(TimeScale(d.photo.dates.taken))*HueScale(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
					})
					.attr("y", function(d,i){
			
						return  Math.sin(TimeScale(d.photo.dates.taken))*HueScale(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
					})
					.attr("opacity",(dataYears + 1)/4)


		exitData.transition().duration(2000).remove();	

		// animation for imgs
		var controller = 0;
		var ImageAnimation = enterI
							 //.each("end",function(){ // this starts work only the enterI transition end.
							 	
							 	//d3.select(this) // after the first transition in enterI, must declear this!
		   						.on("mouseover",function(d,i){

								       var string = d.photo.urls.url[0].url_q;
										ImageDisplay
										.transition()
										.duration(200)
										.style("opacity", 1)	
							  			ImageDisplay
										.html( function(){
												//if(0 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) < 160){
												return "<img src =" + string + "/>"  + "<br/>" + "<hr>" +
												d.photo.title._content + "<br/>" +
												//TimeScale(new Date (d.photo.dates.taken)) + "<br/>" +
												d.photo.dates.taken + "<br/>" +
							
												"Photo Hue :" + (Math.round(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) * 100)/100); 
												// when r=b=g, can not get h
												//}
											})
									
										.style("left", (d3.event.pageX + 75) + "px")
										.style("top", (d3.event.pageY - 75) + "px");
								    })
		   						.on("mousemove",function(){
		   							  var string = d.photo.urls.url[0].url_q;
		   							  ImageDisplay
										.transition()
										.duration(200)
										.style("opacity", 1)	
							  			ImageDisplay
										.html( function(){
												//if(0 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) < 160){
												return "<img src =" + string + "/>"  + "<br/>" + "<hr>" +
												d.photo.title._content + "<br/>" +
												//TimeScale(new Date (d.photo.dates.taken)) + "<br/>" +
												d.photo.dates.taken + "<br/>" +
							
												"Photo Hue :" + (Math.round(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) * 100)/100); 
												// when r=b=g, can not get h
												//}
											})
									
										.style("left", (d3.event.pageX + 75) + "px")
										.style("top", (d3.event.pageY - 75) + "px");

		   						})
								.on("mouseout", function(d){
								 	 controller ++;
									 ImageDisplay
									 .transition()
									 .duration(500)
									 .style("opacity",0);
									 	
									 })	
								// })

		 console.log(upMydata);
		 //console.log(enter2015);
		 console.log(updataController)

	} //function draw end	


} // dataloaded End

// get rgb from json file
function getImageColor(r,g,b){
    return d3.rgb(r,g,b);
}

// get hsl (hue, saturation, lightness) from rgb value
function getImageHue(r,g,b){

	if(( r==g ) && (g==b)){
	 return d3.rgb(r-1,g+1,b).hsl().h;
	}
	else{									
    return d3.rgb(r,g,b).hsl().h;
	}
}



