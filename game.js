// GROUP THINK - Austin Trip Decision Simulator
// For Jeff, Rossiter, Reider, Adan, Jeremy & Doug
const VERSION = 'v0.3';
console.log(`Group Think ${VERSION} loaded`);

const COLORS = {
    bg: 0x1a1a2e,
    panel: 0x16213e,
    accent: 0xe94560,
    gold: 0xf5a623,
    green: 0x4ecca3,
    blue: 0x3498db,
    text: '#eee',
    dim: '#999',
    white: 0xeeeeee,
    dark: 0x0f3460,
};

// Character stats - D&D style
const CHARACTERS = {
    Jeff: {
        str: 14, dex: 12, wis: 10, cha: 16, con: 13, luck: 11,
        title: 'The Diplomat',
        quirk: 'Can talk his way out of anything... except sleeping on the couch',
        color: 0xe74c3c
    },
    Rossiter: {
        str: 16, dex: 10, wis: 13, cha: 12, con: 15, luck: 9,
        title: 'The Tank',
        quirk: 'Built like a fridge. Will arm wrestle for literally any decision',
        color: 0x3498db
    },
    Reider: {
        str: 11, dex: 14, wis: 16, cha: 13, con: 10, luck: 14,
        title: 'The Strategist',
        quirk: 'Always has a spreadsheet for this. Always.',
        color: 0x2ecc71
    },
    Adan: {
        str: 13, dex: 15, wis: 12, cha: 14, con: 11, luck: 13,
        title: 'The Wildcard',
        quirk: 'Will suggest the most unhinged option and somehow be right',
        color: 0xf39c12
    },
    Jeremy: {
        str: 12, dex: 13, wis: 14, cha: 11, con: 14, luck: 15,
        title: 'The Lucky One',
        quirk: 'Falls upward. Has never lost a coin toss in his life',
        color: 0x9b59b6
    },
    Doug: {
        str: 15, dex: 11, wis: 11, cha: 15, con: 16, luck: 10,
        title: 'The Anchor',
        quirk: 'Will outlast everyone. Last man standing energy',
        color: 0x1abc9c
    }
};

const NAMES = Object.keys(CHARACTERS);

// Resolution methods
const METHODS = [
    {
        name: 'Arm Wrestling',
        stat: 'str',
        icon: '💪',
        desc: 'Strength vs Strength. Table optional.',
        flavor: [
            '{winner} slammed {loser}\'s hand down like a dad opening a pickle jar.',
            '{loser} tried. Bless his heart. {winner} didn\'t even flinch.',
            'It was over in 0.3 seconds. {winner} wins. {loser} needs ice.',
        ]
    },
    {
        name: 'Dad Joke Duel',
        stat: 'cha',
        icon: '😂',
        desc: 'Charisma battle. Worst joke wins... wait, best? Nobody knows.',
        flavor: [
            '{winner} dropped "I\'m reading a book about anti-gravity. Impossible to put down." {loser} groaned so hard he forfeited.',
            '{loser} told a joke so bad even the crickets left. {winner} wins by default.',
            '{winner}: "What do you call a fake noodle? An impasta." The room went silent. He wins.',
        ]
    },
    {
        name: 'Staring Contest',
        stat: 'con',
        icon: '👁️',
        desc: 'Constitution check. Who blinks first, loses.',
        flavor: [
            '{loser} blinked after 4 seconds like a man who just remembered his mortgage payment.',
            '{winner} didn\'t blink for 47 seconds. Possibly a lizard person.',
            'A fly landed on {loser}\'s face at second 12. {winner} wins by insect intervention.',
        ]
    },
    {
        name: 'Coin Toss',
        stat: 'luck',
        icon: '🪙',
        desc: 'Pure luck. The universe decides.',
        flavor: [
            'The coin bounced off the table, hit a lamp, and landed on {winner}\'s side. Destiny.',
            '{loser} called tails. It was heads. It\'s always heads.',
            '{winner} caught the coin mid-air and just knew. Main character energy.',
        ]
    },
    {
        name: 'Rock Paper Scissors',
        stat: 'dex',
        icon: '✊',
        desc: 'Dexterity and reflexes. Best of one. No best of three.',
        flavor: [
            '{winner} threw scissors with the confidence of a man who\'s been preparing for this his whole life.',
            '{loser} hesitated. You could see it in his eyes. {winner} pounced with paper.',
            'Both threw rock twice. On the third throw, {winner} went paper. {loser} is still processing.',
        ]
    },
    {
        name: 'Trivia Showdown',
        stat: 'wis',
        icon: '🧠',
        desc: 'Wisdom check. Random knowledge nobody should have.',
        flavor: [
            'Question: "What year was the stapler invented?" {winner} knew. WHY did {winner} know?',
            '{loser} guessed "1776" for everything. {winner} actually reads Wikipedia for fun.',
            '{winner} rattled off the capital of Burkina Faso like it was nothing. {loser} thought it was a sandwich.',
        ]
    },
    {
        name: 'Shot Roulette',
        stat: 'con',
        icon: '🥃',
        desc: 'Constitution save. One shot is hot sauce. Who flinches?',
        flavor: [
            '{loser} got the hot sauce. The tears were immediate. {winner} got water and pretended it was vodka.',
            '{winner} downed the mystery shot without blinking. {loser} smelled his and surrendered.',
            'Both got hot sauce. {winner} powered through. {loser} is still looking for milk.',
        ]
    },
    {
        name: 'Thumb War',
        stat: 'dex',
        icon: '👍',
        desc: 'Dexterity check. 1-2-3-4, I declare a thumb war.',
        flavor: [
            '{winner}\'s thumb moved like a striking cobra. {loser} never stood a chance.',
            '{loser} tried the fake-out. {winner} saw it coming from Austin to El Paso.',
            'It lasted 45 seconds. Longest thumb war in recorded history. {winner} prevails.',
        ]
    }
];

