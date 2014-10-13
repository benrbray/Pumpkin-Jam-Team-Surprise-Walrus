function sign(x) {
	return x?x<0?-1:1:0;
}


function htmlColor(r, g, b, a) {
	/*
	 * Why not use
	r &= 0xff;
	g &= 0xff;
	b &= 0xff;
	 * to ensure that rgba is between 0 and 255?
	 * ~Tyler
	 */

	if (typeof a != typeof 1) {
		a = 1;
	}
	return ( "rgba("
		+ (r&0xff) +  ","
		+ (g&0xff) + "," 
		+ (b&0xff) + "," 
		+ a +")"
	);
}
