function Calendar() {
    // jun used for approx. times in the month. 10 days long.
    this.juns = ["Jojun", "Chujun", "Gejun"];
    this.months = [
        {j:"Mutsuki", e:"Affection"},
        {j:"Kisaragi", e:"Changing Clothes"},
        {j:"Yayoi", e:"New Life"},
        {j:"Uzuki", e:"Snow-Flower Tree"},
        {j:"Satsuki", e:"Early-Rice Planting"},
        {j:"Minazuki", e:"Water"},
        {j:"Fumizuki", e:"Books"},
        {j:"Hazuki", e:"Leaves"},
        {j:"Nagatsuki", e:"Length"},
        {j:"Kaminazuki", e:"Gods"},
        {j:"Shimotsuki", e:"Frost"},
        {j:"Shiwasu", e:"Priests Running"}
    ];

    this.day = 0;
    this.month = 0;
    this.jun = 0;
    this.year = 0;
    this.era = 0; // based on emperor, of which there is none yet

    this.season = "winter";

    this.ticks = 1;

    this.name_key = "e"; // English    
}

Calendar.prototype.month_name = function() {
    return this.months[this.month][this.name_key];
}

Calendar.prototype.output = function() {
    return "It is " + this.juns[this.jun] +
    " of the month of " + this.month_name() +
    " of year " + (this.year + 1) +
    " of an unknown era.";
}

Calendar.prototype.update = function() {
    this.ticks++;

    // day updater
    if(this.ticks > 0 && this.ticks % 30 === 0) {
        this.day++;
    }
    // jun updater
    if(this.day === 0) {
        this.jun = 0;
    } else if( this.day % 10 === 0 && this.jun < 2) {
        this.jun++;
    }
    // month updater. This will get more complicated!
    if(this.day > 0 && this.day % 30 === 0) {
        this.month++;
        this.day = 0;
    }
    // year updater.
    if(this.month > 0 && this.month % 12 === 0) {
        this.year++;
        this.month = 0;
    }
/*
    this.on_tick.forEach( function(fun) {
        var gcid = document.getElementById("game");
        gcid.innerHTML += this;

        fun.bind(this)();
    });*/
}