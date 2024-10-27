const { Bodies, Constraint, World } = Matter;

// 振り子を作成する関数
function createPendulum(world, x, y, length, radius, initialAngle, density = 0.01) {
    console.log('createPendulum');
    
    // 角度に基づいて円の初期位置を計算
    const circleX = x + length * Math.sin(initialAngle);
    const circleY = y + length * Math.cos(initialAngle);

    const circle = Bodies.circle(circleX, circleY, radius, {
        restitution: 1.4,
        density: density,
        friction: 0 // 摩擦を追加
    });
    
    const point = { x: x, y: y };

    const pendulum = Constraint.create({
        pointA: point,
        bodyB: circle,
        length: length,
        stiffness: 1 // 剛性を設定
    });

    // 振り子と地面をワールドに追加
    World.add(world, [circle, pendulum]);

    return { circle, pendulum }; // 振り子のオブジェクトを返す
}

// モジュールのエクスポート
export { createPendulum };