// JavaScript Document
// load the external data


queue()
	.defer(d3.json, 'flickr/Christmas_Lightness/lightNess_Christmas_13_15.json')
	.await(dataloaded);
	
var margin = {t: 50, r: 50, b: 50, l: 50};
var w = 1200,
	h = 800;
	imagesize = 10;
		

var Clicked = false;	
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
					
function getImageColor(r,g,b){
    return d3.rgb(r,g,b);
}

function getImageLight(r,g,b){
	if(( r==g ) && (g==b)){
	 return d3.rgb(r-1,g+1,b).hsl().l;
	}
	else{									
    return d3.rgb(r,g,b).hsl().l;
	}
}
	

var zoom = d3.behavior.zoom()
    .scaleExtent([0.75, 10])
    .on("zoom", zoomed);

function zoomed(){
  container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}


var svg = d3.select("#container")
			 .append("svg")
			 .attr("width", w)
			 .attr("height",h)
			 .style("background-color","black")
			 .call(zoom)
			 //.append("g")
			 
var container = svg.append("g")
				.attr("transform", "translate(" + w/6 + "," + h/4 + ")");
				
 


function dataloaded(err, data){
	//var lightness = getImageLight(d.photo.color[0],d.photo.color[1],d.photo.color[2])				
	data.sort(function(x, y){
  			 return d3.ascending(x.HLS[1], y.HLS[1]);
  			// return d3.descending(x.HLS[1], y.HLS[1]);
	})

	var imgs = container
					.selectAll("img")
					.data(data.filter(function(d,i){

						return i <= 2694
					}))
					.enter()				
					.append("svg:image")
					.attr("class","myImage")
					.attr("xlink:href", function(d){
						return d.url_q;
						})	
					.attr("width",imagesize)
					.attr("height",imagesize)
					//.attr("viewBox", "")
					//.attr("opacity",0.3)
					// .attr("x",function(d,i){return  imagesize*(i%35) })
					// .attr("y", function(d,i){return  imagesize* Math.floor(i / 35) })
					.attr("x",function(d,i){return  imagesize* Math.floor(i / 35)  })
					.attr("y", function(d,i){return imagesize*(i%35) - 150})
					.attr("opacity",0.95)				 
					
	console.log(imgs)	

// var characters = ["E","D","I","N","B","U","R","G","H"]	 

// var texts = svg
// 			.selectAll("text")
// 			.data(characters)
// 			.enter()
// 			.append("text")
// 			.attr("x",function(d,i){

// 				return 30 + i*(w/characters.length)
// 			})
// 			.attr("y",h/2)
// 			.attr("fill","none")
// 			.attr("stroke","white")
// 			.attr("stroke-width",1)
// 			.attr("font-size",100)
// 			.text(function(d){
// 				return d;
// 			})
	
	var rects = container
				.selectAll("rect")
				.data(data.filter(function(d,i){

						return i <= 2694
					}))
				.enter()		 
				.append("rect")
				.attr("width",imagesize)
				.attr("height",imagesize)
				.attr("x",function(d,i){return  imagesize* Math.floor(i / 35)  })
				.attr("y", function(d,i){return imagesize*(i%35) + 250})	
				.attr("fill",function(d,i){return getImageColor(d.color[0],d.color[1],d.color[2]);})								 
	
	var darkR = d3.mean(data,function(d,i){
						if( i >=0 && i <= 2694/3){
						 return	d.color[0]
						}
					})
	var darkG = d3.mean(data,function(d,i){
						if( i >=0 && i <= 2694/3){
						 return	d.color[1]
						}
					})
	var darkB = d3.mean(data,function(d,i){
						if( i >=0 && i <= 2694/3){
						 return	d.color[2]
						}
					})

	var MediumR = d3.mean(data,function(d,i){
						if( i >=2694/3 && i <= 2 * 2694/3){
						 return	d.color[0]
						}
					})
	var MediumG = d3.mean(data,function(d,i){
						if( i >=2694/3 && i <= 2 * 2694/3){
						 return	d.color[1]
						}
					})
	var MediumB = d3.mean(data,function(d,i){
						if( i >=2694/3 && i <= 2 * 2694/3){
						 return	d.color[2]
						}
					})	
	
	var BrightR = d3.mean(data,function(d,i){
						if( i >= 2 * 2694/3  && i <= 2694){
						 return	d.color[0]
						}
					})
	var BrightG = d3.mean(data,function(d,i){
						if( i >= 2 * 2694/3  && i <= 2694){
						 return	d.color[1]
						}
					})
	var BrightB = d3.mean(data,function(d,i){
						if( i >= 2 * 2694/3  && i <= 2694){
						 return	d.color[2]
						}
					})	
	var DC = [darkR + 15,darkG,darkB]
	var MC = [MediumR + 15,MediumG,MediumB]
	var BC = [BrightR + 10,BrightG,BrightB]
	var aColor = [DC,MC,BC]
	var name = ["dark","middle","bright"] 	
	console.log(aColor)																																																	
    var circles = container
   				.selectAll("circle")
   				.data(aColor)
   				.enter()
   				.append("circle")
   				.attr("r",15)
   				.attr("cx", function(d,i){
   					return 140 + i*250
   				})
				.attr("cy", 225)
				.attr("fill",function(d,i){
					return getImageColor(d[0],d[1],d[2])
				})

	var cilclsAnimation = circles
							.on("mouseover",function(d,i){

								InfDisplay
				    					.transition()
										.duration(500)
										.style("opacity",0.75)

				    					InfDisplay	
				    					.html(function(){
				    						
				    						return "Average color of " + name[i] +" part of image montage : " + "<br/>" + 
				    						"R :" + Math.round(d[0]) + " G :" + Math.round(d[1]) + " B :" + Math.round(d[2]) ;

				    						})
				    					.style("left",(d3.event.pageX - 50 ) + "px")
				    					.style("top", (d3.event.pageY + 25) + "px")
							})
							.on("mousemove",function(d,i){

								InfDisplay
				    					.transition()
										.duration(500)
										.style("opacity",0.75)

				    					InfDisplay	
				    					.html(function(){
				    						
				    						return "Average color of " + name[i] +" part of image montage : " + "<br/>" + 
				    						"R :" + Math.round(d[0]) + " G :" + Math.round(d[1]) + " B :" + Math.round(d[2]) ;

				    						})
				    					.style("left",(d3.event.pageX - 50 ) + "px")
				    					.style("top", (d3.event.pageY + 25) + "px")
							})	
							.on("mouseout", function(d){
							 InfDisplay
							 .transition()
							 .duration(500)
							 .style("opacity",0);
							
							 })			
			

   
    var ImageAnimation = rects
   						.on("mouseover",function(d,i){
						       // var string = d.photo.urls.url[0].url_q;
						        var string = d.url_q;
								ImageDisplay
								.transition()
								.duration(200)
								.style("opacity", 1)	
					  			ImageDisplay
								.html( "<img src =" + string + "/>" + "<br/>" + "<hr>" +
										 // "<img src =" + string + "/>"  + "<br/>" + "<hr>" +
										// d.photo.title._content + "<br/>" +
										//TimeScale(new Date (d.photo.dates.taken)) + "<br/>" +
										
										d.owner
										 + "<br/>" + 
										d.title 
										 + "<br/>" +  
										d.datetaken 
										// getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])
										 // when r=b=g, can not get h
									)
							
								.style("left", (d3.event.pageX ) + "px")
								.style("top", (d3.event.pageY ) + "px");

								

						    })
   						.on("mousemove",function(d,i){
	   							  var string = d.url_q
	   							  ImageDisplay
									.transition()
									.duration(200)
									.style("opacity", 1)	
						  			ImageDisplay
									.html( "<img src =" + string + "/>" + "<br/>" + "<hr>" +
										 // "<img src =" + string + "/>"  + "<br/>" + "<hr>" +
										// d.photo.title._content + "<br/>" +
										//TimeScale(new Date (d.photo.dates.taken)) + "<br/>" +
										
										d.owner
										 + "<br/>" + 
										d.title 
										 + "<br/>" +  
										d.datetaken 
										// getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])
										 // when r=b=g, can not get h
									)
								
									.style("left", (d3.event.pageX + 75) + "px")
									.style("top", (d3.event.pageY - 75) + "px");

		   					})
						.on("mouseout", function(d){
							 ImageDisplay
							 .transition()
							 .duration(500)
							 .style("opacity",0);
							
							 })	
		
							
					
	
	 
			 
					
	}

	
