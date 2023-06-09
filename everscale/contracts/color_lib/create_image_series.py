import json

from PIL import Image
from PIL.ImageDraw import ImageDraw

base_image = Image.open("numi.png")

IMG_PER_ROW = 5
IMG_WIDTH = 32
IMG_HEIGHT = 32
PIXEL_SIZE = 1

SCALE_FACTOR = 3

x = 0
y = 0

new_img = Image.new("RGB", (IMG_WIDTH * IMG_PER_ROW, IMG_HEIGHT * IMG_PER_ROW))


def valid_color_balance(img):
    pix = img.load()
    color_set = dict()

    for i in range(32):
        for j in range(32):

            if str(pix[i, j]) in color_set:
                color_set[str(pix[i, j])] += 1
            else:
                color_set[str(pix[i, j])] = 1
    print(color_set)

    for item in color_set.values():
        if item < 30:
            return False
    return True


def get_img_colors_32x32(img):
    pix = img.load()
    img_colors = []

    for y in range(32):
        color_row = []
        for x in range(32):
            color_row.append(str(pix[x, y] + 1))
        img_colors.append(color_row)
    return img_colors


def rgb2hex(r, g, b, a=0):
    return "#{:02x}{:02x}{:02x}".format(r, g, b)


def rgb2int(r, g, b, a=0):
    return 256 ** 2 * r + 256 * g + b

def get_color_hex(palette):
    temp_colors = []
    color_list = []
    for color in range(0, 15):
        if color % 3 == 0 and color > 0:
            color_list.append(rgb2int(*temp_colors))
            temp_colors = []
        temp_colors.append(palette[color])
    color_list.append(rgb2int(*temp_colors))
    return color_list


def get_dictx16(list32x32):
    dictx16 = dict()
    counter = 0
    for i in range(2):
        for j in range(4):
            tempylist = list()
            for y in range(j * 8, j * 8 + 8):
                tempxlist = list()
                for x in range(i * 16, i * 16 + 16):
                    #print("x:{}, y:{}".format(x, y))
                    #print("value:{}".format(list32x32[y][x]))
                    tempxlist.append(list32x32[y][x])
                tempylist.append(tempxlist)
            dictx16[str(counter)] = tempylist
            counter += 1
    return dictx16

games = []
game_id = 0
while y < IMG_HEIGHT * IMG_PER_ROW:
    img_fragment = base_image.crop((x, y, x + IMG_WIDTH, y + IMG_HEIGHT))
    img_reduced = img_fragment.quantize(5, Image.WEB)

    '''
    if not valid_color_balance(img_reduced) or len(img_reduced.getcolors()) < 5:
        print("Error in", (x, y, x + IMG_WIDTH, y + IMG_HEIGHT))
        draw = ImageDraw(img_reduced)
        draw.line((0, 0) + img_reduced.size, fill=(255, 0, 0), width=2)
        draw.line((0, img_reduced.size[1], img_reduced.size[0], 0), fill=(255, 0, 0), width=2)
    '''


    new_img.paste(img_reduced, (x, y))

    new_img.save("skull_updated_{0}_{1}.png".format(x, y), "PNG", quality=100)
    colors_32 = get_img_colors_32x32(img_reduced)
    print("========= x: {}, y: {} ============".format(x, y))
    print(get_dictx16(colors_32))
    print(get_color_hex(img_reduced.getpalette()))
    games.append({'id': game_id, 'data': get_dictx16(colors_32), 'colors': get_color_hex(img_reduced.getpalette())})

    game_id += 1
    x += IMG_WIDTH
    if x >= IMG_WIDTH * IMG_PER_ROW:
        x = 0
        y += IMG_HEIGHT


f = open('games.json', 'w')
f.write(json.dumps(games))
f.close()

new_pix = new_img.load()
new_img_scaled = Image.new("RGB", (IMG_WIDTH * IMG_PER_ROW * SCALE_FACTOR, IMG_HEIGHT * IMG_PER_ROW * SCALE_FACTOR))
draw = ImageDraw(new_img_scaled)

for y in range(IMG_HEIGHT * IMG_PER_ROW):
    for x in range(IMG_WIDTH * IMG_PER_ROW):
        draw.rectangle((x * SCALE_FACTOR, y * SCALE_FACTOR, (x + 1) * SCALE_FACTOR, (y + 1) * SCALE_FACTOR), fill=new_pix[x, y])
new_img_scaled.save("skull_updated_scaled.png", "PNG", quality=100)
