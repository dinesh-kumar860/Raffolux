export const scrollToElement = (mainRef, childRef) => {
        if (mainRef.current && childRef.current) {
            childRef.current.measureLayout(
                mainRef.current,
                (x, y) => {
                    mainRef.current.scrollTo({ y, animated: true });
                }
            );
        }
    }