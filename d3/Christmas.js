// JavaScript Document
// this javascript is for 
queue()
	.defer(d3.json, 'flickr/SecondGraph2013_2015Christams/EdinburghYear2015Christmas.json')
	.defer(d3.json, 'flickr/SecondGraph2013_2015Christams/EdinburghYear2014Christmas.json')
	.defer(d3.json, 'flickr/SecondGraph2013_2015Christams/EdinburghYear2013Christmas.json')
	.await(dataloaded);

var margin = {t: 50, r: 50, b: 50, l: 50};
var width = 1200,
	height = 1200;
	originW = width/2; 
	originH = height/2; 
	

//var Clicked = false;	

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
		//.attr("transform", "translate(" + originW + "," + originH + ")");	

		// append axis
function drawAxis(){
	var radius = 280;
	
	var axis = svg
			//.attr("transform", "translate(" + (width - margin.l - margin.r)/2 + "," + (height - margin.l - margin.r)/2 + ")")
			.append("g")
	    	.attr("class", "time axis")
	    	.attr("transform", "translate(" + originW + "," + originH + ")")	
	  		.selectAll("g")
	   	 	.data(d3.range(0, 360, 90))
	  		.enter()
	  		.append("g")
	    	.attr("transform", function(d) { return "rotate(" + -d + ")"; })
	// draw axisText    	
	var axisText = axis.append("text")
				    .attr("x", radius)
				    //.attr("y", radius)
				    .attr("dx", "-2.5em")
				    .attr("dy", "-2em")
				    .style("fill", "grey")
				    .style("font-size", "8px")
				    //.style("text-anchor", function(d) { return d <= 270 && d >= 90 ? "end" : null; })
				    //.attr("transform", function(d) { return d = 270  ? "rotate(90 " + (radius) + ",0)" : null; })
				    .attr("transform", function(d) { return d = 90 ? "rotate(90 " + (radius) + ",0)" : null; })
				    .text(function(d,i) { 
				     if (i == 1) return "2013 ";
				     if (i == 3) return "2014 ";
				 
					}); 

	var axisCircle = axis.append("circle")
					.attr("r",0)
					//.style("fill","white")
					.style("opacity",0.5)
					.style("stroke","white")
					.style("stroke-width", 0.4)	
					.transition()
					.duration(2000)
					.ease("back-out")
					.attr("r",radius )
					.style("fill","none")
					.style("stroke","white")
					.style("stroke-width", 0.2)	 
}				  		 	
	
