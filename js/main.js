var normal = document.getElementById("nav-menu");
var reverse = document.getElementById("nav-menu-left");

var icon = normal !== null ? normal : reverse;

// Toggle the "menu-open" % "menu-opn-left" classes
function toggle() {
	  var navRight = document.getElementById("nav");
	  var navLeft = document.getElementById("nav-left");
	  var nav = navRight !== null ? navRight : navLeft;

	  var button = document.getElementById("menu");
	  var site = document.getElementById("wrap");
	  
	  if (nav.className == "menu-open" || nav.className == "menu-open-left") {
	  	  nav.className = "";
	  	  button.className = "";
	  	  site.className = "";
	  } else if (reverse !== null) {
	  	  nav.className += "menu-open-left";
	  	  button.className += "btn-close";
	  	  site.className += "fixed";
	  } else {
	  	  nav.className += "menu-open";
	  	  button.className += "btn-close";
	  	  site.className += "fixed";
	    }
	}

// Ensures backward compatibility with IE old versions
function menuClick() {
	if (document.addEventListener && icon !== null) {
		icon.addEventListener('click', toggle);
	} else if (document.attachEvent && icon !== null) {
		icon.attachEvent('onclick', toggle);
	} else {
		return;
	}
}

menuClick();

document.addEventListener('DOMContentLoaded', function() {
    var path = location.pathname.replace(/\//g, '_');
    var base = 'https://api.countapi.xyz';

    // Views
    fetch(base + '/hit/mtry1-github-io/views' + path)
        .then(function(res) { return res.json(); })
        .then(function(data) {
            var viewSpan = document.getElementById('view-count');
            if (viewSpan) {
                viewSpan.textContent = data.value;
            }
        });

    // Likes
    var likeCount = document.getElementById('like-count');
    fetch(base + '/get/mtry1-github-io/likes' + path)
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (likeCount) {
                likeCount.textContent = data.value || 0;
            }
        });

    var likeBtn = document.getElementById('like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            fetch(base + '/hit/mtry1-github-io/likes' + path)
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    if (likeCount) {
                        likeCount.textContent = data.value;
                    }
                });
        });
    }

    // Dislikes
    var dislikeCount = document.getElementById('dislike-count');
    fetch(base + '/get/mtry1-github-io/dislikes' + path)
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (dislikeCount) {
                dislikeCount.textContent = data.value || 0;
            }
        });

    var dislikeBtn = document.getElementById('dislike-btn');
    if (dislikeBtn) {
        dislikeBtn.addEventListener('click', function() {
            fetch(base + '/hit/mtry1-github-io/dislikes' + path)
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    if (dislikeCount) {
                        dislikeCount.textContent = data.value;
                    }
                });
        });
    }
});

