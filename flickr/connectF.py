import flickrapi
import json
import io # save json in the local disk
import colorsys
from PIL import Image, ImageOps
import urllib, cStringIO
api_key = u'025fadd8cd8312d8c6eb6586bbfcb88a'
api_secret = u'd1d65109bfb517a4'

flickr = flickrapi.FlickrAPI(api_key, api_secret, format = 'json')
#bbox = "-3.333019,-3.077748,55.890423,55.991708" ; tag_mode= 'all', tags = 'Christmas,Edinburgh', max_taken_date = u'1388534399', min_taken_date = u'1385856000'
# 2015,12,31 1451606399 ; 2015,12,1 1448928000 ; 1420070399 ; 1417392000 ; sort = 'date-taken-asc',
#North Latitude: 55.991708 South Latitude: 55.890423 East Longitude: -3.077748 West Longitude: -3.333019
# results1 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.99,1708"
# , sort = 'date-taken-asc', extras = 'url_n,url_z,url_sq,url_q',  text ='Edinburgh Fringe Festival', per_page = 10, page = 1, max_taken_date = "2015-08-31 23:59:59", min_taken_date = "2015-08-01 00:00:00")
# results7 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.991708"
# , sort = 'date-taken-asc', extras = 'url_n,url_z,url_sq,url_q',  text ='Edinburgh,Fringe,Festival', per_page = 35, page = 1, max_taken_date = "2015-08-31 23:59:59", min_taken_date = "2015-08-01 00:00:00")
# results2 = flickr.photos.search(api_key = api_key 
# , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'Edinburgh,Military Tattoo',  per_page = 40, page = 1, max_taken_date = "2014-08-31 23:59:59", min_taken_date = "2014-08-01 00:00:00")
# results6 = flickr.photos.search(api_key = api_key 
# ,  sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q', tag_mode= 'all', tags = 'Edinburgh,Fringe',  per_page = 35, page = 1, max_taken_date = "2014-08-31 23:59:59", min_taken_date = "2014-08-01 00:00:00")
# results3 = flickr.photos.search(api_key = api_key 
# ,  sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'Honer Gaurd,Edinburgh,Military Tattoo',  per_page = 35, page = 1, max_taken_date = "2015-08-31 23:59:59", min_taken_date = "2015-08-01 00:00:00")
# results5 = flickr.photos.search(api_key = api_key 
# ,  sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'Royal Edinburgh Military Tattoo,Edinburgh Castle,EVENT',  per_page = 47, page = 1, max_taken_date = "2015-08-31 23:59:59", min_taken_date = "2015-08-01 00:00:00")
# results4 = flickr.photos.search(api_key = api_key 
# ,  sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'Edinburgh,Military,Tattoo,',  per_page = 25, page = 1, max_taken_date = "2013-08-31 23:59:59", min_taken_date = "2013-08-01 00:00:00")
# results6 = flickr.photos.search(api_key = api_key ,  extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'Christmas,Edinburgh',  per_page = 400, page = 6, max_taken_date = u'1388534399', min_taken_date = u'1385856000')

results1 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.99,1708"
, extras = 'url_sq,url_q,date_taken, owner_name,description',  tag_mode= 'all', tags = 'animal', per_page = 500, page = 1)
results2 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.991708"
, extras = 'url_sq,url_q,date_taken, owner_name,description',   tag_mode= 'all', tags = 'orange,flower', per_page = 500, page = 1)
results3 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.991708"
, extras = 'url_sq,url_q,date_taken, owner_name,description',  tag_mode= 'all', tags = 'edinburgh,rain', per_page = 500, page = 1)
results4 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.991708"
, extras = 'url_sq,url_q,date_taken, owner_name,description',   tag_mode= 'all', tags = 'edinburgh,red', per_page = 500, page = 1)
results5 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.991708"
, extras = 'url_sq,url_q,date_taken, owner_name,description',   tag_mode= 'any', tags = 'forth bridge,forth bridges', per_page = 500, page = 2)
results6 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.991708"
, extras = 'url_sq,url_q,date_taken, owner_name,description',   tag_mode= 'all', tags = 'edinburgh, meadows', per_page = 500, page = 1)
results7 = flickr.photos.search(api_key = api_key #, bbox = "-3.333019,55.890423,-3.077748,55.991708"
, extras = 'url_sq,url_q,date_taken, owner_name,description',   tag_mode= 'all', tags = 'edinburgh,sea', per_page = 500, page = 2)

#results = results1 + ',' + results2


