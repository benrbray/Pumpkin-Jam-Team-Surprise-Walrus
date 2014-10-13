function sign(x) {
	return x?x<0?-1:1:0;
}

// converts RGBA to HTML color string
function htmlColor(r, g, b, a) {
	// ensure alpha is a number
	if (typeof a != typeof 1) { a = 1; }
	
	// generate color string
	return ( "rgba("
		+ (r&0xff) +  ","
		+ (g&0xff) + "," 
		+ (b&0xff) + "," 
		+ a +")"
	);
}