function dataloaded(err, data2015 , data2014, data2013){
		
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
	// get hue range for axis
	var hueData2013 = [] 
	for(var i = 0 ; i<data2013.length ; i++){
		hueData2013[i] = getImageHue(data2013[i].photo.color[0],data2013[i].photo.color[1],data2013[i].photo.color[2]);	
		}	

	var hueDomain2013 = d3.extent(hueData2013);     
	var HueScale2013 = d3.scale.linear()
	        .domain(hueDomain2013)
	        .range([(width - margin.l - margin.r)/30,(width - margin.l - margin.r)/8]);	
	
	var HueScale20132 = d3.scale.linear()
	        .domain(hueDomain2013)
	        .range([(width - margin.l - margin.r)/5, (width - margin.l - margin.r)/2.4]);	
	

	setTimeout(drawAxis,65000);
	setTimeout(rotate2015,25000);
	setTimeout(Redistrubute2013,500*(data2014.length/50) + 800*(data2013.length/50) + 4000 * 5 + 3000)

	function Redistrubute2013(){    	   
        
		var timeData2013 = []
		for(var i = 0 ; i<data2013.length ; i++){	
			timeData2013[i] = data2013[i].photo.dates.taken;
			}
		var timeDomainMin2013 = d3.min(timeData2013);
		var timeDomainMax2013 = d3.max(timeData2013);

		var TimeScale2013 = d3.time.scale()
		        //.domain([new Date("2013-12-01 00:00:00"), new Date("2013-12-31 23:59:59")])
		        .domain(d3.extent(data2013, function(d) { return d.photo.dates.taken; }))
				.nice(d3.time.day)
		        .range([0 * Math.PI, 2 * Math.PI]);

		var TimeScale20132 = d3.time.scale()
		        //.domain([new Date("2013-12-01 00:00:00"), new Date("2013-12-31 23:59:59")])
		        .domain(d3.extent(data2013, function(d) { return d.photo.dates.taken; }))
				.nice(d3.time.day)
		        .range([1 * Math.PI, 2 * Math.PI]);

		d3.selectAll(".group2013 .myImg")
			.transition()
			.duration(8000)
			.ease("back-in-out")
			.attr("x",function(){

				return Math.random()* originW/2 * (Math.random() > 0.5 ? 1 : -1) ;
					})
			.attr("y",function(){

				return Math.random()* originH/2 * (Math.random() > 0.5 ? 1 : -1) ;
					})
			.attr("width",25)
			.attr("height",25)
			.each("end",function(d,i){

				d3.select(this)
				.transition()
				.duration(4000)
				.ease("back-in-out")
				.attr("x",function(d,i){
				 	//100
					//return Math.cos(TimeScale20132(new Date(d.photo.dates.taken)))*HueScale20132(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))  ;
					return Math.cos(TimeScale20132(d.photo.dates.taken))*HueScale20132(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))  ;

						 	})
				.attr("y",function(d,i){
					//100
					return Math.sin(TimeScale20132(d.photo.dates.taken))*HueScale20132(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
				 })
				.attr("height",2.75)
				.attr("width",2.75)

			})

	}

	function rotate2015(){
		d3.selectAll(".group2015 .myImg")
			.transition()
			.duration(22000)
			.attrTween("transform",function(){
				var i = d3.interpolate(0, 360);
				return function(t){
					return "rotate(" + i(t) + ")"								
				}
			})
		}

	updataController = 0;
	//console.log(data2014.length)
	//draw2013();
	setInterval(var2013, 800);
	function var2013(){
	     if( (data2014.length/50) + 5<= updataController && updataController <= (data2014.length/50) + 5 + data2013.length/50) {
	         //updataController++;
	         draw2013();
	     } else {
	         clearInterval(var2013);
	     }
	};
	
	draw2014();
	setInterval(var2014, 500);
	function var2014(){
	     if( 5<= updataController && updataController <= (data2014.length/50) + 5) {
	         //updataController++;
	         draw2014();
	     } else {
	         clearInterval(var2014);
	     }
	};
	setInterval(var2015, 4000);
	function var2015(){
	     if(updataController <= 4) {
	         //updataController++;
	         draw2015();
	     } else {
	         clearInterval(var2015);
	     }
	};
	

	function draw2013(){
   	    	           
		updataController ++;
		console.log("draw2013")
		// get time range for the axis
		var timeData = []
		for(var i = 0 ; i<data2013.length ; i++){	
			timeData[i] = data2013[i].photo.dates.taken;
			}
		var timeDomainMin = d3.min(timeData);
		var timeDomainMax = d3.max(timeData);

		var TimeScale1 = d3.time.scale()
		        //.domain([new Date("2013-12-01 00:00:00"), new Date("2013-12-31 23:59:59")])
		        .domain(d3.extent(data2013, function(d) { return d.photo.dates.taken; }))
				.nice(d3.time.day)
		        .range([0 * Math.PI, 2 * Math.PI]);

		var TimeScale2 = d3.time.scale()
		        //.domain([new Date("2013-12-01 00:00:00"), new Date("2013-12-31 23:59:59")])
		        .domain(d3.extent(data2013, function(d) { return d.photo.dates.taken; }))
				.nice(d3.time.day)
		        .range([1 * Math.PI, 2 * Math.PI]);
	        
		// get hue range for axis
		var hueData = [] 
		for(var i = 0 ; i<data2013.length ; i++){
			hueData[i] = getImageHue(data2013[i].photo.color[0],data2013[i].photo.color[1],data2013[i].photo.color[2]);	
			}	

		var hueDomain = d3.extent(hueData);     
		var HueScale1 = d3.scale.linear()
		        .domain(hueDomain)
		        .range([(width - margin.l - margin.r)/30,(width - margin.l - margin.r)/8]);	
		
		var HueScale2 = d3.scale.linear()
		        .domain(hueDomain)
		        .range([(width - margin.l - margin.r)/5, (width - margin.l - margin.r)/2.4]);	        	        
		        //.rangeRound([35,50])
		var radius2 = HueScale2(d3.max(hueData)); 

		// build MOD in HTML
		var g2013 = svg.append("g")
						.attr("transform","translate(" + originW + "," + originH + ")")
						.attr("class","group2013")


		var updata2013 = g2013.selectAll("img")
						.attr("class", "myImg")
						//.data(data2013)
						.data(data2013.filter(function(d,i){
							//console.log("data: filter")
							for(var j = 0; j<=data2013.length/50; j++){
								if (j == updataController - Math.round((data2014.length/50)) -6  ) {
									return  50*j<= i && i < 50*(j+1); 
									console.log(j)
								}
								
							}
							
						// 	if(updataController == 6)
						// 	return  TimeScale1(new Date("2015-12-06 00:00:00")) <= TimeScale1(new Date(d.photo.dates.taken)) && TimeScale1(new Date(d.photo.dates.taken)) < TimeScale1(new Date("2015-12-07 00:00:00"));
						 }))
				
		var enter2013 = updata2013.enter()
		var exit2013  = updata2013.exit();
		// processing the MOD
		var updataI = updata2013
					.transition()
					.duration(2000)
					.attr("xlink:href", function(d){
						//return d.photo.urls.url[0].url_sq;
						return d.photo.urls.url[0].url_q;
						})	
					.attr("width",2.75)
					.attr("height",2.75)
					.attr("x",function(d,i){
						// var rangeMin = (width - margin.l - margin.r)/5.01 * Math.sqrt((i+data2014.length)/data2014.length)
						// var NewHueScale = d3.scale.linear()
						// 		        .domain(hueDomain)
						// 		        .range([rangeMin, (width - margin.l - margin.r)/5]);

						//if ( 0 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) < 145) 
						//return Math.cos(TimeScale1(new Date(d.photo.dates.taken)))*HueScale2(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
						//else
						//return Math.cos(TimeScale1(new Date(d.photo.dates.taken)))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) + 300 ;
						return Math.cos(TimeScale1(d.photo.dates.taken))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) + 300 ;
					
					})
					.attr("y", function(d,i){
						var rangeMin = (width - margin.l - margin.r)/5.01 * Math.sqrt((i+data2014.length)/data2014.length)
						var NewHueScale = d3.scale.linear()
								        .domain(hueDomain)
								        .range([rangeMin, (width - margin.l - margin.r)/5]);
					
						//return  Math.sin(TimeScale1(new Date(d.photo.dates.taken)))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) - 300 ;
						return  Math.sin(TimeScale1(d.photo.dates.taken))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) - 300 ;
					
					})

		var enterI = enter2013
					.append("svg:image")
					.attr("class","myImg")
					.attr("xlink:href", function(d){
						//return d.photo.urls.url[0].url_sq;
						return d.photo.urls.url[0].url_q;
						})	
					.attr("width",2.75)
					.attr("height",2.75)
					.attr("x",function(){

						return Math.random()* originW/2 * (Math.random() > 0.5 ? 1 : -1) ;
					})
					.attr("y",function(){

						return Math.random()* originH/2 * (Math.random() > 0.5 ? 1 : -1) ;
					})
					.transition()
					.duration(4500)
					//.ease("elastic")
					.attr("x",function(d,i){
						
						//return Math.cos(TimeScale1(new Date(d.photo.dates.taken)))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
						return Math.cos(TimeScale1(d.photo.dates.taken))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
					
					})
					.attr("y", function(d,i){
						
						//return  Math.sin(TimeScale1(new Date(d.photo.dates.taken)))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) - 450;
						return  Math.sin(TimeScale1(d.photo.dates.taken))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) - 450;
					
					})
					.attr("width",1.5)
					.attr("height",1.5)
		

		exit2013.transition().duration(2000).remove();	
		
		var controller = 0;
		var ImageAnimation = enterI
								.each("end",function(){
									
								d3.select(this)
		   						.on("mouseover",function(d,i){
		   							controller++;
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
								 	//controller ++; // 50% 
									 ImageDisplay
									 .transition()
									 .duration(500)
									 .style("opacity",0);

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
										.attr("width",function(){
											if(controller%2 == 1)
												return 25;
											else
												return 2;
											
										})
										.attr("height",function(){
											if(controller%2 == 1)
												return 25;
											else
												return 2;
										})	
										.each("end", function(){
												d3.select(this)
													.transition()
													.delay(5000)
													.duration(4000)
													.attr("height",2.75)
													.attr("width", 2.75)
													.ease("elastic-out")
										})		
									})
								 })
		 console.log(updata2013);
		 console.log(enter2013);
		 console.log(updataController)						
	
	} // draw2014 end
	
	function draw2014(){
	
		updataController ++;

		// get time range for the axis
		var timeData = []
		for(var i = 0 ; i<data2014.length ; i++){	
			timeData[i] = data2014[i].photo.dates.taken;
			}
		var timeDomainMin = d3.min(timeData);
		var timeDomainMax = d3.max(timeData);
		var min2014 = parseDate("2014-12-01 00:00:00")
		var max2014 = parseDate("2014-12-31 23:59:59")
		var TimeScale1 = d3.time.scale()
		        //.domain([new Date("2014-12-01 00:00:00"), new Date("2014-12-31 23:59:59")])
		        //.domain(d3.extent(data2014, function(d) { return d.photo.dates.taken; }))
		        .domain([min2014,max2014])
				.nice(d3.time.minute)
		        .range([0 * Math.PI, 2 * Math.PI]);

		var TimeScale2 = d3.time.scale()
		        //.domain(d3.extent(data2014, function(d) { return d.photo.dates.taken; }))
		        //.domain([parseDate(2014-12-01 00:00:00),parseDate(2014-12-31 23:59:59)])
		        .domain([min2014,max2014])
		        //.domain([new Date("2014-12-01 00:00:00"), new Date("2014-12-31 23:59:59")])
				.nice(d3.time.minute)
		        .range([-1 * Math.PI, -2 * Math.PI]);
	        
	// get hue range for axis
		var hueData = [] 
		for(var i = 0 ; i<data2014.length ; i++){
			hueData[i] = getImageHue(data2014[i].photo.color[0],data2014[i].photo.color[1],data2014[i].photo.color[2]);	
			}	

		var hueDomain = d3.extent(hueData);     
		var HueScale1 = d3.scale.linear()
		        .domain(hueDomain)
		        .range([0,(width - margin.l - margin.r)/5]);	
		
		var HueScale2 = d3.scale.linear()
		        .domain(hueDomain)
		        .range([(width - margin.l - margin.r)/5, (width - margin.l - margin.r)/2.4]);	        	        
		        //.rangeRound([35,50])
		var radius2 = HueScale2(d3.max(hueData)); 

	// build MOD in HTML
		var g2014 = svg.append("g")
						.attr("transform","translate(" + originW + "," + originH + ")")
						.attr("class","group2014" + updataController)


		var updata2014 = g2014.selectAll("img")
						.attr("class", "myImg")
						//.data(data2014)
						.data(data2014.filter(function(d,i){

							for(var j = 0; j<=data2014.length/50; j++){
								if (j == updataController - 5) {
									return  50*j<= i && i < 50*(j+1); 
								}

							}
							
						
						// 	if(updataController == 6)
						// 	return  TimeScale1(new Date("2015-12-06 00:00:00")) <= TimeScale1(new Date(d.photo.dates.taken)) && TimeScale1(new Date(d.photo.dates.taken)) < TimeScale1(new Date("2015-12-07 00:00:00"));
						 }))
				
		var enter2014 = updata2014.enter()
		var exit2014  = updata2014.exit();
		// processing the MOD
		var updataI = updata2014
					.transition()
					.duration(2000)
					.attr("xlink:href", function(d){
						//return d.photo.urls.url[0].url_sq;
						return d.photo.urls.url[0].url_q;
						})	
					.attr("width",2.75)
					.attr("height",2.75)
					.attr("x",function(d,i){
				
						//return Math.cos(TimeScale1(new Date(d.photo.dates.taken)))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
						return Math.cos(TimeScale1(d.photo.dates.taken))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
					
					})
					.attr("y", function(d,i){
					
						//return  Math.sin(TimeScale1(new Date(d.photo.dates.taken)))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
						return Math.cos(TimeScale1(d.photo.dates.taken))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
					
					})

		var enterI = enter2014
					.append("svg:image")
					.attr("class","myImg")
					.attr("xlink:href", function(d){
						//return d.photo.urls.url[0].url_sq;
						return d.photo.urls.url[0].url_q;
						})	
					.attr("width",2.75)
					.attr("height",2.75)
					.attr("x",function(){

						return Math.random()* originW * (Math.random() > 0.5 ? 1 : -1) ;
					})
					.attr("y",function(){

						return Math.random()* originH * (Math.random() > 0.5 ? 1 : -1) ;
					})
					.transition()
					.duration(5000)
					.ease("back-in-out")
					.attr("x",function(d,i){
						
						//return Math.cos(TimeScale1(new Date(d.photo.dates.taken)))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))  ;
						return Math.cos(TimeScale1(d.photo.dates.taken))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))  ;
					
					})
					.attr("y", function(d,i){
						
						//return  Math.sin(TimeScale1(new Date(d.photo.dates.taken)))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
						return Math.cos(TimeScale1(d.photo.dates.taken))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))  ;
					
					})
		
		

		exit2014.transition().duration(2000).remove();	
		
		var controller = 0;
		var ImageAnimation = enterI
								.each("end",function(){
										d3.select(this)
										.transition()
										.delay(500 * data2014.length/50 - 4000)
										.duration(1500)
										.ease("back-in-out")
										
										.attr("x",function(d,i){
										 			//100
											//return Math.cos(TimeScale2(new Date(d.photo.dates.taken)))*HueScale2(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))  ;
											return Math.cos(TimeScale2(d.photo.dates.taken))*HueScale2(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))  ;

												 	})
										.attr("y",function(d,i){
												 	//100
											//return Math.cos(TimeScale2(new Date(d.photo.dates.taken)))*HueScale2(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))  ;

											return Math.sin(TimeScale2(d.photo.dates.taken))*HueScale2(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
										 })
									
								d3.select(this)
		   						.on("mouseover",function(d,i){
		   							controller++;
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
								 	//controller ++; // 50% 
									 ImageDisplay
									 .transition()
									 .duration(500)
									 .style("opacity",0);

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
										.attr("width",function(){
											if(controller%2 == 1)
												return 25;
											else
												return 2;
											
										})
										.attr("height",function(){
											if(controller%2 == 1)
												return 25;
											else
												return 2;
										})	
										.each("end", function(){
												d3.select(this)
													.transition()
													.delay(5000)
													.duration(4000)
													.attr("height",2.75)
													.attr("width", 2.75)
													.ease("elastic-out")
										})		
									})
								 })
		 console.log(updata2014);
		 console.log(enter2014);
		 console.log(updataController)						
	
	} // draw2014 end




	// animation draw for 2015	
	

	// draw 2015
	function draw2015(){

		updataController ++;

		// get time range for the axis
		var timeData = []
		for(var i = 0 ; i<data2015.length ; i++){	
			timeData[i] = data2015[i].photo.dates.taken;
			}
		var timeDomainMin = d3.min(timeData);
		var timeDomainMax = d3.max(timeData);

		var TimeScale1 = d3.time.scale()
		        //.domain([new Date("2015-12-01 00:00:00"), new Date("2015-12-31 23:59:59")])
		        .domain(d3.extent(data2015, function(d) { return d.photo.dates.taken; }))
				.nice(d3.time.minute)
		        .range([0 * Math.PI, 2 * Math.PI]);

		var TimeScale2 = d3.time.scale()
		        //.domain([new Date("2015-12-01 00:00:00"), new Date("2015-12-31 23:59:59")])
		        .domain(d3.extent(data2015, function(d) { return d.photo.dates.taken; }))
				.nice(d3.time.minute)
		        .range([1 * Math.PI, 2 * Math.PI]);
	        
		// get hue range for axis
		var hueData = [] 
		for(var i = 0 ; i<data2015.length ; i++){
			hueData[i] = getImageHue(data2015[i].photo.color[0],data2015[i].photo.color[1],data2015[i].photo.color[2]);	
			}	

		var hueDomain = d3.extent(hueData);     
		var HueScale1 = d3.scale.linear()
		        .domain(hueDomain)
		        .range([0,(width - margin.l - margin.r)/5]);	

		var HueScale2 = d3.scale.linear()
		        .domain(hueDomain)
		        .range([0, (width - margin.l - margin.r)/2]);	        	        
		        //.rangeRound([35,50])
		var radius2 = HueScale2(d3.max(hueData)); 

		// build MOD in HTML
		var g2015 = svg.append("g")
						.attr("class","group2015") //+ updataController)
						.attr("transform", "translate(" + originW + "," + originH + ")");


		var updata2015 = g2015.selectAll("img")
						.attr("class", "myImg") //+  updataController)
						.data(data2015.filter(function(d,i){
							if(updataController == 1 )
							return	0 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) < 40 ;
							if(updataController == 2)
							return  40 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) < 80	;
							if(updataController == 3)
							return  70 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) < 145	;
							if(updataController == 4) // && i%2 != 0
							return  155 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) <= 240;
							if(updataController == 5) // && i%2 != 0
							return  240 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) <= 360;		
						// 	if(updataController == 1)
						// 	return  TimeScale1(new Date("2015-12-01 00:00:00")) <= TimeScale1(new Date(d.photo.dates.taken)) && TimeScale1(new Date(d.photo.dates.taken)) < TimeScale1(new Date("2015-12-02 00:00:00"));
				
						 }))
				
		var enter2015 = updata2015.enter()
						
			


		var exit2015  = updata2015.exit();

		// processing the MOD
		var updataI = updata2015
					.transition()
					.duration(2000)
					.attr("xlink:href", function(d){
						//return d.photo.urls.url[0].url_sq;
						return d.photo.urls.url[0].url_q;
						})	
					.attr("width",2.75)
					.attr("height",2.75)
					.attr("x",function(d,i){
						if ( 0 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) < 145) 
						return Math.cos(TimeScale1(d.photo.dates.taken))*HueScale2(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
						else
						return Math.cos(TimeScale2(d.photo.dates.taken))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
					})
					.attr("y", function(d,i){
						if ( 0 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) < 145) 
						return Math.sin(TimeScale1(d.photo.dates.taken))*HueScale2(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
						else
						return  Math.sin(TimeScale2(d.photo.dates.taken))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
					})

		var enterI = enter2015
					.append("svg:image")
					.attr("class","myImg")
					.attr("xlink:href", function(d){
						//return d.photo.urls.url[0].url_sq;
						return d.photo.urls.url[0].url_q;
						})	
					.attr("width",2.75)
					.attr("height",2.75)
					.attr("x",function(){

						return Math.random()* originW * (Math.random() > 0.5 ? 1 : -1) ;
					})
					.attr("y",function(){

						return Math.random()* originH * (Math.random() > 0.5 ? 1 : -1) ;
					})
					.transition()
					.duration(8000)
					.ease("elastic")
					.attr("x",function(d,i){
						if ( 0 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) < 145) 
						return Math.cos(TimeScale1(d.photo.dates.taken))*HueScale2(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
						else
						return Math.cos(TimeScale2(d.photo.dates.taken))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
					})
					.attr("y", function(d,i){
						if ( 0 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) < 145) 
						return Math.sin(TimeScale1(d.photo.dates.taken))*HueScale2(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
						else
						return  Math.sin(TimeScale2(d.photo.dates.taken))*HueScale1(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])) ;
					})
		
		// updata2015.transition()
		// 		 	.duration(100000)

		exit2015.transition().duration(2000).remove();	

		// animation for imgs
		var controller = 0;
		var ImageAnimation = enterI
							 .each("end",function(){ // this starts work only the enterI transition end.
							 	
							 	d3.select(this) // after the first transition in enterI, must declear this!
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
								 .on("mouseout", function(d){
								 	 controller ++;
									 ImageDisplay
									 .transition()
									 .duration(500)
									 .style("opacity",0);
									 
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
										.attr("width",function(){
											if(controller%2 == 1)
												return 25;
											else
												return 2;
											
										})
										.attr("height",function(){
											if(controller%2 == 1)
												return 25;
											else
												return 2;
										})	
										.each("end", function(){
												d3.select(this)
													.transition()
													.delay(5000)
													.duration(4000)
													.attr("height",2.75)
													.attr("width", 2.75)
													.ease("elastic-out")
											})					
									 })	
								 })

		 console.log(updata2015);
		 console.log(enter2015);
		 console.log(updataController)

		// append axis
		var axis = g2015
				//.attr("transform", "translate(" + (width - margin.l - margin.r)/2 + "," + (height - margin.l - margin.r)/2 + ")")
				.append("g")
		    	.attr("class", "a axis")
		  		.selectAll("g")
		   	 	.data(d3.range(0, 360, 180))
		  		.enter()
		  		.append("g")
		    	.attr("transform", function(d) { return "rotate(" + -d + ")"; })
		// draw axisText    	
		var axisText = axis.append("text")
					    .attr("x", radius2/2 -100 )
					    //.attr("y", radius2)
					    //.attr("dx", ".1em")
					    //.attr("dy", ".35em")
					    .style("fill", "grey")
					    .style("font-size", "8px")
					    .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
					    .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (radius2/2 - 100) + ",0)" : null; })
					    .text(function(d,i) { 
					     if (i == 0) return "2015 - 12 - 31";
					     if (i == 1) return "2015 - 12 - 01";
					 
						}); 

		var axisCircle = g2015.append("circle")
						.attr("r",radius2/4 - 40 )
						.style("fill","none")
						.style("stroke","white")
						.style("stroke-width", 0.1)				

	} //function draw end	

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


