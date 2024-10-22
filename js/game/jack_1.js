// PLOT BEATS:
// 1) In medias res talking about Inception
// 2) Thanks for movie, we still up to stay over tomorrow night?
// 3) You need to stop hiding... // Can't even CALL.
// Weave in previous bits of convo pieces.
// Also, FULL CIRCLE with the Inception!
// OKAY, TOO CONVOLUTED, CUT OUT THE DIFFERENT FAMILIES & TYPO parts.

function Start_Jack_1(){
	
	/////// SET UP SCENE ////////

	Show("background","bedroom");
	Show("us","bedroom_us_1");
	Show("light","bedroom_light_1",{x:0,y:159});

	PlaySound("bg","bedroom_1",{loop:-1});

	/////////////////////////////

	j("그리고 나서 걔가 그냥,");
	j("'내가 이 항공사를 사들였거든.'");
	j("이라고 말하는 장면, 완전 쩔었어!");
	n("걔가 한 말이 그거였어?");
	n("영화관에서 다 웃고 있었는데 나만 못 들었어.");
	j("너는 자막을 붙여주던지 귀를 파던지 해야할 것 같다.");
	j("그래서 엔딩 어떻게 해석했어, 넌?");

	Choose({
		"그거 완전 다 꿈이었잖아.": Inception_Dream,
		"다시 현실로 돌아온 게 틀림없어!": Inception_Awake,
		"상관없어. 콥[스?]가 드디어 모든 걸 내려놓았잖아. Cobbs just finally let go.": Inception_Neither // 콥스가 결국(드디어) 모든걸 놓았잖아. // 콥스가 아니라 콥인데 이건 의도적인건가? 
	});

}

function Inception_Dream(message){

	$.inception_answer = "dream";

	n(message);
	j("그러니까 So his entire redemption story was a lie?"); // redemption 번역 못 찾겠음 // "그래서, 그의 구원 스토리는 전부 거짓이었다?"
	n("완전 거짓말. A big fat lie."); // 큰 거짓말, 거대한 거짓말
	j("넌 좀 우울한 애구나? You're a bit of a downer, aren't you?");

	Choose({
		"그래, 나는 슬픔밖에 없는 슬픔 덩어리다.": Sadsack,
		"가끔은... 너랑 있을 땐 아니지만. Sometimes... but not when I'm with you.": function(message){
			$.im_a_poet = true;

			n(message);
			j("아 니키, 이 아마추어 시인. Ah Nicky, you amateur poet."); // 이 아마추어 시인같으니라구.
			n("나 프랑스 빵이랑 와인 좀 갖다줘. Get me some french breads and wine,");
			n("내가 말해본 것 중에 제일 오글거리는 말이었던 것 같으니까. Coz that's got to be the cheesiest thing I've ever said."); // 그건 틀림없이 내가 ~ 말이었던 것 같으니까.
			j("Apologize for nothing.");
			n("Anywho...");
			Thanks();
		},
		"난 현실주의자일 뿐이야.": function(message){
			$.hippies = true;

			n(message);
			j("넌 긍정적인 사고가 좀 필요해.");
			n("And YOU need to stop being such a new-age hippie.");
			n("어쨌든...");
			Thanks();
		}
	});

}
function Inception_Awake(message){

	$.inception_answer = "awake";
	$.im_a_poet = true;

	n(message);
	n("그게 아니면 영화는 전부 거짓[말]일 수밖에 없잖아."); // 아래의 "거짓말"이랑 맞추려고. 둘 다 "lie"임
	n("뭐 하러 거짓말 속에서 살아가는데?");
	j("아 니키, 이 아마추어 시인. Ah Nicky, you amateur poet."); // 이 아마추언 시인같은... 시인...엄...
	j("그래서 영화는 좋았나 보지? I take it you liked the film?");

	Choose({
		"응, 완전 좋았어. Aw yiss. Yes I did.": function(message){
			n(message);
			Thanks();
		},
		"으으음. 가끔은 좀 헷갈리던데. Mehhh, it was a tad confusing at times.": function(message){
			n(message);
			j("I believe that was the purpose.");
			n("Mission accomplished, then.");
			n("어쩄든...");
			Thanks();
		},
		"**브와아아아아아앙**BWOOOOOOOOOOONG": function(message){ // how is this supposed to be pronounced? ask LOL
			n(message);
			j("I'll interpret that as a yes.");
			Thanks();
		}
	});

}
function Inception_Neither(message){

	$.inception_answer = "neither";

	n(message);
	j("그래?");
	n("팽이가 넘어지는지 확인조차 하지 않았잖아!");
	n("거짓말이든, 진실이든, 그 중간이든... 콥스는 더 이상 상관하지 않는거지."); //cobbs no longer cares.
	n("결국은 행복해졌으니까. 그거면 된거야.");
	j("너 지금 되게 시적으로 말하는거나 우울하게 말하는거나, 둘 중 하나다."); // You either are being quite poetic, or quite depressing

	Choose({
		"나도 모르는 사이에 시인이 되어있었네.": function(message){

			$.im_a_poet = true;

			n("I'm a poet,");
			n("and I wasn't even aware of the fact.");
			j("You're a lyrical miracle, the evidence is empircal.");
			n("That's hysterical.");
			n("Anywho...");
			Thanks();

		},
		"그래, 나는 슬픔밖에 없는 슬픔 덩어리다.": Sadsack,
		"둘 다일수도 있지.":function(message){

			$.hippies = true;
			$.im_a_poet = true;

			n(message);
			n("시는 고통이요 예술은 시달림이다.");
			j("우리 엄마가 할 말같네.");
			n("너네 부모님은 <b>조온나</b> 뉴에이지 히피들이잖아."); // your parents are <i>such</i> new-age hippies; <i>조온나게</i>
			n("어쨌든...");
			Thanks();

		}
	});

}

