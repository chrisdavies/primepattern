var primes = {
    dataset: [],

    ui: {
        datasetDropdownElement: function () {
            return document.getElementsByClassName('dataset-dropdown').item(0);
        },

        canvasElement: function () {
            return document.getElementsByTagName('canvas').item(0);
        },

        formulaModElement: function () {
            return document.getElementsByClassName('formula-mod').item(0);
        },

        datasetNumber: function () {
            return parseInt(this.datasetDropdownElement().value);
        },

        modValue: function () {
            return parseInt(this.formulaModElement().value);
        },

        processingIndicator: function () {
            return document.getElementsByClassName('processing-indicator').item(0);
        },

        showProcessing: function () {
            this.processingIndicator().classList.add('active');
        },

        hideProcessing: function () {
            this.processingIndicator().classList.remove('active');
        }
    },

    loadDataset: function (datasetNumber) {
        return Alite.get('./sets/primes' + datasetNumber + '.js');
    },

    render: function (mod, dataset) {
        if (!mod || !dataset) return;

        var ctx = primes.ui.canvasElement().getContext('2d'),
            firstPrime = dataset[0],
            width = mod,
            height = (dataset[dataset.length - 1] - firstPrime) / mod;

        ctx.canvas.width = width;
        ctx.canvas.height = height;
                
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#FFF';

        for (var i = 0; i < dataset.length; ++i) {
            var prime = dataset[i],
                x = prime % mod,
                y = Math.ceil((prime - firstPrime) / mod);

            ctx.fillRect(x, y, 1, 1);
        }
    },

    loadAndRefresh: function () {
        primes.ui.showProcessing();

        setTimeout(function () {
            primes.loadDataset(primes.ui.datasetNumber()).then(function (res) {
                primes.dataset = res.data;
                primes.render(primes.ui.modValue(), primes.dataset);
                primes.ui.hideProcessing();
            });
        }, 10);
    },

    initialize: function () {
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

            primes.ui.datasetDropdownElement().innerHTML = options.join('');
        }

        function handleInput() {
            primes.ui.datasetDropdownElement().addEventListener('change', function () {
                primes.loadAndRefresh();
            });

            primes.ui.formulaModElement().addEventListener('change', function () {
                primes.ui.showProcessing();
                setTimeout(function () {
                    primes.render(primes.ui.modValue(), primes.dataset);
                    primes.ui.hideProcessing();
                }, 10);
            });
        }

        initializeDropdown();
        handleInput();
        this.loadAndRefresh();
    }
};

primes.initialize();