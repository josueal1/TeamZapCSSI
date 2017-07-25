
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

Survey.JsonObject.metaData.addProperty("dropdown", {name: "renderAs", default: "standard", choices: ["standard", "imagepicker"]});

window.survey = new Survey.Model({ questions: [
 { type: "dropdown", name: "choosepicture", renderAs: "imagepicker", title: "You have 5 minutes, grab your luggage!",
     choices: [
        {value: "backpack", text: "../resources/backpack.png"},
        {value: "briefcase", text: "../resources/briefcase.png"},
        {value: "purse", text: "../resources/purse.png"},
        {value: "purse", text: "../resources/luggage.png"},
        {value: "plastic-bag", text: "../resources/plastic-bag.png"}
     ]
  },  { type: "dropdown", name: "choosefamily", renderAs: "imagepicker", title: "Who are you traveling with?",
       choices: [
          {value: "best friend", text: "../resources/best_friend.png"},
          {value: "family", text: "../resources/family.png"},
          {value: "solo", text: "../resources/solo.png"},
          {value: "wife", text: "../resources/wife.png"}
       ]
    }, { type: "dropdown", name: "choosepicture", renderAs: "imagepicker", title: "ZzzzZZ... Time to rest! Select a place to stay: ",
        choices: [
           {value: "airbnb", text: "../resources/airbnb.png"},
           {value: "resort", text: "../resources/hilton.png"},
           {value: "solo", text: "../resources/tent.png"},
           {value: "wife", text: "../resources/wife.png"}
        ]
     }, { type: "dropdown", name: "choosepicture", renderAs: "imagepicker", title: "What is your budget?",
         choices: [
            {value: "little", text: "../resources/money-bag.png"},
            {value: "normal", text: "../resources/moneybag.png"},
            {value: "a lot", text: "../resources/moneybag2.png"},
         ]
      }, { type: "dropdown", name: "choosepicture", renderAs: "imagepicker", title: "My number one travel essential is: ",
          choices: [
             {value: "phone", text: "../resources/phone.png"},
             {value: "coffee", text: "../resources/mug.png"},
             {value: "camera", text: "../resources/camera.png"},
             {value: "hiking shoes", text: "../resources/hiking.png"}
          ]
       }
]});
survey.onComplete.add(function(result) {
	document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});


var widget = {
    name: "imagepicker",
    isFit : function(question) { return question["renderAs"] === 'imagepicker'; },
    isDefaultRender: true,
    afterRender: function(question, el) {

        var $el = $(el).find("select");

        var options = $el.find('option');
        for (var i=1; i<options.length; i++) {
            $(options[i]).data("imgSrc", options[i].text);
            options[i].selected = question.value == options[i].value;
        }
        $el.imagepicker({
            hide_select : true,
            show_label  : false,
            selected: function(opts) {
                question.value = opts.picker.select[0].value;
            }
        })
    }

        ,
        willUnmount: function(question, el) {
            var $el = $(el).find("select");
            $el.data('picker').destroy();
        }

}

Survey.CustomWidgetCollection.Instance.addCustomWidget(widget);


$("#surveyElement").Survey({
    model: survey
});



window.surveyForceUpdate = function() {
    document.getElementById("surveyElement").innerHTML = "";

    $("#surveyElement").Survey({ model: survey });

}