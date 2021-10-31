export const METHOD = {
    CONSTANT: "CONSTANT",
    LINEAR: "LINEAR",
	EASE_IN_OUT: "EASE_IN_OUT",
}

export const SCENE = {
    IMAGES: [
        {
            path: ["001.png"],
            paralaxDistance: 0.1,
            animation: {
                start: 1,
                duration: 10,
                position: [
                    { t: 0.00, v: [ 5, 5, -10], m: METHOD.EASE_IN_OUT },
                    { t: 1.00, v: [ 0, 0, 0], m: METHOD.EASE_IN_OUT }
                ],
                opacity: [
                    { t: 0.00, v: [0.00], m: METHOD.LINEAR },
                    { t: 0.10, v: [1.00], m: METHOD.LINEAR },
                    { t: 0.90, v: [1.00], m: METHOD.LINEAR },
                    { t: 1.00, v: [0.00], m: METHOD.LINEAR }
                ]
            }
        }, {
            path: ["002.png"],
            paralaxDistance: 0.1,
            animation: {
                start: 2,
                duration: 10,
                position: [
                    { t: 0.00, v: [ 5, 0, -10], m: METHOD.EASE_IN_OUT },
                    { t: 1.00, v: [ 0, 0, 0], m: METHOD.EASE_IN_OUT }
                ],
                opacity: [
                    { t: 0.00, v: [0.00], m: METHOD.LINEAR },
                    { t: 0.10, v: [1.00], m: METHOD.LINEAR },
                    { t: 0.90, v: [1.00], m: METHOD.LINEAR },
                    { t: 1.00, v: [0.00], m: METHOD.LINEAR }
                ]
            }
        }, {
            path: ["003.png"],
            paralaxDistance: 0.1,
            animation: {
                start: 3,
                duration: 10,
                position: [
                    { t: 0.00, v: [ -5, 5, -10], m: METHOD.EASE_IN_OUT },
                    { t: 1.00, v: [ 0, 0, 0], m: METHOD.EASE_IN_OUT }
                ],
                opacity: [
                    { t: 0.00, v: [0.00], m: METHOD.LINEAR },
                    { t: 0.10, v: [1.00], m: METHOD.LINEAR },
                    { t: 0.90, v: [1.00], m: METHOD.LINEAR },
                    { t: 1.00, v: [0.00], m: METHOD.LINEAR }
                ]
            }
        },
    ]
};