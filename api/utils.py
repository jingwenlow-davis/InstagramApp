def message_formatter(data):
	lst = []
	for message in data:
		dct = {}
		dct["timestamp"] = message.get("time_sent")
		dct["text"] = message.get("content")
		user = message.get("sent_by")
		dct["user"] = user.get("username")
		lst.append(dct)
	return lst