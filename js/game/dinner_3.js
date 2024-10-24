// Plot points:
// Trying to stay overnight.
// Reveal - hippie parents, reading poetry, ...(?)
// Threats -- date your tutor, changing school(?)
// He's distracting you. Movie & Hippies.
// Oh my god, you've been reading my texts!...

function Start_Dinner_3(){

	n("엄마.");

	Choose({
		"그래서 잭이랑 더 공부하는 거예요.": Tutor, // That's why I'm studying more with Jack.
		"저 노력하고 있어요. 진짜로요.": Tutor, //  Look, I'm trying. I really am.
		"제 성적은 멀쩡하다고요.": Tutor // tl awk // My grades are fine.
	});

}

function Tutor(message){

	n(message);
	m("난 네가 걱정돼서 그래. 잭은 좋은 영향이 아니야. I'm worried for you. Jack's not a good influence.");

	if($.hippies){
		m("잭의 부모님이 마약 중독자일 수도 있어... I think his parents might even be drug addicts...");
		n("왜 그런 말--"); // What makes you say th--
	}else if($.im_a_poet){
		m("걔는 시짓기밖에 안 하잖아. All he does is do poetry.");
		n("왜 그런 말을--");
	}
	
	m("과외 선생님을 붙여줄거야. I'm getting you a home tutor."); // tl awk // [너] 과외 선생님을 구했어.
	n("...네?");

	if($.studying_subject!=$.studying_subject_2){
		m($.studying_subject+"이랑 "+$.studying_subject_2+"을 가르쳐줄거야.");
	}else{
		m($.studying_subject+"을 가르쳐줄거야.");
	}

	m("이름은 클레어야. 똑똑하고, 예쁘고, 백인이고. 너랑 나이도 비슷해. Her name is Claire. She's smart, pretty, and Caucasian. She's your age, too.");

	Choose({
		"잭이랑 그만 만나게 하려고 이러는 거예요? Are you trying to stop me from seeing Jack?": Tutor_Seeing, // 보다 < 만나다
		"걔랑 절 엮으려고 하시는 거예요? Are you trying to matchmake me with her?": Tutor_Matchmake,
		"이 얘기는 나중에 하면 안 돼요? Can we talk about tutors another time?": Tutor_Forget
	});

}

function Tutor_Seeing(message){
	n(message);
	m("잠깐, 잭이랑 <b>만난다고</b>? I'm sorry, <i>seeing</i> Jack?");
	m("말 조심하렴. 그렇게 말하니까... Be careful how you say that. You make it sound like...");
	
	Choose({
		"우리가 사귀는 거 같다고요? 네. 우리/저희 사귀어요. Like we're dating? Yeah. We are.": function(message){
			n(message);
			m(". . .");
			n(". . .");
			n("...저기요?");
			m(". . .");
			n("아무도 안 계세요? Anyone there?"); // tl awk
			m(". . .");
			Threat_School();
		},
		"그냥 I just meant meeting Jack.": function(message){ // 그냥 논다는 뜻이었어요.
			n(message);
			m("알겠어. Okay. Just being clear about some things."); // 그냥 몇 가지를 명확하게 하는거야. 
			n("네.");
			m(". . .");
			m("클레어 엄청 귀엽던데. Claire's really cute.");
			n("그래요. Sure.");
			m("She has perky breasts."); // 탄력있는 가슴...
			Threat_Tutor();
		},
		"우리/저희. 남친. 사이. 아니에요. We're. Not. Boyfriends.": function(message){
			n(message);
			m(". . .");
			m("그래. Okay.");
			m("그런 사이라고 한 적 없는데... 그래. I never said you were, but... okay.");
			n("우린/저흰 친구예요. We're friends.");

			if($.relationship=="friend"){
				m("'좋은 친구'...");
			}
			if($.relationship=="best friend"){
				m("절친..."); // 단짝 친구 라는 말을 쓰는 사람은 없겠지?
			}

			Threat_Tutor();

		}
	});
}

function Tutor_Matchmake(message){
	n(message);
	m("Well, if that's what you want, I could!");
	n("nooooo.");
	m("Don't be shy! You're growing up to be a man.");
	m("And you're going to give me lots of grandkids.");

	Choose({
		"Stop it! I haven't even met Claire yet!": function(message){
			n(message);
			m("Yet!");
			m("She's coming over tomorrow!");
			n("What? But I promised Jack--");
			m("I ironed your best clothes. You'll make a good first impression.");
			Threat_Tutor();
		},
		"The odds of that are 50-50, coz I'm bi.": function(message){

			$.admit_bisexuality = true;

			n(message);
			m("Um. Bi?...");

			Show("nicky","dinner_nicky_defiant");

			n("Yes. As in BISEXUAL.");
			n("As in I AM SEXUALLY ATTRACTED TO BOTH MEN AND WOMEN.");
			m(". . .");
			n(". . .");
			Threat_School();
		},
		"No. I don't ever want to have kids.": function(message){
			n(message);
			m("You'll change your mind when you grow up.");
			m("Raising a child is wonderful. Your children will look up to you!");
			n("...of course, you narcissist.");
			m("Excuse me?");
			n("Nothing.");
			m(". . .");
			Threat_Tutor();
		}
	});
}

