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
		"저 엄마아빠한테 할 얘기가 있어요.": function(message){
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
		"컴퓨터과학이요.": function(message){ // compsci
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
	m("그래서, 엄마는 내일 도서관에 있을건데."); //So, I'll be at the library tomorrow.
	m("아들도 거기서 공부할거야?"); // Will I see you studying there?
	n("아, 전 잭네 집 가서 공부하려고요."); // Actually, I'm gonna study at Jack's place.
	m("또?"); // Again?
	m("너 그 애랑 많이 놀더라."); //그 애랑 되게 잘 놀더라. You spend a lot of time with him.

	Choose({
		"그냥 공부만 같이 해요.": function(message){
			$.relationship = "study";
			Buddy_1(message);
		},
		"엄마, 잭은... 친구 이상이에요.": function(message){ // Mom, Jack is... more than a friend.
			
			$.relationship = "best friend";
			n(message);
			
			$.lying_about_hanging_out = true;
			m("아, 절친같은 거니?");
			n("엄. 그게--");
			m("공부는 안 하고 놀기만 한다는거구나."); // So you're just hanging out, not studying.
			n("우리 공부 해요!");
			m(". . .");
			m("그래. 거짓말만 하지 마렴."); // Alright, just don't lie to me.
			n("거짓말 안 해요.");
			Buddy_1_point_5();
		},
		"당연하죠. 원래 친한 친구끼리 그러는건데요.": function(message){ // Well yeah, that's what good pals do.
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
		m("공부는 안 하고 놀기만 한다는거구나."); // So you're just hanging out, not studying.
		n("우리 공부 해요!");
		m(". . .");
		m("알겠다. 엄마한테 거짓말만 하지 마."); //Alright, just don't lie to me
		n("거짓말 안 해요.");
	}else{
		m("알겠어. 엄만 확인하는 것뿐이야."); // Okay. I'm just making sure.
		n("뭘... 확인해요?"); // Of... what?
	}

	Buddy_1_point_5();
}

function Buddy_Caught_Lying_1(message,callback){
	n(message);
	m("잠깐...");
	m("네가 '공부만 같이 한다'고 했잖아."); // I thought you said you 'just study together'
	m("너희 둘이 친구라고 하진 않았는데."); // You didn't tell me you were friends.
	$.lying_about_relationship = true;
	Choose({
		"앗, 그냥 공부 메이트라는 뜻이었어요.": callback, // tl awk //  Oops, I meant he's just a studymate.
		"글쎼, 공부도 같이 하고 친구도 할 수 있죠... Well, he can also be my friend...": callback, // tl awk
		"아뇨, 계속 친구라고 말했는데요. No, I always said we were friends.": callback
	});
}

function Buddy_1_point_5(){

	m("Just... 그 애랑 너무 친하게 지내진 말아. don't hang around him too much.");
	m("사람들이 오해할 수 있잖니. People might get the wrong idea.");

	Choose({
		"아, 아녜요, 저흰 그냥 친구사이예요. Oh. No, yeah, we're just friends.": function(message){
			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,Buddy_2);
			}else{
				Buddy_2(message);
			}
		},
		"그 오해가 오해가 아닐 수도 있어요. The wrong idea might be the right idea.": Buddy_4,
		"오해란건... 무슨 의미예요? What do you mean by... wrong idea?": Buddy_3
	});

}

function Buddy_2(message){
	n(message);
	m("알았어."); // okay
	if($.lying_about_relationship){
		m("엄마한테 거짓말만 하지 마. Just don't lie to me.");
		n("안 할게요."); //I won't.
		m(". . .");
		m("그냥... 너무 친하게 지내진 말아라."); //But... about you hanging out with Jack 그런데... 네가 잭이랑 노는 것에 관해서 말이야 (myn)
	}
	m("그냥 사람들이 오해할 수도 있다는 거야. 왜냐면..."); //It's just that some people might assume things, since...
	m("그... 걔가 그것처럼 생겼잖아..."); // You know... he looks like...
	m("게이?"); // A gay?
	Buddy_Choice();
}

function Buddy_3(message){
	n(message);
	m("그냥 우리끼리 하는 말인데... 그애 좀..."); // tl awk //Just between mother and son, I think he might be... you know...
	n("아니요, 뭐가요?"); // No, what?
	m("게이 같잖니!"); // A gay!
	m("게이처럼 생겼고 게이처럼 말하잖아."); // He looks and talks like a gay.
	Buddy_Choice();
}

function Buddy_4(message){
	n(message);
	m("Oh, that's like a zen thing, right?"); 
	n("Um.");
	m("Zen is also about nature, and your classmate Jack, he...");
	m("...you know, doesn't seem natural?");
	Choose({
		"잭이 게이라고 생각하는거죠.": function(message){ //You think he's gay.
			n(message);
			m("그래!");
			m("너도 그렇다고 의심하잖아!"); //You suspect it, too!
			Buddy_Choice();
		},
		"제 친구에 대해서 그런 말 하지 마세요!": function(message){

			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,function(message){

					n(message);
					m("알겠어.");
					m("엄마한테 거짓말만 하지 마렴.");
					n("안 해요.");
					m(". . .");

					m("그렇지만. 너도 '자연의 섭리에 어긋나는' 것처럼 보이는게 안 좋다는 거에 동의하잖니."); //But yes, even you agree that it's bad to be seen as 'not natural'.
					n("전 그런 말 한 적--"); //I never said--
					m("그리고 난 네 걱정을 해주는 것뿐이야! 걔가 좀... "); //And I'm just looking out for you! Because he acts like, you know...
					m("게이처럼 행동하잖아!"); // a gay!
					Buddy_Choice();

				});
			}else{

				n(message);
				m("그냥 솔직히 말하는 것뿐이야"); //I'm just being honest.
				m("그렇지만. 너도 '자연의 섭리에 어긋나는' 것처럼 보이는게 안 좋다는 거에 동의하잖니."); //But yes, even you agree that it's bad to be seen as 'not natural'. TL AWK
				n("전 그런 말 한 적--"); //I never said--
				m("그리고 난 네 걱정을 해주는 것뿐이야! 걔가 좀... "); //And I'm just looking out for you! Because he acts like, you know...
				m("게이처럼 행동하잖아!"); // a gay!
				Buddy_Choice();

			}

		},
		"잭이 자연의 섭리에 어긋난다니, 무슨 뜻이에요?": Buddy_3 //What do you mean, he's not natural? TL AWK (그냥 정상/비정상으로 바꿀까?)
	});
}

