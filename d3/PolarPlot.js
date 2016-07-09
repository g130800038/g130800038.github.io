// JavaScript Document
// this javascript is for 
queue()
	.defer(d3.json, 'flickr/FirstGraph2015Landscape/EdinburghYear2015Color.json')
	.await(dataloaded);

var margin = {t: 50, r: 50, b: 50, l: 50};
var width = 1000,
	height = 800;
	originW = width/2; 
	originH = height/2; 
	
var imagesize = 2.75;
var imageExplore = 50;
//var Clicked = false;	

var zoom = d3.behavior.zoom()
    .scaleExtent([1, 50])
    .on("zoom", zoomed);

function zoomed(){
  container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}


// tooltip for image 
var ImageDisplay = d3.select("body")
					.append("div")
					.attr("class","tooltip")
					.style("position", "absolute")
					//.style("padding", "0 10px")
					.style("background", "none")
					.style("opacity", 0);

// append svg 
var svg = d3.select("#container")
		.append("svg")
		.attr("width",width)
		.attr("height",height)
		.style("background", "black")
		.append("g")
		.attr("transform", "translate(" + originW + "," + originH + ")")
		.call(zoom)

var container = svg.append("g");	

function dataloaded(err, data){	
 	
 	drawData();

// get time range for the axis
function drawData(){
		var timeData = []
		for(var i = 0 ; i<data.length ; i++){	
			timeData[i] = data[i].photo.dates.taken;
			}
		var timeDomainMin = d3.min(timeData);
		var timeDomainMax = d3.max(timeData);

	/*
		var TimeScale = d3.time.scale()
		        .domain([new Date(timeDomainMin), new Date(timeDomainMax)])
		        .rangeRound([0, (width - margin.l - margin.r)/2])
		        .nice()
	*/  
		var TimeScale2 = d3.time.scale()
		        .domain([new Date("2015-01-01 00:00:00"), new Date("2015-12-31 23:59:59")])
				 .nice(d3.time.day)
		        .range([0, 2 * Math.PI]);
	        		
			

	// get hue range for axis
		var hueData = []
		for(var i = 0 ; i<data.length ; i++){
			hueData[i] = getImageHue(data[i].photo.color[0],data[i].photo.color[1],data[i].photo.color[2]);	
			}	

		var hueDomain = d3.extent(hueData);
	/*
	var HueScale = d3.scale.linear()
	        .domain(hueDomain)
	        .range([0, 2 * Math.PI]);
	*/      
		var HueScale2 = d3.scale.linear()
		        .domain(hueDomain)
		        .range([25, (width - margin.l - margin.r)/2.1]);	

		var HueScale3 = d3.scale.linear()
		        .domain(hueDomain)
		        .range([(width - margin.l - margin.r)/2.6, (width - margin.l - margin.r)/2.5]);	        	        

		var radius2 = HueScale2(d3.max(hueData)); 


		var axis =container
				//.attr("transform", "translate(" + (width - margin.l - margin.r)/2 + "," + (height - margin.l - margin.r)/2 + ")")
				.append("g")
		    	.attr("class", "a axis")
		  		.selectAll("g")
		   	 	.data(d3.range(0, 360, 30))
		  		.enter()
		  		.append("g")
		    	.attr("transform", function(d) { return "rotate(" + -d + ")"; })

		var axisText = axis.append("text")
					    .attr("x", radius2/2 +5 )
					    //.attr("y", radius2)
					    //.attr("dx", ".1em")
					    //.attr("dy", ".35em")
					    .style("fill", "white")
					    .style("font-size", "10px")
					    .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
					    .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (radius2/2 + 5) + ",0)" : null; })
					    .text(function(d,i) { 
					     if (i == 0) return "Jan.";
					     if (i == 1) return "Dec.";
						 if (i == 2) return "Nov."; 
						 if (i == 3) return "Oct.";
						 if (i == 4) return "Sept.";
						 if (i == 5) return "Aug.";
						 if (i == 6) return "July"; 
						 if (i == 7) return "June";
						 if (i == 8) return "May";
						 if (i == 9) return "April.";
						 if (i == 10) return "March"; 
						 if (i == 11) return "Feb.";  
						}); 

		var axisCircle = container.append("circle")
						.attr("r",radius2/2 - 5)
						.style("fill","none")
						.style("stroke","white")
						.style("stroke-width", 0.5)				

		//console.log(radius2);

	// build MOD in HTML
		var updata = container
					.append("g")
					.attr("id","groupImg")
					.selectAll("img")
					.attr("class", "myImg")
					.data(data);
					
		var enter = updata.enter();	
		var exit  = updata.exit();

	// processing the MOD
		var updataI = updata
					.attr("xlink:href", function(d){
						return d.photo.urls.url[0].url_q;
						//return d.photo.urls.url[0].myUrl;
						})	
					.attr("width",imagesize)
					.attr("height",imagesize)
					.attr("x",function(d,i){
						return TimeScale(new Date(d.photo.dates.taken))*Math.cos(HueScale(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))) ;
					})
					.attr("y", function(d,i){
						return  TimeScale(new Date(d.photo.dates.taken))*Math.sin(HueScale(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))) ;
					});
		var enterI = enter
					//.append("rect")
					.append("svg:image")
					.attr("xlink:href", function(d){
						return d.photo.urls.url[0].url_sq;
						})	
					.attr("width",imagesize)
					.attr("height",imagesize)
					.attr("x",function(d,i){
						if ( 290 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) <= 360) 
						return Math.cos(TimeScale2(new Date(d.photo.dates.taken)))*HueScale3(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
						else
						return Math.cos(TimeScale2(new Date(d.photo.dates.taken)))*HueScale2(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
					})
					.attr("y", function(d,i){
						if ( 290 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) <= 360) 
						return Math.sin(TimeScale2(new Date(d.photo.dates.taken)))*HueScale3(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
						else
						return  Math.sin(TimeScale2(new Date(d.photo.dates.taken)))*HueScale2(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
					})
					.attr("opacity",0.85)

		exit.remove();	

	// animation for imgs
		var controller = 0;
	//var controlbool = false;
		var ImageAnimation = enterI
		   						.on("mouseover",function(d,i){
								       var string = d.photo.urls.url[0].url_q
										ImageDisplay
										.transition()
										.duration(200)
										.style("opacity", 1)	
							  			ImageDisplay
										.html( function(){
												return "<img src =" + string + "/>"  + "<br/>" + "<hr>" +
												d.photo.title._content + "<br/>" +
												//TimeScale(new Date (d.photo.dates.taken)) + "<br/>" +
												d.photo.dates.taken + "<br/>" +
												"Photo Hue :" + (Math.round(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) * 100)/100); 
												// when r=b=g, can not get h
											})
									
										.style("left", (d3.event.pageX + 75) + "px")
										.style("top", (d3.event.pageY - 75) + "px");
								    })
								 .on("mouseout", function(d){
								 	controller ++; // 50% 
									 ImageDisplay
									 .transition()
									 .duration(500)
									 .style("opacity",0);
									 })
								 .on("dblclick",function(d){
									d3.select(this)
										.style("opacity", 1)								
										.transition()
										.duration(8000)
										.attrTween("transform",function(){
											var i = d3.interpolate(0, 360);
											return function(t){
												return "rotate(" + i(t) + ")"								
											}
										})	
										.attr("width",function(){
											if(controller%2 == 1)
												return imageExplore;
											else
												return imagesize;
											
										})
										.attr("height",function(){
											if(controller%2 == 1)
												return imageExplore;
											else
												return imagesize;
										})	
										.each("end", function(){
												d3.select(this)
													.transition()
													.delay(5000)
													.duration(4000)
													.attr("height",imagesize)
													.attr("width", imagesize)
													.ease("elastic-out")
											})					
									 })	

	/*							 
								 .on("click",function(d,i){	
								  
									Clicked = !Clicked
									if(Clicked) {
									d3.select(this)
										.style("opacity", 1)								
										.transition()
										.duration(5000)	
										.attrTween("transform",function(){
											var i = d3.interpolate(0, 360);
											return function(t){
												return "rotate(" + i(t) + ")"								

										}
									})										
										// .attr("x", function(){
										// 	return Math.cos(2*Math.PI + TimeScale2(new Date(d.photo.dates.taken)))*HueScale2(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))
										// })
										// .attr("y", function(){
										// 	return Math.sin(2 * Math.PI + TimeScale2(new Date(d.photo.dates.taken)))*HueScale2(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))
										// })
										.attr("width",2.75)
										.attr("height",2.75)
										
									 } 
									else {
										d3.select(this)
										.style("opacity", 1)								
										.transition()
										.duration(5000)	
										.attrTween("transform",function(){
											var i = d3.interpolate(0, 360);
											return function(t){
												return "rotate(" + i(t) + ")"
										}
									})	
													
									// d3.select(this)
									// 	.style("opacity", 0.3)								
									// 	.transition()
									// 	.duration(800)											
									// 	.attr("x", 20*(i%12))
										.attr("width",2.75)
										.attr("height",2.75)									
									 }
						 
									})

	*/

	}
	
	//console.log(enterI)
} // function datalaoded end


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


