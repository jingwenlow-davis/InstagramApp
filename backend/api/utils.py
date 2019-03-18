def message_formatter(data):
	dct = {}
	dct["_id"] = data.get("id")
	dct["timestamp"] = data.get("time_sent")
	dct["text"] = data.get("content")
	user = data.get("sent_by")
	dct["user"] = {
			"_id": user.get("id"),
			"name": user.get("username")
		}

	return dct

def messages_formatter(data):
	lst = []
	for message in data:
		dct = {}
		dct["_id"] = message.get("id")
		dct["timestamp"] = message.get("time_sent")
		dct["text"] = message.get("content")
		user = message.get("sent_by")
		dct["user"] = {
				"_id": user.get("id"),
				"name": user.get("username")
			}

		lst.append(dct)
	return lst
