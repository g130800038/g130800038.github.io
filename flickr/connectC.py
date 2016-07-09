import flickrapi
import json
import io # save json in the local disk
import colorsys
from PIL import Image
import urllib, cStringIO

api_key = u'025fadd8cd8312d8c6eb6586bbfcb88a'
api_secret = u'd1d65109bfb517a4'

flickr = flickrapi.FlickrAPI(api_key, api_secret, format = 'json')
#bbox = "-3.333019,-3.077748,55.890423,55.991708" ; tag_mode= 'all', tags = 'Christmas,Edinburgh', max_taken_date = u'1388534399', min_taken_date = u'1385856000'
# 2015,12,31 1451606399 ; 2015,12,1 1448928000 ; 1420070399 ; 1417392000 ; sort = 'date-taken-asc',
#North Latitude: 55.991708 South Latitude: 55.890423 East Longitude: -3.077748 West Longitude: -3.333019
results1 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.99,1708"
, sort = 'date-taken-asc', extras = 'url_n,url_z,url_sq,url_q',  tag_mode= 'all', tags = 'edinburgh,purple', per_page = 200, page = 1)
results2 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.991708"
, sort = 'date-taken-asc', extras = 'url_n,url_z,url_sq,url_q',   tag_mode= 'all', tags = 'edinburgh,purple,-flower', per_page = 200, page = 2)
results3 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.991708"
, sort = 'date-taken-asc', extras = 'url_n,url_z,url_sq,url_q',  tag_mode= 'all', tags = 'edinburgh,purple,-flower', per_page = 200, page = 3)
results4 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.991708"
, sort = 'date-taken-asc', extras = 'url_n,url_z,url_sq,url_q',   tag_mode= 'all', tags = 'edinburgh,purple', per_page = 50, page = 4)
#results4 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.991708"
#, sort = 'date-taken-asc', extras = 'url_n,url_z,url_sq,url_q',  tag_mode= 'all', tags = 'Edinburgh,jazz,carnival', per_page = 35, page = 1, max_taken_date = "2014-07-31 23:59:59", min_taken_date = "2014-07-01 00:00:00")
# results6 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.991708"
# , sort = 'date-taken-asc', extras = 'url_n,url_z,url_sq,url_q',   tag_mode= 'all', tags = 'Edinburgh,ECA', per_page = 20, page = 1, max_taken_date = "2015-04-30 23:59:59", min_taken_date = "2015-04-01 00:00:00")
# results3 = flickr.photos.search(api_key = api_key ,  extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'Christmas,Edinburgh',  per_page = 500, page = 3, max_taken_date = u'1388534399', min_taken_date = u'1385856000')
# results4 = flickr.photos.search(api_key = api_key ,  extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'Christmas,Edinburgh',  per_page = 500, page = 4, max_taken_date = u'1388534399', min_taken_date = u'1385856000')
# results5 = flickr.photos.search(api_key = api_key ,  extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'Christmas,Edinburgh',  per_page = 400, page = 5, max_taken_date = u'1388534399', min_taken_date = u'1385856000')
# results6 = flickr.photos.search(api_key = api_key ,  extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'Christmas,Edinburgh',  per_page = 400, page = 6, max_taken_date = u'1388534399', min_taken_date = u'1385856000')


#results = results1 + ',' + results2


# get necessary photo_id that is required for get images' information

results1 = json.loads(results1) 
results2 = json.loads(results2)
results3 = json.loads(results3) 
results4 = json.loads(results4) 

# results5 = json.loads(results5) 
# results6 = json.loads(results6)





#imageSize = 'z' # adjust images size [mstzb]'


