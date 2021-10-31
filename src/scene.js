const METHOD = {
    CONSTANT: "CONSTANT",
    LINEAR: "LINEAR",
	EASE_IN_OUT: "EASE_IN_OUT",
}

const SCENE = {
    images: [
        {
            media: ["01.png"],
            animation: {
                start: 0,
                duration: 5,
                position: [
                    { t: 0.00, v: [10, 0, 0], f: METHOD.EASE_IN_OUT },
                    { t: 1.00, v: [ 1, 0, 0], f: METHOD.EASE_IN_OUT }
                ],
                rotation: [],
                size: [],
                opacity: [
                    { t: 0.00, v: 0.00, f: METHOD.LINEAR },
                    { t: 0.10, v: 1.00, f: METHOD.LINEAR },
                    { t: 0.90, v: 1.00, f: METHOD.LINEAR },
                    { t: 1.00, v: 0.00, f: METHOD.LINEAR }
                ]
            }
        }
    ]
};