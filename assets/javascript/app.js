$(document).ready(function() {
    let questions = [{
        question: "How many time zones are there in the world?",
        answers: ["12", "5", "24", "100"],
        correctAnswer: "24",
        image: "assets/images/24.gif"
    }, {
        question: "Which planet has the most moons?",
        answers: ["Earth", "Jupiter", "Mars", "Uranus"],
        correctAnswer: "Jupiter",
        image: "assets/images/jupiter.gif"
    }, {
        question: "What is the chemical symbol for table salt?",
        answers: ["NaCl", "Zn", "FL", "Lv"],
        correctAnswer: "NaCl",
        image: "assets/images/nacl.gif"
    }, {
        question: "What is the first element on the periodic table?",
        answers: ["Carbon", "Hydrogen", "Graphite", "Amorphous"],
        correctAnswer: "Hydrogen",
        image: "assets/images/hydrogen.gif"
    }, {
        question: "What is the chemical formula for ozone?",
        answers: ["Co2", "O3", "H2O", "O"],
        correctAnswer: "O3",
        image: "assets/images/o3.gif"
    }, {
        question: "Diamonds are made up almost entirely of what element?",
        answers: ["Carbon", "Nitrogen", "Graphite", "Amorphous"],
        correctAnswer: "Carbon",
        image: "assets/images/carbone.gif"
    }, {
        question: "What is the world's largest active volcano?",
        answers: ["Dukono", "Mauna Loa", "Mount St. Helens", "Mount Yasur"],
        correctAnswer: "Mauna Loa",
        image: "assets/images/maunaloa.gif"
    }, {
        question: "What is the largest internal organ of the human body?",
        answers: ["Lungs", "Liver", "Heart", "Kidneys"],
        correctAnswer: "Liver",
        image: "assets/images/liver.gif"
    }, {
        question: "What is the fastest fish in the Ocean?",
        answers: ["Swordfish", "Marlins", "Sailfish", "Barracuda"],
        correctAnswer: "Sailfish",
        image: "assets/images/sailfish.gif"
    }, {
        question: "Which bird is often associated with delivering babies?",
        answers: ["Crow", "Robin", "Stork", "Eagle"],
        correctAnswer: "Stork",
        image: "assets/images/stork.gif"
    }];
    let game = {
        clickedAnswer: "",
        questions: questions,
        nowQuestion: 0,
        counter: 30,
        corectAns: 0,
        incorAns: 0,
        unAswered: 0,
        progress: 0,
        img: "",
        questionLoad: function() {
            timer = setInterval(game.countSec, 1000);
            $("#question").html("<h3>" + questions[game.nowQuestion].question + "</h3>");
            $("#question").css({
                "padding-top": "1rem",
                "color": "#000080"
            });
            $("#answer").empty();
            $("#pic").empty();
            for (var i = 0; i < questions[game.nowQuestion].answers.length; i++) {
                var ansId = "ans" + i
                $("#" + ansId).text(questions[game.nowQuestion].answers[i]).attr("data", questions[game.nowQuestion].answers[i]);
                $(".item").hover(function(event) {
                    if (event.type === "mouseenter") {
                        $(this).css("background", "rgba(140, 100,100, 0.2)");
                    } else if (event.type === "mouseleave") {
                        $(this).css("background", "rgba(80, 60, 60, 0.2)");
                    }
                })
            }
        },
        nextQuestion: function() {
            game.counter = 30;
            $("#timer").text(game.counter);
            game.nowQuestion++;
            game.questionLoad();
        },
        answerCor: function() {
            clearInterval(timer);
            $(".item").empty();
            game.corectAns++;
            if (game.nowQuestion === questions.length - 1) {

                setTimeout(game.results, 3 * 1000);
            } else {
                setTimeout(game.nextQuestion, 3 * 1000);
            }

            $("#answer").html("<h3>Right!</h3>");
            $("#pic").append($("<img>", {
                src: questions[game.nowQuestion].image
            }));
        },
        answerIncor: function() {
            clearInterval(timer);
            game.incorAns++;
            if (game.nowQuestion === questions.length - 1) {
                setTimeout(game.results, 3 * 1000);
            } else {
                setTimeout(game.nextQuestion, 3 * 1000);
            }
            $(".item").empty();
            $("#answer").html("<h3>Wrong!</h3>");
            $("#answer").append("<h3> Correct Answer is:  " + questions[game.nowQuestion].correctAnswer + "</h3>");
            $("#pic").append($("<img>", { src: questions[game.nowQuestion].image }));
        },
        results: function() {
            clearInterval(timer);
            $("#question").empty();
            $(".item").empty();
            $("#answer").empty();
            $("#pic").empty();
            $("#timer").empty();
            $("#answer").append("<h3> Correct: " + game.corectAns + "</h3>");
            $("#answer").append("<h3> Incorrect: " + game.incorAns + "</h3>");
            $("#answer").append("<h3> Unanswered: " + game.unAswered + "</h3>");
            $("#answer").append("<button id='reset'>RESET</button>");
        },
        clicked: function() {
            clearInterval(timer);
            $("#timer").css("width", "0%").attr("area-valuenow", "0").text("");
            if (game.clickedAnswer === questions[game.nowQuestion].correctAnswer) {
                game.answerCor()
            } else {
                game.answerIncor()
            }
        },
        countSec: function() {
            progress = Math.ceil((100 / 30) * game.counter);
            $("#timer").css("width", progress + "%").attr("area-valuenow", progress).text(game.counter + " sec");
            game.counter--;
            if (game.counter <= 0) {
                game.timeUp();
            }
        },
        timeUp: function() {
            clearInterval(timer);
            game.unAswered++
                if (game.nowQuestion === questions.length - 1) {
                    setTimeout(game.results, 3000);
                } else {
                    setTimeout(game.nextQuestion, 3000);
                }
            $(".item").empty();
            $("#answer").html("<h3>Time is up</h3>");
            $("#answer").append("<h3> Correct Answer is:  " + questions[game.nowQuestion].correctAnswer + "</h3>");
            $("#pic").append($("<img>", {
                src: questions[game.nowQuestion].image
            }));
        },
        reset: function() {
            game.clickedAnswer = "";
            game.nowQuestion = 0;
            game.corectAns = 0;
            game.incorAns = 0;
            game.unAswered = 0;
            img: ""
            game.questionLoad();
        }
    }
    $("#startBtn").on('click', function(event) {
        $("#startBtn").remove();
        game.questionLoad();
    })
    $(".item").on("click", function(event) {
        clearInterval(timer);
        game.clickedAnswer = $(this).attr("data");
        game.questionLoad();
        game.clicked(event);
    })
    $(document).on("click", "#reset", function() {
        game.reset()
    });
    // Wrap every letter in a span
    $('.ml6 .letters').each(function() {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
    anime.timeline({
            loop: true
        })
        .add({
            targets: '.ml6 .letter',
            translateY: ["1.1em", 0],
            translateZ: 0,
            duration: 750,
            delay: function(el, i) {
                return 50 * i;
            }
        }).add({
            targets: '.ml6',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });
})