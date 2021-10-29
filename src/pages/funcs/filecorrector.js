const inappropriatecharacters = [' ', '@', '!', '#', ]

export function RemoveInappropriate(text) {
	var pattern = /[^a-z0-9]/gi;
	text = text.replace(pattern, "");
	console.log(text);
    return text;
}