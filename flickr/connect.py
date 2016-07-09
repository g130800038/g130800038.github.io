import flickrapi
import json
import io # save json in the local disk
import colorsys
from PIL import Image
import urllib, cStringIO

api_key = u'025fadd8cd8312d8c6eb6586bbfcb88a'
api_secret = u'd1d65109bfb517a4'

flickr = flickrapi.FlickrAPI(api_key, api_secret, format = 'json')
# 1422748799 , 1425167999
results1 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 1, max_taken_date = u'1422747799', min_taken_date = u'1420070400')
results2 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 1, max_taken_date = u'1425167999', min_taken_date = u'1422748800')
results3 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 1, max_taken_date = u'1427846399', min_taken_date = u'1425168000')
results4 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 1, max_taken_date = u'1430438399', min_taken_date = u'1427846400')
results5 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 1, max_taken_date = u'1433116799', min_taken_date = u'1430438400')
results6 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 1, max_taken_date = u'1435708799', min_taken_date = u'1433116800')
results7 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 1, max_taken_date = u'1438387199', min_taken_date = u'1435708800')
results8 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 1, max_taken_date = u'1441065599', min_taken_date = u'1438387200')
results9 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 1, max_taken_date = u'1443657599', min_taken_date = u'1441065600')
results10 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 1, max_taken_date = u'1446335799', min_taken_date = u'1443657600')
results11 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 1, max_taken_date = u'1448927999', min_taken_date = u'1446336000')
results12 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 1, max_taken_date = u'1451606399', min_taken_date = u'1448928000')

Aresults1 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 2, max_taken_date = u'1422747799', min_taken_date = u'1420070400')
Aresults2 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 2, max_taken_date = u'1425167999', min_taken_date = u'1422748800')
Aresults3 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 2, max_taken_date = u'1427846399', min_taken_date = u'1425168000')
Aresults4 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 2, max_taken_date = u'1430438399', min_taken_date = u'1427846400')
Aresults5 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 2, max_taken_date = u'1433116799', min_taken_date = u'1430438400')
Aresults6 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 2, max_taken_date = u'1435708799', min_taken_date = u'1433116800')
Aresults7 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 2, max_taken_date = u'1438387199', min_taken_date = u'1435708800')
Aresults8 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 2, max_taken_date = u'1441065599', min_taken_date = u'1438387200')
Aresults9 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 2, max_taken_date = u'1443657599', min_taken_date = u'1441065600')
Aresults10 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 2, max_taken_date = u'1446335799', min_taken_date = u'1443657600')
Aresults11 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 2, max_taken_date = u'1448927999', min_taken_date = u'1446336000')
Aresults12 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 2, max_taken_date = u'1451606399', min_taken_date = u'1448928000')

Bresults1 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 3, max_taken_date = u'1422747799', min_taken_date = u'1420070400')
Bresults2 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 3, max_taken_date = u'1425167999', min_taken_date = u'1422748800')
Bresults3 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 3, max_taken_date = u'1427846399', min_taken_date = u'1425168000')
Bresults4 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 3, max_taken_date = u'1430438399', min_taken_date = u'1427846400')
Bresults5 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 3, max_taken_date = u'1433116799', min_taken_date = u'1430438400')
Bresults6 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 3, max_taken_date = u'1435708799', min_taken_date = u'1433116800')
Bresults7 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 3, max_taken_date = u'1438387199', min_taken_date = u'1435708800')
Bresults8 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 3, max_taken_date = u'1441065599', min_taken_date = u'1438387200')
Bresults9 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 3, max_taken_date = u'1443657599', min_taken_date = u'1441065600')
Bresults10 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 3, max_taken_date = u'1446335799', min_taken_date = u'1443657600')
Bresults11 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 3, max_taken_date = u'1448927999', min_taken_date = u'1446336000')
Bresults12 = flickr.photos.search(api_key = api_key , sort = 'date-taken-asc', extras = 'url_n,url_s,url_sq,url_q',  tag_mode= 'all', tags = 'landscape,Edinburgh',  per_page = 200, page = 3, max_taken_date = u'1451606399', min_taken_date = u'1448928000')


#results = results1 + ',' + results2


# get necessary photo_id that is required for get images' information

