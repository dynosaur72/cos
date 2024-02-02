function Start(){

	$ = {};
	
	/////// SET UP SCENE ////////

	Show("background","coffeehouse");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	//////////////////////////////

	N("<b>커밍아웃 시뮬레이터 2014</b>");
	N("반쪽짜리 진실에 대한 반쯤 진실인 게.");
	N("안녕, 거기 플레이어 씨. 이 게임에 온 걸 환영해.");
	N("이제 뭘 해볼래?");

	Choose({
		"플레이해보자!": Play,
		"넌 누군데? (크레딧)": function(){
			Credits("Who are you?");
		},
		"흠, 더 알려줘. (게임에 대한 정보)": function(){
			About("Hm, tell me more.");
		}
	});

}

function SipCoffee(message){
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	PlaySound("sfx","coffee_sip");
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");
}

function Play(message){
	
	SipCoffee(message);

	// Asked neither
	if(!$.asked_about && !$.asked_credits){
		N("바로 시작하는구나! 좋아!");
		N("No messing around with reading the About Me or the About This Game sections or--");
		p("쉿.");
		N("알겠어, 알겠어.");
	}
	// Asked both
	if($.asked_about && $.asked_credits){
		p(". . .");
		p("Why did you make that a clickable option, when it was the only option left.");
		N("NO IDEA");
	// Asked either
	}else if($.asked_about || $.asked_credits){
		N("그래, 그러자!");
	}

	N("4년 전, 2010년으로 돌아가보자...");
	p("그게 4년 전이었다고?!");
	N("...내 인생을 영원히 바꿔버린 그 저녁으로 말이야.");

	N("친애하는 플레이어 씨. 이 게임이 어떻게 끝날거라 생각해?");

	Choose({
		"꽃이랑 무지개랑 게이 유니콘으로?": function(message){
			$.main_menu_convo_1 = 1;

			p(message);
			N("맞아. 이 게임은 정확히 그렇게 끝나.");
			p("진짜?");
			N("아니.");
			Play_2();
		},
		"보니까 스타벅스에서 레딧질이나 하는걸로.": function(message){
			$.main_menu_convo_1 = 2;

			p(message);
			N("야, 나 코딩중이거든. 내 성장 스토리를 지금 네가 하고 있는 게임으로 만드는 중이라고.");
			p("에이, 너 그냥 뺀질거리는 거잖아."); //너 그냥 할일을 미루고 있는 거겠지.
			N("네가 할 말은 아닐텐데.");
			p("...인정.");
			N("아무튼...");
			Play_2();
		},
		"<b>전부 피로 끝나지</b>": function(message){ // awk tl (IT ALL ENDS IN BLOOD)
			$.main_menu_convo_1 = 3;

			p(message);
			N("엄, 그거에 비해서는 내 이야기가 그렇게 비극적이진 않지.");
			N("Although that's kind of a glass one-hundredths-full interpretation.");
			p("피이이.");
			N("아무튼...");
			Play_2();
		}
	});

}

function Play_2(){

	if(!$.asked_about){
		N("네가 <게임에 대한 정보> 섹션을 씹지 않았더라면, 이 게임이 굉장히 개인적인 이야기라는 걸 알겠지.");
		p("쉿.");
	}

	N("이 게임은 나, 내 부모님, 내 전 남친이 전부 실제로 했던 대화를 담고 있어.");
	N("그리고 우리가 했었을 수도 있고, 했어야 했고, 절대 하지 않았을 말들도 담고 있지.");
	N("어떤게 어느 쪽인지는 중요하지 않아.");
	N("더이상은.");

	Choose({
		"정답이 없는 게임을 어떻게 이기라는 거야?": function(message){
			$.main_menu_convo_2 = 2;

			p(message);
			N("그 말이야."); // awk tl "Exactly."
			p(". . .");
			Play_3();
		},
		"너 좀 우울한 놈이구나?": function(message){
			$.main_menu_convo_2 = 1;

			p(message);
			N("<b>인생은</b> 우울한거야.");
			p("그래서 그건 맞다는 거지."); // So that's a yes.
			Play_3();
		},
		"이 '진실인' 게임이 거짓으로 가득 차 있다고?": function(message){
			$.main_menu_convo_2 = 3;

			p(message);
			N("대화를 100% 정확히 복기했다고 해도, 100% 거짓말로 돼있었을거야.");
			p(". . .");
			Play_3();
		}
	});

}

