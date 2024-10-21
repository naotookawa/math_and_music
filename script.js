import { createPendulum } from './pendulum.js'; // モジュールをインポート

// モジュールのインポート
const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner;

      

// 物理エンジンの初期化と開始
function startPhysicsEngine() {
    const engine = Engine.create();
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

    const collisionSound = new Audio('collision.mp3'); 

    // 衝突イベントのリスナーを設定
    Matter.Events.on(engine, 'collisionStart', function(event) {
        // 音声を再生
        collisionSound.currentTime = 0; // 音声をリセット
        collisionSound.play(); // 音声を再生
    });

    const gap = 80;
    // 複数の振り子を作成
    const pendulums = [
        { x: window.innerWidth / 2 - 2*gap, angle: -Math.PI / 3, density: 0.1 },
        { x: window.innerWidth / 2 - gap, angle: 0, density: 0.01 },
        { x: window.innerWidth / 2, angle: 0, density: 0.01 },
        { x: window.innerWidth / 2 + gap, angle: 0, density: 0.01 },
        { x: window.innerWidth / 2 + 2*gap, angle: 0, density: 0.01 }
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

// スタートボタンのクリックで物理エンジンを開始
document.getElementById('startButton').addEventListener('click', startPhysicsEngine);