// Scenarios
const SCENARIOS = [
    {
        title: 'THE COUCH QUESTION',
        subtitle: 'Chapter 1: Arrival',
        description: '6 guys. 5 beds. 1 couch.\n\nSomebody\'s sleeping on that IKEA nightmare tonight. The Airbnb listing said "sleeps 6" but apparently that was aspirational.',
        question: 'How do we decide who gets the couch?',
        type: 'eliminate_one',
        options: [
            { name: 'Arm Wrestling Tournament', desc: 'Loser of a random matchup gets the couch. Strength rules.' },
            { name: 'Coin Toss of Fate', desc: 'Two names drawn at random. Coin decides. No appeals.' },
            { name: 'Dad Joke Sudden Death', desc: 'Worst joke = worst sleep. Charisma on the line.' },
            { name: 'Last Man Standing', desc: 'Staring contest. Blink and you\'re on the cushions.' },
        ],
        resultPrefix: 'sleeps on the couch tonight',
        resultEmoji: '🛋️',
        aftermath: [
            '{loser} found a spring poking through the cushion at 3 AM.',
            '{loser} woke up with a throw pillow pattern imprinted on his face.',
            '{loser} claims the couch was "actually pretty comfortable." Nobody believes him.',
            '{loser} didn\'t sleep. Just stared at the ceiling contemplating his life choices.',
        ]
    },
    {
        title: 'RESTAURANT ROULETTE',
        subtitle: 'Chapter 2: Hunger',
        description: 'It\'s 7:45 PM. Everyone\'s hangry.\n\nOne guy wants BBQ. Another says "something light." Someone googled a place with 3.2 stars because "it looks authentic." It\'s 25 minutes away. On a Saturday.',
        question: 'Who picks the restaurant?',
        type: 'pick_one',
        options: [
            { name: 'Trust the Yelp Guy', desc: 'Whoever has the highest Wisdom picks based on ratings and reviews' },
            { name: 'Closest Wins', desc: 'Whoever has the highest Dexterity picks — speed over quality' },
            { name: 'Loudest Voice', desc: 'Whoever has the highest Charisma just... decides. For everyone.' },
            { name: 'Battle Royale', desc: 'Two random guys duel it out. Winner picks dinner.' },
        ],
        resultPrefix: 'picks the restaurant',
        resultEmoji: '🍖',
        aftermath: [
            'The wait was 45 minutes. {winner} kept saying "it\'ll be worth it." It was medium.',
            '{winner} picked a BBQ joint. The brisket was transcendent. He will never let anyone forget this.',
            'The restaurant {winner} picked had one Yelp review: "decent." It was, in fact, decent.',
            '{winner} chose the spot with live music. Nobody could hear each other for 2 hours. Memories were made.',
        ]
    },
    {
        title: 'ACTIVITY CRISIS',
        subtitle: 'Chapter 3: Now What',
        description: 'Dinner\'s done. It\'s 9:30 PM.\n\nSomeone suggests the 80s arcade. Someone else wants to "just walk around." A third guy is eyeing the UT tower. Doug already bought a 12-pack. Jeremy wants to find food again.',
        question: 'What do we do tonight?',
        type: 'pick_activity',
        options: [
            { name: '80s Arcade', desc: 'Pinball, Pac-Man, and pretending we\'re 22 again', emoji: '🕹️' },
            { name: 'Walk 6th Street', desc: 'Tourist mode. People watching. Probably end up at a bar anyway', emoji: '🚶' },
            { name: 'UT Tower Visit', desc: 'Culture! History! Stairs! So many stairs.', emoji: '🏛️' },
            { name: 'Drink at the Airbnb', desc: 'Doug already bought the beer. Path of least resistance.', emoji: '🍺' },
        ],
        resultPrefix: 'decides the activity',
        resultEmoji: '🎯',
        aftermath: [
            'The group ended up at {activity}. {winner} was insufferably smug about it.',
            'Despite 30 minutes of debate, {winner}\'s choice of {activity} was... actually perfect.',
            '{activity} it is. Two guys fell asleep by 10:15. Middle age is undefeated.',
            'They went to {activity}. Someone got a blister. Someone else got philosophical. Standard.',
        ]
    },
    {
        title: 'THE RENTAL CAR DEBATE',
        subtitle: 'Chapter 4: Logistics',
        description: 'Day 2. Getting around Austin.\n\nUber surge pricing is $47 for a 10-minute ride. A rental car is $89/day. But who drives? Who pays? Who\'s responsible when someone spills queso in the backseat?',
        question: 'The rental car question.',
        type: 'car_decision',
        options: [
            { name: 'Get the Rental', desc: 'Split it 6 ways. Someone drives sober. Democracy.' },
            { name: 'Uber Everything', desc: 'More expensive but zero responsibility. The American way.' },
            { name: 'One Guy Pays', desc: 'Someone with high Charisma convinces everyone he\'ll "just expense it"' },
            { name: 'Walk/Scooter', desc: 'Six middle-aged men on electric scooters. What could go wrong.' },
        ],
        resultPrefix: 'handles transportation',
        resultEmoji: '🚗',
        aftermath: [
            '{result} Someone still Venmo-requested everyone $4.37 three weeks later.',
            '{result} The group chat about splitting costs lasted longer than the actual trip.',
            '{result} {winner} drove the whole time and now has a permanent eye twitch from Austin traffic.',
            '{result} In the end, they walked 11 miles. Fitbit goals were crushed. Feet were destroyed.',
        ]
    }
];

