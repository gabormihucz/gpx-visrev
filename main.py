import gpxpy.gpx


def get_data(file_name):
    points = {}
    with open(file_name, "r") as gpx_file:
        gpx = gpxpy.parse(gpx_file)

    for track in gpx.tracks:
        points[track.name] = []
        for seg in track.segments:
            for point in seg.points:
                points[track.name].append((point.latitude, point.longitude, point.elevation))

    return points

# import pprint
# pprint.pprint(get_data("resources/data/Lugano.gpx"))
