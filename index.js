const vm = new Vue({
    el: '#app',
    data: {
        topLeft: false,
        topRight: false,
        botLeft: false,
        botRight: false,
        sequence: [],
        tmp: [],
        squareMapping: ['topLeft', 'topRight', 'botLeft', 'botRight']
    },
    methods: {
        newGame() {
            this.sequence = [];
            this.nextTurn();
        },
        allGrey() {
            this.topLeft = false;
            this.topRight = false;
            this.botLeft = false;
            this.botRight = false;
        },
        addNewElementToSequence() {
            this.sequence.push(this.squareMapping[Math.floor(Math.random() * 4)]);
            this.tmp = this.sequence.slice();
        },
        nextTurn() {
            this.addNewElementToSequence();
            this.allGrey();
            this.playSequence(this.tmp[0]);
        },
        playSequence(instruction) {
            this[instruction] = true;
            setTimeout(function () {
                vm.allGrey();
                vm.tmp.shift();
                if (vm.tmp[0]) {
                    setTimeout(function () {
                        vm.playSequence(vm.tmp[0]);
                    }, 400)
                } else {
                    vm.tmp = vm.sequence.slice();
                }
            }, 400)
        },
        selectSquare(instruction) {
            console.log(this.tmp[0])
            if (instruction == this.tmp[0]) {
                this[instruction] = true;
                setTimeout(function () {
                    vm.allGrey();
                    vm.tmp.shift()
                    if (!vm.tmp[0]) {
                        vm.nextTurn();
                    }
                }, 400)
            } else {
                alert('PERDU');
                this.sequence = [];
                this.tmp = [];
            }
        }
    },
    computed: {
        score() {
            return this.sequence.length - 1 < 0 ? 0 : this.sequence.length - 1;
        }
    }
})