// ==================== PHASER SCENES ====================

class BootScene extends Phaser.Scene {
    constructor() { super('Boot'); }

    create() {
        this.scene.start('Title');
    }
}

class TitleScene extends Phaser.Scene {
    constructor() { super('Title'); }

    create() {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        // Background
        this.cameras.main.setBackgroundColor(COLORS.bg);

        // Title
        const title = this.add.text(w / 2, h * 0.18, 'GROUP\nTHINK', {
            fontSize: '52px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#e94560',
            align: 'center',
            lineSpacing: 8,
        }).setOrigin(0.5);

        // Subtitle
        this.add.text(w / 2, h * 0.35, 'AUSTIN EDITION', {
            fontSize: '16px',
            fontFamily: 'Courier New, monospace',
            color: '#f5a623',
            align: 'center',
        }).setOrigin(0.5);

        this.add.text(w / 2, h * 0.40, '6 guys. 4 decisions. 0 good options.', {
            fontSize: '12px',
            fontFamily: 'Courier New, monospace',
            color: COLORS.dim,
            align: 'center',
        }).setOrigin(0.5);

        // Character roster
        let y = h * 0.48;
        NAMES.forEach((name, i) => {
            const c = CHARACTERS[name];
            const row = this.add.text(w / 2, y + i * 36, `${name}`, {
                fontSize: '16px',
                fontFamily: 'Courier New, monospace',
                fontStyle: 'bold',
                color: Phaser.Display.Color.IntegerToColor(c.color).rgba,
            }).setOrigin(0.5);

            this.add.text(w / 2, y + i * 36 + 17, `"${c.title}"`, {
                fontSize: '10px',
                fontFamily: 'Courier New, monospace',
                color: COLORS.dim,
            }).setOrigin(0.5);
        });

        // Start button
        const btnY = h * 0.88;
        const btn = this.add.rectangle(w / 2, btnY, 200, 50, COLORS.accent).setInteractive({ useHandCursor: true });
        const btnText = this.add.text(w / 2, btnY, 'BEGIN THE CHAOS', {
            fontSize: '14px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#fff',
        }).setOrigin(0.5);

        btn.on('pointerdown', () => {
            this.scene.start('CharacterSelect');
        });

        // Pulse animation on button
        this.tweens.add({
            targets: btn,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });

        // Version
        this.add.text(w / 2, h - 10, VERSION, {
            fontSize: '9px',
            fontFamily: 'Courier New, monospace',
            color: '#444',
        }).setOrigin(0.5);

        // Flicker title
        this.tweens.add({
            targets: title,
            alpha: 0.7,
            duration: 1500,
            yoyo: true,
            repeat: -1,
        });
    }
}

class CharacterSelectScene extends Phaser.Scene {
    constructor() { super('CharacterSelect'); }

