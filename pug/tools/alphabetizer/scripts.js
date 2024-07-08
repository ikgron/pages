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


    document.getElementById("output").onclick = function () {
        document.getElementById("output").select();
        document.execCommand('copy');

        notify();
    }

    function notify() {
        var copiedText = "Copied to clipboard!";

        var outputBox = document.getElementById("output");

        if (outputBox.value == "") {
            return
        } else {
            var save = outputBox.value;

            outputBox.value = copiedText;

            setTimeout(function () {
                setTimeout(function () {
                    outputBox.value = save;
                }, 500);
            }, 200);
        }
    }
}

function clearInput() {
    document.getElementById('input').value = ''
    sort();
}

function clearOutput() {
    document.getElementById('output').value = ''
}



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('output').value = ''
})
