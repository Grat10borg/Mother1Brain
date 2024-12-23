"use strict";

/* this document is for code ran to add functionability to custom tags
 * or to to add more functionability to favicons and such*/




/* run through this code every so often,
 * change from inactive mode to active code */
// can also be used to update a clock

refresh();
function refresh() {
	let res = $$.id("favicon").getAttribute("href").split("/");
	let icon = res[4].split(".");

	if(document.hidden == false) {
		// restart the animated favicon
		icon[0] = icon[0].replace("_inactive", "");
		$$.id("favicon").setAttribute("href",
		"/images/sprites/favicons/"+icon[0]+".gif");

	setTimeout("refresh()", 500);
	}
	else {
		// stop animated favicon and replace with inactive ver
		if($$.id("favicon").getAttribute("href")
		.includes("_inactive") == false) {
			$$.id("favicon").setAttribute("href",
			"/images/sprites/favicons/"+icon[0]+"_inactive.png");
		}

	setTimeout("refresh()", 1000);	
	}
}

/* get image sizes, useful for pixelart handling*/
function get_image_size(url) {
    let img = document.createElement("img");

    img.style.opacity = "0.0";
    img.style.display = "none";
    img.style.pointerEvents = "none";

    document.body.append(img);

    return new Promise((resolve, reject) => {
        img.onload = () => {
            img.remove();

            resolve({
                width: img.clientWidth,
                height: img.clientHeight
            })
        }

        img.onerror = () => {
            img.remove();
            reject();
        }

        img.src = url;
    })
}

/*
 *		Custom element code
 * */

/* check for special elements */
(async () => {

	// searches for `<svg-img>` and uses `src=""` to fetch and fill it with
	// the requested img (hopefully an actual SVG file)
    let svgs = $$.query_all("svg-img");
    for (let i = 0; i < svgs.length; i++) {
        // nobody specified a `src=""` attribute :c
        if (! svgs[i].getAttribute("src")) {
            continue;
        }

        // get the svg data
        let res = await (await fetch(svgs[i].getAttribute("src"))).text();

        svgs[i].innerHTML = res;
    }

	let txtpres = $$.query_all("txt-pre");
    for (let i = 0; i < txtpres.length; i++) {
        // nobody specified a `src=""` attribute :c
        if (! txtpres[i].getAttribute("src")) {
            continue;
        }

        // get the text data
        let res = await (await fetch(txtpres[i].getAttribute("src"))).text();

        txtpres[i].innerHTML = res;
    }
	
})()


/* old code used for twitch player
let enable_twitch = false;

if(enable_twitch) {
	let script = $$.make("script");
	script.src = "https://player.twitch.tv/js/embed/v1.js">
	document.body.append(script);
}
*/


