// PLOT POINTS:
// 1) Studying at Jack's
// 2) Suspecting Jack is gay
// 3) Trying to get you a private tutor (threatening your relationship)

function Start_Dinner_2(){

	m("우리 아들 안녕."); // Hi sweetie.
	Show("mom","mom_sit");

	switch($.waiting_action){
		case "eat":
			m("아, 나 없이 식사 시작했구나. 참을성 없기는.");
			n("...네."); //right
			break;
		case "wait":
			m("먼저 먹고 있지. 음식 식잖아.");
			n("...네."); //sure
			break;
		case "play":
			m("먹을 것 가지고 장난치는건 애들이나 하는 짓이잖니."); //It's immature to play with your food, you know
			n("네 네.");
			break;
	}

	m("아버지는 늦으신단다. 한시간 후에 저녁 같이 먹으러 오신대.");

	Choose({
		"그렇구나. 밥 먹죠.": function(message){
			n(message);
			n("*냠냠냠*");
			m(". . .");
			m("내일 계획은 어떻게 되니?");
			Start_Dinner_2_1();
		},
		"저 엄마아빠한테 할 이야기가 있어요.": function(message){
			n(message);
			m("알았어. 나중에 아버지가 들어오시면 엄마아빠한테 말해주렴.");
			n("아. 알겠어요.");
			m(". . .");
			n("*냠냠냠*");
			m("그래서, 내일 계획은 어떻게 되니?");
			Start_Dinner_2_1();
		},
		"저 엄마한테만 할 말이 있어요.": function(message){
			n(message);
			m("잠깐만 닉, 오늘 하루 어땠는지 못 물어봤잖니!");
			n("오늘 하루는 괜찮았어요.");
			m("그래. 내일 계획은 어떻게 되니?");
			Start_Dinner_2_1();
		}
	});

}

function Start_Dinner_2_1(){

	n("아. 음... 공부요.")
	n("네. 내일은 공부하려고요.");
	m("무슨 과목?");
	n("으음...");

	Choose({
		"화학이요.": function(message){
			$.studying_subject = "화학";
			Start_Dinner_2_2(message);
		},
		"미적분이요.": function(message){
			$.studying_subject = "미적분";
			Start_Dinner_2_2(message);
		},
		"컴퓨터과학이요.": function(message){ // 정보? 프로그래밍?
			$.studying_subject = "컴퓨터과학";
			Start_Dinner_2_2(message);
		}
	});

}

function Start_Dinner_2_2(message){

	n(message);
	m("좋아."); //Good. 다행이구나. 좋아.
	m("너 진짜 " + $.studying_subject + " 성적 좀 올려야겠더구나.");
	n(". . .");
	m("그래서, 엄마는 내일 도서관에 있을건데. So, I'll be at the library tomorrow.");
	m("아들도 거기서 공부할거야? Will I see you studying there?");
	n("아, 전 잭네 집 가서 공부하려고요. Actually, I'm gonna study at Jack's place.");
	m("또? Again?");
	m("너 그 애랑 많이 놀더라. You spend a lot of time with him."); //그 애랑 되게 잘 놀더라.

	Choose({
		"그냥 공부만 같이 해요.": function(message){
			$.relationship = "study";
			Buddy_1(message);
		},
		"엄마, 잭은... 그냥 친구가 아니에요. Mom, Jack is... more than a friend.": function(message){
			
			$.relationship = "best friend";
			n(message);
			
			$.lying_about_hanging_out = true;
			m("아, 단짝 친구처럼?");
			n("엄. 그게--");
			m("공부는 안 하고 놀기만 한다는거구나. So you're just hanging out, not studying.");
			n("우리 공부 해요!");
			m(". . .");
			m("알겠다. 나한테 거짓말만 하지 마. Alright, just don't lie to me.");
			n("거짓말 안 해요.");
			Buddy_1_point_5();
		},
		"당연하죠. 그게 친한 친구들이 하는건데요. Well yeah, that's what good pals do.": function(message){
			$.relationship = "friend";
			Buddy_1(message);
		}
	});

}


///////////////////////////////////////
////// 2) SUSPECTING Jack IS GAY ///////
///////////////////////////////////////


function Buddy_1(message){
	n(message);

	if($.relationship!="study"){
		$.lying_about_hanging_out = true;
		m("공부는 안 하고 놀기만 한다는거구나. So you're just hanging out, not studying.");
		n("우리 공부 해요!");
		m(". . .");
		m("알겠다. 엄마한테 거짓말만 하지 마. Alright, just don't lie to me.");
		n("거짓말 안 해요.");
	}else{
		m("알겠어. 엄만 확인하는 것뿐이야. Okay. I'm just making sure.");
		n("뭘... 확인해요? Of... what?");
	}

	Buddy_1_point_5();
}

function Buddy_Caught_Lying_1(message,callback){
	n(message);
	m("잠깐...");
	m("네가 '공부만 한다고' 했잖아. I thought you said you 'just study together'.");
	m("네희 둘이 친구라고 하진 않았는데. You didn't tell me you were friends.");
	$.lying_about_relationship = true;
	Choose({
		"Oops, I meant he's just a studymate.": callback,
		"글쎼, 공부도 같이 하고 친구도 할 수 있죠... Well, he can also be my friend...": callback, // tl awk
		"아뇨, 계속 친구라고 말했는데요. No, I always said we were friends.": callback
	});
}

function Buddy_1_point_5(){

	m("Just... 그 애랑 너무 많이 놀지는 마렴. don't hang around him too much.");
	m("사람들이 오해할 수 있잖니. People might get the wrong idea.");

	Choose({
		"아, 아녜요, 우린 그냥 친구예요. Oh. No, yeah, we're just friends.": function(message){
			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,Buddy_2);
			}else{
				Buddy_2(message);
			}
		},
		"오해가 아닐 수도 있어요. The wrong idea might be the right idea.": Buddy_4,
		"무슨... 오해요? What do you mean by... wrong idea?": Buddy_3
	});

}