function Sadsack(message){
	
	$.sadsack = true;

	n(message);
	j("Aw, sorry to hear that.");
	j("I hope our little date at the movies cheered you up?");
	n("Sure did!");
	Thanks();

}

function Thanks(){
	
	n("<인셉션> 보여줘서 고마워!"); // so yeah! 는 겹쳐서 제거
	j("별말씀을.");
	j("그 네가 만드는 웹게임에서 <인셉션> 패러디해보는건 어때?");
	n("으음, 그래볼까.");
	n("내일 저녁에 다시 만나자!");

	j("근데 솔직히...");
	n("부모님이 하룻밤 외출하는걸 허락해주신다면 좋겠는데."); // Hope I can convince the parents to let me out overnight

	j("너네 부모님한테 공부하고 있었다고 뻥쳐놓고 영화관 가는 거, 안 그랬으면 좋겠는데.");
	n("그냥 밤새 중간고사 벼락치기 하는 척 하면-- ?");

	j("계속 이렇게 숨길 순 없잖아.");
	n("잭...");

	Choose({
		"절대, 절대 못 말해.": function(message){ // they can never, ever know.
			$.coming_out_readiness="no";
			n(message);
			j("진짜, 절대로? Really, never?");
			Hiding();
		},
		"나도 말할 수 있었으면 좋겠어.": function(message){
			$.coming_out_readiness="yes";
			n(message);
			Hiding();
		},
		"나 아직 말할 준비가 안 됐어.": function(message){
			$.coming_out_readiness="maybe";
			n(message);
			j("내가 준비하는거 도와줄 수 있어.");
			Hiding();
		}
	});

}

