let prevInputLength = 0;

function sort() {
    var inputBox = document.getElementById('input');
    var outputBox = document.getElementById('output');

    var inputValue = inputBox.value.trim();

    if (inputValue.length < prevInputLength) {
        updateSortedOutput(inputValue);
    } else {
        updateSortedOutput(inputValue);
    }

    prevInputLength = inputValue.length;
}

function updateSortedOutput(inputValue) {
    var items;
    if (inputValue.includes('\n')) {
        items = inputValue.split('\n');
    } else if (inputValue.includes(';')) {
        items = inputValue.split(';');
    } else {
        items = [inputValue];
    }

    items = items.map(item => item.trim()).filter(item => item !== '');
    items.sort(Intl.Collator().compare);

    var outputValue;
    if (inputValue.includes('\n')) {
        outputValue = items.join('\n');
    } else if (inputValue.includes(';')) {
        outputValue = items.join('; ');
    } else {
        outputValue = items.join('');
    }

    var outputBox = document.getElementById('output');
    outputBox.value = outputValue;



}

function clearInput() {
    document.getElementById('input').value = ''
    sort();
}

function clearOutput() {
    document.getElementById('output').value = ''
}



var copyButton = document.getElementById("copyButton");
var outputElement = document.getElementById("output");

copyButton.onclick = function () {
    outputElement.focus();
    outputElement.select();
    document.execCommand('copy');
    clearSelection();



    notify();
};

function notify() {
    var copiedText = "Copied!";
    copyButton.innerHTML = copiedText;

    setTimeout(function () {
        copyButton.innerHTML = "Copy";
    }, 1000);
}

function clearSelection() {
    var sel;
    if ( (sel = document.selection) && sel.empty ) {
        sel.empty();
    } else {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        var activeEl = document.activeElement;
        if (activeEl) {
            var tagName = activeEl.nodeName.toLowerCase();
            if ( tagName == "textarea" ||
                    (tagName == "input" && activeEl.type == "text") ) {
                // Collapse the selection to the end
                activeEl.selectionStart = activeEl.selectionEnd;
            }
        }
    }
}

