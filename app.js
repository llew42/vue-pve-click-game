function getRandomVal(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			atkCounter: 0,
			specialAtkAvailable: true,
			battleLog: [],
			winner: null,
		};
	},
	methods: {
		startGame() {
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.winner = null;
			this.atkCounter = 0;
			this.battleLog = [];
		},
		attackMonster() {
			const attackVal = getRandomVal(5, 12);
			this.monsterHealth -= attackVal;
			this.addLogMessage('player', 'attack', attackVal)
			this.attackPlayer();
		},
		attackPlayer() {
			const attackVal = getRandomVal(8, 15);
			this.playerHealth -= attackVal;
			this.playerSpecialAtkBuildUp();
			this.addLogMessage('monster', 'attack', attackVal)
		},
		heal() {
			const healVal = getRandomVal(8, 20);
			console.log('heal val ', healVal);
			if(this.playerHealth + healVal > 100) {
				this.playerHealth = 100;
			} else {
				this.playerHealth += healVal;
			}
			this.addLogMessage('player', 'heal', healVal)
			this.attackPlayer();
		},
		specialAttack() {
			const specialAtkVal = getRandomVal(10, 30);
			this.monsterHealth -= specialAtkVal;
			this.specialAtkAvailable = true;
			this.attackPlayer();
			this.addLogMessage('player', 'special attack', specialAtkVal)
			this.atkCounter = 0;
		},
		playerSpecialAtkBuildUp() {
			this.atkCounter++;
			if(this.atkCounter % 3 !== 0) {
				this.specialAtkAvailable = false;
				console.log('specialAtkAvailable is ', this.specialAtkAvailable);
			}
		},
		surrender() {
			this.winner = 'monster'
		},
		addLogMessage(who, what, value) {
			this.battleLog.unshift({
				actionBy: who,
				actionType: what,
				actionValue: value,
			});
			console.log('battleLog == ', this.battleLog)
		},
	},
	computed: {
		monsterHealthBar() {
			return {width: this.monsterHealth + '%'};
		},
		playerHealthBar() {
			return {width: this.playerHealth + '%'};
		},
		mayUseSpecialAtk() {
			console.log('mayUseSpecialAtk triggered');
			if(this.atkCounter % 3 !== 0 || this.atkCounter === 0) {
				console.log('this.atkCounter === ', this.atkCounter)
				return this.specialAtkAvailable = true;
			} else return this.specialAtkAvailable = false;
		}
	},
	watch: {
		playerHealth(value) {
			if(value <= 0 && this.monsterHealth <= 0) {
				this.playerHealth = 0;
				this.monsterHealth = 0;
				this.winner = 'draw';
			} else if (value <= 0) {
				this.playerHealth = 0;
				this.winner = 'monster';
				const that = this;
				setTimeout(() => {
					gameWinner(that.winner);
				}, 1000)
			}
		},
		monsterHealth(value) {
			if(value <= 0 && this.playerHealth <= 0) {
				this.playerHealth = 0;
				this.monsterHealth = 0;
				this.winner = 'draw';
			} else if (value <= 0) {
				this.monsterHealth = 0;
				this.winner = 'player';
				const that = this;
				setTimeout(() => {
					gameWinner(that.winner);
				}, 1000)
			}
		},
	}
});

app.mount('#game');