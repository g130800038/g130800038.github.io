// JavaScript Document
/*
notes:
d3.selectAll(".item:nth-child(2)")
http://css-tricks.com/how-nth-child-works
.attr("class", "classname")
.classed("classname",true)
.classed({
	 "classname1":true,
	 "classname2":true,
	 "classname3":true
	}) // one div with three classes
.style({
	"background":"#268bd2",
	"color":function (d) {
		return d;
		}
	"padding":"10px"
	
	})	
	
*/	
// canvas size
var bardata = [];

for (var i=0; i< 50; i++){
	//bardata.push(Math.random()*100);
	bardata.push(Math.round(Math.random()*30) + 1);
	}

	
var width = 450,
	height = 300,
	barWidth = 50,
	barOffset = 5;
	

var canvas = d3.select("body")
			 .append("svg")
				.attr("width", width)
				.attr("height", height)
			 .append("g")
			 .attr("transform", "translate(0,50)");
			 	
var yScale = d3.scale.linear()
			.domain([0,d3.max(bardata)])	
			.range([0,height]);
			
var xScale = d3.scale.ordinal()
			.domain(d3.range(0,bardata.length))
			.rangeBands([0,width]);	
			
var colors = d3.scale.linear()
			//.domain([0, d3.max(bardata)])
			//.range(["#ffb832","#c61c6f"]);
			.domain([0, bardata.length *.33, bardata.length *.66, bardata.length])
			.range(["#b58929","#c61c6f","#268bd2","#85992c"]);								
var tempColor;

var tooltip = d3.select("body")
				.append("div")
				.style("position", "absolute")
				.style("padding", "0 10px")
				.style("background", "white")
				.style("opacity", 0);
				
var rects = canvas
			.selectAll("rect")
			.data(bardata)
			.enter()
			.append("rect")
			.classed("rect","ture")
			//.transition()
			//.duration(500)
			//.delay(50)
			.style("fill",function(d,i){
				return colors(i);
				})	
			.attr("width", xScale.rangeBand())
			
			.attr("x", function(d,i) {
				return xScale(i);
				})
			.attr("height", 0)						
			.attr("y", height);
				
var RectsAnimation = rects
					.transition()
						.attr("height", function(d) {
							return yScale(d)/1.2;
							//return yScale(d)
							})		
						.attr("y", function(d) {
							return (height - yScale(d))/1.3;
							//return height - yScale(d)
							} )
					 
					 .delay(function(d,i){
						 return i *40;
						 })
					 .duration(3000)	 
					 .ease("elastic"); 							
				
var RectAnimations = rects
					.on("mouseover", function(d){
						 tooltip
						 	.transition()
						 	.style("opacity", 0.8)	
						 tooltip
						 	.html(d)
						 	.style("left", (d3.event.pageX) + "px")
							.style("top", (d3.event.pageY) + "px")
						 	 
						 tempColor = this.style.fill;
						 d3.select(this)
							.style("opacity", 0.5)
							.style("fill", function(d,i){
									//return colors(d*2);
									return tempColor
								})
							.transition()	
							.attr("height", function(d) {
								return  yScale(d);
								//return yScale(d)
								})		
							.attr("y", function(d) {
								return (height - yScale(d))/1.5;
								//return height - yScale(d)
								
								} )
						})
					.on("mouseout", function(d){
						 d3.select(this)
							.style("opacity", 1)
							.style("fill", tempColor)
							.transition()	
							.attr("height", function(d) {
								return yScale(d)/1.2;
								//return yScale(d)
								})		
							.attr("y", function(d) {
								return (height - yScale(d))/1.3;
								//return height - yScale(d)
								} )	;
										
						})
						