import gpxpy.gpx
from datetime import datetime


def average_speed(location_list):
    speed_list = [location[3] for location in location_list]
    return sum(speed_list) / len(speed_list)


def max_speed(location_list):
    speed_list = [location[3] for location in location_list]
    return max(speed_list)


def start_time(location_list):
    return location_list[0][4][11:-1]


def end_time(location_list):
    return location_list[len(location_list) - 1][4]


def time_difference(location_list):
    s1 = start_time(location_list)[11:-1]
    s2 = end_time(location_list)[11:-1]
    FMT = '%H:%M:%S'
    tdelta = datetime.strptime(s2, FMT) - datetime.strptime(s1, FMT)
    return tdelta


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
# pprint.pprint(get_data("resources/data/cycling.gpx"))
