// JavaScript Document
// load the external data


queue()
	.defer(d3.json, 'flickr/Outcome_tiles_library_For_Front/ColorRun.json')
	.await(dataloaded);
	
var margin = {t: 50, r: 50, b: 50, l: 50};
var w = 1200,
	h = 1000;
	imagesize = 2.5;
		

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
    .scaleExtent([1, 15])
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
					

	var imgs = container
					.selectAll("img")
					.data(test6)
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
					.attr("x",function(d,i){return w/6 + imagesize* Math.floor(i / 200) })
					.attr("y", function(d,i){return h/4 +  imagesize*(i%200) })
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
			.attr("y",h/6)
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
						       var string = d.url_q;
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
										"owner : " + d.owner
										// + "<br/>" + 
										// getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2])
										 // when r=b=g, can not get h
									)
							
								.style("left", (d3.event.pageX ) + "px")
								.style("top", (d3.event.pageY ) + "px");
						    })
   						.on("mousemove",function(d,i){
   							 	var string = d.url_q;
						        //var string = d.url_q;
								ImageDisplay
								.transition()
								.duration(200)
								.style("opacity", 1)	
					  			ImageDisplay
					  			.html( "<img src =" + string + "/>" + "<br/>" + "<hr>" +
					  					"owner : " + d.owner
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

	
