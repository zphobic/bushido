//require("events");

function game(names) {
    this.names = names;

    this.population = 0;
    this.ticks_per_sec = 5;

    this.paused = true;
}

game.prototype.render = function() {
    write_element("calendar", this.calendar.output());
    write_element("clan_info", this.clan.output());
    write_element("ownedland", this.clan.output_land());
    write_element("current_orders", this.clan.output_orders());
}

// Initializes game.
game.prototype.start_game = function() {
    this.calendar = new Calendar();

    var save_game = false;
    if(save_game) {
        // load
        // world, population
    } else {
        this.world = new world(this.names);
        this.clan = this.world.playable_clan();
    }
    // write once
    write_element("description", "You are the leader of the " + this.clan.monicker + ".");

    this.unpause();
}

game.prototype.update = function() {
    // autosave.update(); JSON.stringify(), JSON.parse();
    this.calendar.update();

    this.world.update();
}

game.prototype.tick = function() {
    this.update();
    this.render();
}

game.prototype.pause = function() {
    if(!this.paused) {
        if(this.interval) {
            clearInterval(this.interval);
        }
        this.paused = true;
    } else {
        console.error("Pausing a paused game!");
    }
}

game.prototype.unpause = function() {
    if(this.paused) {
        this.interval = setInterval(this.tick.bind(this), 1000 / this.ticks_per_sec);
        this.paused = false;
    } else {
        console.error("Unpausing an unpaused game!");
    }
}

game.prototype.togglePause = function() {
    if(this.paused) {
        this.unpause();
    } else {
        this.pause();
    }
    write_element("pauseButton", this.paused ? "unpause" : "pause");
}