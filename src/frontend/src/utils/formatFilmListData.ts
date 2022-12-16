export const formatFilmListData = (data: any) => {
    let tempData = JSON.parse(JSON.stringify(data));
    tempData.filmLists.map((list: any) => {
        let listId = list.id;
        let entries = tempData.entries.filter((x: any) => x.listId === listId);
        list['entries'] = entries;
    });
    delete tempData['entries'];
    return tempData.filmLists;
};
