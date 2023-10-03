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

main(){}

forward OnCefBrowserCreated(player_id, browser_id, status_code);

public OnGameModeInit()
{
	SetGameModeText("CEF");
	AddPlayerClass(0, 1958.3783, 1343.1572, 15.3746, 269.1425, 0, 0, 0, 0, 0, 0);
	return 1;
}
public OnPlayerRequestClass(playerid, classid)
{
	SetPlayerPos(playerid, 1958.3783, 1343.1572, 15.3746);
	SetPlayerCameraPos(playerid, 1958.3783, 1343.1572, 15.3746);
	SetPlayerCameraLookAt(playerid, 1958.3783, 1343.1572, 15.3746);
	return 1;
}
public OnPlayerSpawn(playerid)
{
	cef_create_browser(playerid, 0x12345, "file:///C:/OSPanel/domains/localhost/index.html", false, false);
	return 1;
}

public OnPlayerText(playerid, text[])
{
	new player_name[MAX_PLAYERS];
	GetPlayerName(playerid, player_name[playerid], MAX_PLAYER_NAME);
	
	SetPlayerColor(playerid, 0xFF0000FF);
	new fmtPlayerColor[] = "%06x";
	new PlayerColor[sizeof fmtPlayerColor + (-4) + 14];
	new string[MAX_PLAYER_NAME + (-2) + 16];
	format(string, sizeof string, "%s[%i]", player_name[playerid], playerid);
	format(PlayerColor, sizeof PlayerColor, fmtPlayerColor, GetPlayerColor(playerid) >>> 8);
	cef_emit_event(
		playerid,
		"pwd:chat",
		CEFSTR(PlayerColor),
		CEFSTR(string),
		CEFSTR(text)
	);
}
