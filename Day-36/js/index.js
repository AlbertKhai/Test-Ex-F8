import { client } from "./client.js";

const app = {
   money: document.querySelector(".money"),
   quizLogo: document.querySelector(".quiz__logo"),
   quizContent: document.querySelector(".quiz__content"),
   support: document.querySelector(".support"),
   quizQuestion: document.querySelector(".quiz__question"),
   quizAnswer: document.querySelector(".quiz__answer"),
   quizStart: document.querySelector(".quiz__start"),
   quizStartTutor: document.querySelector(".quiz__start-tutorial"),
   quizStartBtn: document.querySelector(".quiz__start-btn"),
   quizReady: document.querySelector(".quiz__ready"),
   quizReadyBtn: document.querySelector(".quiz__ready-btn"),
   audioStart: document.querySelector(".audio__start"),
   audioWaiting: document.querySelector(".audio__waiting"),
   audioRound1: document.querySelector(".audio__round-1"),
   audioRound2: document.querySelector(".audio__round-2"),
   audioRightRound1: document.querySelector(".audio__right-round-1"),
   audioSuccess: document.querySelector(".audio__success"),

   query: {
      _sort: "id",
      _order: "asc",
   },

   isQuestion: 1,
   haveMoney: "$ 0",

   render: function (quiz) {
      const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, "");
      this.quizQuestion.innerHTML = `${stripHtml(quiz.question)}`;
      const answerContents =
         this.quizAnswer.querySelectorAll(".answer__content");

      answerContents.forEach((span, index) => {
         span.innerHTML = `${stripHtml(quiz.answers[index])}`;
         span.parentElement.dataset.value = span.innerHTML;
      });

      this.handleQuizAnswer();
   },

   getQuiz: async function (id) {
      const { data: quiz, response } = await client.get(`/quizzes/${id}`);
      this.render(quiz, response);
   },

   handleQuizAnswer: function () {
      const thisApp = this;

      this.quizAnswer.addEventListener("click", async function answer(e) {
         e.preventDefault();
         if (e.target.nodeName === "BUTTON") {
            let audio = document.querySelector(".audio__round-1");
            let audioRight = document.querySelector(".audio__right-round-1");
            let audioWrong = document.querySelector(".audio__wrong-round-1");

            const { data: quiz, response } = await client.get(
               `/answer/${this.dataset.value}`
            );

            if (e.target.dataset.value === quiz.result) {
               thisApp.isQuestion++;

               audioRight.play();
               e.target.classList.add("right");

               const moneyLevel = document.querySelector(
                  `.money__level.level-${this.dataset.value}`
               );

               moneyLevel.classList.add("level-pass");

               switch (thisApp.isQuestion) {
                  case 6:
                  case 11:
                  case 16:
                     thisApp.haveMoney =
                        moneyLevel.getElementsByTagName("span")[0].innerText;
                     break;
               }

               if (thisApp.isQuestion === 16) {
                  audio.pause();
                  thisApp.audioSuccess.play();
                  thisApp.quizStartTutor.innerHTML = `Giàu rồi, hehehe 🤑🤑🤑, chúc mừng, chúc mừng.<br /> 
                  Bạn đã có $ 150.000 trong tài khoản`;
                  thisApp.quizContent.classList.add("hide");
                  thisApp.quizStartBtn.classList.add("hide");
                  thisApp.quizStart.classList.remove("hide");
                  this.removeEventListener("click", answer);
                  return;
               }

               this.dataset.value = thisApp.isQuestion;

               audioRight.addEventListener("ended", function audioRightEnd() {
                  thisApp.quizContent.classList.add("hide");
                  e.target.classList.remove("right");
                  thisApp.getQuiz(thisApp.isQuestion);
                  thisApp.quizContent.classList.remove("hide");
                  this.removeEventListener("ended", audioRightEnd);
               });
            } else {
               audio.pause();
               audio.currentTime = 0;

               audioWrong.play();
               e.target.classList.add("wrong");

               thisApp.quizStartTutor.innerHTML = `Rất tiếc chúng ta phải dừng cuộc chơi tại đây.<br /> 
               Bạn đã vượt qua <b>${thisApp.isQuestion}</b> câu hỏi, chương trình sẽ trao số tiền thưởng 
               tương ứng với cột mốc quan trọng mà bạn đã đạt được là <b>${thisApp.haveMoney}</b>
               mang về nhà.<br /> Thế là bạn đã làm rất tốt rồi, còn nếu bạn vẫn chưa hài lòng, chơi lại thôi 😐`;
               thisApp.isQuestion = 1;
               this.dataset.value = 1;
               thisApp.quizStartBtn.innerHTML = `Chơi lại`;
               thisApp.quizContent.classList.add("hide");
               thisApp.quizStart.classList.remove("hide");
               thisApp.quizStartBtn.classList.remove("hide");
            }

            this.removeEventListener("click", answer);
         }
      });
   },

   handleStart: async function () {
      this.audioRound1.loop = true;

      // Ready
      this.quizReadyBtn.addEventListener("click", (e) => {
         this.quizReady.classList.add("hide");
         this.quizStart.classList.remove("hide");
         this.money.classList.remove("hide");
         this.support.classList.remove("hide");
         this.quizLogo.classList.remove("ready");
         this.audioStart.play();
      });

      // Start
      this.quizStartBtn.addEventListener("click", (e) => {
         e.preventDefault();

         if (e.target.innerHTML === "Chơi lại") {
            const answerWrong = document
               .querySelector(".wrong")
               .classList.remove("wrong");
            this.getQuiz(this.isQuestion);

            const moneyLevels = document.querySelectorAll(`.money__level`);
            moneyLevels.forEach((level) => {
               level.classList.remove("level-pass");
            });

            this.audioRound1.play();

            this.quizStart.classList.add("hide");
            this.quizStartBtn.classList.add("hide");
            this.quizContent.classList.remove("hide");
            return;
         }

         this.quizStart.classList.add("hide");
         this.quizStartBtn.classList.add("hide");
         this.quizContent.classList.remove("hide");

         this.audioRound1.play();
         this.audioStart.pause();
         this.audioStart.currentTime = 0;
      });
   },

   //Khởi động app
   start: function () {
      this.getQuiz(this.isQuestion);
      this.handleStart();
   },
};

//Chạy app
app.start();
