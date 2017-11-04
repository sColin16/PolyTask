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

//array that stores all of the data related to projects, tasks, etc.
var objectArray = [];

function Task(name){
    this.name = name;
    //add other attributes
    //type of task, due date, etc.
    
    //make inherited forms, like delayed task, etc.
}

function loadProjects(){
    objectArray = [];
    var cache = localStorage.getItem("PolyTaskObject");
    objectArray = JSON.parse(cache);
}

function saveProjects(){
    var cache = JSON.stringify(objectArray);
    localStorage.setItem("PolyTaskObjects", cache);
}

var scrollThreshold = -200;

window.onLoad = onLoad();

window.addEventListener("scroll", onScroll);

function fromTemplate(templateName){
    var itemTemplate = document.getElementById(templateName + "-template-wrapper").content;
    var item = itemTemplate.getElementById(templateName + "-template").cloneNode(true);
    item.removeAttribute("id");
    
    return item;
}

function onScroll(){
    if(window.scrollY < scrollThreshold){
        addIdea();
    }
}

function addIdea(){
    var ideaName = prompt("Enter idea");
    if(ideaName === ""){
        console.warn("you must add a name");
        return;
    } else{
        document.getElementById("new-idea-wrapper").style.display = "block";
        document.getElementById("new-idea-title").value = ideaName;
    }
}

function newDashboardBox(primaryColor, secondaryColor, name){
    var dashboardBox = fromTemplate("dashboard-box");
    var dashboardBoxName = document.createTextNode(name);
    
    var dashboardList = document.getElementById("page-wrapper").getElementsByClassName("dashboard")[0];
    var buffer = document.getElementById("page-wrapper").getElementsByClassName("dashboard")[0].getElementsByClassName("lower-buffer")[0];
    
    dashboardBox.id = name;
    dashboardBox.getElementsByClassName("dashboard-box-title")[0].classList.add(primaryColor);
    dashboardBox.getElementsByClassName("dashboard-box-content")[0].classList.add(secondaryColor);
    
    dashboardBox.getElementsByClassName("dashboard-box-title")[0].appendChild(dashboardBoxName);
    
    dashboardList.insertBefore(dashboardBox, buffer);
}

function newProjectContainer(dashboardBoxName, name, projectInfo, days){
    //append a project container from template to a given dashboardBox
    var dayLabel = "Days";
    if(days === 1) dayLabel = "Day";
    
    var projectName = document.createTextNode(projectName);
    var dayLabel = document.createTextNode(dayLabel);
}

function addTask(taskName){
    //add task only to local storage system NOT the actual dashboard
    
    var newTask = new Task(taskName);
    
    objectArray.push(newTask);
    console.log(objectArray);
    
    updateDashboard(newTask);
}

function updateDashboard(Task){
    //handles whether or not a given Task object (or project object in the future) should be appended to the dashboard
    //logic currently always places the object into the dashboard, onto a single predetermined dashboardBox
    //In the future, it will be necesary to add logic based on user dashboard settings
    
    var newTask = fromTemplate("unordered-dashboard-task");
    var newTaskName = document.createTextNode(Task.name);
    
    var dashboardBox = document.getElementById("dashboard-your-tasks");
    var dashboardBoxContent = dashboardBox.getElementsByClassName("dashboard-box-content")[0];
    
    newTask.id = "";
    newTask.appendChild(newTaskName);
    
    dashboardBoxContent.appendChild(newTask);
}

function onLoad(){
    //append event listeners to navigation buttons
    console.log("running");
    var navButtons = document.getElementById("navbar").children;
    
    for(var i = 0, n = navButtons.length; i<n; i++){
        //use of callback to ensure individual button functionality (due to how javascript passes by reference only for objects)
        appendMainTabListener(navButtons[i]);
    }
    
    document.getElementById("confirm-task").addEventListener("touchstart", function(){addNewTask(); hideOverlays();});
    
    openTab("dashboard");
    
    function appendMainTabListener(object){
        object.addEventListener("touchstart", function(){openTab(object.classList[0])});
    }
    
    function addNewTask(){
        var newTaskInput = document.getElementById("new-idea-title");
        
        var taskName = newTaskInput.value;
        
        if(taskName === ""){
            console.log("You must enter a name")
            return;
        }
        
        newTaskInput.value = "";
        
        addTask(taskName);
    }
}

function hideTabs(){
    var navButtons = document.getElementById("navbar").children;
    var tabs = document.getElementById("page-wrapper").children;
    for(var i = 0, n = navButtons.length; i<n; i++){
        navButtons[i].classList.remove("navbutton-active");
        tabs[i].style.display = "none";
    }
}

function openTab(name){
    console.log("opening " + name);
    hideTabs();
    document.getElementById("page-wrapper").getElementsByClassName(name)[0].style.display = "block";
    document.getElementById("navbar").getElementsByClassName(name)[0].classList.add("navbutton-active");
}

function hideOverlays(){
    var overlays = document.getElementsByClassName("overlay-backdrop");
    for(var i = 0, n = overlays.length; i<n; i++){
        overlays[i].style.display = "none";
    }
}