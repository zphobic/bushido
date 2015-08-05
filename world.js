function world(names) {
    this.names = names;

    this.generate_land();
    this.generate_clans();
}

world.prototype.update = function() {
    for(var i = 0; i < 3; i++) {
        this.clans[i].update();
    }
}

world.prototype.output = function() {
    var ret = "";
    for(var i in this.land) {
        ret += this.land[i].output() + "<br>";
    }
    return ret;    
}

world.prototype.generate_land = function() {
    this.land = [];
    for(var i = 0; i < 10; i++) {
        this.land.push(new land(this));
    }
}

world.prototype.acquire_land = function(owner) {
    // owner shall be a clan
    for(var i in this.land) {
        if(!this.land[i].owned) {
            this.land[i].set_owner(owner);
            return this.land[i];
        }
    }
}

world.prototype.generate_clans = function() {
    this.clans = [];
    for(var i = 0; i < 3; i++) {
        this.clans.push(new clan(this, names));
    }

    this.playable_clan_id = rand(this.clans.length);
}

world.prototype.playable_clan = function() {
    return this.clans[this.playable_clan_id];
}

// world.prototype.save
// world.prototype.load