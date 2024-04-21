import React, { useEffect, useState } from "react";

export const Result = ({ wpm, cpm, error, accuracy, setPageOpen }) => {
    const response = [
        `Please stop Playing, start Typing!`,
        `You should do more and more practice!`,
        `You should do more practice!`,
        `You should do more practice to become Legend!`,
        `You should do more practice to become God!`,
        `You are God !`,
    ];
    const Head = [
        `Seriously !`,
        "Seriously, too slow!",
        `Slow Like a Baby!`,
        `Pro Like a Man!`,
        `Legend!`,
        `God !`,
    ];
    const [number, setNumber] = useState(0);
    useEffect(() => {
        if (wpm === 0) setNumber(0);
        else if (wpm > 0 && wpm <= 20) setNumber(1);
        else if (wpm > 20 && wpm <= 40) setNumber(2);
        else if (wpm > 40 && wpm <= 60) setNumber(3);
        else if (wpm > 60 && wpm <= 80) setNumber(4);
        else if (wpm > 80) setNumber(5);
    }, []);
    const emoji = [`😵`, `🤡`, `👶`, `👨`, `😎`, `🗿`];
    return (
        <div className="bg-black/40  z-50 w-full h-screen fixed top-0 left-0 flex justify-center items-center">
            <div className="bg-white w-full md:w-2/6 text-center px-5 pt-10 pb-5 space-y-5 rounded-md">
                <p className="text-5xl">{emoji[number]}</p>
                <p className="font-medium text-3xl">{Head[number]}</p>
                <p className="text-xl text-gray-500 ">
                    {number === 0 ? (
                        response[number]
                    ) : (
                        <p>
                            {`Your typing speed is `}
                            <span className="text-black font-medium">
                                {wpm}
                            </span>
                            {` WPM which equals `}
                            <span className="text-black font-medium">
                                {cpm}
                            </span>
                            {` CPM. You've made a `}
                            <span className="text-black font-medium">
                                {error}
                            </span>
                            {` mistakes with `}
                            <span className="text-black font-medium">
                                {accuracy}%
                            </span>
                            {` total accuracy. `}
                            {response[number]}
                        </p>
                    )}
                </p>
                <div className="text-end space-x-5 pt-5  text-white">
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="px-4 py-1 bg-green-500 rounded-md shadow-[2.5px_2.5px_black] active:shadow-[0px_0px_black] transition-all duration-100"
                    >
                        Refresh
                    </button>
                    <button
                        onClick={() => setPageOpen(false)}
                        className="px-4 py-1 shadow-[2.5px_2.5px_black] active:shadow-[0px_0px_black] transition-all duration-100 bg-red-500 rounded-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