function Buddy_Choice(){
	if($.relationship=="friend"){
		m("그리고 네가 '좋은 친구'라고 하니... And since you say he's a 'good pal'...");
		m("사람들이 너도 게이라고 생각할 수 있잖아. People might think you're a gay like him, too.");
	}
	if($.relationship=="best friend"){
		m("그리고 네가 **절친**이라고 하니... And since you say he's your BEST friend...");
		m("사람들이 너도 게이라고 생각할 수 있잖아.");
	}
	Choose({
		"하, 걔가 게이처럼 행동하긴 하죠. 다행히 게이는 아니에요.": function(message){ //Ha, he sure acts gay. Luckily, he's not
			n(message);
			m("봐봐! 너도 뭔가 좀 이상하다고 생각하잖아."); //See? You also think there's something not right about it.
			n("...그래요."); //...sure.
			Buddy_Aftermath();
		},
		"게이인게 뭐가 어떄서요?!": function(message){ //What's wrong with being gay?!":
			n(message);
			m("아니야! 아무것도 아니야."); //Nothing! Nothing.
			Buddy_Aftermath();
		},
		"글쎄... 제 친구가 게이일 수도 있어요.": function(message){ //Maybe... my friend might be gay.

			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,function(message){
					n(message);
					m("그래.");
					m("그냥 거짓말만 하지 마렴.");
					n("안 해요.");
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

	m("오해하지 마."); //Don't get me wrong.
	m("그런 류의 사람들이 나쁘다는 말이 아니야!"); //I'm not saying those kind of people are bad!
	m("엄마는 그냥... 네가 그런 사람 주변에서는 조심해야 한다고 생각할 뿐이야."); //I just think... you should be careful around one of them.
	m("Jack might, you know, try to recruit you."); //Jack might, you know, try to recruit you.

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
