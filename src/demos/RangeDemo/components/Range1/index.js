import React from 'react'
import {useSpring, animated} from '@react-spring/web'
import {useDrag} from 'react-use-gesture'

function Range1() {
    const [{x, velocity}, set] = useSpring(() => ({
        x: -30,
        velocity: 0,
    }));
    const bind = useDrag(
        ({movement: [x], velocity, down, direction: [dx]}) => {
            if (!down) {
                set({x, velocity: 0});
            } else {
                set({x, velocity: velocity * dx});
            }
        },
        {
            initial: () => [x.get(), 0],
            bounds: {left: -30, right: 150, top: 0, bottom: 0},
            rubberband: false,
        }
    );

    const containerStyle = {
        position: "relative",
        width: 200,
    };

    const barStyle = {
        position: "relative",
        top: 21,
        width: "100%",
        height: 3,
        backgroundColor: "#333",
    };

    return (
        <div style={containerStyle}>
            <div style={barStyle}/>
            <animated.svg
                {...bind()}
                viewBox="0 0 80 40"
                height="40"
                width="80"
                style={{x, cursor: "pointer"}}
            >
                <animated.path
                    d={
                        velocity &&
                        velocity.to({
                            range: [-0.2, 0, 0.2],
                            output: [
                                "M 80,20 C 63.368724,20 53.321068,27.492534 50.606602,30.207 47.892136,32.921466 44.142136,35 40,35 35.857864,35 32.107864,33.321068 29.393398,30.606602 26.678932,27.892136 26,24.142136 26,20 26,15.857864 26.678932,12.107864 29.393398,9.393398 32.107864,6.678932 35.857864,5 40,5 44.142136,5 47.892136,7.078534 50.606602,9.793 53.321068,12.507466 63.368724,20 80,20 Z",
                                "M 50,20 C 50,22.761424 48.880712,25.261424 47.071068,27.071068 45.261424,28.880712 42.761424,30 40,30 37.238576,30 34.738576,28.880712 32.928932,27.071068 31.119288,25.261424 30,22.761424 30,20 30,17.238576 31.119288,14.738576 32.928932,12.928932 34.738576,11.119288 37.238576,10 40,10 42.761424,10 45.261424,11.119288 47.071068,12.928932 48.880712,14.738576 50,17.238576 50,20 Z",
                                "M 54,20 C 54,24.142136 53.321068,27.892136 50.606602,30.606602 47.892136,33.321068 44.142136,35 40,35 35.857864,35 32.107864,32.921466 29.393398,30.207 26.678932,27.492534 16.636814,20 0,20 16.636813,20 26.678932,12.507466 29.393398,9.793 32.107864,7.078534 35.857864,5 40,5 44.142136,5 47.892136,6.678932 50.606602,9.393398 53.321068,12.107864 54,15.857864 54,20 Z",
                            ],
                            extrapolate: "clamp",
                        })
                    }
                />
            </animated.svg>
        </div>
    );
}

export default Range1
