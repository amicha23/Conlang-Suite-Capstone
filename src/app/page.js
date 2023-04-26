//this is thrid and final by Bryan
'use client';
import React, { useEffect, useRef } from 'react';
import './page.css'
import { gsap } from "gsap";

export default function landing() {
    const app = useRef<HTMLDivElement>(null); // create a ref for the root level element (for scoping)
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".clip-top, .clip-bottom", 2, {
                delay: 1,
                height: "50vh",
                ease: "power4.inOut",
            });
            gsap.to(".marquee", 3.5, {
                delay: 0.75,
                top: "50%",
                ease: "power4.inOut",
            });
            gsap.from(".clip-top .marquee, .clip-bottom .marquee", 5, {
                delay: 1,
                left: "100%", //demo is 50% but 50 doesn't work for me
                ease: "power4.inOut",
            });
            gsap.from(".clip-center .marquee", 5, {
                delay: 1,
                left: "-50%",
                ease: "power3.inOut"
            });
            gsap.to(".clip-top", 2, {
                delay: 6,
                clipPath: "inset(0 0 100% 0)",
                ease: "power4.inOut"
            });
            gsap.to(".clip-bottom", 2, {
                delay: 6,
                clipPath: "inset(100% 0 0 0)",
                ease: "power4.inOut"
            });
            gsap.to(".clip-top .marquee, .clip-bottom marquee, .clip-center .marquee span", 1, {
                delay: 6,
                opacity: 0,
                ease: "power2.inOut"
            });
            gsap.to(".textbox", {
                delay: 8,
                opacity: 1,
                duration: 0.5,
                ease: "none"
            });
            // gsap.to(".stone", {
            //     delay: 8,
            //     duration: 0.2,
            //     opacity: 1
            // });
            

        }, app); // <- IMPORTANT! Scopes selector text
        return () => ctx.revert(); // cleanup
    }, []); // <- empty dependency Array so it doesn't re-run on every render

    return (
        <div >
            <div className="loader">
                <div className="loader-clip clip-top">
                    <div className="marquee">
                        <div className="marquee-container">
                            <span>Engine</ span>
                            <span>LangTime</ span>
                            LangTime
                            <span>LangTime</ span>
                            <span>Engine</ span>
                        </div>
                    </div>
                </div>
                <div className="loader-clip clip-bottom" >
                    <div className= "marquee">
                        <div className="marquee-container">
                            <span>Engine</ span>
                            <span>LangTime</ span>
                            LangTime
                            <span>LangTime</ span>
                            <span>Engine</ span>
                        </div>
                    </div>
                </div>
                <div className="clip-center">
                    <div className="marquee">
                        <div className="marquee-container">
                            <span>Engine</ span>
                            <span>LangTime</ span>
                            LangTime
                            <span>LangTime</ span>
                            <span>Engine</ span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="nav">
                    <a href='https://ischool.uw.edu/capstone'>
                        <img src='/img/iSchoolPrimary_RGB_Black.jpg' alt="information school logo" className='logo'/>
                    </a>
                    <div className="nav-items">
                        <a href='register'>Sign Up</a>
                        <a href='login'>Login</a>
                        <a href='about-us'>About Us</a>
                    </div>
                </div>
                <div className='textbox'>
                    <span className="letter">E</span>
                    <span className="letter">N</span>
                    <span className="letter">G</span>
                    <span className="letter">I</span>
                    <span className="letter">N</span>
                    <span className="letter">E</span>
                 </div>
            </div>
            {/* <div className="asteroid">
                <div className="showAfterXseconds stone"></div>
                <div className="showAfterXseconds stone"></div>
                <div className="showAfterXseconds stone"></div>
                <div className="showAfterXseconds stone"></div>
                <div className="showAfterXseconds stone"></div>
                <div className="showAfterXseconds stone"></div>
                <div className="showAfterXseconds stone"></div>
            </div> */}
        </div>        
    );
}