    create() {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;
        this.cameras.main.setBackgroundColor(COLORS.bg);

        this.add.text(w / 2, 30, 'THE CREW', {
            fontSize: '28px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#e94560',
        }).setOrigin(0.5);

        this.add.text(w / 2, 58, 'Tap a name to view stats', {
            fontSize: '11px',
            fontFamily: 'Courier New, monospace',
            color: COLORS.dim,
        }).setOrigin(0.5);

        // Character cards
        const startY = 80;
        const cardH = 72;
        const padding = 6;

        NAMES.forEach((name, i) => {
            const c = CHARACTERS[name];
            const y = startY + i * (cardH + padding);

            const card = this.add.rectangle(w / 2, y + cardH / 2, w - 30, cardH, COLORS.panel, 0.9)
                .setInteractive({ useHandCursor: true })
                .setStrokeStyle(2, c.color, 0.6);

            // Name and title
            this.add.text(22, y + 10, name, {
                fontSize: '18px',
                fontFamily: 'Courier New, monospace',
                fontStyle: 'bold',
                color: Phaser.Display.Color.IntegerToColor(c.color).rgba,
            });

            this.add.text(22, y + 30, c.title, {
                fontSize: '10px',
                fontFamily: 'Courier New, monospace',
                color: COLORS.dim,
            });

            // Stats bar
            const stats = ['STR', 'DEX', 'WIS', 'CHA', 'CON', 'LCK'];
            const keys = ['str', 'dex', 'wis', 'cha', 'con', 'luck'];
            const barStartX = 22;
            const barY = y + 48;
            const barW = (w - 60) / 6;

            stats.forEach((stat, si) => {
                const val = c[keys[si]];
                const x = barStartX + si * barW;

                this.add.text(x, barY, stat, {
                    fontSize: '8px',
                    fontFamily: 'Courier New, monospace',
                    color: '#666',
                });

                // Stat bar background
                this.add.rectangle(x + 1, barY + 14, barW - 8, 8, 0x333333).setOrigin(0, 0.5);
                // Stat bar fill
                const fillW = ((val - 8) / 10) * (barW - 8); // normalize 8-18 range
                const barColor = val >= 15 ? COLORS.green : val >= 12 ? COLORS.gold : COLORS.accent;
                this.add.rectangle(x + 1, barY + 14, Math.max(fillW, 4), 8, barColor).setOrigin(0, 0.5);

                this.add.text(x + barW - 10, barY, `${val}`, {
                    fontSize: '9px',
                    fontFamily: 'Courier New, monospace',
                    color: '#aaa',
                    fontStyle: 'bold',
                });
            });

            card.on('pointerdown', () => {
                this.scene.start('CharacterDetail', { name });
            });
        });

        // Continue button
        const btnY = h - 40;
        const btn = this.add.rectangle(w / 2, btnY, 200, 44, COLORS.accent).setInteractive({ useHandCursor: true });
        this.add.text(w / 2, btnY, 'START SCENARIO 1', {
            fontSize: '13px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#fff',
        }).setOrigin(0.5);

        btn.on('pointerdown', () => {
            this.scene.start('Scenario', { scenarioIndex: 0, results: [] });
        });
    }
}

class CharacterDetailScene extends Phaser.Scene {
    constructor() { super('CharacterDetail'); }

    create(data) {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;
        const name = data.name;
        const c = CHARACTERS[name];

        this.cameras.main.setBackgroundColor(COLORS.bg);

        // Big name
        this.add.text(w / 2, 50, name, {
            fontSize: '36px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: Phaser.Display.Color.IntegerToColor(c.color).rgba,
        }).setOrigin(0.5);

        this.add.text(w / 2, 85, `"${c.title}"`, {
            fontSize: '14px',
            fontFamily: 'Courier New, monospace',
            color: COLORS.dim,
        }).setOrigin(0.5);

        // Quirk
        this.add.text(w / 2, 120, c.quirk, {
            fontSize: '11px',
            fontFamily: 'Courier New, monospace',
            color: '#f5a623',
            wordWrap: { width: w - 50 },
            align: 'center',
        }).setOrigin(0.5);

        // Full stat display
        const stats = [
            { label: 'STRENGTH', key: 'str', desc: 'Arm wrestling, carrying coolers, opening stuck jars' },
            { label: 'DEXTERITY', key: 'dex', desc: 'Reflexes, thumb wars, grabbing the last taco' },
            { label: 'WISDOM', key: 'wis', desc: 'Yelp reviews, navigation, "I told you so"' },
            { label: 'CHARISMA', key: 'cha', desc: 'Convincing the group, dad jokes, talking to waitstaff' },
            { label: 'CONSTITUTION', key: 'con', desc: 'Staying awake, hot sauce tolerance, couch endurance' },
            { label: 'LUCK', key: 'luck', desc: 'Coin tosses, finding parking, avoiding the couch' },
        ];

        let y = 165;
        stats.forEach(s => {
            const val = c[s.key];

            this.add.text(20, y, s.label, {
                fontSize: '12px',
                fontFamily: 'Courier New, monospace',
                fontStyle: 'bold',
                color: COLORS.text,
            });

            this.add.text(w - 20, y, `${val}`, {
                fontSize: '16px',
                fontFamily: 'Courier New, monospace',
                fontStyle: 'bold',
                color: val >= 15 ? '#4ecca3' : val >= 12 ? '#f5a623' : '#e94560',
            }).setOrigin(1, 0);

            // Bar
            const barY = y + 20;
            this.add.rectangle(20, barY, w - 40, 10, 0x333333).setOrigin(0, 0.5);
            const fill = ((val - 8) / 10) * (w - 40);
            const col = val >= 15 ? COLORS.green : val >= 12 ? COLORS.gold : COLORS.accent;
            this.add.rectangle(20, barY, Math.max(fill, 5), 10, col).setOrigin(0, 0.5);

            this.add.text(20, barY + 10, s.desc, {
                fontSize: '9px',
                fontFamily: 'Courier New, monospace',
                color: '#666',
            });

            y += 58;
        });

        // Back button
        const btn = this.add.rectangle(w / 2, h - 40, 160, 40, COLORS.dark).setInteractive({ useHandCursor: true })
            .setStrokeStyle(1, COLORS.accent);
        this.add.text(w / 2, h - 40, '← BACK', {
            fontSize: '13px',
            fontFamily: 'Courier New, monospace',
            color: '#fff',
        }).setOrigin(0.5);

        btn.on('pointerdown', () => {
            this.scene.start('CharacterSelect');
        });
    }
}

