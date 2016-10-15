var W = 1024;
var H = 600;
var R = 8;
var MARGIN_LEFT = 20;
var MARGIN_TOP = 20;
// var ball = {x:512, y:100, r:20, vx:-4, vy:-10, g:2, color:'#005588'};
var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
var afterTime = -1;
window.onload = function() {

	// W = document.body.clientWidth
	// H = document.body.clientHeight

	// MARGIN_LEFT = Math.round(W /10);
	// R = Math.round(W * 4 / 5 / 108)-1

	// MARGIN_TOP = Math.round(H /5);

	var canvas = document.getElementById('mycanvas');
	var can = canvas.getContext('2d');
	canvas.width = W;
	canvas.height = H;

	setInterval(function(){
		render(can);
		update();
	},50)
}

function getTimeSeconds() {
    var curTime = new Date();
    var ret = new Date(curTime.getFullYear(),curTime.getMonth(),curTime.getDate(),0,0,0).getTime();
    ret = curTime.getTime() - ret;
    ret = Math.round( ret/1000 )
    return ret ;
}

function render(cxt) {
	var nowTime = getTimeSeconds();
	var hours = parseInt( nowTime / 3600);
	var minutes = parseInt((nowTime /60)%60);
	var seconds = nowTime % 60;
	cxt.clearRect(0,0,W, H);

	// 一个数字15个小球 分号9个小球
	renball(MARGIN_LEFT, MARGIN_TOP, parseInt(hours /10), cxt);
	renball(MARGIN_LEFT + 15*(R+1), MARGIN_TOP, parseInt(hours %10), cxt);
	renball(MARGIN_LEFT + 30*(R+1), MARGIN_TOP, 10, cxt);
	renball(MARGIN_LEFT + 39*(R+1), MARGIN_TOP, parseInt(minutes/10), cxt);
	renball(MARGIN_LEFT + 54*(R+1), MARGIN_TOP, parseInt(minutes%10), cxt);
	renball(MARGIN_LEFT + 69*(R+1), MARGIN_TOP, 10, cxt);
	renball(MARGIN_LEFT + 78*(R+1), MARGIN_TOP, parseInt(seconds/10), cxt);
	renball(MARGIN_LEFT + 93*(R+1), MARGIN_TOP, parseInt(seconds%10), cxt);
	for( var i = 0 ; i < balls.length ; i ++ ){
	    cxt.fillStyle=balls[i].color;

	    cxt.beginPath();
	    cxt.arc( balls[i].x , balls[i].y , R , 0 , 2*Math.PI , true );
	    cxt.closePath();

	    cxt.fill();
	}
}

function update() {
	var nowTime = getTimeSeconds();
	var nowhours = parseInt( nowTime / 3600);
	var nowminutes = parseInt((nowTime /60)%60);
	var nowseconds = nowTime % 60;

	var afterhours = parseInt( afterTime / 3600);
	var afterminutes = parseInt((afterTime /60)%60);
	var afterseconds = afterTime % 60;

	// ball.x +=ball.vx;
	// ball.y +=ball.vy;
	// ball.vy +=ball.g
	// if (ball.y >= H - ball.r) {
	// 	ball.y = H - ball.r;
	// 	ball.vy = -ball.vy*0.2
	// }
	// if (ball.x < ball.r) {
	// 	ball.x = ball.r;
	// 	ball.vx = -ball.vx*1.2
	// }
	// if (ball.x > W - ball.r) {
	// 	ball.x = W - ball.r;
	// 	ball.vx = -ball.vx*1.2
	// }
	if (afterTime != nowTime) {
		if( parseInt(nowhours/10) != parseInt(afterhours/10) ){
		    addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(nowhours/10) );
		}
		if( parseInt(nowhours%10) != parseInt(afterhours%10) ){
		    addBalls( MARGIN_LEFT + 15*(R+1) , MARGIN_TOP , parseInt(nowhours%10) );
		}
		if( parseInt(nowminutes/10) != parseInt(afterminutes/10) ){
		    addBalls( MARGIN_LEFT + 39*(R+1) , MARGIN_TOP , parseInt(nowminutes/10) );
		}
		if( parseInt(nowminutes%10) != parseInt(afterminutes%10) ){
		    addBalls( MARGIN_LEFT + 54*(R+1) , MARGIN_TOP , parseInt(nowminutes%10) );
		}
		if( parseInt(nowseconds/10) != parseInt(afterseconds/10) ){
		    addBalls( MARGIN_LEFT + 78*(R+1) , MARGIN_TOP , parseInt(nowseconds/10) );
		}
		if( parseInt(nowseconds%10) != parseInt(afterseconds%10) ){
		    addBalls( MARGIN_LEFT + 93*(R+1) , MARGIN_TOP , parseInt(nowseconds%10) );
		}
	}
	afterTime = nowTime;
	updateBalls();
}

function updateBalls() {
	for(var i=0;i<balls.length;i++ ) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if (balls[i].y >= H - R) {
			balls[i].y = H - R;
			balls[i].vy = -balls[i].vy*0.7;
		}
	}
	var cnt = 0;
	for( var i = 0 ; i < balls.length ; i ++ ) {
		if( balls[i].x + R > 0 && balls[i].x -R < W )
		    balls[cnt++] = balls[i]
	}
	while( balls.length > cnt ){
	    balls.pop();
	}
}

function addBalls(x, y ,num) {
	for(var i = 0; i<digit[num].length ; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] === 1) {
				var aBall = {
					x:x+j*2*(R+1)+(R+1),
					y:y+i*2*(R+1)+(R+1),
					g:1.5+Math.random(),
					vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
					vy:-5,
					color: colors[ Math.floor( Math.random()*colors.length ) ]
				}
				balls.push(aBall);
			}
		}
	} 
}

function renball(p_w, p_h, num, cxt) {
	cxt.fillStyle = 'rgb(0,102,153)'
	for(var i=0;i<digit[num].length;i++) {
		for(var j=0; j<digit[num][i].length;j++) {
			if(digit[num][i][j] ===1 ) {
				cxt.beginPath();
				cxt.arc(p_w+2*j*(R+1)+(R+1),p_h+2*i*(R+1)+(R+1), R, 0, 2*Math.PI);
				cxt.fill();
				// cxt.stroke();
			}
		}
	}

	// cxt.fillStyle = ball.color;
	// cxt.beginPath();
	// cxt.arc(ball.x, ball.y, ball.r, 0, 2*Math.PI);
	// cxt.closePath();
	// cxt.fill();
}