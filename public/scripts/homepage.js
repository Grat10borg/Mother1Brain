
	/* contains saved values */
let cache = {
	
}



let enable_twitch = false;

if(enable_twitch) {
	let script = $$.make("script");
	script.src = "https://player.twitch.tv/js/embed/v1.js">
	document.body.append(script);
}


refreshing();

let tab1 = $$.id("tabs1");
let tab2 = $$.id("tabs2");
let tab3 = $$.id("tabs3");
let tab4 = $$.id("tabs4");

let panel1 = $$.id("panel1");
let panel2 = $$.id("panel2");
let panel3 = $$.id("panel3");
let panel4 = $$.id("panel4");

if(tab1 != null && tab1 != undefined) {
tab1.addEventListener("click", function(){
	if(panel1.hidden == true){
		panel1.hidden=false;
		panel2.hidden=true;
	}	
}) 

tab2.addEventListener("click", function(){
	if(panel1.hidden == false){
		panel1.hidden=true;
		panel2.hidden=false;
	}	
}) 
tab3.addEventListener("click", function(){
	if(panel3.hidden == true){
		panel3.hidden=false;
		panel4.hidden=true;
	}	
}) 
tab4.addEventListener("click", function(){
	if(panel3.hidden == false){
		panel3.hidden=true;
		panel4.hidden=false;
	}	
})

// only run on homepage
mastofeed("https://vt.social/@Grat10berg.rss");	
}

	/* if a twitch-embed div is found, fill it with a twitch embed	*/
if($$.query("#twitch-embed") != null && enable_twitch) {
	var options = {
	  width: "100%",
	  height: "100%",
	  channel: "grat_grot10_berg",
	  muted: true,
	  // Only needed if this page is going to be embedded on other websites
	  parent: ["localhost", "neocities.org"]
	};
	var player = new Twitch.Player("twitch-embed", options);
}

	/*very refreshing, also refreshes anything and stops if not shown*/
function refreshing() {

	clockRefresh(); // update clock	
	 
	
	if(document.hidden == false) {
		// restart the animated favicon
	$$.id("favicon").setAttribute("href",
		"/images/sprites/favicons/webicon.gif");

	setTimeout("refreshing()", 500);
	}
	else {
		// stop animated favicon and replace with inactive ver
	$$.id("favicon").setAttribute("href",
		"/images/sprites/favicons/webicon_inactive.png");
		
	setTimeout("refreshing()", 900);	
	}
	
}


/* clock for homepage */
function clockRefresh(){
	let clock = $$.id("clocktext");
	/*seems largely ineffective..*/
	if(clock != null && clock != undefined) {
	const dateNow = new Date().toLocaleString();
		// 6:14:46 PM
	let timeres = dateNow.split(",")[1];
		// 6:16 PM
	let time = timeres.split(":")[0]+":"+timeres.split(":")[1]+
		" "+timeres.split(":")[2].split(" ")[1];
	
	clock.innerHTML = time;	
	}
}

	/* function for adding art srcs to art divs*/
