import {useState} from 'react';
import state from '../state'

const CameraButtons = () => {
    const [focusIndex, setFocusIndex] = useState(2);
    const [angleIndex, setAngleIndex] = useState(0);
    const sets = [
        {
            name: "Object_6",
            label: "Roadster",
            angles: [
                { label: "Dynamic", cameraPos: [-8, 2, 5], target: [-12, 0, 0] },
                { label: "Front", cameraPos: [-12, 2, 8], target: [-12, 0, 0] },
                { label: "Side", cameraPos: [-5, 2, 0], target: [-12, 0, 0] },
                { label: "Top", cameraPos: [-12, 7, 0], target: [-12, 0, 0] },
                { label: "Rear", cameraPos: [-12, 2, -8], target: [-12, 0, 0] }
            ]
        },
        {
            name: "object005_bod_0",
            label: "Model S",
            angles: [
                { label: "Dynamic", cameraPos: [0, 2, 5], target: [-4, 0, 0] },
                { label: "Front", cameraPos: [-4, 2, 8], target: [-4, 0, 0] },
                { label: "Side", cameraPos: [3, 2, 0], target: [-4, 0, 0] },
                { label: "Top", cameraPos: [-4, 7, 0], target: [-4, 0, 0] },
                { label: "Rear", cameraPos: [-4, 2, -8], target: [-4, 0, 0] }
            ]
        },
        {
            name: "Capot001_CAR_PAINT_0",
            label: "Model 3",
            angles: [
                { label: "Dynamic", cameraPos: [8, 2, 5], target: [4, 0, 0] },
                { label: "Front", cameraPos: [4, 2, 8], target: [4, 0, 0] },
                { label: "Side", cameraPos: [11, 2, 0], target: [4, 0, 0] },
                { label: "Top", cameraPos: [4, 7, 0], target: [4, 0, 0] },
                { label: "Rear", cameraPos: [4, 2, -8], target: [4, 0, 0] }
            ]
        }
    ];

    const updateCamera = (carIndex, angleIndex) => {
        const { cameraPos, target } = sets[carIndex].angles[angleIndex];
        state.cameraPos.set(...cameraPos);
        state.target.set(...target);
        state.activeMeshName = sets[carIndex].name;
        state.shouldUpdate = true;
    };

        const containerStyle = {
        position: 'absolute',
        bottom: '5vh',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        zIndex: 1
    };

    const carSelectorStyle = {
        display: 'flex',
        gap: '10px',
        marginBottom: '10px'
    };

    const carButtonStyle = {
        padding: '8px 20px',
        backgroundColor: 'rgba(40, 40, 40, 0.85)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)',
        textTransform: 'capitalize',
        fontWeight: 'normal'
    };

    const activeCarButtonStyle = {
        ...carButtonStyle,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        fontWeight: 'bold'
    };

    const angleGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '10px',
        padding: '15px',
        backgroundColor: 'rgba(40, 40, 40, 0.85)',
        borderRadius: '15px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
    };

    const angleButtonStyle = {
        width: '60px',
        height: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(60, 60, 60, 0.85)',
        color: 'white',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '12px',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        outline: '1px solid rgba(255, 255, 255, 0.1)'
    };

    const activeAngleButtonStyle = {
        ...angleButtonStyle,
        backgroundColor: 'rgba(80, 80, 80, 0.95)',
        transform: 'scale(1.1)',
        border: '2px solid white'
    };

    return (
        <div style={containerStyle}>
            <div style={carSelectorStyle}>
                {sets.map((car, index) => (
                    <button
                        key={car.name}
                        onClick={() => {
                            setFocusIndex(index);
                            setAngleIndex(0);
                            updateCamera(index, 0);
                        }}
                        style={index === focusIndex ? activeCarButtonStyle : carButtonStyle}
                    >
                        {car.label}
                    </button>
                ))}
            </div>
            <div style={angleGridStyle}>
                {sets[focusIndex].angles.map((angle, index) => (
                    <button
                        key={angle.label}
                        onClick={() => {
                            setAngleIndex(index);
                            updateCamera(focusIndex, index);
                        }}
                        style={index === angleIndex ? activeAngleButtonStyle : angleButtonStyle}
                    >
                        {angle.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CameraButtons
