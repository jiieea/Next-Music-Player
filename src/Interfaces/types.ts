import {
    UserDetails,
    Song,
    Playlist
} from '../../types'
import { IconType } from 'react-icons'

export interface UpdateDialogProps {
    playlistData: Playlist
    disabled : boolean
}

export interface SidebarProps {
    children: React.ReactNode;
    songs: Song[]
    playlist: Playlist[]
    userDetail: UserDetails
}

export interface SortButtonSheetProps {
    onHandleSort: () => void
    onHandleSortByArtist: () => void
    onHandleSortByDate: () => void
    sort: string
}

export interface PlaylistPageProps {
    userData?: UserDetails;
    songs: Song[];
    allSongs : Song[]
    userPlaylists: Playlist[]
    playlistDataOwner : UserDetails
    playlistData: Playlist
}

export interface PlaylistOptionMobileProps {
    playlistImage: string,
    playlistSongs : Song[]
    playlistData: Playlist,
    userName: string,
    songs : Song[],
    disabled : boolean
}

export interface PlaylistHeaderProps {
    userData : UserDetails
    playlistImage: string,
    playllistDataOwner:UserDetails
    sort: string
    Icon: IconType
    imageUrl: string,
    onHandlePlaylistImageClick: () => void
    onHandleAccountPush: () => void,
    onHandleRemovePlaylist: (playlistId: string) => void,
    playlistData: Playlist,
    playlistSongs: Song[]
    songs : Song[]
    totalDuration: string
    onHandleSortByTitle: () => void
    onHandleSortByArtist: () => void
    onHandleSortByDate: () => void
}

export interface AccountProps {
    user: UserDetails | null,
    userSongs: Song[],
    playlists: Playlist[]
}


export interface HeaderProps {
    className?: string;
    userData?: UserDetails;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export interface LibraryProps {
    songs: Song[],
    playlist: Playlist[]
    userDetail: UserDetails
}

export interface DropdownMenuProps {
    onHandleCreatePlaylist: () => void
    onHandleAddSong: () => void
}

export interface MediaItemProps {
    data: Song
    onClick?: (id: string) => void
}

export interface PlaylistItemProps {
    playlist: Playlist,
    user: UserDetails
}

export interface UserPlaylistsProps {
    data: Playlist
    user: UserDetails
    href: string
}


export interface LibraryChildComponentProps {
    userData: UserDetails,
    userSongs: Song[]
    userPlaylists: Playlist[],
    liked: number,

}


export interface LibraryContentProps {
    userSongs: Song[]
    userPlaylists: Playlist[]
    userData: UserDetails,
    likedSongs: number
}


export interface PlaylistContentProps {
    songs: Song[]
    onHandleRemoveSong: (songId: string) => void
    userPlaylists: Playlist[]
    sort: Song[]
    loading: boolean
}

export interface UserPlaylistProps {
    playlist: Playlist
    user: UserDetails
    href: string
}

export interface SideBarItemsProps {
    icon: IconType,
    label: string,
    active?: boolean,
    href: string
}


export interface PlaylistSongsListProps {
    data: Song,
    onHandleOnPlay: (id: string) => void
    key: number,
    dropdown: string,
    onHandleRemoveSong: (songId: string) => void
    userPlaylists: Playlist[],
    onHandleOpenPlaylistDropdown: () => void
    onHandleOpenDropdown: (id: string) => void
    playlistDropdown: boolean
    index: number,
    onHandleCloseDropdown: (id: string) => void
}

export interface PlayerContentProps {
    song: Song,
    songUrl: string,
    userPlaylists: Playlist[]
}