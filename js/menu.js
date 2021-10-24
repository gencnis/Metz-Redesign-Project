const itemCache = [];

// This is a sin, I know. I'm sorry. I'm too burnt out to do it the right way.
setInterval(() => {
    const takeoutButton = document.querySelector("#options > ul > li:nth-child(2) > div");
    takeoutButton.innerText = `TAKEOUT {${itemCache.length}}`;
}, 500);

window.onload = function () {
    document.querySelector("body > div.body > div.requirements").onclick = onDietaryRequirementsButtonClick;
    const params = new URLSearchParams(window.location.search);
    let filter = params.get("filter");
    if (!filter) filter = "all";

    if (filter == "breakfast" || filter == "brunch" || filter == "all") {
        createMenuItem("Waffles", "waffles", 160, ["Vegetarian"], ["Milk", "Wheat"])
        createMenuItem("Drink", "drink", "80 - 420", ["Vegetarian"], ["Mustard", "Celery"]);
    }
    if (filter == "lunch" || filter == "brunch" || filter == "all") {
        createMenuItem("Fries", "fries", 200, ["Vegetarian"], ["Starch"])
        createMenuItem("Mac 'n' Cheese", "macncheese", 250, ["Vegetarian"], ["Milk", "Cheese"])
        createMenuItem("Pizza", "pizza", 320, ["Vegetarian"], ["Milk", "Cheese", "Wheat"])
    }
    if (filter == "dinner" || filter == "all") {
        createMenuItem("Burger", "burger", 420, ["Gluten-Free"], ["Milk", "Cheese", "Egg", "Meat"])
        createMenuItem("Cookies", "cookies", 180, ["Vegetarian"], ["Milk", "Egg"])
    }
}

window.onclick = function (event) {
    // Handle all click events
    onMenuItemClick(event);
    onPopupClick(event);
    onTakeoutItemClick(event);
    onTogoOverviewXClick(event);
    onTakeoutButtonClick(event);
}

function onDietaryRequirementsButtonClick(e) {
    document.getElementsByTagName("body").item(0).insertAdjacentHTML("afterbegin", `
    <div class="popupMask">
        <div class="popup groupingPopup">
            <div class="container">
                <div class="iconContainer">
                    <div class="dietaryIcon">
                        <div class="row row1">
                            <img src="assets/images/icons/crustacean.png">
                            <img src="assets/images/icons/sesame.png">
                            <img src="assets/images/icons/nuts.png">
                            <img src="assets/images/icons/gluten.png">
                            <img src="assets/images/icons/egg.png">
                        </div>
                        <div class="row row2">
                            <img src="assets/images/icons/soya.png">
                            <img src="assets/images/icons/fish.png">
                            <img src="assets/images/icons/shellfish.png">
                            <img src="assets/images/icons/mustard.png">
                        </div>
                        <div class="row row3">
                            <img src="assets/images/icons/celery.png">
                            <img src="assets/images/icons/peanuts.png">
                            <img src="assets/images/icons/milk.png">
                            <img src="assets/images/icons/sulphite.png">
                            <img src="assets/images/icons/lupins.png">
                        </div>
                    </div>
                    <div class="specialtyIcon">
                        <img src="assets/images/icons/glutenfree.png">
                        <img src="assets/images/icons/vegan.png">
                        <img src="assets/images/icons/vegetarian.png">
                        <img src="assets/images/icons/halal.png">
                        <img src="assets/images/icons/kosher.png">
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    `);
}

function onPopupClick(item) {
    // Remove if the person clicks off of the card.
    if (item.target.className === "popupMask") {
        item.target.remove();
    }
}

function onTakeoutItemClick(elem) {

    if (elem.target.id == "takeoutIcon") {
        const target = elem.target.parentNode.parentNode.parentNode;
        const name = target.children.item(0).innerText;
        itemCache.push({
            name: name
        });
    }
}

function onTogoOverviewXClick(event) {
    const target = event.target;
    if (target.className == "removeItemButton") {
        console.log("Size", Array.from(target.parentNode.children).length)

        const index = Array.prototype.indexOf.call(target.parentNode.children, target);
        console.log("removing", target.parentNode)
        target.parentNode.remove();
        console.log("Splice Index:", index);
        itemCache.splice(index - 1, 1);

    }
}

function onTakeoutButtonClick(event) {
    let target = event.target;
    if (event.target.className == "orderTakeout") {
        target = target;
    } else if (event.target.parentNode.className == "orderTakeout") {
        target = event.target.parentNode;
    }
    if (target.className != "orderTakeout") return;

    console.log("hi");

    console.log()
    document.getElementsByTagName("body").item(0).insertAdjacentHTML("afterbegin", `
    <div class="popupMask">
        <div class="popup">
            <div class="takeoutPopupTitle">
                <h1>TAKEOUT</h1>
            </div>
            <div class="takeoutPopupItems">
                    ${
                        itemCache.map(item => {
                            return `
                            <div class="takeoutItem">
                                <h1>${item.name}</h1>
                                <button class="removeItemButton">X</button>
                            </div>
                            `
                        }).join("")
                    }
            </div>
        </div>
    </div>
`);
}

// Function to call when a menu item is clicked
function onMenuItemClick(item) {
    const target = item.target;
    let card;
    if (target.className === "card") {
        card = target;
    } else {
        card = target.parentNode;
        if (card && card.className != "card") return;
    }

    const image = card.children.item(0).src;

    const cardInfo = card.children.item(1);
    const name = cardInfo.children.item(0).innerText;
    const properties = cardInfo.children.item(2).innerText;
    const popupId = document.getElementById("popup");
    if (popupId) {
        popupId.remove();
    } else {
        document.getElementsByTagName("body").item(0).insertAdjacentHTML("afterbegin", `
        <div class="popupMask">
            <div class="popup">
                <div class="foodPopupContents">
                    <div class="foodPopupContentsImage" style="background-image: url(${image})"></div>
                    <div class="foodPopupContentsText">
                        <h1>${name}</h1>
                        <div class="propertyContainer">
                            <div class="propertiesLabel">PROPERTIES:<br>${properties}</div>
                            <div class="addToTakeoutContainer">
                                <img src="./assets/images/icons/takeout.png" alt="Add To Takeout" id="takeoutIcon">
                            </div>
                            <p>
                                <!-- Place Holder -->
                            </p>
                        </div>
                    </div>
                    <div class="foodPopupLabel" style="background-image: url(./assets/images/labels/waffles.png)"></div>
                </div>
            </div>
        </div>
        `);
    }
}

function createMenuItem(name, imageName, calories, properties, contains) {
    const cardHolder = document.getElementsByClassName("card-container").item(0);
    cardHolder.insertAdjacentHTML("beforeend", `
    <div class="card">
        <img src="./assets/images/food/${imageName}.jpg">
        <div class="cardInfo">
            <h1>${name}</h1>
            <p>
                ${calories} Kcal
            </p>
            <p>
                ${properties.join(", ")}
            </p>
            <p>
                Contains;<br>
                ${contains.join(", ")}
            </p>
        </div>
    </div>
    `);
}

