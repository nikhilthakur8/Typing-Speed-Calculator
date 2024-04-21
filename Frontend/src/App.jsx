/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import "./App.css";
import {
    Dot,
    PlayCircleIcon,
    RefreshCcw,
    Volume2Icon,
    VolumeX,
} from "lucide-react";
import { Result } from "./Result";
import correctType from "./assets/correctType.wav";
import wrongType from "./assets/wrongType.mp3";
function App() {
    const [start, setStart] = useState(false);
    const [para, setPara] = useState("");
    const [error, setError] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [wordWritten, setWordWritten] = useState(0);
    const [totalWords, setTotalWords] = useState(0);
    const [timer, setTimer] = useState(60);
    const [characterCount, setCharacterCount] = useState(0);
    const [wpm, setWPM] = useState(0);
    const [bgColor, setBgColor] = useState(true);
    const [typingEnd, setTypingEnd] = useState(false);
    const [isPageOpen, setPageOpen] = useState(false);
    const [isAudio, setIsAudio] = useState(true);


    const content = [
        "Amidst the rustling leaves of an ancient forest, a sense of timelessness pervades the air. Giant trees tower overhead, their branches interlocking to form a verdant canopy that blocks out the harsh rays of the sun. Shafts of light filter through the dense foliage, illuminating patches of moss-covered ground below. Birds flit amongst the branches, their song a sweet melody that echoes through the forest. As the wind whispers through the leaves, it carries with it the secrets of generations past, weaving together the intricate tapestry of life in the forest.",
        "Nestled within a verdant valley, a sleepy village lies cradled in the embrace of the mountains. Cobblestone streets wind their way between quaint cottages, their thatched roofs adorned with trailing vines and colorful blooms. Smoke curls lazily from chimneys, mingling with the scent of woodsmoke and wildflowers. In the village square, locals gather to chat and laugh, their voices a comforting backdrop to the rhythm of daily life. As night falls, the stars emerge one by one, casting a soft, silver light upon the peaceful scene.",
        "In the heart of a bustling metropolis, skyscrapers reach towards the sky like giants of glass and steel, their gleaming facades reflecting the bustle of life below. Streets pulse with energy as cars and pedestrians weave their way through the urban labyrinth. Neon lights flicker and flash, casting an otherworldly glow upon the cityscape. Amidst the chaos, pockets of tranquility can be found – hidden parks and quiet alleyways where time seems to stand still, offering a brief respite from the relentless pace of city life.",
        "High atop a snow-capped peak, the world stretches out in all directions, a breathtaking vista of rugged beauty. The wind whispers through the craggy cliffs, carrying with it the promise of adventure and discovery. Far below, a blanket of clouds obscures the valleys and forests, lending an air of mystery to the landscape. As the sun dips below the horizon, painting the sky with hues of pink and orange, the mountains are bathed in a warm, golden light, their majestic peaks standing as silent sentinels against the fading day.",
        "Within the confines of a bustling marketplace, a cacophony of voices fills the air, each one vying for attention amidst the sea of activity. Merchants peddle their wares with fervent enthusiasm, their stalls adorned with colorful fabrics and gleaming trinkets. The scent of spices hangs heavy in the air, mingling with the aroma of freshly baked bread and roasting meats. Amidst the chaos, laughter rings out like a melody, weaving together the vibrant tapestry of life in the marketplace.",
        "In the heart of the desert, the sun beats down with unrelenting intensity, casting waves of heat across the arid landscape. Sand dunes stretch towards the horizon, their undulating curves a testament to the passage of time. Cacti stand tall amidst the sandy expanse, their spiny arms reaching towards the sky in defiance of the harsh conditions. As the day wears on, shadows lengthen and the air cools, offering a brief respite from the relentless heat of the desert sun.",
        "On the shores of the ocean, waves crash against the rugged cliffs with relentless force. Seagulls cry out as they glide effortlessly on the wind, their wings catching the spray of the sea. The salty air fills the lungs, invigorating the spirit with its bracing embrace. Pebbles rattle against the shore, pulled in and out by the ebb and flow of the tide. As the sun dips below the horizon, painting the sky with hues of pink and gold, the ocean whispers secrets to the night.",
        "Beneath a blanket of stars, the night unfolds in a symphony of darkness and light. The moon hangs low on the horizon, casting a silver glow upon the land below. Crickets chirp in the stillness, their song a lullaby to the world. Fireflies dance amongst the tall grass, their twinkling lights illuminating the night. In this moment of quiet serenity, the world seems to hold its breath, captivated by the beauty of the night sky.",
        "In the depths of the forest, a tapestry of green unfolds in every direction. Sunlight filters through the dense canopy above, dappling the forest floor with patches of golden light. Birds flit amongst the branches, their cheerful chirps echoing through the trees. Moss-covered stones lie scattered along the forest path, worn smooth by centuries of rain and wind. As the wind whispers through the leaves, a sense of peace settles over the forest, enveloping all who wander within its tranquil embrace.",
        "Amidst the bustling streets of the city, a symphony of life unfolds with each passing moment. Skyscrapers reach towards the heavens, casting long shadows upon the bustling sidewalks below. Cars weave through the maze of streets, their headlights illuminating the urban landscape. Amidst the chaos, people hurry along, their footsteps echoing against the pavement. Yet, amidst the hustle and bustle, moments of quiet beauty emerge. A lone flower blooms defiantly from a crack in the sidewalk, a testament to nature's resilience amidst the concrete jungle.",
        "In the tranquil embrace of dawn, the world awakens with a gentle sigh. Dew-kissed petals unfurl beneath the soft caress of the morning light, painting a canvas of ethereal beauty. Birds greet the day with melodious symphonies, their songs weaving through the tapestry of dawn. As the sun ascends, casting its golden glow upon the earth, nature stirs with quiet vitality. In this sacred moment, time seems to stand still, allowing us to savor the ephemeral magic of dawn's embrace.",
        "The moon hung low in the sky, casting a silvery glow over the sleeping city. Streets lay deserted, their quiet broken only by the occasional sound of passing cars. In the stillness of the night, dreams danced behind closed eyelids, weaving stories of love and adventure. It was a time of magic, when the ordinary world faded away, leaving only the whisper of possibility. And as the night wore on, the stars overhead seemed to wink knowingly, as if sharing in the secrets of the universe.",
        "The forest stretched out before him, a vast expanse of greenery that seemed to go on forever. Trees towered overhead, their branches reaching for the sky like fingers seeking the heavens. Shafts of sunlight filtered through the canopy, casting dappled shadows on the forest floor. Birds chirped and squirrels scampered, their movements adding to the symphony of nature. It was a place of wonder and mystery, where every step held the promise of discovery.",
        "The waves crashed against the rocky shore, sending plumes of spray into the air. Seagulls circled overhead, their cries mingling with the sound of the ocean. The sand was cool beneath her feet, the salt tang of the sea filling her nostrils. As she walked along the beach, the worries of the world seemed to melt away, lost in the vastness of the horizon. It was a moment of perfect peace, a communion with the elements that left her feeling both small and infinite.",
        "The city skyline glowed in the fading light of the setting sun, a tapestry of twinkling lights against the dusky sky. Streets buzzed with activity, the rhythm of life pulsing through the city's veins. People hurried along sidewalks, their faces illuminated by the glow of their smartphones. It was a scene of constant motion, a symphony of sound and color that never ceased to amaze. And as night fell and the city came alive with even more fervor, she couldn't help but feel grateful to be a part of it all.",
        "The rain fell in torrents, drumming against the roof in a steady rhythm. Thunder rumbled in the distance, the sound vibrating through the air like a low, ominous drumbeat. Lightning flashed, illuminating the sky in jagged streaks of white. And yet, despite the storm raging outside, she felt safe and warm within the confines of her cozy home. Wrapped in a blanket with a cup of tea in hand, she watched the tempest rage on, finding solace in the beauty of the chaos.",
        "The mountains loomed in the distance, their snow-capped peaks glistening in the sunlight. Valleys stretched out below, carpeted in lush greenery that seemed to go on forever. Birds soared overhead, their cries echoing off the rocky cliffs. It was a scene of breathtaking beauty, a testament to the power and majesty of nature. And as she stood there, taking it all in, she couldn't help but feel humbled by the sheer grandeur of the world around her.",
        "The train rattled down the tracks, its wheels clacking against the rails in a steady rhythm. Outside, fields flew past in a blur of green and gold, the landscape blurring into a kaleidoscope of colors. Inside, passengers chatted and laughed, their voices blending into a comforting hum. It was a journey of discovery, each mile bringing them closer to new adventures. And as the train hurtled forward into the unknown, she couldn't help but feel a sense of excitement at the possibilities that lay ahead.",
        "The moon hung high in the sky, bathing the world below in a soft, silvery light. Shadows danced across the landscape, casting everything in an otherworldly glow. Crickets chirped in the distance, their song blending with the rustle of leaves in the breeze. It was a night of magic and mystery, when anything seemed possible. And as she stood there, gazing up at the stars, she couldn't help but feel a sense of wonder at the vastness of the universe.",
        "The old house stood at the edge of town, its weathered facade hinting at the stories it held within. Ivy climbed the walls, weaving intricate patterns around the windows. Inside, dust motes danced in the sunlight that streamed through cracked panes of glass. It was a place frozen in time, a relic of a bygone era. And as she stepped through the front door, she couldn't help but feel a sense of reverence for the history that lingered in the air.",
        "The beach stretched out before her, a vast expanse of golden sand that disappeared into the horizon. Waves lapped at the shore, their rhythmic crashing a soothing backdrop to her thoughts. Seagulls cried overhead, wheeling and diving in the endless blue sky. It was a scene of timeless beauty, a place where the cares of the world seemed to fade away with the ebb and flow of the tide. And as she walked along the water's edge, she couldn't help but feel a sense of peace settle over her, like a warm blanket on a cold night.",
    ];

    // Typing Function Hanlder
    function typingFunctionHandler() {
        const choosenContent =
            content[Math.floor(Math.random() * content.length)];
        setPara(choosenContent);
        setTotalWords(choosenContent.split(" ").length);
        const timerIntervalId = setInterval(() => {
            setTimer((prev) => {
                if (prev != 0) {
                    return (prev = prev - 1);
                } else {
                    clearInterval(timerIntervalId);
                    reset();
                    return prev;
                }
            });
        }, 1000);
        setInterval(() => {
            setBgColor((prev) => !prev);
        }, 150);
        document.addEventListener("keydown", keyCapture);
    }
    function keyCapture(e) {
        e.preventDefault();
        const keyDown = e.key;
        if (
            keyDown.charCodeAt(0) > 31 &&
            keyDown.charCodeAt(0) < 127 &&
            keyDown.length === 1
        ) {
            setPara((prevPara) => {
                if (keyDown === prevPara[0]) {
                    setIsAudio((prev) => {
                        if (prev) {
                            const audio =
                                document.getElementById("correctPlayType");
                            audio.currentTime = 0;
                            audio.play();
                        }
                        return prev;
                    });
                    setCharacterCount((prev) => prev + 1);
                    if (keyDown === " ") setWordWritten((prev) => prev + 1);
                    textOutputAppend(keyDown);
                    if (prevPara.length === 0) {
                        reset();
                        return;
                    } else return prevPara.slice(1);
                } else {
                    setIsAudio((prev) => {
                        if (prev) {
                            const audio =
                                document.getElementById("wrongPlayType");
                            audio.currentTime = 0;
                            audio.play();
                        }
                        return prev;
                    });
                    setError((prev) => prev + 1);
                    textOutputAppendError(keyDown);
                    return prevPara;
                }
            });
        }
    }
    useEffect(() => {
        if (characterCount !== 0) {
            const accuracy = Math.floor(100 - (error / characterCount) * 100);
            setAccuracy(accuracy < 0 ? 0 : accuracy);
        }
    }, [error, characterCount]);
    useEffect(() => {
        setWPM(Math.round(wordWritten));
    }, [wordWritten, timer]);

    function textOutputAppend(ch) {
        const textNode = document.createTextNode(ch);
        document.getElementById("textOutput").appendChild(textNode);
    }
    function textOutputAppendError(ch) {
        const span = document.createElement("span");
        span.style.color = "red";
        span.innerHTML = ch;
        document.getElementById("textOutput").appendChild(span);
    }
    function reset() {
        document.removeEventListener("keydown", keyCapture);
        setWPM((prev) => {
            localStorage.setItem("lastWPM", prev);
            return prev;
        });
        setTypingEnd(true);
        setStart(false);
        setPageOpen(true);
    }
    return (
        <div>
            <div className="grid md:grid-cols-12 grid-cols-1 ">
                {isPageOpen && (
                    <Result
                        wpm={wpm}
                        accuracy={accuracy}
                        cpm={characterCount}
                        error={error}
                        setPageOpen={setPageOpen}
                    />
                )}

                {/* Left Part  */}
                <div className="md:col-span-2  col-span-1 border-r-2  flex flex-col  items-center my-20 space-y-5 text-lg text-gray-500 text-center">
                    <div>
                        <h1>Total Words</h1>
                        <span className="text-4xl font-thin">{totalWords}</span>
                    </div>
                    <span className="h-0.5 bg-gray-300 w-1/3"></span>
                    <div>
                        <h1>Written words</h1>
                        <span className="text-4xl font-thin">
                            {wordWritten}
                        </span>
                    </div>
                    <span className="h-0.5 bg-gray-300 w-1/3"></span>

                    <div>
                        <h1>Errors</h1>
                        <span className="text-4xl font-thin ">{error}</span>
                    </div>
                    <span className="h-0.5 bg-gray-300 w-1/3"></span>

                    <div>
                        <h1>Accuracy</h1>
                        <span className="text-4xl font-thin">{accuracy}</span>
                    </div>
                </div>

                {/* Middle Part */}
                <div className="md:col-span-8 col-span-1 mx-10 my-5 text-center font-sans ">
                    {/* Top Part  */}
                    <div className="space-y-1 my-7 text-xl">
                        <p>Do you think you're really fast ? 🤔</p>
                        <p>
                            Let's test it out! Click on the
                            <span className="font-semibold"> start</span> button
                            below to begin the one-minute typing test and find
                            out!
                        </p>
                    </div>

                    {/* Button Part */}
                    <div className="flex justify-center space-x-5 my-5">
                        {!typingEnd && (
                            <div>
                                <button
                                    type="button"
                                    disabled={start}
                                    onClick={() => {
                                        setStart(true);
                                        typingFunctionHandler();
                                    }}
                                >
                                    <PlayCircleIcon
                                        strokeWidth={1}
                                        size={50}
                                        className={`cursor-pointer rounded-full p-0 ${
                                            start &&
                                            "text-red-600 border-4 border-blue-400 cursor-not-allowed"
                                        }`}
                                    />
                                </button>
                                <p>Start</p>
                            </div>
                        )}
                        <div>
                            <button>
                                <RefreshCcw
                                    strokeWidth={1}
                                    size={50}
                                    className={`cursor-pointer rounded-full p-1 active:rotate-[360deg]  transition-transform transform-cpu duration-500 ${
                                        typingEnd &&
                                        "text-red-600 border-4 border-blue-400"
                                    }`}
                                    onClick={() => {
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 600);
                                    }}
                                />
                            </button>
                            <p>Refresh</p>
                        </div>
                    </div>
                    <div className="h-0.5 w-full bg-gray-200"></div>
                    {/* Infomration  */}
                    <div className="text-sm text-gray-500 my-5">
                        Just start typing and dont use Backslash to correct your
                        mistakes. Your mistakes will be marked and shown below
                        the writing box. Good luck!
                    </div>
                    {/* Input Part */}
                    <div className="text-4xl overflow-x-hidden min-h-20 my-5 relative font-mono bg-gray-900/90 text-white overflow-y-hidden p-5">
                        <p
                            className="whitespace-nowrap  tracking-widest text-start  "
                            id="textInput"
                        >
                            {para.replace(/ /g, "\u00A0")}
                        </p>
                        {start && (
                            <span
                                className={`absolute h-1.5 w-5 left-5 bottom-2.5  ${
                                    bgColor ? "bg-red-400" : "bg-gray-200"
                                }`}
                            ></span>
                        )}
                    </div>
                    {/* Ouptut Part */}
                    <div
                        className=" my-10 w-3/4 mx-auto bg-black min-h-40 text-left p-5 font-mono text-white break-words"
                        id="textOutput"
                    ></div>
                    <div className="h-0.5 w-full bg-gray-200"></div>
                    <div className="text-start space-y-2 my-10">
                        <p className="text-lg font-medium px-2">Notes:</p>
                        <ul>
                            <li>
                                <Dot className="inline" />
                                WPM - Words Per Minute, measures the number of
                                words typed within 60 seconds.
                            </li>
                            <li>
                                <Dot className="inline" />
                                CPM - Character Per Minute, measures the
                                characters of words typed within 60 seconds.
                            </li>
                            <li>
                                <Dot className="inline" />
                                Accuracy - Accuracy is determined by the
                                formula:{" "}
                                <span className="text-gray-600">
                                    (Correct Characters Written / All Characters
                                    Written) * 100%.
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="h-0.5 w-full bg-gray-200"></div>
                    <div className="my-10 ">
                        <p className="text-lg font-medium text-start mb-2">
                            Typing Speed Chart(in WPM)
                        </p>
                        <div className="flex text-sm">
                            <span className=" bg-red-600/80 text-white flex-1 py-1">
                                0-20 Noob
                            </span>
                            <span className="bg-orange-500/80 text-white flex-1  py-1">
                                20-40 Child
                            </span>
                            <span className="bg-yellow-500/80 text-white flex-1 py-1">
                                40-60 Pro
                            </span>
                            <span className="bg-[#a6c34c] text-white  flex-1 py-1">
                                60-80 Legend
                            </span>
                            <span className="bg-green-600/80 text-white flex-1 py-1">
                                80-100+ God
                            </span>
                        </div>
                    </div>
                    <div className="h-0.5 w-full bg-gray-300"></div>
                    <a
                        href="https://twitter.com/nikhilthakur80" target="_blank"
                        className="font-mono block pt-5 text-blue-500 hover:underline"
                    >
                        @nikhilThakur80
                    </a>
                </div>
                {/*Right Part  */}
                <div className="md:col-span-2  col-span-1 border-l-2  flex flex-col  items-center my-20 space-y-5 text-lg text-gray-500 text-center">
                    <div>
                        <h1>Timer</h1>
                        <span className="text-4xl font-thin">
                            {timer}
                            <span className="text-3xl">s</span>
                        </span>
                    </div>
                    <span className="h-0.5 bg-gray-300 w-1/3"></span>
                    <div>
                        <h1>CPM</h1>
                        <span className="text-4xl font-thin">
                            {characterCount}
                        </span>
                    </div>
                    <span className="h-0.5 bg-gray-300 w-1/3"></span>

                    <div>
                        <h1>WPM</h1>
                        <span className="text-4xl font-thin">{wpm}</span>
                    </div>
                    <span className="h-0.5 bg-gray-300 w-1/3"></span>

                    <div>
                        <h1>Last WPM</h1>
                        <span className="text-4xl font-thin">
                            {localStorage.getItem("lastWPM")}
                        </span>
                    </div>
                </div>
                <audio src={correctType} id="correctPlayType"></audio>
                <audio src={wrongType} id="wrongPlayType"></audio>
                <span
                    className="fixed left-10 bottom-10 cursor-pointer"
                    onClick={() => setIsAudio((prev) => !prev)}
                >
                    {isAudio ? (
                        <Volume2Icon
                            size={40}
                            className="border-2 rounded-full p-1 border-gray-600"
                            strokeWidth={1}
                        />
                    ) : (
                        <VolumeX
                            size={40}
                            className="border-2 rounded-full p-1 border-gray-600"
                            strokeWidth={1}
                        />
                    )}
                </span>
            </div>
        </div>
    );
}

export default App;
