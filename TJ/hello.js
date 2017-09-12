var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
function greeter(person) {
    return "hallo " + person.name;
}
var person = new Person("bert");
$(document).ready(function () {
    var message = greeter(person);
    $("#status")[0].innerHTML = message;
});
var test = new CalendarUtilsModule.WeekDay();
test.date = new Date();
test.isFuture = true;
$(document).ready(function () {
    // var message = greeter(person);
    console.log(test.date);
    $("#status")[0].innerHTML = test.date.toDateString();
});
//# sourceMappingURL=hello.js.map