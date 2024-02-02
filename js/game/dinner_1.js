function Start_Dinner_1(){

	/////// SET UP SCENE ////////

	Show("background","dinner");
	Show("clock","clock_ticking",{x:155,y:294});
	Show("clock_time","clock_1855",{x:155+5,y:294+37});
	Show("nicky","dinner_nicky_sit",{x:0,y:300});
	Show("dad",null,{x:0,y:300});
	Show("mom",null,{x:0,y:300});
	Show("table","dinner_table",{x:0,y:420});

	PlaySound("clock","dinner_ticking",{loop:-1});

	////////////////////////////

	Wait(2500);
	n("다들 어디지?");
	n(". . .");

	Choose({
		"엄마아아?": Waiting_1,
		"아빠아?": Waiting_1,
		"저기, 아무도 없어요?": Waiting_1
	});

}

function Waiting_1(message){
	
	$.what_you_called_out = message;
	n(message);

	n(". . .");

	Choose({
		"[밥 먹기 시작]": function(message){
			$.waiting_action = "eat";
			Waiting_2(message);
		},
		"[좀 더 기다리기]": function(message){
			$.waiting_action = "wait";
			Waiting_2(message);
		},
		"[음식 갖고 장난치기]": function(message){
			$.waiting_action = "play";
			Waiting_2(message);
		}
	});

}

function Waiting_2(message){
	
	n(message);
	n(". . .");

	PlaySound("clock","dinner_meowing",{loop:-1});

	Show("clock","clock_meowing");
	Show("clock_time","clock_1900");
	Wait(1000);

	Show("nicky","dinner_nicky_defiant");

	Choose({
		"그만 좀 울어, 이 불협화음 내는 고양이 시계!": function(message){
			n(message);

			Show("mom","mom_stand");
			Show("clock","clock_ticking");
			PlaySound("clock","dinner_ticking",{loop:-1});

			if($.im_a_poet){
				m("친구한테 시짓기라도 배웠니?");
			}else{
				m("시적이구나.");
			}

			Show("nicky","dinner_nicky_sit");
			n("아, 엄마 오셨어요.");
			
			Waiting_End();
		},
		"으윽. 저건 왜 들여놓은거야?": function(message){
			n(message);

			Show("mom","mom_stand");
			Show("clock","clock_ticking");
			PlaySound("clock","dinner_ticking",{loop:-1});

			m("네 할아버지가 우리에게 주셨단다.");

			Show("nicky","dinner_nicky_sit");
			n("아! 엄마 오셨어요.");
			
			Waiting_End();
		},
		"냐옹! 냐옹! 냐옹! 냐옹!": function(message){
			
			n("냐옹.");
			n("냐옹!");

			Show("nicky","dinner_nicky_outrage");
			n("<b>냐옹!!!</b>");

			Show("mom","mom_stand");

			m("닉, 뭐하는거니?...");

			Show("clock","clock_ticking");
			PlaySound("clock","dinner_ticking",{loop:-1});
			Show("nicky","dinner_nicky_sit");

			n("냐아아오오오오아 거기 계셨네요. 흠흠. 엄마 오셨어요.");

			Waiting_End();
		}
	});

}

function Waiting_End(){
	Start_Dinner_2();
}