class ScenarioScene extends Phaser.Scene {
    constructor() { super('Scenario'); }

    create(data) {
        this.scenarioIndex = data.scenarioIndex;
        this.results = data.results || [];
        const scenario = SCENARIOS[this.scenarioIndex];

        const w = this.cameras.main.width;
        const h = this.cameras.main.height;
        this.cameras.main.setBackgroundColor(COLORS.bg);

        // Chapter header
        this.add.text(w / 2, 25, scenario.subtitle.toUpperCase(), {
            fontSize: '11px',
            fontFamily: 'Courier New, monospace',
            color: COLORS.dim,
            letterSpacing: 4,
        }).setOrigin(0.5);

        this.add.text(w / 2, 55, scenario.title, {
            fontSize: '24px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#e94560',
            align: 'center',
        }).setOrigin(0.5);

        // Description
        const descText = this.add.text(w / 2, 85, scenario.description, {
            fontSize: '11px',
            fontFamily: 'Courier New, monospace',
            color: COLORS.text,
            wordWrap: { width: w - 40 },
            align: 'center',
            lineSpacing: 3,
        }).setOrigin(0.5, 0);

        // Question — positioned dynamically after description
        const qY = descText.y + descText.height + 15;
        this.add.text(w / 2, qY, scenario.question, {
            fontSize: '14px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#f5a623',
            align: 'center',
        }).setOrigin(0.5);

        // Options — dynamically positioned, sized to fit remaining space
        const optStartY = qY + 30;
        const availableH = h - optStartY - 15;
        const optPad = 8;
        const optH = Math.min(65, (availableH - optPad * 3) / 4);

        scenario.options.forEach((opt, i) => {
            const y = optStartY + i * (optH + optPad);
            const btn = this.add.rectangle(w / 2, y + optH / 2, w - 30, optH, COLORS.panel, 0.9)
                .setInteractive({ useHandCursor: true })
                .setStrokeStyle(1, COLORS.dark);

            const label = opt.emoji ? `${opt.emoji} ${opt.name}` : opt.name;
            this.add.text(25, y + 12, label, {
                fontSize: '14px',
                fontFamily: 'Courier New, monospace',
                fontStyle: 'bold',
                color: COLORS.text,
            });

            this.add.text(25, y + 32, opt.desc, {
                fontSize: '10px',
                fontFamily: 'Courier New, monospace',
                color: COLORS.dim,
                wordWrap: { width: w - 60 },
            });

            btn.on('pointerover', () => btn.setStrokeStyle(2, COLORS.accent));
            btn.on('pointerout', () => btn.setStrokeStyle(1, COLORS.dark));
            btn.on('pointerdown', () => {
                this.handleChoice(i, opt);
            });
        });
    }

    handleChoice(index, option) {
        const scenario = SCENARIOS[this.scenarioIndex];

        if (scenario.type === 'eliminate_one') {
            // Two random people duel, loser gets the couch
            this.scene.start('Resolution', {
                scenarioIndex: this.scenarioIndex,
                results: this.results,
                choiceIndex: index,
                option: option,
                mode: 'eliminate',
            });
        } else if (scenario.type === 'pick_one') {
            if (index === 3) {
                // Battle royale
                this.scene.start('Resolution', {
                    scenarioIndex: this.scenarioIndex,
                    results: this.results,
                    choiceIndex: index,
                    option: option,
                    mode: 'duel',
                });
            } else {
                // Stat-based pick
                const statMap = ['wis', 'dex', 'cha'];
                const stat = statMap[index];
                let best = null;
                let bestVal = 0;
                NAMES.forEach(name => {
                    if (CHARACTERS[name][stat] > bestVal) {
                        bestVal = CHARACTERS[name][stat];
                        best = name;
                    }
                });
                this.scene.start('Result', {
                    scenarioIndex: this.scenarioIndex,
                    results: this.results,
                    winner: best,
                    method: `Highest ${stat.toUpperCase()} (${bestVal})`,
                    flavor: `${best} had the highest ${stat.toUpperCase()} at ${bestVal}. The group reluctantly agrees.`,
                    choiceIndex: index,
                });
            }
        } else if (scenario.type === 'pick_activity') {
            this.scene.start('Resolution', {
                scenarioIndex: this.scenarioIndex,
                results: this.results,
                choiceIndex: index,
                option: option,
                mode: 'champion',
                activityName: option.name,
            });
        } else if (scenario.type === 'car_decision') {
            this.scene.start('Resolution', {
                scenarioIndex: this.scenarioIndex,
                results: this.results,
                choiceIndex: index,
                option: option,
                mode: 'decide',
                decisionName: option.name,
            });
        }
    }
}

