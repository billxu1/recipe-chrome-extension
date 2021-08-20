let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
  
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: scrollToTop,
        });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: findRecipe,
        });
    }
});

function scrollToTop() {
    var button = document.createElement("button");
    button['id'] = 'inserted';

    button.style.position = "fixed";
    button.style.height = "50px";
    button.style.width = "50px";
    button.style.bottom = "30px";
    button.style.right = "30px";
    button.innerText = "^";

    button.onclick = function() {
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
        });
    }

    document.body.appendChild(button);
}

function findRecipe() {
    var recipe = document.getElementById("recipe");

    if (recipe === null) {
        recipe = document.getElementById("recipe-block_1-0");
    }

    // Failed attempt at regex ID's will come back to this surely :D
    // var children = document.getElementsByTagName("#body div");
    // for (var i = 0; i < children.length; i++) {
    //     const regex = new RegExp('/(recipe)/gi');
    //     if (regex.test(children[i].id) === true) {
    //         recipe = children[i];
    //         break;
    //     }
    // }


    var rect = recipe.getBoundingClientRect();

    window.scroll({
        top: rect.top, 
        left: rect.left, 
        behavior: 'smooth' 
    });
}