// This is a comment
// uncomment the line below if you want to write a filterscript
//#define FILTERSCRIPT
#define SSCANF_NO_NICE_FEATURES
#include <a_samp>
#include <cef>
#include <foreach>
#include <fmt>
#include <sscanf2>
#include <streamer>
#include <Pawn.CMD>
#define ID_BROWSER_DIALOGS  5

main(){}

public OnGameModeInit(){
	cef_subscribe("OnHudInitialization", "OnHudInitialization");
}

public OnPlayerSpawn(playerid){
	for(new i; i < 100; i++)
	    SendClientMessage(playerid, -1, " ");
	cef_create_browser(playerid, ID_BROWSER_DIALOGS, "file:///C:/OSPanel/domains/localhost/index.html", false, false);

}
forward OnHudInitialization(playerid);
public OnHudInitialization(playerid){
	return true;
}

public OnPlayerText(playerid, text[])
{
	new
	    player_name[MAX_PLAYERS];
	GetPlayerName(playerid, player_name[playerid], MAX_PLAYER_NAME);
	printf("%s", player_name[playerid]);

    cef_emit_event(playerid, "pwd:chat", CEFSTR(player_name[playerid]), CEFSTR(text));
	return false;
}


stock hudUpdate(playerid, const nick[], const text[])
{
    cef_emit_event(
		playerid,
		"pwd:chat",
		CEFSTR(nick),
		CEFSTR(text)
	);
}