# get necessary photo_id that is required for get images' information

results1 = json.loads(results1) 
results2 = json.loads(results2)
results3 = json.loads(results3) 
results4 = json.loads(results4) 

results5 = json.loads(results5) 
results6 = json.loads(results6)
results7 = json.loads(results7)





#imageSize = 'z' # adjust images size [mstzb]'


def get_dominant_color(image):
	 #conver RGB to RGBA
    image = image.convert('RGBA')

    image.thumbnail((200, 200))
    max_score = None
    dominant_color = None
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
    return dominant_color

def getAverageRGB(image1):
	image1 = image1.convert('RGB')
	
	image1.thumbnail((200, 200))

	count = 0
	R = 0
	G = 0
	B = 0
	print image1.getcolors(image1.size[0]*image1.size[1])[:4]
	for apperance, (r, g, b) in image1.getcolors(image1.size[0]*image1.size[1]):
		R += int(r)
		G += int(g)
		B += int(b)
		count += 1

	return (R/count, G/count, B/count)

def getAverageColor2(img, img_size):
	sub_size = 4
	
	# print img.size
	img = img.convert('RGB')
	# print img.size
	img = ImageOps.fit(img, (img_size,img_size) ,Image.ANTIALIAS)
	#img.thumbnail((img_size,img_size))
	return_list =[]
	r, g, b = 0, 0, 0
	sub_length = img_size/sub_size
	hor_list = range(0, img_size, sub_length)
	ver_list = range(0, img_size, sub_length)
	print img.size
	for x in hor_list:
		for y in ver_list:
			for sub in range(0, sub_length):

				r_get, g_get, b_get = img.getpixel((x+sub, y+sub))
				r += r_get
				g += g_get
				b += b_get
			return_list.append([r/(sub_length**2), g/(sub_length**2), b/(sub_length**2)])
	return return_list



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
		exist = False
		try:
			url_sq = i['url_sq']
			url_q = i['url_q']
			exist = True
		except:
			exist = False

		
		
		#urlz = 'https://farm{0}.staticflickr.com/{1}/{2}_{3}_{4}.jpg'.format(farm, server, photo_id, secret, bigsize)
		#urlc = 'https://farm{0}.staticflickr.com/{1}/{2}_{3}_{4}.jpg'.format(farm, server, photo_id, secret, thumbsize)
		url = 'https://farm{0}.staticflickr.com/{1}/{2}_{3}.jpg'.format(farm, server, photo_id, secret)
		#ph_info = flickr.photos.getInfo(api_key = api_key, photo_id = photo_id)
		#ph2 = json.loads(ph_info)
		

	    #ph2['photo']['urls']['url'][0]['myUrl'] = url
	    #ph2['photo']['urls']['url'][0][''] = urlz
		#ph2['photo']['urls']['url'][0]['myUrl'] = url # front part before [0] is a dict data structure and everything after it is a list data structure, change the original url
		#ph2['photo']['urls']['url'][0]['url_z'] = url_z
		#ph2['photo']['urls']['url'][0]['url_n'] = url_n
		#ph2['photo']['urls']['url'][0]['url_sq'] = url_sq
		#ph2['photo']['urls']['url'][0]['url_q'] = url_q
		if exist:
			file = cStringIO.StringIO(urllib.urlopen(url).read()) # append color dictionary into json file
			img_size = 128
			print(img_size)
			color = getAverageColor2(Image.open(file),img_size)
		#    	if color[0] < 8 and color[1] < 8 and color[2] < 8 : 
	    #   		continue 
	    #    	if color[0] > 235 and color[1] > 235 and color[2] > 235 : 
	    #    		continue 

			i['color'] = color
			i['url'] = url


			count = 0 # count for lines for ONE photo  
			j_file = json.dumps(i, sort_keys=True, indent=4)
			length = len(j_file.splitlines()) # This is a constant, stands for total lines of ONE photo
			for line in j_file.splitlines():
				t.write(line)
				count += 1
			
				if count == length and list_count != list_len:
					t.write(',')
					t.write('\n')
				else:
					t.write('\n')
		else:
			pass

t = open("EdinburghMakejson3.json", "w")  # output for the json file
t.write('[')


makeJson(results1)
t.write(',\n')
makeJson(results2)
t.write(',\n')
makeJson(results3)
t.write(',\n')
makeJson(results4)
t.write(',\n')
makeJson(results5)
t.write(',\n')
makeJson(results6)
t.write(',\n')
makeJson(results7)








t.write(']')	



	

		