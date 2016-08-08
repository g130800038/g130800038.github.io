# each tile is divides into 16 color regions and match the each subregion(includes 16 color regions) of sample images 
# each tile can at most be selected for 5 times 
from PIL import Image
import ruamel.yaml as yaml
import numpy as np
import json
import math
import urllib, cStringIO
tile_size = 64 # one divided region pixel for original image 
sub_size = 4 # sub_size**2 regions

def getAverageColor(x, y):
	return_list =[] # divide the original images into the number of width/tile_size * height/tile_size regions
	r, g, b = 0, 0, 0
	sub_length = tile_size/sub_size # then divide each region into tile_size/sub_size regions  
	hor_list = range(x, x+tile_size, sub_length) 
	ver_list = range(y, y+tile_size, sub_length)

	for x in hor_list:
		for y in ver_list:
			for sub in range(0, sub_length): # loop 1th x+sub,y+sub pixel,then 2nd...
				r_get, g_get, b_get = im.getpixel((x+sub, y+sub))
				r += r_get
				g += g_get
				b += b_get
			return_list.append([r/(sub_length**2), g/(sub_length**2), b/(sub_length**2)])
	return return_list

# def getAverageColor2(img, img_size):
# 	return_list =[]
# 	r, g, b = 0, 0, 0
# 	sub_length = img_size/sub_size
# 	hor_list = range(0, img_size, sub_length)
# 	ver_list = range(0, img_size, sub_length)
# 	#print img.size
# 	for x in hor_list:
# 		for y in ver_list:
# 			for sub in range(0, sub_length):

# 				r_get, g_get, b_get = img.getpixel((x+sub, y+sub))
# 				r += r_get
# 				g += g_get
# 				b += b_get
# 			return_list.append([r/(sub_length**2), g/(sub_length**2), b/(sub_length**2)])
# 	return return_list



def matchRGB(current_rgb, json):

	dis = 999999999999999999999
	tile_now = None
	img_size = 64
	for tile in json:
		d = 0
		
		if tile[u'id'] not in hashmap:
			tile_rgb = tile[u'color']

			for a, b in zip(current_rgb, tile_rgb): # current_rgb and tile_rgb both have 16 array for color, compare them one by one 
				r_a = a[0]
				g_a = a[1]
				b_a = a[2]

				r_b = b[0]
				g_b = b[1]
				b_b = b[2]


				d += math.sqrt((r_a- r_b)**2 + (g_a - g_b)**2 + (b_a - b_b)**2) # get the color distance between current_rgb and tile_rgb

			
				if d  < dis:
					   # update the tile if the distance is smaller than the previous one
					tile_now = tile
					dis = d
					hashmap[tile[u'id']] = 1

					#return tile_now #  reorder the tiles file(by color) that matchs the color for the original image

		elif hashmap[tile[u'id']] < 5:
			tile_rgb = tile[u'color']
			for a, b in zip(current_rgb, tile_rgb): # current_rgb and tile_rgb both have 16 array for color, compare them one by one 
				r_a = a[0]
				g_a = a[1]
				b_a = a[2]

				r_b = b[0]
				g_b = b[1]
				b_b = b[2]


				d += math.sqrt((r_a- r_b)**2 + (g_a - g_b)**2 + (b_a - b_b)**2) # get the color distance between current_rgb and tile_rgb

			
				if d  < dis:
					   # update the tile if the distance is smaller than the previous one
					tile_now = tile
					dis = d

					hashmap[tile[u'id']] += 1
	return tile_now#  reorder the tiles file(by color) that matchs the color for the original image


im = Image.open("original_Image/365A0039.jpg") # read attribution of original image
(width, height) = im.size # get width and height

hashmap = {}
horrizontal_size = width/tile_size 
vertical_size = height/tile_size

hori_list = range(0, width, tile_size)
verti_list = range(0, height, tile_size)

rgb_im = im.convert('RGB')
#r, g, b = rgb_im.getpixel((1, 1))

stored_rgb = np.ndarray(shape=(horrizontal_size, vertical_size, sub_size**2, 3), dtype=int)
#print stored_rgb.shape
#strore_rgb is a format to store color list for the original images(eg: 540,300,16(color array),(r g b))
#get horrizontal_size * vertical_size regions of average RGB color(A) and calculate average colors in the edges(also divide them into subsize**2 regions)  
for x in hori_list:
	for y in verti_list:
		x_index = hori_list.index(x)
		y_index = verti_list.index(y)
		stored_rgb[x_index, y_index]= getAverageColor(x, y)


# read Json file and loop photo average RGB 
with open('TilesLibrary.json') as data_file: 
	data = json.load(data_file)
#write new tiles json for the front use.
t = open('FinalTilesLibrary1.json', 'w')
t.write('[')
#print data[0][u'photo'][u'color']

for x in range(0, horrizontal_size):
	for y in range(0, vertical_size):
		current_rgb = stored_rgb[x, y]
		tile_json_outcome = matchRGB(current_rgb, data)
		j_file = json.dumps(tile_json_outcome, sort_keys = True, indent = 4)
		for line in j_file.splitlines():
			t.write(line)
			t.write('\n')
			# print line

		t.write(',\n')
		print x, y


t.write(']')



			
			






