function Names(event) {
    this.event = event;
    this.names_loaded = false;

    load_file_into_func("names_japanese.txt", this.set_names.bind(this));
}

Names.prototype.set_names = function(newline_separated_list) {
    this.names = newline_separated_list.split("\n");

    this.names_loaded = true;
    document.dispatchEvent(this.event);
}

Names.prototype.random_name = function() {
    if(this.names_loaded) {
        return this.names[rand(this.names.length)];
    } else {
        console.error("Names not initialized!");
        return "Ichi";
    }
}