// Population Manager

function clan(world, names) {
    this.names = names;
    this.clan_basename = names.random_name();
    this.monicker = this.clan_basename + " Clan";

    // populate
    this.init_pop(world);
    this.init_land(world);

    this.food = this.total_population();
}

TakesOrders.call(clan.prototype);

clan.prototype.caste_types = function() {
    return ["samurai", "soldier", "peasant", "merchant", "craftsmen", "filth"];
}

clan.prototype.init_pop = function(world) {
    this.population = {};
    for(var i in this.caste_types()) {
        this.population[this.caste_types()[i]] = [];
    }
    this.leader = new pawn("samurai", this.names);
    this.leader.monicker = this.clan_basename;
    this.population["samurai"].push(this.leader);

    for(var i = 0; i < 10; i++) {
        this.population["peasant"].push(new pawn("peasant", this.names));
    }
}

clan.prototype.init_land = function(world) {
    this.land = [];
    this.land_known = [];

    this.land.push(world.acquire_land(this));
}

clan.prototype.total_population = function() {
    var total_population = 0;
    for(var caste in this.population) {
        total_population += this.population[caste].length;
    }
    return total_population;
}

clan.prototype.update = function() {
    // workers generate food
    var food_production = this.population["peasant"].length * 1.2;
    // population eats food
    var food_consumption = this.total_population();

    this.food_gain = food_production - food_consumption;
    this.food += this.food_gain;
    if(this.food < 0) {
        // freak out
    }

    this.update_orders();
}

clan.prototype.update_orders = function() {
    this.current_order = this.get_order();

    var work_available = 0;
    for(var samurai in this.population["samurai"]) {
        if(samurai.assigned) {
            samurai.current_order.update();
        } else {
            work_available += 1;
        }
    }
    // doesn't overflow work into a second order, at least per-tick
    if(this.current_order) {
        this.current_order.update(work_available);
    }
}

clan.prototype.output = function() {
    var ret = "";
    for(caste in this.population) {
        var count = this.population[caste].length;
        if(count > 0) {
            ret += count + " " + caste + (count > 1 ? "s" : "") + ".<br>";
        }
    }
    ret += "Food: " + this.food + " (+" + this.food_gain + "/tick)<br>";
    return ret;
}

clan.prototype.output_land = function() {
    var ret = "";
    for(var i in this.land) {
        ret += this.land[i].output() + "<br>";
    }
    return ret;    
}
