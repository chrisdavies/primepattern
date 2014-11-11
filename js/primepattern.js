var primes = {
    ui: {
        datasetDropdown: function () {
            return document.getElementsByClassName('dataset-dropdown').item(0);
        },

        canvas: function () {
            return document.getElementsByTagName('canvas').item(0);
        },

        formulaMod: function () {
            return document.getElementsByClassName('formula-mod').item(0);
        }
    }
};


(function initializeDatasetDropdown() {

    function numericSuffix(i) {
        var suffix = 'th';

        if (i < 4 || i > 20) {
            var mod = i % 10;
            if (mod == 1) {
                suffix = 'st';
            } else if (mod == 2) {
                suffix = 'nd';
            } else if (mod == 3) {
                suffix = 'rd';
            }
        }

        return suffix;
    }

    function makeOption(i) {
        return '<option value="' + i + '">' + i + numericSuffix(i) + '</option>';
    }

    function initializeDropdown() {
        var options = [],
            i = 0;

        while (options.length < 50) {
            options.push(makeOption(++i));
        }

        primes.ui.datasetDropdown().innerHTML = options.join('');
    }

    initializeDropdown();
})();


(function initializeCanvas() {
    var canvas = primes.ui.canvas(),
        ctx = canvas.getContext('2d'),
        width = canvas.width,
        height = canvas.height;

    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, width, height);
})();