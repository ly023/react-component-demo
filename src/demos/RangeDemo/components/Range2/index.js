import React, {useState} from 'react'
import {useSpring, animated} from '@react-spring/web'
import {useDrag} from 'react-use-gesture'

function Range2() {
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
        position: "relative",
        width: 200,
    };

    const barStyle = {
        position: "relative",
        top: 26,
        width: "100%",
        height: 3,
        backgroundColor: "#333",
    };

    const handleStyle = {
        position: "relative",
        width: 50,
        height: 50,
        x,
        cursor: 'pointer',
    };

    const knobStyle = {
        position: "absolute",
        top: 17,
        left: 23,
        width: 3,
        height: 16,
        backgroundColor: "#000",
    };

    const countStyle = {
        position: "relative",
        top: -37,
        left: 0,
        color: "#fff",
        fontWeight: 800,
        textAlign: "center",
        transform: morph.to((n) => `translateY(${n * -39}px) scale(${n})`),
        userSelect: 'none',
    };

    return (
        <div style={containerStyle}>
            <div style={barStyle}/>
            <animated.div {...bind()} style={handleStyle}>
                <div style={knobStyle}/>
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
                                "M 33,25.001 C 33,29.419278 29.418278,33 25,33 20.581722,33 17,29.419278 17,25.001 17,20.582722 20.581722,17 25,17 29.418278,17 33,20.582722 33,25.001 Z",
                                "M 45,20 C 45,31.045695 32.089401,45 25,45 17.910599,45 5,31.045695 5,20 5,8.954305 13.954305,5 25,5 36.045695,5 45,8.954305 45,20 Z",
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

export default Range2