function Tutor_Forget(message){
	n(message);
	m("No, because I've already scheduled Claire to come over tomorrow.");
	n("What?!");
	n("No. I promised to study with Jack tomorrow.");
	m(". . .");
	m("How long did you want to stay over at his place?");

	Choose({
		"Overnight.": function(message){
			n(message);
			m(". . .");
			n(". . .");
			n("...Hello?");
			n("It's not weird. Friends have sleepovers all the time.");
			m(". . .");
			Threat_School();
		},
		"Just the afternoon.": function(message){
			n(message);
			if($.lying_about_hanging_out){
				m("I knew it. I caught your lie earlier.");
				n("Huh?");
			}else{
				m("...I knew it.");
			}
			m("You're just hanging out with him.");
			Threat_Tutor();
		},
		"Maybe an hour or so.": function(message){
			n(message);
			m("That's not enough to really get studying done.");
			if($.lying_about_hanging_out){
				m("I knew it. I caught your lie earlier.");
				n("Huh?");
			}
			m("You're just hanging out with him.");
			Threat_Tutor();
		}
	});
}

function Threat_Tutor(){
	
	Show("nicky","dinner_nicky_defiant");
	
	n(". . .");
	m("Claire will be tutoring you every day after school, starting tomorrow.");

	Choose({
		"Every day?! What about my friends?!":function(message){
			n(message);
			m("Sweetie, I'm your friend!");
			n(". . .");
			m("Also Claire can be your friend. Maybe more than friends.");
			n(". . .");
			n("Are we done?");
			m("Just... one more thing.");
			Plot_Twist();
		},
		"Okay, but my weekends are free, right?": function(message){
			n(message);
			m("Yes.");
			n("Okay. Good that this is all settled now.");
			m("...Yes.");
			n(". . .");
			m("Just... one more thing.");
			Plot_Twist();
		},
		"What if just DON'T study with Claire?": function(message){
			n(message);
			m("Well, if you also want to hang out with her, that's good too.");
			m("Anything to make you more manly.");
			n("ugh.");
			m("Oh.");
			m("One more thing.");
			Plot_Twist();
		}
	});

}

function Threat_School(){

	$.changing_schools = true;
	
	m("You're changing schools."); // 전학가자

	Show("nicky","dinner_nicky_outrage");

	n("<b>뭐라고요?!</b>");
	m("잭뿐만이 아니야. 학교 전체 분위기가 악영향을 주는 것 같아. I think it's not just Jack, it's the entire school that's a bad influence on you.");
	n("<b>지금 장난하시는 거죠.</b> ARE YOU SERIOUS."); //지금 장난하시는 거죠.
	m("이 캐나다 문화가 너를 너 자신에 대해서 헷갈리게 만들고 있잖니. tl awk. The whole Canadian culture is making you confused about who you are.");

	Show("nicky","dinner_nicky_defiant");

	Choose({
		"아니요, 엄마의 아시아 문화가 보수적인 거예요. No, it's YOUR Asian culture that's backwards!": function(message){
			n(message);
			m("그렇게 무례하게 굴면 어떡하니! Don't be so rude!");
			m("<b>네</b> 문화이기도 하잖아! It's YOUR culture, too!");
			n(". . .");
			Plot_Twist();
		},
		"You can't do this to your CHILD!": function(message){
			n(message);
			m("Don't be so rude!");
			m("난 네 어머니인데, 너한테 내 맘대로 하는 건 내... 권리...? I'm your MOTHER, it's my right to do whatever I want with you!");
			n(". . .");
			Plot_Twist();
		},
		"상관없어요. *어느 학교든* 퀴어는 있어요. Whatever, ALL schools have queer people.": function(message){
			n(message);
			m("Don't be so rude!");
			m("And watch it, I could change my mind and start homeschooling you.");
			n(". . .");
			Plot_Twist();
		}
	});

}

function Plot_Twist(){

	m("Yesterday, when you were supposedly studying with Jack?");
	m("I know you secretly went off to watch a movie.");

	Show("nicky","dinner_nicky_sit");
	n(". . .");

	Show("clock_time","clock_1920");

	Choose({
		"Oh my god. You read my texts.": function(message){
			n(message);
			m("Yes. See how smart you can be when you're not with Jack?");
			Plot_Twist_2();
		},
		"No, we didn't. We studied.": function(message){
			n(message);
			m("You are a very stubborn boy.");
			m("I read your text messages.");
			Plot_Twist_2();
		},
		"What makes you think that?": function(message){
			n(message);
			m("Because I read your text messages.");
			Plot_Twist_2();
		}
	});

}

function Plot_Twist_2(){

	n(". . .");
	m("Before dinner. I was in your room.");

	// Dinner_1
	m("You yelled out '"+$.what_you_called_out+"' from downstairs, while I unlocked your phone...");
	m("And read what you and Jack have been sending to each other.");
	m("I'm your mother. I have the right.");

	n(". . .");

	if($.im_a_poet){
		m("Weird poetry?");
	}
	if($.hippies){
		m("Talking about smoking marijuana?");
	}
	if($.im_a_poet || $.hippies){
		m("Helping you lie to your own mother?");
		m("What else have you been doing behind my back?");
	}

	Choose({
		"This has to be a bad dream.": function(message){
			n(message);
			m("Like that 'Deception' movie?");
			n("It's... it's 'Inception'.");
			m("Don't talk back to me.");
			Plot_Twist_3();
		},
		"I'm sorry. I'm so sorry.": function(message){
			n(message);
			m("I forgive you.");
			m("You're my child, of course I forgive you.");
			Plot_Twist_3();
		},
		"I hate you.": function(message){
			n(message);
			m("That's okay.");
			m("I still love you, Nick.");
			Plot_Twist_3();
		},
	});

}

function Plot_Twist_3(){
	Start_Dinner_4();
}
