from PIL import Image
import ruamel.yaml as yaml
import numpy as np
import json
import math
tile_size = 5


def getAverageColor(x, y):
	r, g, b = 0, 0, 0
	for sub_x in range(0,tile_size):
		for sub_y in range(0, tile_size):
			r_get, g_get, b_get = im.getpixel((x+sub_x, y+sub_y))
			r += r_get
			g += g_get
			b += b_get
	return (r/(tile_size**2), g/(tile_size**2), b/(tile_size**2))


def matchRGB(current_rgb, json):
	r = current_rgb[0]
	g = current_rgb[1]
	b = current_rgb[2]
	dis = 9999999999999
	tile_now = None

	for tile in json:
		# tile_r = tile[u'photo'][u'color'][0]
		# tile_g = tile[u'photo'][u'color'][1]
		# tile_b = tile[u'photo'][u'color'][2]
		tile_r = tile[u'color'][0]
		tile_g = tile[u'color'][1]
		tile_b = tile[u'color'][2]
		r_delta = (r - tile_r)**2
		g_delta = (g - tile_g)**2
		b_delta = (b - tile_b)**2
		dist_now = math.sqrt(r_delta + g_delta + b_delta)
		
		if dist_now < dis:
			tile_now = tile
			dis = dist_now
		else:
			pass

	return tile_now


im = Image.open("original_Image/colorRun.jpg")
(width, height) = im.size


horrizontal_size = width/tile_size
vertical_size = height/tile_size

hori_list = range(0, width, tile_size)
verti_list = range(0, height, tile_size)

rgb_im = im.convert('RGB')
#r, g, b = rgb_im.getpixel((1, 1))

stored_rgb = np.ndarray(shape=(horrizontal_size, vertical_size, 3), dtype=int)

for x in hori_list:
	for y in verti_list:
		x_index = hori_list.index(x)
		y_index = verti_list.index(y)
		stored_rgb[x_index, y_index]= getAverageColor(x, y)
		# print x,y

# read Json file and loop photo average RGB 
with open('Mosaic_Tiles_Library/SingerColorLibrary.json') as data_file: 
	data = json.load(data_file)

t = open('Outcome_tiles_library_For_Front/ColorRun.json', 'w')
t.write('[')
#print data[0][u'photo'][u'color']
for x in range(0, horrizontal_size):
	for y in range(0, vertical_size):
		current_rgb = stored_rgb[x, y]
		tile_json = matchRGB(current_rgb, data)
		j_file = json.dumps(tile_json, sort_keys = True, indent = 4)
		for line in j_file.splitlines():
			t.write(line)
			t.write('\n')
			# print line

		t.write(',\n')
		print x, y


t.write(']')



			
			