def get_dominant_color(image):
	 #conver RGB to RGBA
    image = image.convert('RGBA')

    image.thumbnail((200, 200))
    max_score = None
    dominant_color = None
    colorHue = None
    for count, (r, g, b, a) in image.getcolors(image.size[0] * image.size[1]):
        #skip pure black
        if a == 0:
            continue
        saturation = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)[1]
        y = min(abs(r * 2104 + g * 4130 + b * 802 + 4096 + 131072) >> 13, 235)
        y = (y - 16.0) / (235 - 16)
        #ignore extremely hight light
        if y > 0.9:
            continue

        
        # Calculate the score, preferring highly saturated colors.
        # Add 0.1 to the saturation so we don't completely ignore grayscale
        # colors by multiplying the count by zero, but still give them a low
        # weight.
        score = (saturation + 0.1) * count
        if score > max_score:
            max_score = score
            dominant_color = (r, g, b)
            colorHue = colorsys.rgb_to_hsv(dominant_color[0]/255.00,dominant_color[1]/255.00,dominant_color[2]/255.00)
    return (dominant_color,colorHue)
    #return (colorHue,dominant_color);
# def get_dominant_hue(myColor):
# 	HSV = colorsys.rgb_to_hsv(myColor[0]/255,myColor[1]/255,myColor[2]/255)

# 	return HSV

def makeJson(results):
	list_len = len(results['photos']['photo']) # length for the list. This is a constant and is the number of all the photoes
	list_count = 0
	for i in results['photos']['photo']:
		list_count += 1
		farm = i['farm']
		server = i['server']
		photo_id = i['id']
		secret = i['secret']
		#url_n = i['url_n']
		#url_z = i['url_z']
		url_sq = i['url_sq']
		url_q = i['url_q']
		
		#urlz = 'https://farm{0}.staticflickr.com/{1}/{2}_{3}_{4}.jpg'.format(farm, server, photo_id, secret, bigsize)
		#urlc = 'https://farm{0}.staticflickr.com/{1}/{2}_{3}_{4}.jpg'.format(farm, server, photo_id, secret, thumbsize)
		url = 'https://farm{0}.staticflickr.com/{1}/{2}_{3}.jpg'.format(farm, server, photo_id, secret)
		ph_info = flickr.photos.getInfo(api_key = api_key, photo_id = photo_id)
		ph2 = json.loads(ph_info)
		

	    #ph2['photo']['urls']['url'][0]['myUrl'] = url
	    #ph2['photo']['urls']['url'][0][''] = urlz
		ph2['photo']['urls']['url'][0]['myUrl'] = url # front part before [0] is a dict data structure and everything after it is a list data structure, change the original url
		#ph2['photo']['urls']['url'][0]['url_z'] = url_z
		#ph2['photo']['urls']['url'][0]['url_n'] = url_n
		ph2['photo']['urls']['url'][0]['url_sq'] = url_sq
		ph2['photo']['urls']['url'][0]['url_q'] = url_q

		file = cStringIO.StringIO(urllib.urlopen(url).read()) # append color dictionary into json file
		color = get_dominant_color(Image.open(file))
		#HSV = get_dominant_hue(color)
		#Hue = get_dominant_color(Image.open(file))
	   	#if 	0.13889 <= color[1][0] and color[1][0] <= 0.91667 : 
	   	# if color[1][0] <= 0.073333 or color[1][0] >= 0.23333 :
	   	#if color[1][0] <= 0.16667 or color[1][0] >= 0.361111 :
	   # 	if color[1][0] <= 0.38888 or color[1][0] >= 0.500 :
		 	# continue
		# if color[1][0] <= 0.5556 or color[1][0] >= 0.66667 :
		#  	continue 	
		# print color[1][0] 	
       	# if color[0][0] > 235 and color[0][1] > 235 and color[0][2] > 235 : 
       	# 	continue 

		ph2['photo']['color'] = color[0]
		ph2['photo']['HSV'] = color[1]

		count = 0 # count for lines for ONE photo  
		j_file = json.dumps(ph2, sort_keys=True, indent=4)
		length = len(j_file.splitlines()) # This is a constant, stands for total lines of ONE photo
		for line in j_file.splitlines():
			t.write(line)
			count += 1
			
			if count == length and list_count != list_len:
				t.write(',')
				t.write('\n')
			else:
				t.write('\n')

t = open("EdinburghPurple.json", "w")  # output for the json file
t.write('[')


makeJson(results1)
t.write(',\n')
makeJson(results2)
t.write(',\n')
makeJson(results3)
t.write(',\n')
makeJson(results4)
# t.write(',\n')
# makeJson(results5)
# t.write(',\n')
# makeJson(results6)








t.write(']')	



	

		