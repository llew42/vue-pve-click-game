function getRandomVal(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
function gameWinner(winner) {
	if(winner === 'player') {
		alert('Player won!');
	} else if (winner === 'monster') {
		alert('Monster won!');
	}
}

const app = Vue.createApp({
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			atkCounter: 0,
			specialAtkAvailable: true,
			battleLog: [],
			winner: '',
		};
	},
	methods: {
		attackMonster() {
			const attackVal = getRandomVal(5, 12);
			this.monsterHealth -= attackVal;
			this.playerBuildUp();
			this.attackPlayer();
		},
		attackPlayer() {
			const attackVal = getRandomVal(8, 15);
			this.playerHealth -= attackVal;
		},
		heal() {
			const healVal = getRandomVal(5, 15);
			this.playerHealth += healVal;
			if(this.playerHealth > 100) {
				this.playerHealth = 100;
			}
		},
		specialAttack() {
			const specialAtkVal = getRandomVal(10, 30);
			this.monsterHealth -= specialAtkVal;
			this.atkCounter = 0;
			this.specialAtkAvailable = true;
			this.attackPlayer();
		},
		playerBuildUp() {
			this.atkCounter++;
			console.log('atkCounter is ', this.atkCounter)
			if(this.atkCounter === 3) {
				this.specialAtkAvailable = false;
				console.log('specialAtkAvailable is ', this.specialAtkAvailable);
			}
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
			return this.atkCounter % 3 !== 0;
		}
	},
	watch: {
		playerHealth() {
			if(this.playerHealth <= 0) {
				this.playerHealth = 0;
				this.winner = 'monster';
				const that = this;
				setTimeout(() => {
					gameWinner(that.winner);
				}, 1000)
			}
		},
		monsterHealth() {
			if(this.monsterHealth <= 0) {
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