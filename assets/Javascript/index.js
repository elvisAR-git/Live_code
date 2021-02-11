mobile_menu_state = false;

window.onscroll = function () {
  var nav = document.getElementById("navbar");
  if (window.pageYOffset > 100) {
    nav.classList.add("whitenav");
  } else {
    nav.classList.remove("whitenav");
  }
};

function scrollToService(event) {
  el = document.getElementById("services");
  console.log(el);
  el.scrollIntoView({ behavior: "smooth", block: "end" });
}

function scrollToProducts(event) {
  el = document.getElementById("products");
  console.log(el);
  el.scrollIntoView({ behavior: "smooth", block: "end" });
}

function scrollToTeam(event) {
  el = document.getElementById("team");
  console.log(el);
  el.scrollIntoView({ behavior: "smooth", block: "end" });
}

function scrollToFeedback(event) {
  el = document.getElementById("feedback");
  console.log(el);
  el.scrollIntoView({ behavior: "smooth", block: "end" });
}

function showMobile(event) {
  var menu = document.getElementById("mobile-menu");
  if (mobile_menu_state) {
    menu.classList.remove("add");
    menu.classList.add("hide");
    mobile_menu_state = false;
  } else {
    menu.classList.add("show");
    menu.classList.remove("hide");
    mobile_menu_state = true;
  }
}
