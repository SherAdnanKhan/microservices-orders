//auth
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';

//error
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

//loading
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';

//Art Types
export const GET_ART = 'GET_ART';

// Art Search
export const ART_SEARCH = 'ART_SEARCH';
export const CLEAR_ART = 'CLEAR_ART';

// ART SELECT
export const SELECT_USER = "SELECT_USER";

//lobby
export const GET_FAV_POSTS = 'GET_FAV_POSTS';
export const GET_FAV_GALLERY_USERS = 'GET_FAV_GALLERY_USERS';

//Users 

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const CLEAR_USERS = 'CLEAR_USERS';
export const GET_USER_ART_NAME = 'GET_USER_ART_NAME';
export const GET_FAV_USER = 'GET_FAV_USER';
export const GET_FAV_BY_USER = 'GET_FAV_BY_USER';
export const UPDATE_BIO = 'UPDATE_BIO';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_USER_ART = 'UPDATE_USER_ART';
export const GET_ALL_FEELS = 'GET_ALL_FEELS';
export const GET_FAV_AND_SPRFVS_USERS = 'GET_FAV_AND_SPRFVS_USERS';
export const BLOCK_USER = 'BLOCK_USER';
export const UNBLOCK_USER = 'UNBLOCK_USER';



//Online Users
export const ONLINE_USERS = 'ONLINE_USERS';
export const ADD_ONLINE_USER = 'ADD_ONLINE_USER';
export const REMOVE_ONLINE_USER = 'REMOVE_ONLINE_USER';

//Studio
export const GET_MY_STUDIO = 'GET_MY_STUDIO';
export const SELECT_STUDIO_USER = 'SELECT_STUDIO_USER';
export const GET_USER_STUDIO = 'GET_USER_STUDIO';
export const CLEAR_USER_STUDIO = 'CLEAR_USER_STUDIO';
export const FAV_USER = 'FAV_USER';
export const UNFAV_USER = 'UNFAV_USER';
export const ADD_TO_SPRFVS = 'ADD_TO_SPRFVS';
export const ADD_TO_INVITE_ONLY = 'ADD_TO_INVITE_ONLY';
export const REMOVE_FROM_INVITE_ONLY = 'REMOVE_FROM_INVITE_ONLY';
export const START_STUDIO_LOADER = 'START_STUDIO_LOADER';
export const STOP_STUDIO_LOADER = 'STOP_STUDIO_LOADER';

//Vault
export const GET_MY_VAULTS = 'GET_MY_VAULTS';

// Gallery
export const GET_GALLERY = "GET_GALLERY";
export const GET_USER_FAV_GALLERIES = 'GET_USER_FAV_GALLERIES';
export const MAKE_FAV = "MAKE_FAV";
export const FAV_GALLERY = "FAV_GALLERY";
export const UNFAV_GALLERY = "UNFAV_GALLERY";
export const CLEAR_GALLERY = "CLEAR_GALLERY";
export const RECOMMEND_GALLERIES = "RECOMMEND_GALLERIES";
export const FAV_RECOMMEND_GALLERY = "FAV_RECOMMEND_GALLERY";
export const UNFAV_RECOMMEND_GALLERY = "UNFAV_RECOMMEND_GALLERY";

export const GET_MY_GALLERIES = 'GET_MY_GALLERIES';
export const CREATE_GALLERY = 'CREATE_GALLERY';
export const UPDATE_GALLERY = 'UPDATE_GALLERY';
export const REMOVE_GALLERY_IMAGE = 'REMOVE_GALLERY_IMAGE';

export const START_GALLERY_LOADER = 'START_GALLERY_LOADER';
export const STOP_GALLERY_LOADER = 'STOP_GALLERY_LOADER';

// Post
export const GET_POST = "GET_POST";
export const CLEAR_POST = "CLEAR_POST";
export const STROKE_POST = 'STROKE_POST';
export const UNSTROKE_POST = 'UNSTROKE_POST';
export const ADD_POST_COMMENT = 'ADD_POST_COMMENT';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_NCOMM = 'GET_NCOMM';
export const CLEAR_NCOMM = 'CLEAR_NCOMM';
export const DELETE_POST = 'DELETE_POST';
export const CHANGE_CRITIQUES_STATUS = 'CHANGE_CRITIQUES_STATUS';
export const SHARE_POST_STRQ = 'SHARE_POST_STRQ';
export const CLEAR_STATUS = 'CLEAR_STATUS';
export const START_POST_LOADER = "START_POST_LOADER";
export const STOP_POST_LOADER = "STOP_POST_LOADER";


//Conversations
export const GET_CONVERSATION = 'GET_CONVERSATION';
export const GET_ALL_CONVERSATIONS = 'GET_ALL_CONVERSATIONS';
export const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';
export const UPDATE_CONVERSATION_UNREAD_COUNT = 'UPDATE_CONVERSATION_UNREAD_COUNT';
export const RESET_CONVERSATION_COUNT = 'RESET_CONVERSATION_COUNT';
export const CLEAR_CONVERSATION = 'CLEAR_CONVERSATION';
export const READ_MESSAGE = 'READ_MESSAGE';
export const READ_ALL = 'READ_ALL';
export const INVITE_PEOPLE_IN_CHAT = 'INVITE_PEOPLE_IN_CHAT';

//Image upload
export const START_FILE_LOADER = 'START_FILE_LOADER';
export const STOP_FILE_LOADER = 'STOP_FILE_LOADER';

export const UPDATE_COUNT = 'UPDATE_COUNT';

//Privacy
export const GET_PRIVACIES = 'GET_PRIVACIES';
export const CHANGE_GALLERY_PRIVACY = 'CHANGE_GALLERY_PRIVACY';
export const CHANGE_OTHER_PRIVACY = 'CHANGE_OTHER_PRIVACY';
export const START_PRIVACY_LOADING = 'START_PRIVACY_LOADING';
export const STOP_PRIVACY_LOADING = 'STOP_PRIVACY_LOADING';
export const SPRFVS_USERS = 'SPRFVS_USERS';
export const USER_REQUESTS = 'USER_REQUESTS';
export const INVITED_USERS = 'INVITED_USERS';
export const REQUEST_APPROVED = 'REQUEST_APPROVED';
export const REQUEST_REJECTED = 'REQUEST_REJECTED';
export const UN_SUPER_FAV = 'UN_SUPER_FAV';

//MZFLASH
export const CREATE_FEED = 'CREATE_FEED';
export const GET_MY_FEEDS = 'GET_MY_FEEDS';
export const GET_COLLECTIVE_FEEDS = 'GET_COLLECTIVE_FEEDS';
export const GET_USER_FEEDS = 'GET_USER_FEEDS';
export const GET_ALL_FEEDS = 'GET_ALL_FEEDS';
export const START_FEEDS_LOADER = 'START_FEEDS_LOADER';
export const STOP_FEEDS_LOADER = 'STOP_FEEDS_LOADER';
export const FAVES_FEEDS = 'FAVES_FEEDS';
export const SPRFVS_FEEDS = 'SPRFVS_FEEDS';
export const FAVES_AND_SPRFVS_FEEDS = 'FAVES_AND_SPRFVS_FEEDS';
export const CREATE_FEED_COMMENT = 'CREATE_FEED_COMMENT';
export const STROKE_FEED = 'STROKE_FEED';
export const UNSTROKE_FEED = 'UNSTROKE_FEED';

//color
export const CHANGE_COLOR = 'CHANGE_COLOR';
export const GET_ALL_FEEL_COLORS = 'GET_ALL_FEEL_COLORS';