import { createPendulum } from './pendulum.js'; // モジュールをインポート

// モジュールのインポート
const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner;

      

// 物理エンジンの初期化と開始
function startPhysicsEngine() {
    const engine = Engine.create();
    // engine.world.gravity.y = 0.8;
    const world = engine.world;

    const render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false
        }
    });

    Render.run(render);

    // ランナーを作成し、エンジンを実行
    const runner = Runner.create();
    Runner.run(runner, engine);

    // 衝突イベントのリスナーを設定
    Matter.Events.on(engine, 'collisionStart', function(event) {
        const randomIndex = Math.floor(Math.random() * collisionSounds.length);
        const randomSound = collisionSounds[randomIndex];

        // 音声をリセットして再生
        randomSound.currentTime = 0;
        randomSound.play();
    });

    const gap = 60;

    const pendulums = [
        { x: window.innerWidth / 2 - 2 * gap, angle: parseFloat(document.getElementById('angle1').value), density: parseFloat(document.getElementById('density1').value) },
        { x: window.innerWidth / 2 - gap, angle: parseFloat(document.getElementById('angle2').value), density: parseFloat(document.getElementById('density2').value) },
        { x: window.innerWidth / 2, angle: parseFloat(document.getElementById('angle3').value), density: parseFloat(document.getElementById('density3').value) },
        { x: window.innerWidth / 2 + gap, angle: parseFloat(document.getElementById('angle4').value), density: parseFloat(document.getElementById('density4').value) },
        { x: window.innerWidth / 2 + 2 * gap, angle: parseFloat(document.getElementById('angle5').value), density: parseFloat(document.getElementById('density5').value) }
    ];
    
    pendulums.forEach(({ x, angle, density }) => 
        createPendulum(world, x, 100, 400, 20, angle, density)
    );

    // ウィンドウサイズ変更時にキャンバスの大きさを調整
    window.addEventListener('resize', () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
    });
}

const sounds = {
    collision: [new Audio('collision.mp3')],
    paypay: [new Audio('paypay.mp3')],
    piano: [
        new Audio('piano2_1do.mp3'),
        new Audio('piano2_3mi.mp3'),
        new Audio('piano2_5so.mp3')
    ]
};

let collisionSounds = sounds.collision;

const soundGroupSelector = document.getElementById('soundGroupSelector');
let selectedGroup = 'collision';  // デフォルトのサウンドグループは"collision"

soundGroupSelector.addEventListener('change', (event) => {
    selectedGroup = event.target.value;
    collisionSounds = sounds[selectedGroup];
    console.log('selectedGroup:', selectedGroup);
});

// スタートボタンのクリックで物理エンジンを開始
document.getElementById('startButton').addEventListener('click', startPhysicsEngine);