let artDivs = Array.from($$.query_all(".img"));
if(artDivs.length > 0) {
		/* embeded function because async can't run outside of it */
	async function fetchJSON(images, artType) {
			/* look for all art divs of /this/ type */
		let art = $$.query_all("."+artType+"-img");
			/* find all clickable images for lightbox */
		let overlays = $$.query_all(".overlay");

			/* run through each art display found */
		for(let i = 0; i < art.length; i++) {


				/* get title & author from filename	*/
			let imageText = images["files"][i].split("_");
			

				/* set hover text	*/
			art[i].querySelector(".author").innerHTML=imageText[0];
			art[i].querySelector(".title").innerHTML=imageText[1];

				/* set src for shown image	*/
			art[i].style.backgroundImage=
			"url('../images/art/"+artType+"/"+images["files"][i]+"')";

			console.log(alt);
				/* add alt text */
			art[i].alt = alt.text[alt.img.indexOf(images["files"][i])];
			art[i].title = alt.text[alt.img.indexOf(images["files"][i])];

				/* code ran when clicked, / lightbox code */
			art[i].addEventListener("click", (e) => {
				e.preventDefault();
				$$.log(e.currentTarget.style.backgroundImage);
				let filepath = e.currentTarget.style.backgroundImage.split('"');
				
					/* update filepath to the clicked on image*/
				$$.id("lightbox-img").src = filepath[1];

				let filesplit = filepath[1].split("/");
				let filename = filesplit[filesplit.length - 1];

					/* add alt text and title */
				$$.id("lightbox-img").alt = alt.text[
				alt.img.indexOf(filename)];
				$$.id("lightbox-img").title = alt.text[
				alt.img.indexOf(filename)];

					/* fill credits panel with credits */
				let sourcesplit = filename.replace("@", ""
								).replace("-", "").split("_")
				let author = sourcesplit[0]; 
				$$.log(
				artists[author.toLowerCase()]);

				let artist = artists[author.toLowerCase()];

				$$.id("profile").src =
				"images/art/artists/"+ artist["pfp"];
				$$.id("profile").alt = artist["pfp_alt"];
				$$.id("profile").title = artist["pfp_alt"];

					/* profile text */
				$$.id("name").innerHTML = artist["name"];
				$$.id("pronouns").innerHTML = artist["pronouns"];
				$$.id("desc").innerHTML = artist["desc"];

				$$.id("pfp-artist").innerHTML = "pfp by: @"+artist["pfp_artist"];
				$$.id("pfp-artist").href = artist["pfp_artist_link"];

				/* empty socials with previous SoME links */
				$$.id("socials").innerHTML = "";
					
				$$.log(artist.links);
				artist.links.map((link) => {
					let split = link.split("_");

					let anchor = $$.make("a");
					anchor.href = split[1];
					anchor.innerHTML = split[0];

					$$.id("socials").append(anchor);
				});


				$$.id("lightbox").classList.remove("hide");
				$$.id("lightbox").classList.add("show");
			});
		}
	}

	/* run code if image divs of specific types are found. */
	if($$.query(".fanart-img") != undefined) 
		fetchJSON(fanart, "fanart");
	if($$.query(".hamabead-img") != undefined)
		fetchJSON(hamabead, "hamabead");
	if($$.query(".pixelart-img") != undefined)
		fetchJSON(pixelart, "pixelart");
	if($$.query(".art3d-img") != undefined)
		fetchJSON(art3d, "art3d");
	if($$.query(".sketches-img") != undefined)
		fetchJSON(sketches, "sketches");
}
	
/* close lightbox eventhandler */
if($$.id("lightbox") != undefined)
	$$.id("lightbox").addEventListener("click", (e) => {
		$$.id("lightbox").classList.remove("show");
		$$.id("lightbox").classList.add("hide");
	});


	/* function for parsing md files via element ids */
				/* convert nodelist to array */
let pageBoxes = Array.from($$.query_all(".box"));
if(pageBoxes.length > 0) {
	async function fetchFile(box) {
			/* id box id blacklist */
		if(box.id != "chatbox"){
				/* getting md files and parsing with marked */
			let md = $$.txt("../txt/"+box.id+".md");
			document.getElementById(box.id).innerHTML =
			marked.parse(await md);
		}
	}
	pageBoxes.map(fetchFile);
}
	// gets a Mastodon feed
//
async function mastofeed(url) {
  let vtfeedDiv = $$.id("VTfeed");
  let vtSocialRss = await $$.api(url);
  $$.log(vtSocialRss);
  let Toots = $$.tag($$.tag(vtSocialRss,"channel")[0], "item");
 	
  for (let index = 0; index < Toots.length; index++) {
 	$$.log(Toots[index]);	
	  
    let ContentDiv = $$.make("div");
    ContentDiv.classList.add("vttoot");
    ContentDiv.insertAdjacentHTML("beforeend", 
    $$.tag(Toots[index],"description")[0].textContent);
    $$.log(ContentDiv);


    let link = $$.make("a");
    link.href = $$.tag(Toots[index], "link")[0].innerHTML
    link.innerHTML = "Origin";
    //link.innerHTML = "Orginal post -> "+ 
    //$$.tag(Toots[index], "link")[0].innerHTML as string
    link.classList.add("rsslink");
    if($$.tag(Toots[index], "media:content").length > 0){
    let imgdata = $$.tag(Toots[index], "media:content");
    
    if(imgdata[0]["attributes"][1].textContent == "video/mp4") {
	let vid = $$.make("video");
	vid.controls=true;
	vid.autoplay=true;
	vid.loop=true; // !! should be checked if its a Gif or Video!!
	let source = $$.make("source");
    	source.src = imgdata[0]["attributes"][0].textContent;
    	source.type = imgdata[0]["attributes"][1].textContent;
    	vid.append(source);
	ContentDiv.append(vid);
    }
    else{
    	let img = $$.make("img");
    	img.src = imgdata[0]["attributes"][0].textContent;
    	img.alt = imgdata[0].children[1].textContent;	
	img.title = imgdata[0].children[1].textContent;
    	ContentDiv.append(img);
    }
    }
    
    ContentDiv.append(link);
    $$.id("VTfeed")?.append(ContentDiv);
    if (index == 9) return;   
  }
}