function Buddy_2(message){
	n(message);
	m("알겠어."); // okay
	if($.lying_about_relationship){
		m("엄마한테 거짓말만 하지 마. Just don't lie to me.");
		n("안 할게요. I won't.");
		m(". . .");
		m("But... about you hanging out with Jack.");
	}
	m("It's just that some people might assume things, since...");
	m("You know... he looks like...");
	m("A gay?");
	Buddy_Choice();
}

function Buddy_3(message){
	n(message);
	m("Just between mother and son, I think he might be... you know...");
	n("No, what?");
	m("A gay!");
	m("He looks and talks like a gay.");
	Buddy_Choice();
}

function Buddy_4(message){
	n(message);
	m("Oh, that's like a zen thing, right?");
	n("Um.");
	m("Zen is also about nature, and your classmate Jack, he...");
	m("...you know, doesn't seem natural?");
	Choose({
		"You think he's gay.": function(message){
			n(message);
			m("Yes!");
			m("You suspect it, too!");
			Buddy_Choice();
		},
		"Don't say that about my friend!": function(message){

			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,function(message){

					n(message);
					m("Okay.");
					m("Just don't lie to me.");
					n("I won't.");
					m(". . .");

					m("But yes, even you agree that it's bad to be seen as 'not natural'.");
					n("I never said--");
					m("And I'm just looking out for you! Because he acts like, you know...");
					m("A gay!");
					Buddy_Choice();

				});
			}else{

				n(message);
				m("I'm just being honest.");
				m("But yes, even you agree that it's bad to be seen as 'not natural'.");
				n("I never said--");
				m("And I'm just looking out for you! Because he acts like, you know...");
				m("A gay!");
				Buddy_Choice();

			}

		},
		"What do you mean, he's not natural?": Buddy_3
	});
}

function Buddy_Choice(){
	if($.relationship=="friend"){
		m("And since you say he's a 'good pal'...");
		m("People might think you're a gay like him, too.");
	}
	if($.relationship=="best friend"){
		m("And since you say he's your BEST friend...");
		m("People might think you're a gay like him, too.");
	}
	Choose({
		"Ha, he sure acts gay. Luckily, he's not.": function(message){
			n(message);
			m("See? You also think there's something not right about it.");
			n("...sure.");
			Buddy_Aftermath();
		},
		"What's wrong with being gay?!": function(message){
			n(message);
			m("Nothing! Nothing.");
			Buddy_Aftermath();
		},
		"Maybe... my friend might be gay.": function(message){

			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,function(message){
					n(message);
					m("Okay.");
					m("Just don't lie to me.");
					n("I won't.");
					m(". . .");
					Buddy_Aftermath();
				});
			}else{
				n(message);
				Buddy_Aftermath();
			}
			
		}
	});
}


function Buddy_Aftermath(){

	m("Don't get me wrong.");
	m("I'm not saying those kind of people are bad!");
	m("I just think... you should be careful around one of them.");
	m("Jack might, you know, try to recruit you.");

	Show("clock_time","clock_1910");
	Show("nicky","dinner_nicky_defiant");

	Choose({
		"what.": Buddy_Aftermath_2,
		"whaaat.": Buddy_Aftermath_2,
		"whaaaaaaaaaaaaaaat.": Buddy_Aftermath_2
	});
}

function Buddy_Aftermath_2(message){
	
	n(message);

	n("How do you even...");
	n("Ugh, nevermind.");
	m("Nick, I'm sorry you find me annoying.");
	n("No, mom, stop doing th--");
	m("Let's go back to talking about your grades.");
	m("Now, what did you say you were studying tomorrow?");

	Show("nicky","dinner_nicky_sit");
	n(". . .");
	n("Errrmmmmm...");

	Choose({
		"Compsci?": function(message){
			$.studying_subject_2 = "Computer Science";
			Grades_Start(message);
		},
		"Chemistry?": function(message){
			$.studying_subject_2 = "Chemistry";
			Grades_Start(message);
		},
		"Calculus?": function(message){
			$.studying_subject_2 = "Calculus";
			Grades_Start(message);
		}
	});

}


//////////////////////////////////////////
////// 3) A POSSIBLE PRIVATE TUTOR ///////
//////////////////////////////////////////

function Grades_Start(message){
	n(message);
	m(". . .");
	if($.studying_subject!=$.studying_subject_2){
		Grades_Start_1();
	}else{
		Grades_Start_2();
	}
}

function Grades_Start_1(){
	m("You first told me it was "+$.studying_subject+".");
	m("Now you tell me it's "+$.studying_subject_2+"?");
	$.lying_about_studying = true;
	n("Mom, I was just confus--");
	if($.lying_about_hanging_out || $.lying_about_relationship){
		m("This is TWICE you've lied to me during this dinner.");
		n("I didn't lie about--");
	}
	m("Either way, your grades in both subjects are terrible.");
	n(". . .");
	Grades_Explaining();
}

function Grades_Start_2(){
	m("You hesitated for a moment there.");
	n("I was eating.");
	m("Okay.");
	if($.lying_about_hanging_out){
		m("I wonder if you're studying with Jack at all, or just always hanging out.");
		n("We study.");
	}
	m(". . .");
	m("Still, your grades in your "+$.studying_subject_2+" class are terrible.");
	n(". . .");
	Grades_Explaining();
}

function Grades_Explaining(){
	Start_Dinner_3();
}
