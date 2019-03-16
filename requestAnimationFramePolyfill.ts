const globalAny: any = global;

const requestAnimationFrame = globalAny.requestAnimationFrame = (callback: any) => {
    setTimeout(callback, 0);
};

export default requestAnimationFrame;
