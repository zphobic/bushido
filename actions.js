

var default_work_amount = 100;

function order(order_type, worker) {
    this.order_type = order_type;
    this.name = order_type.name;
    this.active = order_type.active;
    if(order_type.continuous) {
        this.continuous = true;
    } else {
        this.total_work = order_type.total_work || default_work_amount;
    }
    this.progression = 0;
    this.worker = worker;
}

order.prototype.update = function(work) {
    console.log(this);
    this.progression += (work || 1);
    if(!this.continuous && this.progression >= this.total_work) {
        if(this.order_type.onDone) {
            this.order_type.onDone.bind(this)(this.worker);
        }
        this.worker.finish_task(this);
    } else if(this.order_type.continuous && this.progression >= this.order_type.checkpoint) {
        if(this.order_type.effect) {
            this.order_type.effect.bind(this)(this.worker);
        }
        this.progression -= this.order_type.checkpoint;
        this.worker.finish_task(this); // for now, at least
    }
}

// Mixin for orders. Expects a method (called update_orders() in clan)
// that calls update(amt_of_work_done) on orders as appropriate.
var TakesOrders = function() {
    this.do = function(order_type) {
        this.orders = this.orders || [];

        this.current_order = new order(order_type, this);
        if(this.current_order.continuous) {
            // remove other continuous orders of the same type.
            this.orders = this.orders.filter(function(o) { return o.order_type !== order_type });
        }
        this.orders.unshift(this.current_order);
    };

    this.get_order = function() {
        this.orders = this.orders || [];
        return this.orders[0];
    }

    this.output_orders = function() {
        this.orders = this.orders || [];
        var ret = "";
        if(this.orders.length == 0) {
            ret += "None";
        } else {
            this.orders.forEach(function (order, i, a) {
                ret += (order.active) + "<br>";
            });
            console.log(ret);
        }
        // ret += other orders...
        return ret;
    };

    this.finish_task = function(order) {
        this.orders = this.orders || [];
        var orig_length = this.orders.length;

        this.orders = this.orders.filter(function(o) { return o !== order });
        if(this.orders.length !== (orig_length - 1)) {
            console.warn("finish_task deleted " + (orig_length - this.orders.length) + " orders!");
        }

        this.current_order = this.get_order();
    }

    return this;
};