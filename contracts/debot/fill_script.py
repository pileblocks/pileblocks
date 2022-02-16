import random
d = dict()
for i in range(1):
    d[str(i)] = [[random.randint(1,5) for j in range(16)] for k in range(8)]

d = dict()
for i in range(1):
    d[str(i)] = [[1 for j in range(16)] for k in range(8)]

points = []
for i in range(2):
    for j in range(8):
        for k in range(16):
            points.append({"f": i, "x": k, "y": j, "color": d[str(i)][j][k]})
json.dumps(points)

