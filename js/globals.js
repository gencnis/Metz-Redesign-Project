
/* Nav-Bar Resizing 
Because the title next to the image has to have a offset from the top of the screen, I had to have all
nav bar elements as absolute. Because of this, auto-centering isn't possible, so I have to do it manually;

All this basically does is sum up the size of the logo container, the title container, and the screen width,
then divide by two to get the offset for the left side of the screen to insure it's in the middle.
- Ender
*/
function resizeNav() {
    console.log("Resizing nav bar");
    const menuTitle = document.getElementById("menuTitle");
    const options = document.getElementById("options");

    if (innerWidth > 450 && innerWidth < 1150) {
        const logoContainerWidth = document.getElementById("logo").clientWidth;
        let offset = ((innerWidth - menuTitle.clientWidth) + (logoContainerWidth / 2)) / 2
        menuTitle.style.left = `${offset}px`;
    } else {
        if (menuTitle.style.left != "140px") {
            menuTitle.style.left = "140px";
        }
    }

    if (innerWidth < 1150) {
        options.style.display = "none";
    } else {
        options.style.display = "inline-block";
    }
}

window.addEventListener("load", () => {
    resizeNav()
    window.addEventListener("resize", resizeNav);
})

const oldFn = window.onload;
window.addEventListener("click", (event) => {

    console.log(event.target);

    let target = event.target;
    if (event.target.className == "signUp") {
        target = target;
    } else if (event.target.parentNode.className == "signUp") {
        target = event.target.parentNode;
    }
    if (target.className != "signUp") return;

    document.getElementsByTagName("body").item(0).insertAdjacentHTML("afterbegin", `
        <div class="popupMask">
            <div class="popup popupLogin">
                <img src="assets/ncf-banner.png" alt="New College Banner" class="loginBanner">
                <div class="strike"></div>
                <img src="assets/metz-logo.png" alt="Metz Logo" class="loginIcon">
                <div class="loginBody">
                    <h1>Sign In</h1>
                    <div class="loginForum">
                        NetID
                        <input class="loginInput">
                    </div>
                    <div class="loginForum">
                        NCF E-Mail
                        <input class="loginInput">
                    </div>
                    <div class="loginForum">
                        Password
                        <input class="loginInput">
                    </div>
                </div>
                <div class="loginExtras">
                    <div class="myncfLink">
                        <a><u>Sign-in with myNCF<u></a>
                    </div>
                    <button class="signInButton">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    `);
});