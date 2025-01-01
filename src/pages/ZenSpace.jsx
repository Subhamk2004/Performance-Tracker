import React, { useState, useEffect, useRef } from 'react';
import started_audio from '../assets/audios/started.mp3';
import ongoing from '../assets/audios/break_audio.mp3';
import bg from '../assets/images/bg.jpg';
import stopwatch from '../assets/images/stopwatch.png';
import { PauseCircle, PlayCircle, TimerReset, Play } from 'lucide-react';

const ZenSpace = () => {
    const [time, setTime] = useState({ minutes: 30, seconds: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef(null);
    const startAudioRef = useRef(null);
    const ongoingAudioRef = useRef(null);
    const ongoingTimeoutRef = useRef(null);

    useEffect(() => {
        // Set up ongoing audio configuration
        if (ongoingAudioRef.current) {
            ongoingAudioRef.current.loop = true;
        }

        // Cleanup function
        return () => {
            clearInterval(timerRef.current);
            clearTimeout(ongoingTimeoutRef.current);
            if (ongoingAudioRef.current) {
                ongoingAudioRef.current.pause();
                ongoingAudioRef.current.currentTime = 0;
            }
        };
    }, []);

    const startTimer = () => {
        setIsRunning(true);
        setIsPaused(false);

        // Play the start sound
        if (startAudioRef.current) {
            startAudioRef.current.currentTime = 0;
            startAudioRef.current.play();
        }

        // Schedule the ongoing audio to start after 2 seconds
        ongoingTimeoutRef.current = setTimeout(() => {
            if (ongoingAudioRef.current) {
                ongoingAudioRef.current.currentTime = 0;
                ongoingAudioRef.current.play();
            }
        }, 2000);

        timerRef.current = setInterval(() => {
            setTime((prev) => {
                if (prev.minutes === 0 && prev.seconds === 0) {
                    clearInterval(timerRef.current);
                    if (ongoingAudioRef.current) {
                        ongoingAudioRef.current.pause();
                        ongoingAudioRef.current.currentTime = 0;
                    }
                    return prev;
                }
                if (prev.seconds === 0) {
                    return { minutes: prev.minutes - 1, seconds: 59 };
                }
                return { ...prev, seconds: prev.seconds - 1 };
            });
        }, 1000);
    };

    const pauseTimer = () => {
        setIsPaused(true);
        setIsRunning(false);
        clearInterval(timerRef.current);
        clearTimeout(ongoingTimeoutRef.current);
        if (ongoingAudioRef.current) {
            ongoingAudioRef.current.pause();
        }
    };

    const resumeTimer = () => {
        setIsPaused(false);
        setIsRunning(true);
        if (ongoingAudioRef.current) {
            ongoingAudioRef.current.play();
        }

        timerRef.current = setInterval(() => {
            setTime((prev) => {
                if (prev.minutes === 0 && prev.seconds === 0) {
                    clearInterval(timerRef.current);
                    if (ongoingAudioRef.current) {
                        ongoingAudioRef.current.pause();
                        ongoingAudioRef.current.currentTime = 0;
                    }
                    return prev;
                }
                if (prev.seconds === 0) {
                    return { minutes: prev.minutes - 1, seconds: 59 };
                }
                return { ...prev, seconds: prev.seconds - 1 };
            });
        }, 1000);
    };

    const resetTimer = () => {
        clearInterval(timerRef.current);
        clearTimeout(ongoingTimeoutRef.current);
        setTime({ minutes: 30, seconds: 0 });
        setIsRunning(false);
        setIsPaused(false);
        if (ongoingAudioRef.current) {
            ongoingAudioRef.current.pause();
            ongoingAudioRef.current.currentTime = 0;
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center overflow-scroll no-scrollbar relative">
            <img
                src={bg}
                className="absolute object-cover w-full h-full z-0 rounded-3xl"
                alt="background"
            />
            <div className="absolute w-[90%] h-[80%] bg-white/15 backdrop-blur-md z-0 rounded-3xl"></div>

            <div className="relative z-10 w-full flex flex-col items-center">
                <div
                    id="logo"
                    className="flex items-center justify-center gap-3 mt-10 text-4xl font-semibold bg-gradient-to-r from-black via-secondary to-secondary bg-clip-text text-transparent z-10"
                >
                    Work Buddy
                    <img
                        id="logo_img"
                        src={stopwatch}
                        alt="stopwatch"
                        className="w-11"
                    />
                </div>

                <div className="timer_div bg-white/30 backdrop-blur-lg shadow-lg mt-12 flex flex-col items-center rounded-2xl overflow-hidden mb-12 p-3 lg:w-[450px]">
                    <h2 className="mt-5">Start Working</h2>
                    <div className="flex items-center justify-center text-6xl mt-5 mb-8">
                        <input
                            type="text"
                            value={String(time.minutes).padStart(2, '0')}
                            onChange={(e) =>
                                setTime((prev) => ({ ...prev, minutes: Number(e.target.value) }))
                            }
                            className="w-24 text-center font-medium h-20 bg-transparent outline-none"
                        />
                        <span>:</span>
                        <input
                            type="text"
                            value={String(time.seconds).padStart(2, '0')}
                            onChange={(e) =>
                                setTime((prev) => ({ ...prev, seconds: Number(e.target.value) }))
                            }
                            className="bg-transparent w-24 text-center font-medium h-20 outline-none"
                        />
                    </div>
                    <div className="flex justify-center items-center gap-5 mb-8">
                        {!isRunning && !isPaused && (
                            <button
                                onClick={startTimer}
                                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:shadow-lg hover:shadow-green-400 transition-all duration-300"
                            >
                                <PlayCircle className="w-8" color="green" />
                                Start
                            </button>
                        )}
                        {isPaused && (
                            <button
                                onClick={resumeTimer}
                                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:shadow-lg hover:shadow-blue-400 transition-all duration-300"
                            >
                                <Play className="w-8" color="blue" />
                                Resume
                            </button>
                        )}
                        {isRunning && (
                            <button
                                onClick={pauseTimer}
                                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:shadow-lg hover:shadow-green-400 transition-all duration-300"
                            >
                                <PauseCircle className="w-8" color="red" />
                                Pause
                            </button>
                        )}
                        {(isRunning || isPaused) && (
                            <button
                                onClick={resetTimer}
                                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:shadow-lg hover:shadow-green-400 transition-all duration-300"
                            >
                                <TimerReset className="w-8" color="yellow" />
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                <audio ref={startAudioRef}>
                    <source src={started_audio} type="audio/mpeg" />
                </audio>
                <audio ref={ongoingAudioRef}>
                    <source src={ongoing} type="audio/mpeg" />
                </audio>
            </div>
        </div>
    );
};

export default ZenSpace;