import React from 'react'
import background_img from "../assets/background_img.jpg";
const Hero = () => {
    return (
        <div
            className="w-full h-screen bg-cover bg-center relative"
            style={{ backgroundImage: `url(${background_img})` }}
        >
           

            {/* Text Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-slate-700 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Elevate Your Style</h1>
                <p className="text-lg md:text-xl max-w-xl px-4">
                    Discover premium fashion that's crafted for comfort, made to move with you, and designed to inspire.
                </p>
            </div>
           

        </div>
    )
}

export default Hero
