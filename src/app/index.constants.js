(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .constant('one_second', 1000)
        .constant('EN_US', {
            intro: "World view",
            question: "How do people behave?",
            idu: "I don't understand the image.",
            done: "Great Job!"
        })
        .constant('ES_PE', {
            intro: "",
            question: "",
            idu: "",
            done: ""
        })
        .constant('ES_MX', {
            intro: "",
            question: "",
            idu: "",
            done: ""
        });

})();
