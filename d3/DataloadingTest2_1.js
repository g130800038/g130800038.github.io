// JavaScript Document
// load the external data


queue()
	.defer(d3.json, 'flickr/Outcome_tiles_library_For_Front/SingerColorRegionMatchAnotherTilesLibrary.json')
	.await(dataloaded);
	
var margin = {t: 50, r: 50, b: 50, l: 50};
var w = 1200,
	h = 800;
	imagesize = 5;
		

var Clicked = false;	
var ImageDisplay = d3.select("body")
					.append("div")
					.attr("class","tooltip")
					//.style("position", "absolute")
					//.style("padding", "0 10px")
					//.style("background", "none")
					.style("opacity", 0);
					
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
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

function zoomed(){
  container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}


var svg = d3.select("#container")
			 .append("svg")
			 .attr("width", w)
			 .attr("height",h)
			 .style("background-color","black")
			 .call(zoom);
			 //.append("g")
var container = svg.append("g");
 


function dataloaded(err, test6){
					

// get time range for the x coordinate	
// var timedata = []
// for(var i = 0 ; i<test6.length ; i++){	
// 	timedata[i] = test6[i].photo.dates.taken;
// 	}
// var timeDomainMin = d3.min(timedata);
// var timeDomainMax = d3.max(timedata);
// var TimeScale = d3.time.scale()
//         .domain([new Date(timeDomainMin), new Date(timeDomainMax)])
//         .rangeRound([0, w - margin.l - margin.r]);
// //var timeFormat = d3.time.format('%Y-%m-%d %H:%M:%S')
		
// var TimeScale3 = d3.time.scale()
//         .domain([new Date(2015,01,01), new Date(2015,12,08)])
//         .rangeRound([0, w - margin.l - margin.r]);		
// // get hue range for the y coordinate
// var hueData = []
// for(var i = 0 ; i<test6.length ; i++){
// 	hueData[i] = getImageHue(test6[i].photo.color[0],test6[i].photo.color[1],test6[i].photo.color[2]);	
// 	}	
// //var hueDomainMin = d3.min(hueData);
// //var hueDomainMax = d3.max(hueData);
// var hueDomain = d3.extent(hueData);
// var HueScale = d3.scale.linear()
//         .domain(hueDomain)
//         .range([0, 2 * Math.PI]);

	// var thumbimgs = container.selectAll("rect")
	// 				.data(test6)
	// 				.enter()
	// 				.append("rect")
	// 				.attr("class","thumbimgs")
	// 				.attr("width",16)
	// 				.attr("height",16)
	// 				//.attr("fill", "none")
	// 				.attr("fill",function(d,i){
	// 					if(d.photo.color[0] > 20 && d.photo.color[1] > 20 && d.photo.color[2] > 20)
	// 					return getImageColor(d.photo.color[0],d.photo.color[1],d.photo.color[2]);
	// 					else
	// 					return "white";		
	// 				})
	// 				//.attr("stroke-width",0.5)
	// 				.attr("opacity",function(d,i){
	// 					if(d.photo.color[0] > 20 && d.photo.color[1] > 20 && d.photo.color[2] > 20)
	// 					return 0.5;
	// 					else
	// 					return 0.75;		

	// 				})
	// 				.attr("x",function(d,i){return 16.5*(i%80);})
	// 				.attr("y", function(d,i){return   16.5 * Math.floor(i / 80)})

	var imgs = container
					.selectAll("img")
					.data(test6)
					.enter()				
					.append("svg:image")
					.attr("class","myImage")
					.attr("xlink:href", function(d){
						return d.photo.urls.url[0].url_q;
						})	
					.attr("width",imagesize)
					.attr("height",imagesize)
					//.attr("viewBox", "")
					//.attr("opacity",0.3)
					.attr("x",function(d,i){return imagesize* Math.floor(i / 100) })
					.attr("y", function(d,i){return   imagesize*(i%100) })
					.attr("opacity",1)				 
					
	console.log(imgs)	

var characters = ["E","D","I","N","B","U","R","G","H"]	 

var texts = svg
			.selectAll("text")
			.data(characters)
			.enter()
			.append("text")
			.attr("x",function(d,i){

				return 30 + i*(w/characters.length)
			})
			.attr("y",h/2)
			.attr("fill","none")
			.attr("stroke","white")
			.attr("stroke-width",1)
			.attr("font-size",100)
			.text(function(d){
				return d;
			})
/*	
var rects = svg
				.selectAll("rect")
				.data(test6)
				.enter()		 
				.append("rect")
				.attr("width",12)
				.attr("height",12)
				.attr("x",function(d, i){return 14*(i%50);})
				.attr("y", function(d,i){return   14 * Math.floor(i / 50)})	
				.attr("fill",function(d,i){return getImageColor(d.photo.color[0],d.photo.color[1],d.photo.color[2]);})								 
	
*/					
   
   
     var ImageAnimation = imgs
   						.on("mouseover",function(d,i){
						       var string = d.photo.urls.url[0].url_q;
						        //var string = d.url_q;
								ImageDisplay
								.transition()
								.duration(200)
								.style("opacity", 1)	
					  			ImageDisplay
								.html( "<img src =" + string + "/>" + "<br/>" + "<hr>" +
										 // "<img src =" + string + "/>"  + "<br/>" + "<hr>" +
										// d.photo.title._content + "<br/>" +
										//TimeScale(new Date (d.photo.dates.taken)) + "<br/>" +
										//d.photo.dates.taken 
										d.owner
										// + "<br/>" + 
										// getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])
										 // when r=b=g, can not get h
									)
							
								.style("left", (d3.event.pageX ) + "px")
								.style("top", (d3.event.pageY ) + "px");
						    })
						 .on("mouseout", function(d){
							 ImageDisplay
							 .transition()
							 .duration(500)
							 .style("opacity",0);
							
							 })	
							 
						 // .on("click",function(d,i){	
						  
							// Clicked = !Clicked
							// if(Clicked) {
							// d3.select(this)
							// 	.style("opacity", 0.5)								
							// 	.transition()
							// 	.duration(1500)											
							// 	.attr("x", w - 20*(i%12))
							// } else {

							// d3.select(this)
							// 	.style("opacity", 0.3)								
							// 	.transition()
							// 	.duration(800)											
							// 	.attr("x", 20*(i%12))									
							// }
				 
							// })	
							
					
	
	 
			 
					
	}

	
