import gpxpy.gpx


def average_speed(location_list):
	speed_list=[]
	for location in location_list:
		speed_list.append(location[3])
	return (sum(speed_list)/len(speed_list))

def max_speed(location_list):
	speed_list=[]
	for location in location_list:
		speed_list.append(location[3])
	return (max(speed_list))

def start_time(location_list):
	return location_list[0][4]

def end_time(location_list):
	return location_list[len(location_list)-1][4]

def time_difference


def get_data(file_name):
    points = {}
    with open(file_name, "r") as gpx_file:
        gpx = gpxpy.parse(gpx_file)

    for track in gpx.tracks:
        points[track.name] = []
        for seg in track.segments:
            for point in seg.points:
                points[track.name].append((point.latitude, point.longitude, point.elevation, point.speed, point.time))

    return points

# import pprint
# pprint.pprint(get_data("resources/data/Lugano.gpx"))
