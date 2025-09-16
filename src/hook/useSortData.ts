import { Song } from "../../types";

// we'r gonna sort data by song name , artist name  , created at
const sortedByTitle = (songs : Song[]) => {
    const sortedData =  songs.sort((a , b ) => a.title.localeCompare(b.title));
    return sortedData;
}


const sortedByArtist = (songs: Song[]) => {
    // sorting logic
    return  songs.sort((a, b) => a.author.localeCompare(b.author) )
}

const sortedByAddDate = (songs : Song[]) => {
    const sortedData = songs.sort((a , b ) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return sortedData;

}

export {
    sortedByTitle
    , sortedByArtist,
    sortedByAddDate
}