import * as THREE from 'three';
import state from '../state'
import { useState } from 'react';

const colorCategories = {
    standard: [
        { name: 'Pearl White', color: 'rgb(220, 218, 215)', metalness: 0.2, roughness: 0.5, clearcoat: 0.8 },
        { name: 'Solid Black', color: 'rgb(5, 5, 5)', metalness: 0.2, roughness: 0.5, clearcoat: 0.8 },
        { name: 'Deep Red', color: 'rgb(80, 0, 0)', metalness: 0.2, roughness: 0.5, clearcoat: 0.8 },
        { name: 'Ocean Blue', color: 'rgb(10, 30, 50)', metalness: 0.2, roughness: 0.5, clearcoat: 0.8 },
    ],
    metallic: [
        { name: 'Midnight Silver', color: 'rgb(180, 180, 185)', metalness: 0.9, roughness: 0.1, clearcoat: 1.0 },
        { name: 'Deep Blue Metallic', color: 'rgb(12, 32, 87)', metalness: 0.9, roughness: 0.1, clearcoat: 1.0 },
        { name: 'Gunmetal Grey', color: 'rgb(60, 65, 75)', metalness: 0.9, roughness: 0.1, clearcoat: 1.0 },
        { name: 'Champagne Gold', color: 'rgb(196, 180, 138)', metalness: 0.9, roughness: 0.1, clearcoat: 1.0 },
    ],
    matte: [
        { name: 'Matte Black', color: 'rgb(10, 10, 10)', metalness: 0.0, roughness: 1.0 },
        { name: 'Matte Grey', color: 'rgb(40, 40, 40)', metalness: 0.0, roughness: 1.0 },
        { name: 'Matte Blue', color: 'rgb(15, 20, 35)', metalness: 0.0, roughness: 1.0 },
        { name: 'Matte Green', color: 'rgb(20, 30, 20)', metalness: 0.0, roughness: 1.0 },
    ],
    premium: [
        { name: 'Racing Red', color: 'rgb(200, 0, 0)', metalness: 0.8, roughness: 0.2, clearcoat: 1.0, anisotropy: 1.0 },
        { name: 'Electric Green', color: 'rgb(0, 255, 128)', metalness: 0.8, roughness: 0.2, clearcoat: 1.0, anisotropy: 1.0 },
        { name: 'Royal Purple', color: 'rgb(72, 0, 120)', metalness: 0.8, roughness: 0.2, clearcoat: 1.0, anisotropy: 1.0 },
        { name: 'Solar Orange', color: 'rgb(255, 128, 0)', metalness: 0.8, roughness: 0.2, clearcoat: 1.0, anisotropy: 1.0 },
    ]
};

const sharedStyles = {
    height: 40,
    width: 40,
    borderRadius: '50%',
    cursor: 'pointer',
    margin: '5px',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    position: 'relative',
    outline: '1px solid rgba(255, 255, 255, 0.1)'
};

const categoryStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 10px',
    backgroundColor: 'rgba(40, 40, 40, 0.85)',
    padding: '15px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
};

const ColorPicker = () => {
    const [activeCategory, setActiveCategory] = useState('standard');
    const [selectedColor, setSelectedColor] = useState(null);

    const handleClick = (colorData) => {
        if (!state.activeMesh) return;
        setSelectedColor(colorData.name);
        state.activeMesh.material.color = new THREE.Color(colorData.color);
        state.activeMesh.material.metalness = colorData.metalness;
        state.activeMesh.material.roughness = colorData.roughness;
        if (colorData.clearcoat !== undefined) {
            state.activeMesh.material.clearcoat = colorData.clearcoat;
            state.activeMesh.material.clearcoatRoughness = 0.1;
        }
        if (colorData.anisotropy !== undefined) {
            state.activeMesh.material.anisotropy = colorData.anisotropy;
            state.activeMesh.material.anisotropyRotation = Math.PI / 4;
        }
    };

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setSelectedColor(null);
    };

    return (
        <div
            style={{
                position: 'absolute',
                zIndex: 1,
                left: 0,
                right: 0,
                margin: 'auto',
                width: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                top: '20px',
                gap: '15px'
            }}
        >
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                {Object.keys(colorCategories).map(category => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        style={{
                            padding: '8px 20px',
                            backgroundColor: activeCategory === category ? 'rgba(255, 255, 255, 0.25)' : 'rgba(40, 40, 40, 0.85)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                            fontWeight: activeCategory === category ? 'bold' : 'normal',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div style={categoryStyle}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', padding: '5px' }}>
                    {colorCategories[activeCategory].map((colorData, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleClick(colorData)}
                            style={{
                                ...sharedStyles,
                                backgroundColor: colorData.color,
                                transform: selectedColor === colorData.name ? 'scale(1.1)' : 'scale(1)',
                                border: selectedColor === colorData.name ? '2px solid white' : '2px solid transparent',
                                ':hover': {
                                    transform: 'scale(1.1)',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                                }
                            }}
                            title={`${colorData.name}${colorData.metalness ? '\nMetalness: ' + colorData.metalness : ''}${colorData.roughness ? '\nRoughness: ' + colorData.roughness : ''}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
