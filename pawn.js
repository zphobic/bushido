// ranges from 0 to 100
function slider(value) {
    this.value = value || this.random();
}

slider.prototype.adjust = function(val) {
    this.value = val;
    if(this.value > 100) {
        this.value = 100;
    } else if(this.value < 0) {
        this.value = 0;
    }
}

slider.prototype.random = function() {
    return rand(100);
}

function pawn(caste, game) {
    this.monicker = names.random_name();
    this.caste = caste;

    this.loyalty = new slider(80);

    this.anger = new slider();
    this.fulfillment = new slider(50);

    this.food = new slider(50);
    this.religion = new slider(50);
    this.beauty = new slider(50);

    this.skill_at_arms    = new slider(0);
    this.skill_at_unarmed = new slider(0);

    return this;
}

TakesOrders.call(pawn.prototype);

pawn.prototype.update = function() {
    this.food -= 1;
    this.religion -= 1;
}

// function pawn_composite() {}