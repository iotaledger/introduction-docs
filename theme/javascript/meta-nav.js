function open_meta_nav() {
    let nav = document.getElementById("meta-nav");
    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
    }
}