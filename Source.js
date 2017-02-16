/*
jshint esversion: 6
*/


//code for loading menu
var loadMenu = function() {

	//if menu exists, delete it
	$('#HollyMenu').remove();

	var style1 = "position: absolute; top: 10px; left: 10px; min-width: 150px; background-color: rgba(0, 0, 0, 0.75); z-index: 1000000001;";
	var style2 = "background: black; margin: 0px; padding: 5px; text-align: center; vertical-align: middle; font-weight: bold;";
	var style3 = "display: block; padding: 5px;";

	$(document.body).append(`
	<div id="HollyMenu" style="${style1}">
		<div style="${style2}" onclick="$('#HollyMenuContent').toggle()">HollyCheats</div>
		<div id="HollyMenuContent" style="${style3}"></div>
	</div>`);

	//populate menu (with items/cheats)
	//new GeneralCheats();
	if (location.pathname == "/spaceplan/") new SpacePlanCheats();
	if (location.pathname == "/cookieclicker/") new CookieClickerCheats();
	new DebugCheats();
};

var GeneralCheats = function() {
	$('#HollyMenuContent')	
		.append('<b>General</b></br>')
		//.append('<input type="checkbox" onclick="SpacePlanCheats.InfMoney(this)">Infinite Power</br>')
		//.append('<input type="button" onclick="localStorage = null" value="Full Reset" style="all:initial; all:unset;"></br>')
		;
};

var SpacePlanCheats = function() {
	$('#HollyMenuContent')	
		.append('<b>SpacePlan cheats</b></br>')
		.append('<input type="checkbox" onclick="SpacePlanCheats.SetAC(this)">Autoclick</br>')
		.append('<input type="checkbox" onclick="SpacePlanCheats.InfMoney(this)">Infinite Power</br>')
		.append('<input type="button" onclick="power = 0" value="Reset Power" style="all:initial; all:unset;"></br>')
		;
};
SpacePlanCheats.SetAC = function(a) {
	if(a.checked) 	this.ACEnabled = setInterval(kinetigenClick, 10);
	 else 			clearInterval(this.ACEnabled);
};
SpacePlanCheats.InfMoney = function(a) {
	if(a.checked) {
		this.backupMoney = power;	//power is a global var
		power = Infinity;
	} else {
		power = this.backupMoney;
	}
};

var CookieClickerCheats = function() {
	$('#HollyMenuContent')	
		.append('<b>CookieClicker cheats</b></br>')
		.append('<input type="checkbox" onclick="CookieClickerCheats.SetAC(this)">Autoclick</br>')
		.append('<input type="checkbox" onclick="CookieClickerCheats.FreeUpgrades(this)">Free Upgrades</br>')
		.append('<input type="button" onclick="Game.OpenSesame()" value="Enable Debug Menu"></br>')
		.append('<input type="button" onclick="Game.cookies = Infinity" value="Infinite Cookies"></br>')
		//.append('<input type="button" onclick="Game.RuinTheFun()" value="Ruin The Fun"></br>')
		.append('<input type="button" onclick="CookieClickerCheats.CookiesArentAwful()" value="Remove &quot;Cheated cookies taste awful&quot;"></br>')
		.append('<input type="button" onclick="Game.cookies = 0" value="Reset Cookies"></br>')
		.append('<input type="checkbox" onclick="CookieClickerCheats.SetFace(this)">Elder Cookie Texture</br>')
		.append('<input type="checkbox" onclick="Game.PARTY = this.checked">Rave Party</br>')
		;
};
CookieClickerCheats.SetAC = function(a) {
	if(a.checked) 	this.ACEnabled = setInterval(Game.ClickCookie, 10);
	 else 			clearInterval(this.ACEnabled);
};
CookieClickerCheats.FreeUpgrades = function(a) {	//storing this inside the game's variables. usually not a good idea but it works
	if(a.checked)	Game.UpgradesById.forEach(function (e) { e.basePriceBackup = e.basePrice; e.basePrice = 0; });
	else			Game.UpgradesById.forEach(function (e) { e.basePrice = e.basePriceBackup; });
};
CookieClickerCheats.CookiesArentAwful = function() {
	Game.Achievements["Cheated cookies taste awful"].won = 0;
};
CookieClickerCheats.SetFace = function(a) {
	if(a.checked) 	Game.addClass("elderWrath");
	 else 			Game.removeClass("elderWrath");
};

var DebugCheats = function() {
	$('#HollyMenuContent')	
		.append('<b>Debug</b></br>')
		//.append('<input type="checkbox" onclick="DebugCheats.DoThing(this)">Thing</br>')
		.append('<input type="button" onclick="localStorage.clear();location.reload()" value="Hard Reset"></br>')
		.append('<input type="button" onclick="$(\'#HollyMenu\').remove()" value="Destroy Menu"></br>')
		;
};
DebugCheats.DoThing = function(a) {
	
};

//new code here

clear();

if (typeof(jQuery) === 'undefined') {
	//stuff
	e = document.createElement('script');
    e.src = '//code.jquery.com/jquery-latest.min.js';
    e.onload = function() {
        console.log('jQuery injected');
        loadMenu();
    };
    document.head.appendChild(e);
} else {
	loadMenu();
}
