// JavaScript Document
// this javascript is for 
queue()
	.defer(d3.json, 'flickr/SecondGraph2013_2015Christams/Edinburgh_year2015.json')
	.await(dataloaded);

var margin = {t: 50, r: 50, b: 50, l: 50};
var width = 1000,
	height = 1000;
	originW = (width - margin.l - margin.r)/2;
	originH = (height - margin.l - margin.r)/2;
	
var Clicked = false;	
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
	 	
	
function dataloaded(err, data){	

// get time range for the x coordinate	
var timeData = []
for(var i = 0 ; i<data.length ; i++){	
	timeData[i] = data[i].photo.dates.taken;
	}
var timeDomainMin = d3.min(timeData);
var timeDomainMax = d3.max(timeData);
var timeDomainMax = d3.max(timeData);

var TimeScale =  d3.time.scale()
        .domain([new Date(timeDomainMin), new Date(timeDomainMax)])
        .rangeRound([0,225])
        .nice() 
		
var TimeScale2 =  d3.time.scale()
        .domain([new Date(timeDomainMin), new Date(timeDomainMax)])
        .rangeRound([225,450])
        .nice()       
     

var radius = TimeScale(timeDomainMax); 
// get hue range for the y coodinate
var hueData = []
for(var i = 0 ; i<data.length ; i++){
	hueData[i] = getImageHue(data[i].photo.color[0],data[i].photo.color[1],data[i].photo.color[2]);	
	}	

var hueDomain = d3.extent(hueData);
var HueScale = d3.scale.linear()
        .domain(hueDomain)
        .range([0, 2 * Math.PI]);        

// build MOD in HTML
var updata = svg.selectAll("img")
			.attr("class", "myImg")
			.data(data);
			
var enter = updata.enter();	
var exit  = updata.exit();

// processing the MOD
var updataI = updata
			.attr("xlink:href", function(d){
				return d.photo.urls.url[0].url_sq;
				})	
			.attr("width",1)
			.attr("height",1)
			.attr("x",function(d,i){
				return TimeScale(new Date(d.photo.dates.taken))*Math.cos(HueScale(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))) + originW ;
			})
			.attr("y", function(d,i){
				//if (0<getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) < 150)
				return  TimeScale(new Date(d.photo.dates.taken))*Math.sin(HueScale(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))) + originH ;
			});
var enterI = enter
			.append("svg:image")
	/*		.filter(function(d,i) { 
				if( 0 < getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) < 200) 
					return true;
				else
					return false;
			})
	*/		
			.attr("xlink:href", function(d){
				return d.photo.urls.url[0].url_sq;
				})	
			.attr("width",3)
			.attr("height",3)
			
			.attr("x",function(d,i){
				if ( 0 <= getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) <= 200) 
				return TimeScale(new Date(d.photo.dates.taken))*Math.cos(HueScale(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))) + originW;
				else 
				return TimeScale2(new Date(d.photo.dates.taken))*Math.cos(HueScale(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))) + originW;
			})
			.attr("y", function(d,i){
				if ( 0 < getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) &&  getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]) <= 200) 
				return TimeScale(new Date(d.photo.dates.taken))*Math.sin(HueScale(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))) + originW;
				else 
				return TimeScale2(new Date(d.photo.dates.taken))*Math.sin(HueScale(getImageHue(d.photo.color[0],d.photo.color[1],d.photo.color[2]))) + originW;
			})
		

exit.remove();	

// animation for imgs

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
							
								.style("left", (d3.event.pageX + 175) + "px")
								.style("top", (d3.event.pageY - 75) + "px");
						    })
						 .on("mouseout", function(d){
							 ImageDisplay
							 .transition()
							 .duration(500)
							 .style("opacity",0);
							
							 })	
							 
						 .on("click",function(d,i){	
						  
							Clicked = !Clicked
							if(Clicked) {
							d3.select(this)
								.style("opacity", 0.5)								
								.transition()
								.duration(1500)											
								.attr("x", w - 20*(i%12))
							} else {

							d3.select(this)
								.style("opacity", 0.3)								
								.transition()
								.duration(800)											
								.attr("x", 20*(i%12))									
							}
				 
							})					
console.log(hueData[0])
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