class ResolutionScene extends Phaser.Scene {
    constructor() { super('Resolution'); }

    create(data) {
        this.data_pass = data;
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;
        this.cameras.main.setBackgroundColor(COLORS.bg);

        // Pick a random method
        const method = Phaser.Utils.Array.GetRandom(METHODS);

        // Pick two random contestants
        const shuffled = Phaser.Utils.Array.Shuffle([...NAMES]);
        const fighter1 = shuffled[0];
        const fighter2 = shuffled[1];

        this.add.text(w / 2, 30, 'RESOLUTION', {
            fontSize: '12px',
            fontFamily: 'Courier New, monospace',
            color: COLORS.dim,
        }).setOrigin(0.5);

        this.add.text(w / 2, 60, `${method.icon} ${method.name}`, {
            fontSize: '22px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#f5a623',
        }).setOrigin(0.5);

        this.add.text(w / 2, 88, method.desc, {
            fontSize: '10px',
            fontFamily: 'Courier New, monospace',
            color: COLORS.dim,
            wordWrap: { width: w - 40 },
            align: 'center',
        }).setOrigin(0.5);

        this.add.text(w / 2, 115, `Uses: ${method.stat.toUpperCase()}`, {
            fontSize: '10px',
            fontFamily: 'Courier New, monospace',
            color: '#e94560',
        }).setOrigin(0.5);

        // VS display
        const c1 = CHARACTERS[fighter1];
        const c2 = CHARACTERS[fighter2];
        const vsY = 180;

        // Fighter 1
        this.add.text(w * 0.25, vsY - 20, fighter1, {
            fontSize: '18px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: Phaser.Display.Color.IntegerToColor(c1.color).rgba,
            align: 'center',
        }).setOrigin(0.5);

        this.add.text(w * 0.25, vsY + 8, `${method.stat.toUpperCase()}: ${c1[method.stat]}`, {
            fontSize: '14px',
            fontFamily: 'Courier New, monospace',
            color: COLORS.text,
        }).setOrigin(0.5);

        // VS
        const vsText = this.add.text(w * 0.5, vsY, 'VS', {
            fontSize: '24px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#e94560',
        }).setOrigin(0.5);

        this.tweens.add({
            targets: vsText,
            scaleX: 1.3,
            scaleY: 1.3,
            duration: 500,
            yoyo: true,
            repeat: -1,
        });

        // Fighter 2
        this.add.text(w * 0.75, vsY - 20, fighter2, {
            fontSize: '18px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: Phaser.Display.Color.IntegerToColor(c2.color).rgba,
            align: 'center',
        }).setOrigin(0.5);

        this.add.text(w * 0.75, vsY + 8, `${method.stat.toUpperCase()}: ${c2[method.stat]}`, {
            fontSize: '14px',
            fontFamily: 'Courier New, monospace',
            color: COLORS.text,
        }).setOrigin(0.5);

        // Roll button
        const btnY = 270;
        const btn = this.add.rectangle(w / 2, btnY, 220, 50, COLORS.accent).setInteractive({ useHandCursor: true });
        const btnLabel = this.add.text(w / 2, btnY, '🎲 ROLL FOR IT', {
            fontSize: '16px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#fff',
        }).setOrigin(0.5);

        this.tweens.add({
            targets: btn,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });

        btn.on('pointerdown', () => {
            btn.disableInteractive();
            this.resolve(fighter1, fighter2, method, btnY + 50);
        });
    }

