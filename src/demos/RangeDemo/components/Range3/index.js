import React, {useState} from 'react'
import {useSpring, animated} from '@react-spring/web'
import {useDrag} from 'react-use-gesture'

function Range3() {
    const [active, setActive] = useState(false);
    const {morph} = useSpring({
        config: {duration: 250},
        morph: active ? 1 : 0,
    });
    const [{x, velocity}, set] = useSpring(() => ({
        x: -23,
        velocity: 0,
    }));
    const bind = useDrag(
        ({movement: [x], velocity, down, direction: [dx]}) => {
            if (down !== active) {
                setActive(down);
            }

            if (!down) {
                set({x, velocity: 0});
            } else {
                set({x, velocity: velocity * dx});
            }
        },
        {
            initial: () => [x.get(), 0],
            bounds: {left: -23, right: 174, top: 0, bottom: 0},
            rubberband: false,
        }
    );

    const containerStyle = {
        width: 200,
        position: "relative",
    };

    const barStyle = {
        backgroundColor: "#333",
        height: 3,
        position: "relative",
        top: 26,
        width: "100%",
    };

    const handleStyle = {
        cursor: "pointer",
        height: 50,
        position: "relative",
        width: 50,
        x,
        transform: velocity.to((v) => `rotate(${-v * 80}deg)`),
    };

    const knobStyle = {
        backgroundColor: "#000",
        height: 16,
        left: 23,
        position: "absolute",
        top: 17,
        width: 3,
    };

    const countStyle = {
        color: "#fff",
        fontWeight: 800,
        left: 0,
        position: "relative",
        textAlign: "center",
        top: -37,
        transform: morph.to((n) => `translateY(${n * -26}px) scale(${n})`),
        userSelect: "none",
    };

    return (
        <div style={containerStyle}>
            <div style={barStyle}></div>
            <animated.div {...bind()} style={handleStyle}>
                <div style={knobStyle}></div>
                <animated.svg
                    viewBox="0 0 50 50"
                    height="50"
                    width="50"
                    style={{
                        left: 1,
                        transform: morph.to((n) => `translateY(${n * -36}px)`),
                    }}
                >
                    <animated.path
                        d={morph.to({
                            range: [0, 1],
                            output: [
                                "M 24.999,33 C 22.761951,32.913543 20.770534,31.995958 19.334212,30.558779 17.897891,29.1216 17.016665,27.164829 17,25 17.043202,23.881539 17.294124,22.824393 17.713861,21.867286 18.133598,20.91018 18.722149,20.053113 19.440608,19.334812 19.799838,18.975661 20.191544,18.651202 20.610864,18.366276 21.030183,18.081349 21.477117,17.835954 21.946801,17.634932 22.416485,17.43391 22.908919,17.277261 23.41924,17.169825 23.929561,17.06239 24.457768,17.004167 24.999,17 25.558246,17.021622 26.102176,17.095181 26.625944,17.215811 27.149712,17.336441 27.65332,17.504141 28.131923,17.714049 28.610526,17.923956 29.064124,18.176071 29.487873,18.465528 29.911623,18.754985 30.305523,19.081784 30.664732,19.441061 31.383149,20.159616 31.962798,21.008081 32.364926,21.947542 32.767054,22.887004 32.991662,23.917462 33,25 32.913456,27.237113 31.995695,29.228778 30.558326,30.665332 29.120957,32.101886 27.163979,32.983329 24.999,33 Z",
                                "M 24.580217,50 C 14.571273,50 11.294783,44.010063 9.7053216,38.238388 8.1158608,32.466714 10.676705,29.35226 13.183288,24.707728 15.68987,20.063197 16.477637,12.710112 24.407732,10.663023 24.657934,8.1668326 25.133408,7.1854365 25.133408,7.1854365 24.776076,5.8131685 23.948404,5.5799126 22.92924,5.4792177 20.503809,8.0169291 18.00552,10.358603 14.091398,11.82308 10.177275,13.287556 9.3782358,14.578206 0,13.698991 0.59973686,10.038646 4.2370498,5.2724116 8.457899,3.5411585 15.031452,0.84490419 20.157099,3.3554205 22.662419,4.7979408 24.207807,4.7911246 24.633523,4.8205281 25.419434,6.1107045 25.419434,6.1107045 25.744879,3.9869721 30.223895,0 31.045807,0.46018846 31.191151,0.9035148 31.484329,1.8969883 28.997743,2.4347893 25.713887,6.1519543 25.759598,10.663049 33.32097,11.205298 33.511134,17.17982 35.99945,21.822249 38.487765,26.464678 42.033433,32.553304 40.278655,38.343258 38.523877,44.133212 35.999792,50 24.580217,50 Z",
                            ],
                        })}
                    />
                </animated.svg>
                <animated.div style={countStyle}>
                    {x.to((x) => Math.round((x + 23) / 1.97))}
                </animated.div>
            </animated.div>
        </div>
    );
}

export default Range3
