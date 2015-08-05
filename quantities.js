// quantities.js

function Quantity(amount, time_period= decay = 1) {
    this.initial = amount;
    this.amount = amount;
    this.decay = decay;
}

// Exponential
Quantity.prototype.decay = function() {
    Math.pow(Math.E, -this.amount/this.decay);
}