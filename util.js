function rand(max) {
    return Math.floor(Math.random() * max);
}

function add_button(container, value)
{
  var btn = $("<input/>", { type: "button", id: "field", value: value });
  container.append(btn);
}

function write_element(elem_name, text) {
    var elem = document.getElementById(elem_name);
    elem.innerHTML = text;
}

function append_element(elem_name, text) {
    var elem = document.getElementById(elem_name);
    write_element(elem_name, elem.innerHTML + "<br>" + text)
}

function prepend_element(elem_name, text) {
    var elem = document.getElementById(elem_name);
    write_element(elem_name, text + "<br>" + elem.innerHTML)
}

function log(text) {
    prepend_element("gameLog", text);
}

function load_file_into_elem(filename, elem_name) {
    var file_req = new XMLHttpRequest();
    file_req.open("GET", filename, true);
    file_req.send();

    file_req.onreadystatechange = function() {
        if(file_req.readyState == 4) {
            if(file_req.status == 200) {
                write_element(elem_name, file_req.responseText);
            } else {
                console.error("File " + filename + " failed to load with error " + file_req.status)
            }
        }
    }
}

function load_file_into_func(filename, func) {
    var file_req = new XMLHttpRequest();
    file_req.open("GET", filename, true);
    file_req.send();

    file_req.onreadystatechange = function() {
        if(file_req.readyState == 4) {
            if(file_req.status == 200) {
                func(file_req.responseText);
            } else {
                console.error("File " + filename + " failed to load with error " + file_req.status)
            }
        }
    }
}