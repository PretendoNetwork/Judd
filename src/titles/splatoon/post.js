const router = require('express').Router();
const multer = require('multer');
const joi = require('joi');
const { SplatfestResult } = require('../../models/splatfest_result');

const resultDataSchema = joi.object({
	ServerEnv: joi.string(),
	PId: joi.number(),
	MiiName: joi.string(),
	Model: joi.number(),
	Skin: joi.number(),
	EyeColor: joi.number(),
	Weapon: joi.number(),
	SumPaint: joi.number(),
	Gear_Shoes: joi.number(),
	Gear_Shoes_Skill0: joi.number(),
	Gear_Shoes_Skill1: joi.number(),
	Gear_Shoes_Skill2: joi.number(),
	Gear_Clothes: joi.number(),
	Gear_Clothes_Skill0: joi.number(),
	Gear_Clothes_Skill1: joi.number(),
	Gear_Clothes_Skill2: joi.number(),
	Gear_Head: joi.number(),
	Gear_Head_Skill0: joi.number(),
	Gear_Head_Skill1: joi.number(),
	Gear_Head_Skill2: joi.number(),
	Rank: joi.number(),
	Udemae: joi.number(),
	RegularKillSum: joi.number(),
	WinSum: joi.number(),
	LoseSum: joi.number(),
	TodaysCondition: joi.number(),
	Region: joi.string(),
	Area: joi.number(),
	FesID: joi.number(),
	FesState: joi.number(),
	FesTeam: joi.number(),
	FesGrade: joi.number(),
	FesPoint: joi.number(),
	FesPower: joi.number(),
	BestFesPower: joi.number(),
	Money: joi.number(),
	Shell: joi.number(),
	TotalBonusShell: joi.number(),
	MatchingTime: joi.number(),
	IsRematch: joi.number(),
	SaveDataCorrupted: joi.number(),
	DisconnectedPId: joi.number().default(0).empty(''), // * Is sometimes an empty string. Turn to 0
	DisconnectedMemHash: joi.number().default(0).empty(''), // * Is sometimes an empty string. Turn to 0
	SessionID: joi.number(),
	StartNetworkTime: joi.number(),
	GameMode: joi.number(),
	Rule: joi.number(),
	Stage: joi.number(),
	Team: joi.number(),
	IsWinGame: joi.number(),
	Kill: joi.number(),
	Death: joi.number(),
	Paint: joi.number(),
	IsNetworkBurst: joi.number(),
	BottleneckPlayerNum: joi.number(),
	MaxSilenceFrame: joi.number(),
	MemoryHash: joi.number(),
	Paint_Alpha: joi.number(),
	Paint_Bravo: joi.number(),
	FaceImg: joi.binary()
});


const multipart = multer().fields([
	{ name: 'ServerEnv' },
	{ name: 'PId' },
	{ name: 'MiiName' },
	{ name: 'Model' },
	{ name: 'Skin' },
	{ name: 'EyeColor' },
	{ name: 'Weapon' },
	{ name: 'SumPaint' },
	{ name: 'Gear_Shoes' },
	{ name: 'Gear_Shoes_Skill0' },
	{ name: 'Gear_Shoes_Skill1' },
	{ name: 'Gear_Shoes_Skill2' },
	{ name: 'Gear_Clothes' },
	{ name: 'Gear_Clothes_Skill0' },
	{ name: 'Gear_Clothes_Skill1' },
	{ name: 'Gear_Clothes_Skill2' },
	{ name: 'Gear_Head' },
	{ name: 'Gear_Head_Skill0' },
	{ name: 'Gear_Head_Skill1' },
	{ name: 'Gear_Head_Skill2' },
	{ name: 'Rank' },
	{ name: 'Udemae' },
	{ name: 'RegularKillSum' },
	{ name: 'WinSum' },
	{ name: 'LoseSum' },
	{ name: 'TodaysCondition' },
	{ name: 'Region' },
	{ name: 'Area' },
	{ name: 'FesID' },
	{ name: 'FesState' },
	{ name: 'FesTeam' },
	{ name: 'FesGrade' },
	{ name: 'FesPoint' },
	{ name: 'FesPower' },
	{ name: 'BestFesPower' },
	{ name: 'Money' },
	{ name: 'Shell' },
	{ name: 'TotalBonusShell' },
	{ name: 'MatchingTime' },
	{ name: 'IsRematch' },
	{ name: 'SaveDataCorrupted' },
	{ name: 'DisconnectedPId' },
	{ name: 'DisconnectedMemHash' },
	{ name: 'SessionID' },
	{ name: 'StartNetworkTime' },
	{ name: 'GameMode' },
	{ name: 'Rule' },
	{ name: 'Stage' },
	{ name: 'Team' },
	{ name: 'IsWinGame' },
	{ name: 'Kill' },
	{ name: 'Death' },
	{ name: 'Paint' },
	{ name: 'IsNetworkBurst' },
	{ name: 'BottleneckPlayerNum' },
	{ name: 'MaxSilenceFrame' },
	{ name: 'MemoryHash' },
	{ name: 'Paint_Alpha' },
	{ name: 'Paint_Bravo' },
	{ name: 'FaceImg' }
]);

router.post('/post', multipart, async (request, response) => {
	const resultData = {
		...request?.body,
		FaceImg: request?.files?.FaceImg[0]?.buffer
	};

	const valid = resultDataSchema.validate(resultData);

	if (valid.error) {
		console.log(valid.error);
		return response.status(400).send(valid.error.message);
	}

	const result = new SplatfestResult({
		type: 'splatfest',
		bossUniqueId: request.headers['x-boss-uniqueid'],
		BossDigest: request.headers['x-boss-digest'],
		resultData: valid.value
	});

	await result.save();

	return response.send('success');
});

/*
router.post('/post', async (request, response) => {
	multipart(request, response, async (error) => {
		if (error) {
			return response.status(400).send(error.message);
		}

		const resultData = {
			...request?.body,
			FaceImg: request?.files?.FaceImg[0]?.buffer
		};

		const valid = resultDataSchema.validate(resultData);

		if (valid.error) {
			return response.status(400).send(valid.error.message);
		}

		const result = new SplatfestResult({
			type: 'splatfest',
			bossUniqueId: request.headers['x-boss-uniqueid'],
			BossDigest: request.headers['x-boss-digest'],
			resultData
		});

		await result.save();

		return response.send('success');
	});
});
*/

module.exports = router;