function Hiding(){

	j("니키, 이렇게 숨기는게 널 괴롭히고 있잖아.");

	if($.inception_answer=="awake"){
		j("네가 말했던 것처럼, 뭐하러 거짓말 속에서 살아가는데? Like you said, what's the point of living a lie?"); //LINE 78
	}
	if($.inception_answer=="dream"){
		j("네가 뭐랬지... 'a big fat lie?' (not t/l'd yet) It's... how'd you put it... 'a big fat lie'?"); //LINE 43
	}

	if($.sadsack){
		j("아까 네가 슬픔 덩어리라고 한 거 있잖아.");
		j("농담이 아니었던거 알아, 사실은."); //I know you weren't joking. Not really.
	}

	n("잭, 제발 좀.");
	j("난 작년에 부모님께 커밍아웃 했어.");
	if($.hippies){
		n("그런 식으로 비교하는거 완전 불공평하거든.");
		n("내가 말한 것처럼, 너랑 너네 부모님은 완전 뉴에이지 히피들이잖아.");
		n("너네 집에 가면 연기가 향에서 나는건지 마리화나에서 나는건지 모르겠어.");
		j("야! 우리 대마초 이틀에 한 번밖에 안 피거든?");
		n("ㅋㅋㅋ"); // Heh.
		j("요점은, 우리 부모님은 내가 커밍아웃했을 때도 내 편이었단 말이야.");
	}else{
		j("그리고 부모님은 내 편이었어!");
	}

	j("여긴 캐나다야. 다들 LGBT에 대해 우호적이라고."); // lots of ppl are lgbt friendly
	j("너네 부모님도 네 편일지 어떻게 알아?");

	Choose({
		"동양인 부모님들은 보통 엄청 호모포비아거든.": Hiding_2, // homophobic = 호모포빅 or 호모포비아?
		"모르겠어... 안 해봐서 모르는 걸지도 모르지.": Hiding_2,
		"우리 부모님은 공부 말곤 관심도 없으시거든.": Hiding_2
	});

}

function Hiding_2(message){
	
	n(message);

	if($.coming_out_readiness=="no"){
		n("다시 말하지만... 절대, 절대 말할 수 없어.");
	}

	j("너 진짜 사람을 못 믿는구나."); // you have trust issues. 부모님을 못 믿는구나
	j("지금 전화 대신 문자 하는것도...");
	j("...부모님이 엿들을까봐 그러는 거잖아.");

	n("엿듣는다니까!");

	j("이런 소통의 방식은."); //this mode of communication.
	j("부정확하고, impersonal하고, 진정으로 공감이 불가능하다고."); // 정확하지 못하고, 개인적이지도 않고,

	if($.im_a_poet){
		n("하, 너도 아마추어 시인으로 전직하셨냐.");
	}else{
		n("그렇게 나쁘진 않아...");
	}

	if($.coming_out_readiness=="yes"){
		j("네가 방금 말할 수 있었다면 좋겠다고 했잖아.");
		j("말씀드려.");
	}else{
		j("니키.");
	}
	j("오늘 밤. 우리에 대해 전부 말씀드려.");

	Choose({
		"오늘 밤?! 안돼!": Hiding_3,
		"하아... 노력해볼게.": Hiding_3,
		"그냥 살짝 힌트만 줘볼게.": Hiding_3
	});

}

function Hiding_3(message){
	
	n(message);
	j(". . .");
	n("너무 놀래키면 안되니까."); // 너무 놀라시게 하면 안 되니까.
	n("내일 밤 너네 집에서 자는것도 아직 허락 못 받았고.");
	n("너랑 또 공부하러 간다고 말해놓을게."); // 말씀드려놓을게
	j(". . .");
	n("저녁시간이다. 나 내려가볼게.");

	j("있잖아... 나도 동의해.");
	n("응?");
	j("영화 엔딩에 대한 네 해석.");
	switch($.inception_answer){
		case "dream": j("콥스가 아직도 꿈속에 있었다고 생각해, 거짓말 속에서 [살면서]. I think Cobbs was still dreaming, living a lie."); break;
		case "awake": j("콥스가 현실 세계에서 진짜 가족이랑 [unf] I think Cobbs reconnected with his real family, in the real world."); break;
		case "neither": j("결국 콥스가 행복한 이상 상관없는거야."); break;
	}
	n("아.");
	j("그래.");
	if($.coming_out_readiness=="maybe"){
		j("'아직 준비 안됐다'는 거, 마음 바뀌었길 바라.");
	}
	j("잘돼길 빌어. 한 시간 후에 문자 줘.");

	n("이따 봐.");
	if($.hippies && $.im_a_poet){
		n("이 뉴에이지 히피 아마추어 시인아.");
	}else if($.hippies && !$.im_a_poet){
		n("이 뉴에이지 히피야.");
	}else if(!$.hippies && $.im_a_poet){
		n("이 아마추어 시인아.");
	}else{
		n("You goof.");
	}

	Jack_1_End();

}

function Jack_1_End(){
	Clear();
	Start_Dinner_1();
}