function Play_3(){

	N("넌 2010년의 나로 플레이하게 될거.");
	if(!$.asked_credits){
		N("네가 크레딧을 씹어서 해주는 말인데, 내 (아직 서류상으로는 못 올린) 이름은 니키 케이스야.");
		p("쉬잇.");
	}

	var whatISay;
	switch($.main_menu_convo_1){
		case 1: whatISay = "이 게임은 게이 유니콘으로 끝나지 않아. "; break;
		case 2: whatISay = "이 게임은 커밍아웃을 하고, 어른이 되고, 현실과 타협하는 게임이야. "; break;
		case 3: whatISay = "이 게임은 피가 아닌 눈물로 끝나. "; break;
	}
	switch($.main_menu_convo_2){
		case 1: whatISay += "우울하게 굴어서 미안."; break;
		case 2: whatISay += "그리고 옳은 대답은 없어."; break; // And there are no right answers.
		case 3: whatISay += "그리고 거짓말로 가득 차 있지."; break;
	}
	N(whatISay);

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("야, 그거 내가 방금 한 말이잖아!");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	Wait(500);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");
	
	Wait(1000);
	Show("nicky","coffee_nicky_still_2");
	Wait(500);
	
	N("플레이할 때...");
	N("할 말을 조심해서 고르도록 해.");
	N("모든 캐릭터들은 네가 한 말들을 전부 기억할 거야. 네가 하지 않은 말들도.");
	p("그래, 메인 메뉴에서까지 내 선택을 들먹였잖아.");
	N("내 말이."); //그래. 요점이 그거야. Exactly.

	N(". . .");
	N("어떤 것들은 기억하지 않기 정말 어렵거든.");
	
	Clear();
	Start_Jack_1();

}

function Credits(message){

	$.asked_credits = true;
	
	if($.asked_about){
		SipCoffee(message);
	}else{
		SipCoffee("넌 누구니니?");
	}
	
	N("Ah, how rude of me! Let me introduce myself.");
	N("Hi, I'm Nicky Case.");
	N("That's not my legal name, it's just my REAL name.");

	p("That's totes weird, dude.");
	if($.asked_about){
		p("And like you just told me, this is your personal story?");
	}else{
		p("And you made this game?");
	}

	N("Yep, I am the sole writer / programmer / artist of Coming Out Simulator.");

	if($.asked_about){
		p("All of this yourself?");
		p("I said it before and I'll say it again...");
		p("Of course. You narcissist.");
		N("Well it's not ALL me.");
		N("The sounds & audio are from various public domain sources.");
	}else{
		N("The sounds & audio, though, are from various public domain sources.");
	}

	N("But although it's mostly just me behind this game...");
	N("...there's a lot of people behind this game's story.");

	if($.asked_about){
		Choose({
			"Speaking of which, let's play that! Now!": Play
		});
	}else{
		Choose({
			"Speaking of that, can we play it now?": Play,
			"Why'd you make this? (About This Game)": function(){
				About("Why'd you make this?");
			}
		});
	}

}

function About(message){

	$.asked_about = true;

	SipCoffee(message);

	if($.asked_credits){
		N("내 이야기를 하고 싶었어.");
	}else{
		N("이 게임...");
		N("...사실 대화 시물레이터에 가깝긴 하지...");
		N("...이건 굉장히 개인적인 이야기.");
	}
	
	p("그러시겠지. 이 나르시시스트.");
	N("하, 물론이.");

	if($.asked_credits){
		p("아니, 나르시시스트는 자기 진짜 이름을 쓰겠지.");
		N("내 진짜 이름 맞다고 말했--");
		p("알겠어, 알겠어. Weirdo.");
	}

	N("이 게임은 #Nar8 Game Jam에 내려고 만들었어. 만들 핑계가 생겼지. 마감기한도!");
	p("완전 마지막 날까지 미루다 제출했구나.");
	N("응.");
	N("그리고! 이 게임에는 저작권이 없어. 퍼블릭 도메인이지.");
	N("난 내 소스코드에 대해선 내 섹슈얼리티만큼 공개적이라.");

	p("으, 설마 그거 드립?");
	N("Howzabout a 'Fork Me' programming pun?");
	p("안돼애애애.");

	if($.asked_credits){
		Choose({
			"Let's just play this game already.": Play
		});
	}else{
		Choose({
			"몹쓸 드립같은건 제쳐두고, 플레이하면 안될?": Play,
			"그래서 대체 넌 누군데? (크레딧)": function(){
				Credits("그래서 대체 넌 누군데?");
			}
		});
	}

}
