Order = Object.freeze({
    survey: {
                name: "survey",
                cmd: "Survey Land",
                active: "Surveying",
                total_work: 10,
                onDone: function(worker) {
                    log("Finished survey.");
                    //clan.survey(clan.land);
                    // find undiscovered features, 
                }
            },
    patrol: {
                name: "patrol",
                cmd: "Patrol Land",
                active: "Patrolling",
                total_work: 10,
                onDone: function(worker) {
                    log("Finished patrol.");
                }
            },
    study:  {
                name: "study",
                cmd: "Study Bushido",
                active: "Studying",
                continuous: true,
                checkpoint: 5,
                effect: function(worker) {
                    log(worker.monicker + " studying");
                }
            },
    train:  {
                name: "train",
                cmd: "Train",
                active: "Training",
                continuous: true,
                checkpoint: 5,
                effect: function(worker) {
                    log("training " + worker.monicker);
                }
            },
    audit:  {
                name: "audit",
                cmd: "Audit People",
                active: "Auditing",
                total_work: 10,
                onDone: function(worker) {
                    log("Finished audit.");
                }
            },
    explore: {
                name: "explore",
                cmd: "Explore",
                active: "Exploring",
                total_work: 10,
                onDone: function(worker) {
                    log("Finished exploring.");
                }
            },
    grow:   {
                name: "grow",
                active: "Growing Food",
                total_work: 10,

            }
});

/*
Object.keys(Order).forEach(function (key) {
    console.log(Order[key]);

    var btn = $("<input/>", { type: "button", id: "field", value: Order[key].cmd });
    $("#orders")
    .append(btn) // Create the element  
    .button() // Ask jQuery UI to buttonize it  
    .click(function(){ alert('I was clicked!');}); // Add a click handler
    //add_button("#orders", Order[key])
});

/*
function add_button(container) {
  var btn = $("<input/>", { type: "button", id: "field", value: value });
  container.append(btn);
}


function (order) { game_page.clan.do(Order.survey); }
function patrol_ordered() {
    game_page.clan.do(Order.patrol);
}

Order.forEach()
id = "order" + order_type.name + "btn";
class = "btn btn-default";
text = 
new Button(id, class, )


$('#ordersurveybtn').on('click', function(event) {

});

// .keydown()

/*
<button id="ordersurveybtn" class="btn btn-primary" onclick="game_page.clan.do(Order.survey)">Survey Land</button>
<button id="orderpatrolbtn" class="btn btn-primary" onclick="game_page.clan.do(Order.patrol)">Patrol Land</button>
<button id="orderstudybtn" class="btn btn-primary" onclick="game_page.clan.do(Order.study)">Study Bushido</button>
<button id="ordertrainbtn" class="btn btn-primary" onclick="game_page.clan.do(Order.train)">Train for War</button>
<button id="orderauditbtn" class="btn btn-primary" onclick="game_page.clan.do(Order.audit)">Audit People</button>
<button id="orderauditbtn" class="btn btn-primary" onclick="game_page.clan.do(Order.explore)">Explore</button>
*/
