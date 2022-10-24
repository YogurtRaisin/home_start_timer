let timerId;
let res;

function getStartTime() {
    const url = "https://script.google.com/macros/s/AKfycbzehMRLqxs45OSgBnihSN6Mgbezs6Np1TKtk6GDfpxxBD8lHkFo7uvnreI9B25DC0w-qw/exec";
    const request = new XMLHttpRequest();

    request.open("GET", url, false);
    request.send();

    res = JSON.parse(request.responseText);

    if (res[0].start == "home") {
        const goal_time = new Date(res[0].goal_time);
        document.getElementById("event_title").innerHTML = res[0].title;
        document.getElementById("station_text").innerHTML = res[0].goal;
        document.getElementById("time_text").innerHTML = goal_time.getHours() + " : " + goal_time.getMinutes();
        document.getElementById("jr").classList.add("opacity");
        document.getElementById("metro").classList.add("opacity");
        timerId = setInterval( () => { showTimer(res[0].start_time) }, 1);
    } else {
        if (new Date(res[0].start_time).getTime() <= new Date(res[1].start_time).getTime()) {
            showJR(res[0]);
        } else {
            showMetro(res[1]);
        }
    }
}

function jrButton() {
    if (timerId) {
        clearInterval(timerId);
    }
    showJR(res[0]);
}

function metroButton() {
    if (timerId) {
        clearInterval(timerId);
    }
    showMetro(res[1]);
}

function showJR(res) {
    const goal_time = new Date(res.goal_time);
    document.getElementById("event_title").innerHTML = res.title;
    document.getElementById("station_text").innerHTML = res.goal + " 駅";
    document.getElementById("time_text").innerHTML = goal_time.getHours() + " 時 " + goal_time.getMinutes() + "分";
    document.getElementById("jr").classList.remove("opacity");
    document.getElementById("metro").classList.add("opacity");
    timerId = setInterval( () => { showTimer(res.start_time) }, 1);
}

function showMetro(res) {
    if (timerId) {
        clearInterval(timerId);
    }
    const goal_time = new Date(res.goal_time);
    document.getElementById("event_title").innerHTML = res.title;
    document.getElementById("station_text").innerHTML = res.goal + " 駅";
    document.getElementById("time_text").innerHTML = goal_time.getHours() + " 時 " + goal_time.getMinutes() + "分";
    document.getElementById("jr").classList.add("opacity");
    document.getElementById("metro").classList.remove("opacity");
    timerId = setInterval( () => { showTimer(res.start_time) }, 1);
}

function set2fig(num) {
   // 桁数が1桁だったら先頭に0を加えて2桁に調整する
   let ret;
   if( num < 10 ) { ret = "0" + num; }
   else { ret = num; }
   return ret;
}

function set3fig(num) {
   // 桁数が1桁だったら先頭に0を加えて2桁に調整する
   let ret;

   if ( num < 10 ) {
    ret = "00" + num;
   } else if (num < 100) {
    ret = "0" + num;
   } else {
    ret = num;
   }

   return ret;
}

function showTimer(time) {
   const nowTime = new Date();
   const eventTime = new Date(time);
   const disTime = eventTime.getTime() - nowTime.getTime();

   const date = Math.floor(disTime / 1000 / 60 / 60 / 24);
   const hour = Math.floor(disTime / 1000 / 60 / 60 % 24);
   const min = Math.floor(disTime / 1000 / 60) % 60;
   const sec = Math.floor(disTime / 1000) % 60;
   const mili = Math.floor(disTime % 1000);

//    document.getElementById("date_text").innerHTML = set2fig(date);
//    document.getElementById("hour_text").innerHTML = set2fig(hour);
//    document.getElementById("min_text").innerHTML = set2fig(min);
//    document.getElementById("sec_text").innerHTML = set2fig(sec);
//    document.getElementById("milisec_text").innerHTML = set3fig(mili);

   document.getElementById("date_text").innerHTML = date;
   document.getElementById("hour_text").innerHTML = hour;
   document.getElementById("min_text").innerHTML = min;
   document.getElementById("sec_text").innerHTML = sec;
   document.getElementById("milisec_text").innerHTML = mili;
}

function showClock() {
   const nowTime = new Date();
   const date = nowTime.getDate();
   const hour = nowTime.getHours();
   const min = nowTime.getMinutes();
   const sec = nowTime.getSeconds();
   const mili = nowTime.getMilliseconds();

   document.getElementById("date_text").innerHTML = set2fig(date);
   document.getElementById("hour_text").innerHTML = set2fig(hour);
   document.getElementById("min_text").innerHTML = set2fig(min);
   document.getElementById("sec_text").innerHTML = set2fig(sec);
   document.getElementById("milisec_text").innerHTML = set3fig(mili);
}


// setInterval('showClock()',1);
getStartTime();