    resolve(f1, f2, method, startY) {
        const w = this.cameras.main.width;
        const c1 = CHARACTERS[f1];
        const c2 = CHARACTERS[f2];

        // Roll with stat modifier
        const roll1 = Phaser.Math.Between(1, 20) + Math.floor((c1[method.stat] - 10) / 2);
        const roll2 = Phaser.Math.Between(1, 20) + Math.floor((c2[method.stat] - 10) / 2);

        // Animate rolling
        let rollCount = 0;
        const rollText1 = this.add.text(w * 0.25, startY + 20, '?', {
            fontSize: '28px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#fff',
        }).setOrigin(0.5);

        const rollText2 = this.add.text(w * 0.75, startY + 20, '?', {
            fontSize: '28px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#fff',
        }).setOrigin(0.5);

        const timer = this.time.addEvent({
            delay: 80,
            repeat: 15,
            callback: () => {
                rollCount++;
                if (rollCount <= 15) {
                    rollText1.setText(Phaser.Math.Between(1, 20).toString());
                    rollText2.setText(Phaser.Math.Between(1, 20).toString());
                }
                if (rollCount === 15) {
                    rollText1.setText(roll1.toString());
                    rollText2.setText(roll2.toString());

                    const winner = roll1 >= roll2 ? f1 : f2;
                    const loser = roll1 >= roll2 ? f2 : f1;

                    // Highlight winner
                    rollText1.setColor(roll1 >= roll2 ? '#4ecca3' : '#e94560');
                    rollText2.setColor(roll2 > roll1 ? '#4ecca3' : '#e94560');

                    const flavorText = Phaser.Utils.Array.GetRandom(method.flavor)
                        .replace('{winner}', winner)
                        .replace('{loser}', loser);

                    this.add.text(w / 2, startY + 70, flavorText, {
                        fontSize: '11px',
                        fontFamily: 'Courier New, monospace',
                        color: '#f5a623',
                        wordWrap: { width: w - 40 },
                        align: 'center',
                        lineSpacing: 4,
                    }).setOrigin(0.5, 0);

                    // Determine the actual result based on mode
                    let resultWinner, resultLoser;
                    if (this.data_pass.mode === 'eliminate') {
                        resultWinner = winner; // winner of duel is safe
                        resultLoser = loser;   // loser gets the couch
                    } else {
                        resultWinner = winner; // winner picks
                        resultLoser = loser;
                    }

                    // Continue button
                    const h = this.cameras.main.height;
                    this.time.delayedCall(1500, () => {
                        const cBtnY = Math.min(startY + 160, h - 40);
                        const cBtn = this.add.rectangle(w / 2, cBtnY, 200, 44, COLORS.green)
                            .setInteractive({ useHandCursor: true });
                        this.add.text(w / 2, cBtnY, 'SEE RESULT →', {
                            fontSize: '13px',
                            fontFamily: 'Courier New, monospace',
                            fontStyle: 'bold',
                            color: '#000',
                        }).setOrigin(0.5);

                        cBtn.on('pointerdown', () => {
                            this.scene.start('Result', {
                                scenarioIndex: this.data_pass.scenarioIndex,
                                results: this.data_pass.results,
                                winner: resultWinner,
                                loser: resultLoser,
                                method: `${method.icon} ${method.name}`,
                                flavor: flavorText,
                                choiceIndex: this.data_pass.choiceIndex,
                                activityName: this.data_pass.activityName,
                                decisionName: this.data_pass.decisionName,
                            });
                        });
                    });
                }
            }
        });
    }
}

class ResultScene extends Phaser.Scene {
    constructor() { super('Result'); }

    create(data) {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;
        const scenario = SCENARIOS[data.scenarioIndex];

        this.cameras.main.setBackgroundColor(COLORS.bg);

        // Result header
        this.add.text(w / 2, 30, scenario.title, {
            fontSize: '16px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: COLORS.dim,
        }).setOrigin(0.5);

        this.add.text(w / 2, 55, 'RESULT', {
            fontSize: '28px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#e94560',
        }).setOrigin(0.5);

        // Method used
        this.add.text(w / 2, 85, `Resolved by: ${data.method}`, {
            fontSize: '11px',
            fontFamily: 'Courier New, monospace',
            color: COLORS.dim,
        }).setOrigin(0.5);

        // Main result
        let mainResult = '';
        let resultKey = data.winner;
        if (scenario.type === 'eliminate_one') {
            mainResult = `${scenario.resultEmoji} ${data.loser}\n${scenario.resultPrefix}`;
            resultKey = data.loser;
        } else {
            mainResult = `${scenario.resultEmoji} ${data.winner}\n${scenario.resultPrefix}`;
        }

        const resultText = this.add.text(w / 2, 140, mainResult, {
            fontSize: '20px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#4ecca3',
            align: 'center',
            lineSpacing: 6,
        }).setOrigin(0.5);

        // Animate result in
        resultText.setScale(0);
        this.tweens.add({
            targets: resultText,
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            ease: 'Back.easeOut',
        });

        // Aftermath flavor text
        let afterText = Phaser.Utils.Array.GetRandom(scenario.aftermath);
        afterText = afterText
            .replace('{loser}', data.loser || '???')
            .replace('{winner}', data.winner || '???')
            .replace('{activity}', data.activityName || 'the chosen activity')
            .replace('{result}', `They went with: ${data.decisionName || 'the plan'}.`);

        this.add.text(w / 2, 210, afterText, {
            fontSize: '11px',
            fontFamily: 'Courier New, monospace',
            color: '#f5a623',
            wordWrap: { width: w - 40 },
            align: 'center',
            lineSpacing: 4,
        }).setOrigin(0.5, 0);

        // Save result
        const results = [...data.results, {
            scenario: scenario.title,
            winner: data.winner,
            loser: data.loser,
            method: data.method,
            activity: data.activityName,
            decision: data.decisionName,
        }];

        // Next or summary button
        const isLast = data.scenarioIndex >= SCENARIOS.length - 1;
        const btnY = h - 50;
        const btnLabel = isLast ? 'VIEW TRIP SUMMARY' : 'NEXT DECISION →';
        const btnColor = isLast ? COLORS.gold : COLORS.accent;

        const btn = this.add.rectangle(w / 2, btnY, 220, 48, btnColor).setInteractive({ useHandCursor: true });
        this.add.text(w / 2, btnY, btnLabel, {
            fontSize: '13px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: isLast ? '#000' : '#fff',
        }).setOrigin(0.5);

        btn.on('pointerdown', () => {
            if (isLast) {
                this.scene.start('Summary', { results });
            } else {
                this.scene.start('Scenario', {
                    scenarioIndex: data.scenarioIndex + 1,
                    results,
                });
            }
        });
    }
}

