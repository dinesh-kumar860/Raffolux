export const removeDuplicates = async (data) => {
    const titles = data.map((ele) => ele.instant_win_prize_name);
    const uniqueTitles = [...new Set(titles)];
    const arr = [];

    await Promise.all(uniqueTitles.map(async (title) => {
        const categoryData = {
            title: title,
            image: data.find((ele) => ele.instant_win_prize_name === title && ele),
            items: data.filter((ele) => ele.instant_win_prize_name === title)
        };
        arr.push(categoryData);
    }));

    return arr;
}