results1 = json.loads(results1) 
results2 = json.loads(results2)
results3 = json.loads(results3) 
results4 = json.loads(results4) 

results5 = json.loads(results5) 
results6 = json.loads(results6)
results7 = json.loads(results7) 
results8 = json.loads(results8) 


results9 = json.loads(results9) 
results10 = json.loads(results10)
results11 = json.loads(results11) 
results12 = json.loads(results12) 

#
Aresults1 = json.loads(Aresults1) 
Aresults2 = json.loads(Aresults2)
Aresults3 = json.loads(Aresults3) 
Aresults4 = json.loads(Aresults4) 

Aresults5 = json.loads(Aresults5) 
Aresults6 = json.loads(Aresults6)
Aresults7 = json.loads(Aresults7) 
Aresults8 = json.loads(Aresults8) 


Aresults9 = json.loads(Aresults9) 
Aresults10 = json.loads(Aresults10)
Aresults11 = json.loads(Aresults11) 
Aresults12 = json.loads(Aresults12) 

#
Bresults1 = json.loads(Bresults1) 
Bresults2 = json.loads(Bresults2)
Bresults3 = json.loads(Bresults3) 
Bresults4 = json.loads(Bresults4) 

Bresults5 = json.loads(Bresults5) 
Bresults6 = json.loads(Bresults6)
Bresults7 = json.loads(Bresults7) 
Bresults8 = json.loads(Bresults8) 


Bresults9 = json.loads(Bresults9) 
Bresults10 = json.loads(Bresults10)
Bresults11 = json.loads(Bresults11) 
Bresults12 = json.loads(Bresults12) 


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

def makeJson(results):
	list_len = len(results['photos']['photo']) # length for the list. This is a constant and is the number of all the photoes
	list_count = 0
	for i in results['photos']['photo']:
		list_count += 1
		farm = i['farm']
		server = i['server']
		photo_id = i['id']
		secret = i['secret']
		url_n = i['url_n']
		url_s = i['url_s']
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
		ph2['photo']['urls']['url'][0]['url_s'] = url_s
		ph2['photo']['urls']['url'][0]['url_n'] = url_n
		ph2['photo']['urls']['url'][0]['url_sq'] = url_sq
		ph2['photo']['urls']['url'][0]['url_q'] = url_q

		file = cStringIO.StringIO(urllib.urlopen(url).read()) # append color dictionary into json file
		color = get_dominant_color(Image.open(file))
	#    	if color[0] < 8 and color[1] < 8 and color[2] < 8 : 
    #   		continue 
    #    	if color[0] > 235 and color[1] > 235 and color[2] > 235 : 
    #    		continue 

		ph2['photo']['color'] = color


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

t = open("EdinburghYear2015Color1.json", "w")  # output for the json file
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
t.write(',\n')
makeJson(results8)
t.write(',\n')
makeJson(results9)
t.write(',\n')
makeJson(results10)
t.write(',\n')
makeJson(results11)
t.write(',\n')
makeJson(results12)
#
t.write(',\n')
makeJson(Aresults1)
t.write(',\n')
makeJson(Aresults2)
t.write(',\n')
makeJson(Aresults3)
t.write(',\n')
makeJson(Aresults4)
t.write(',\n')
makeJson(Aresults5)
t.write(',\n')
makeJson(Aresults6)
t.write(',\n')
makeJson(Aresults7)
t.write(',\n')
makeJson(Aresults8)
t.write(',\n')
makeJson(Aresults9)
t.write(',\n')
makeJson(Aresults10)
t.write(',\n')
makeJson(Aresults11)
t.write(',\n')
makeJson(Aresults12)
#
t.write(',\n')
makeJson(Bresults1)
t.write(',\n')
makeJson(Bresults2)
t.write(',\n')
makeJson(Bresults3)
t.write(',\n')
makeJson(Bresults4)
t.write(',\n')
makeJson(Bresults5)
t.write(',\n')
makeJson(Bresults6)
t.write(',\n')
makeJson(Bresults7)
t.write(',\n')
makeJson(Bresults8)
t.write(',\n')
makeJson(Bresults9)
t.write(',\n')
makeJson(Bresults10)
t.write(',\n')
makeJson(Bresults11)
t.write(',\n')
makeJson(Bresults12)






t.write(']')	



	

		