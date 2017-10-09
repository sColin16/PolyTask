/*******
  ____            _           _____                 _
 |  _ \    ___   | |  _   _  |_   _|   __ _   ___  | | __
 | |_) |  / _ \  | | | | | |   | |    / _` | / __| | |/ /
 |  __/  | (_) | | | | |_| |   | |   | (_| | \__ \ |   <
 |_|      \___/  |_|  \__, |   |_|    \__,_| |___/ |_|\_\
                      |___/

Copyright 2017 Colin Siles

script.js

PolyTask Pre-Alpha Phase

********/

window.onLoad = onLoad();

window.addEventListener("scroll", onScroll);

function onScroll(){
    console.log(window.scrollY);
    document.getElementsByClassName("day-counter-number")[0].innerHTML = window.scrollY;
    if(window.scrollY < -100){
        document.getElementById("Test").style.display = "block";
    } else {
        document.getElementById("Test").style.display = "none"
    }
}

function onLoad(){
    //append event listeners to navigation buttons
    console.log("running");
    var navButtons = document.getElementById("navbar").children;
    
    function appendListener(object){
        object.addEventListener("touchstart", function(){openTab(object.classList[0])});
    }
    
    for(var i = 0, n = navButtons.length; i<n; i++){
        //use of callback to ensure individual button functionality (due to how javascript passes by reference only for objects)
        appendListener(navButtons[i]);
    }
    
    openTab("today");
    document.getElementsByClassName("input")[0].focus();
    document.getElementsByClassName("input")[0].select();
}

function hideTabs(){
    var navButtons = document.getElementById("navbar").children;
    var tabs = document.getElementById("page-wrapper").children;
    
    for(var i = 0, n = navButtons.length; i<n; i++){
        navButtons[i].style.color = "grey";
        tabs[i].style.display = "none";
    }
    
}

function openTab(name){
    console.log("opening " + name);
    hideTabs();
    document.getElementById("page-wrapper").getElementsByClassName(name)[0].style.display = "block";
    document.getElementById("navbar").getElementsByClassName(name)[0].style.color = "#e32636";
}