class SummaryScene extends Phaser.Scene {
    constructor() { super('Summary'); }

    create(data) {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;
        const results = data.results;

        this.cameras.main.setBackgroundColor(COLORS.bg);

        this.add.text(w / 2, 30, 'TRIP REPORT', {
            fontSize: '24px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#e94560',
        }).setOrigin(0.5);

        this.add.text(w / 2, 55, 'Austin, TX — The Decisions That Defined Us', {
            fontSize: '10px',
            fontFamily: 'Courier New, monospace',
            color: COLORS.dim,
        }).setOrigin(0.5);

        let y = 85;
        results.forEach((r, i) => {
            const scenario = SCENARIOS[i];

            this.add.rectangle(w / 2, y + 32, w - 24, 64, COLORS.panel, 0.8)
                .setStrokeStyle(1, COLORS.dark);

            this.add.text(20, y + 8, `${scenario.resultEmoji} ${r.scenario}`, {
                fontSize: '11px',
                fontFamily: 'Courier New, monospace',
                fontStyle: 'bold',
                color: '#e94560',
            });

            let detail = '';
            if (scenario.type === 'eliminate_one') {
                detail = `${r.loser} got the couch`;
            } else if (r.activity) {
                detail = `${r.winner} chose: ${r.activity}`;
            } else if (r.decision) {
                detail = `${r.winner} decided: ${r.decision}`;
            } else {
                detail = `${r.winner} won`;
            }

            this.add.text(20, y + 26, detail, {
                fontSize: '12px',
                fontFamily: 'Courier New, monospace',
                color: '#4ecca3',
            });

            this.add.text(20, y + 44, `Via: ${r.method}`, {
                fontSize: '9px',
                fontFamily: 'Courier New, monospace',
                color: COLORS.dim,
            });

            y += 78;
        });

        // Count wins/losses
        const tally = {};
        NAMES.forEach(n => tally[n] = { wins: 0, losses: 0 });
        results.forEach(r => {
            if (r.winner && tally[r.winner]) tally[r.winner].wins++;
            if (r.loser && tally[r.loser]) tally[r.loser].losses++;
        });

        // MVP
        let mvp = NAMES[0];
        NAMES.forEach(n => {
            if (tally[n].wins > tally[mvp].wins) mvp = n;
        });

        y += 10;
        this.add.text(w / 2, y, `🏆 TRIP MVP: ${mvp}`, {
            fontSize: '16px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#f5a623',
        }).setOrigin(0.5);

        this.add.text(w / 2, y + 25, `${tally[mvp].wins} decision(s) won`, {
            fontSize: '11px',
            fontFamily: 'Courier New, monospace',
            color: COLORS.dim,
        }).setOrigin(0.5);

        // Replay button
        const btn = this.add.rectangle(w / 2, h - 45, 200, 44, COLORS.accent)
            .setInteractive({ useHandCursor: true });
        this.add.text(w / 2, h - 45, '↻ PLAY AGAIN', {
            fontSize: '14px',
            fontFamily: 'Courier New, monospace',
            fontStyle: 'bold',
            color: '#fff',
        }).setOrigin(0.5);

        btn.on('pointerdown', () => {
            this.scene.start('Title');
        });

        // Footer
        this.add.text(w / 2, h - 12, `Group Think — Austin Edition ${VERSION}`, {
            fontSize: '8px',
            fontFamily: 'Courier New, monospace',
            color: '#444',
        }).setOrigin(0.5);
    }
}

// ==================== GAME CONFIG ====================

const config = {
    type: Phaser.AUTO,
    width: 390,
    height: 700,
    parent: 'game-container',
    backgroundColor: COLORS.bg,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [
        BootScene,
        TitleScene,
        CharacterSelectScene,
        CharacterDetailScene,
        ScenarioScene,
        ResolutionScene,
        ResultScene,
        SummaryScene,
    ],
};

const game = new Phaser.Game(config);
