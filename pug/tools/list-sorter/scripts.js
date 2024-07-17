let prevInput = 0;

function sort() {
    var inputBox = document.getElementById(`input`);

    var inputValue = inputBox.value.trim();

    if (inputValue.length < prevInput) {
        updateSortedOutput(inputValue);
    } else {
        updateSortedOutput(inputValue);
    }

    prevInput = inputValue.length;
}

let reversed = false;

function toggleReverse() {
    reversed = !reversed;

    var reverseButton = document.getElementById(`reverseButton`);
    if (reversed) {
        reverseButton.style.backgroundColor = `#0E57ED`;
        reverseButton.style.color = `black`;
    } else {
        reverseButton.style.backgroundColor = ``;
        reverseButton.style.color = ``;
        reverseButton.style.border = ``;
    }

    sort();
}

function updateSortedOutput(inputValue) {

    var items;
    var sortMethod = document.getElementById(`sortMethod`).value;

    const isReversed = reversed;

    if (inputValue.includes(`\n`)) {
        items = inputValue.split(`\n`);
    } else if (inputValue.includes(`;`)) {
        items = inputValue.split(`;`);
    } else {
        items = [inputValue];
    }

    items = items.map(item => item.trim().replace(/^(\s*-\s*\[\s*([xX]|\s)*\]\s*)/, ``)).filter(item => item !== ``);

    if (sortMethod === `alphabetical`) {
        items.sort(Intl.Collator().compare);
    } else if (sortMethod === `length`) {
        items.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
        items.reverse();
    }


    var outputValue;
    if (inputValue.includes(`\n`)) {
        outputValue = items.join(`\n`);
    } else if (inputValue.includes(`;`)) {
        outputValue = items.join(`; `);
    } else {
        outputValue = items.join(``);
    }

    var outputBox = document.getElementById(`output`);
    outputBox.value = outputValue;
}

function clearInput() {
    document.getElementById(`input`).value = ``
    sort();
}

function clearOutput() {
    document.getElementById(`output`).value = ``
}



var copyButton = document.getElementById("copyButton");
var outputElement = document.getElementById("output");

copyButton.onclick = function () {
    outputElement.focus();
    outputElement.select();
    document.execCommand(`copy`);

    clearSelection();
    notify();
};

let timeoutId;

function notify() {
    var copyButton = document.getElementById(`copyButton`);
    var copiedText = "Copied!";

    clearTimeout(timeoutId);

    copyButton.innerHTML = copiedText;

    timeoutId = setTimeout(function () {
        copyButton.innerHTML = "Copy";
    }, 1000);

    copyButton.addEventListener("click", function () {
        clearTimeout(timeoutId);

        copyButton.innerHTML = copiedText;

        timeoutId = setTimeout(function () {
            copyButton.innerHTML = "Copy";
        }, 1000);
    });
}

function clearSelection() {
    var sel;
    if ((sel = document.selection) && sel.empty) {
        sel.empty();
    } else {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        var activeEl = document.activeElement;
        if (activeEl) {
            var tagName = activeEl.nodeName.toLowerCase();
            if (tagName == "textarea" ||
                (tagName == "input" && activeEl.type == "text")) {
                activeEl.selectionStart = activeEl.selectionEnd;
            }
        }
    }
}

