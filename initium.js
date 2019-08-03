// "Thus, programs must be written for people to read, and only incidentally for machines to execute."
// TODO: Commenting.


// ---------- CONFIGURATION ----------

var sites = {
	"Social": {
		"Reddit": "https://www.reddit.com/",
		"Twitter": "https://twitter.com/",
		"Facebook": "https://www.facebook.com/",
		"Pinterest": "https://www.pinterest.com/",
		"4chan": "https://www.4chan.org/",
		"Steam": "https://store.steampowered.com/"
	},
	"Media": {
		"YouTube": "https://www.youtube.com/feed/subscriptions",
		"Plex": "https://app.plex.tv/desktop",
		"HBO": "https://hbogo.si/",
		"Twitch": "https://www.twitch.tv/",
		"Cineplexx": "https://www.cineplexx.si/",
		"Rotten Tomatoes": "https://www.rottentomatoes.com/"
	},
	"School": {
		"Gmail": "https://mail.google.com/mail/u/0/",
		"Keep": "https://keep.google.com/",
		"Drive": "https://drive.google.com/drive/u/1/my-drive",
		"GFML": "http://www.gfml.si/",
		"Moj Arnes": "https://moj.arnes.si/",
		"Pons": "https://sl.pons.com/prevod/"
	},
	"Shopping": {
		"Amazon": "https://www.amazon.de/?language=en_GB",
		"eBay": "https://www.ebay.de/",
		"AliExpress": "https://www.aliexpress.com/",
		"GearBest": "https://www.gearbest.com/",
		"Banggood": "https://www.banggood.com/",
		"Bolha": "https://www.bolha.com/",
		"PayPal": "https://www.paypal.com/"

	},
	"Piracy": {
		"RARBG": "https://rarbg.to/",
		"Partis.si": "https://www.partis.si/",
		"1337x": "https://1337x.to/",
		"limetorrents": "https://www.limetorrents.info/home/",
		"r/Piracy Megathread": "https://www.reddit.com/r/Piracy/comments/6583hl/piracy_megathread_v20/"
	},
	"Other": {
		"GitHub": "https://github.com/",
		"Stack Overflow": "https://stackoverflow.com/",
		"Website": "https://www.markobakan.xyz/",
		"Meteo": "http://meteo.arso.gov.si/",
		"ZAMG": "https://www.zamg.ac.at/cms/de/wetter/wetteranimation",
		"Thingiverse": "https://www.thingiverse.com/",
		"Instructables": "https://www.instructables.com/"
	}
};

var search = {
	"default": "https://google.si/search",
	"d": "https://duckduckgo.com/",
	"s": "https://startpage.com/do/search",
	"r": "https://reddit.com/search"
};

var pivotmatch = 0;
var totallinks = 0;
var prevregexp = "";

// ---------- BUILD PAGE ----------
function matchLinks(regex = prevregexp) {
	totallinks = 0;
	pivotmatch = regex == prevregexp ? pivotmatch : 0;
	prevregexp = regex;
	pivotbuffer = pivotmatch;
	p = document.getElementById("links");
	while (p.firstChild) {
		p.removeChild(p.firstChild);
	}
	if (regex.charAt(1) == ' ' && search.hasOwnProperty(regex.charAt(0))) {
		document.getElementById("action").action = search[regex.charAt(0)];
		document.getElementById("action").children[0].name = "q";
	} else {
		match = new RegExp(regex ? regex : ".", "i");
		gmatches = false; // kinda ugly, rethink
		for (i = 0; i < Object.keys(sites).length; i++) {
			matches = false;
			sn = Object.keys(sites)[i];
			section = document.createElement("div");
			section.id = sn;
			section.innerHTML = sn;
			section.className = "section";
			inner = document.createElement("div");
			for (l = 0; l < Object.keys(sites[sn]).length; l++) {
				ln = Object.keys(sites[sn])[l];
				if (match.test(ln)) {
					link = document.createElement("a");
					link.href = sites[sn][ln];
					link.innerHTML = ln;
					if (!pivotbuffer++ && regex != "") {
						link.className = "selected";
						document.getElementById("action").action = sites[sn][ln];
						document.getElementById("action").children[0].removeAttribute("name");
					}
					inner.appendChild(link);
					matches = true;
					gmatches = true;
					totallinks++;
				}
			}
			section.appendChild(inner);
			matches ? p.appendChild(section) : false;
		}
		if (!gmatches || regex == "") {
			document.getElementById("action").action = search["default"];
			document.getElementById("action").children[0].name = "q";
		}
	}
	document.getElementById("main").style.height = document.getElementById("main").children[0].offsetHeight + "px";
}

document.onkeydown = function (e) {
	switch (e.keyCode) {
		case 38:
			pivotmatch = pivotmatch >= 0 ? 0 : pivotmatch + 1;
			matchLinks();
			break;
		case 40:
			pivotmatch = pivotmatch <= -totallinks + 1 ? -totallinks + 1 : pivotmatch - 1;
			matchLinks();
			break;
		default:
			break;
	}
	document.getElementById("action").children[0].focus();
}

document.getElementById("action").children[0].onkeypress = function (e) {
	if (e.key == "ArrowDown" || e.key == "ArrowUp") {
		return false;
	}
}

// now.getDay number to text
var weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

// now.getMonth number to Text
var month = new Array(10);
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

function displayClock() {
	now = new Date();
	clock = (now.getHours() < 10 ? "0" + now.getHours() : now.getHours()) + ":" +
		(now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) + ":" +
		(now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()) + "&emsp;" +
		(weekday[now.getDay()]) + ",&nbsp;" +
		(now.getDate()) + "&nbsp;" +
		(month[now.getMonth()]) + "&nbsp;" +
		(now.getFullYear());

	document.getElementById("clock").innerHTML = clock;
}

window.onload = matchLinks();
document.getElementById("action").onsubmit = function () {
	svalue = this.children[0].value;
	if (svalue.charAt(1) == ' ' && search.hasOwnProperty(svalue.charAt(0))) {
		this.children[0].value = svalue.substring(2);
	}
	return true;
}
displayClock();
setInterval(displayClock, 1000);
