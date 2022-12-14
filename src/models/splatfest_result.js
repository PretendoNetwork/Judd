const { Schema, model } = require('mongoose');
const { ResultSchema } = require('./result');

const SplatfestResultSchema = ResultSchema.clone();
SplatfestResultSchema.add({
	resultData: {
		ServerEnv: String,
		PId: Number,
		MiiName: String,
		Model: Number,
		Skin: Number,
		EyeColor: Number,
		Weapon: Number,
		SumPaint: Number,
		Gear_Shoes: Number,
		Gear_Shoes_Skill0: Number,
		Gear_Shoes_Skill1: Number,
		Gear_Shoes_Skill2: Number,
		Gear_Clothes: Number,
		Gear_Clothes_Skill0: Number,
		Gear_Clothes_Skill1: Number,
		Gear_Clothes_Skill2: Number,
		Gear_Head: Number,
		Gear_Head_Skill0: Number,
		Gear_Head_Skill1: Number,
		Gear_Head_Skill2: Number,
		Rank: Number,
		Udemae: Number,
		RegularKillSum: Number,
		WinSum: Number,
		LoseSum: Number,
		TodaysCondition: Number,
		Region: String,
		Area: Number,
		FesID: Number,
		FesState: Number,
		FesTeam: Number,
		FesGrade: Number,
		FesPoint: Number,
		FesPower: Number,
		BestFesPower: Number,
		Money: Number,
		Shell: Number,
		TotalBonusShell: Number,
		MatchingTime: Number,
		IsRematch: Number,
		SaveDataCorrupted: Number,
		DisconnectedPId: Number,
		DisconnectedMemHash: Number,
		SessionID: Number,
		StartNetworkTime: Number,
		GameMode: Number,
		Rule: Number,
		Stage: Number,
		Team: Number,
		IsWinGame: Number,
		Kill: Number,
		Death: Number,
		Paint: Number,
		IsNetworkBurst: Number,
		BottleneckPlayerNum: Number,
		MaxSilenceFrame: Number,
		MemoryHash: Number,
		Paint_Alpha: Number,
		Paint_Bravo: Number,
		FaceImg: Buffer
	}
});

const SplatfestResult = model('SplatfestResult', SplatfestResultSchema, 'results');

module.exports = {
	SplatfestResultSchema,
	SplatfestResult,
};