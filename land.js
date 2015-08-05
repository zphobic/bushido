function land(world, type) {
    this.type = type || this.random_type();
    this.monicker = world.names.random_name() + " " + this.type;
    this.owned = false;
}

land.prototype.output = function() {
    var ret = "";
    ret += this.monicker;
    return ret;
}

land.prototype.set_owner = function(owner) {
    // owner shall be a clan
    if(this.owned) {
        console.log("Conquering " + this.output() + " for " + owner.monicker);
    } else {
        console.log(owner.monicker + " takes control of " + this.output() + ".");
        this.owned = true;
    }
    this.owner = owner;
}

land.prototype.random_type = function() {
    var lt = ["Valley", "Mountain", "Plain"];
    return lt[rand(lt.length)];
}