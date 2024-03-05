console.log("Hello World");

let trainer = {
    name: "Regil",
    age: 18,
    location: "SECRET NA LUGAR",
   
};
console.log(trainer.name); 
console.log(trainer['age']); 

trainer.introduce = function() {
    console.log(`Hello, my name is ${this.name} and I am from ${this.location}.`);
};

trainer.introduce();

let myPokemon = {
    name: 'Pikachu',
    level: 3,
    health: 100,
    attack: 50,
    tackle: function(target) {
        console.log(`${this.name} tackles ${target.name}`);
        console.log(`${target.name}'s health is now reduced.`);
        target.health -= this.attack;
        console.log(`${target.name}'s health is now ${target.health}`);
        if (target.health <= 0) {
            console.log(`${target.name} fainted`);
            this.gainExperience(target.level);
        }
    },
    faint: function() {
        console.log(`${this.name} fainted.`);
    },
    gainExperience: function(enemyLevel) {
        let experienceGained = 10 + (enemyLevel - this.level) * 5;
        console.log(`${this.name} gained ${experienceGained} experience points.`);
        // Increase level if enough experience is gained
        if (experienceGained >= 50) {
            this.levelUp();
        }
    },
    levelUp: function() {
        console.log(`${this.name} leveled up!`);
        this.level++;
        this.health += 10;
        this.attack += 5;
    }
};

function Pokemon(name, level) {
    this.name = name;
    this.level = level;
    this.maxHealth = 50 + level * 10;
    this.health = this.maxHealth;
    this.attack = 5 + Math.floor(level / 2); // Adjust attack based on level
    this.defense = 2 + Math.floor(level / 4); // Adjust defense based on level
    this.experience = 0;
    this.expToNextLevel = 100 + level * 50; // Experience required for next level

    this.tackle = function(target) {
        console.log(`${this.name} tackles ${target.name}`);
        let damage = this.attack - target.defense;
        if (damage < 0) {
            damage = 0;
        }
        target.health -= damage;
        console.log(`${target.name}'s health is now reduced to ${target.health}`);
        if (target.health <= 0) {
            console.log(`${target.name} fainted`);
            this.gainExperience(target.level);
        }
    };

    this.gainExperience = function(enemyLevel) {
        let experienceGained = 10 + (enemyLevel - this.level) * 5;
        if (experienceGained < 0) {
            experienceGained = 1;
        }
        console.log(`${this.name} gained ${experienceGained} experience points`);
        this.experience += experienceGained;
        if (this.experience >= this.expToNextLevel) {
            this.levelUp();
        }
    };

    this.levelUp = function() {
        console.log(`${this.name} leveled up!`);
        this.level++;
        this.maxHealth += 10;
        this.health = this.maxHealth;
        this.attack += 2;
        this.defense += 1;
        this.experience -= this.expToNextLevel;
        this.expToNextLevel += 50;
    };
}

// Create Pokemon 
let pikachu = new Pokemon('Pikachu', 5);
let charmander = new Pokemon('Charmander', 5);

// battle
console.log("Battle begins!");
while (pikachu.health > 0 && charmander.health > 0) {
    pikachu.tackle(charmander);
    if (charmander.health <= 0) {
        console.log("Pikachu wins!");
        pikachu.levelUp();
        break;
    }
    charmander.tackle(pikachu);
}

// End of battle
console.log("Battle ends!");
