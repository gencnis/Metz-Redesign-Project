const TEMPLATE_REGEX = /\${([a-zA-Z]+?)}/g;

// For hot-loading segmented documents.
function loadPartials() {
    const partials = document.getElementsByTagName("partial");
    for (const partial of Array.from(partials)) {
        let location = partial.getAttribute("path");
        fetch(`partials/${location.endsWith(".html") ? location : location + ".html"}`)
            .then(response => response.text())
            .then(body => {
                partial.innerHTML.replace(TEMPLATE_REGEX, body);
                partial.innerHTML += templateDocument(body, partial.attributes);
            });
    }
}

function templateDocument(data, mainTemplate) {
    const template = {}
    for (const item of mainTemplate) {
        console.log(item)
        template[item.name] = item.value;
    }

    for (let match of data.matchAll(TEMPLATE_REGEX)) {
        console.log(template)
        data = data.replace(match[0], template[match[1]]);
    }
    return data;
}

async function injectPartial(parent, path, template) {
    const body = await fetch(`partials/${path.endsWith(".html") ? path : path + ".html"}`)
        .then(response => response.text());

    const formatted = templateDocument(body, template);

    if (template) {
        // Insert formatted as a child of parent.
        parent.insertAdjacentHTML("beforeend", formatted);
    }
}