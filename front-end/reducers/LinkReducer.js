import {
  TOGGLELINK,
  TOGGLELINKFAIL,
  GETLINKS,
  GETLINKSFAIL,
  POSTLINK,
  POSTLINKFAIL,
  DELETELINK,
  DELETELINKFAIL,
  UPDATELINK,
  UPDATELINKFAIL,
  GETSEARCHEDLINKSFAIL,
  GETSEARCHEDLINKS,
  GETHIDDENLINKS,
  GETHIDDENLINKSFAIL,
  GETFILTERLINKS,
  GETFILTERLINKSFAIL,
  GETMORELINKS,
  GETMORELINKSFAIL,
  COPYLINK,
  CLEARLINK,
  COPYLINKFAIL,
  RESETLINKS,
  LOADINGLINKS,
} from "../actions/LinkTypes";
import { showMessage } from "react-native-flash-message";

const intialState = {
  links: [],
  searchedLinks: [],
  filterLinks: [],
  link:null,
  isLoading:false,
  error:''
};

export function linkReducer(state = intialState, { type, payload }) {
  switch (type) {
    case GETLINKS:
      return { ...state, links: [...payload.results, ...state.links] };

    case GETLINKSFAIL:
      showMessage({
        message: payload.msg,
        type: "danger",
        style:{paddingTop:50}
      });


      return state;

      case COPYLINK:

      return {...state,link:payload}


      case COPYLINKFAIL:
       
      
      return {...state,error:payload.msg}
    case CLEARLINK:

    return {...state,link:""};
    
    case POSTLINK:
      return { ...state,  links: [payload, ...state.links]};

    case POSTLINKFAIL:
      showMessage({
        message:payload.msg,
        type: "danger",
        style:{paddingTop:50}
      });

    case DELETELINK:
      return {
        ...state,
        links: state.links.filter((link) => link.id !== payload),
        searchedLinks: state.searchedLinks.filter(
          (link) => link.id !== payload
        ),
        filterLinks: state.filterLinks.filter((link) => link.id !== payload),
      };

    case DELETELINKFAIL:

      showMessage({
        message: payload.msg,
        type: "danger",
        style:{paddingTop:50}
      });

      return state;

    case UPDATELINK:
      return {
        ...state,
        links: state.links.map((link) =>
          link.id == payload.id ? payload : link
        ),
        searchedLinks: state.searchedLinks.map((link) =>
          link.id == payload.id ? payload : link
        ),
        filterLinks: state.filterLinks.map((link) =>
          link.id == payload.id ? payload : link
        ),
      };

    case UPDATELINKFAIL:
      showMessage({
        message: payload.msg,
        type: "danger",
        style:{paddingTop:50}
      });
      return state;

    case GETSEARCHEDLINKS:
      return { ...state, searchedLinks: payload.results };

    case GETSEARCHEDLINKSFAIL:
      showMessage({
        type: "danger",
        message: payload.msg,
        style:{paddingTop:50}
      });

      return state;

    case TOGGLELINK:
      return {
        ...state,
        links: state.links.map((link) =>
          link.id == payload.id ? payload : link
        ),
        searchedLinks: state.searchedLinks.map((link) =>
          link.id == payload.id ? payload : link
        ),
        filterLinks: state.filterLinks.map((link) =>
          link.id == payload.id ? payload : link
        ),
      };

    case TOGGLELINKFAIL:

      showMessage({
        message:payload.msg,
        type: "danger",
        style:{paddingTop:50}
      });
      return state;

    case GETHIDDENLINKS:
      return { ...state, links: [...state.links, ...payload.results] };

    case GETHIDDENLINKSFAIL:

      showMessage({
        message: payload.msg,
        type: "danger",
      });

      return state;

    case GETFILTERLINKS:
      return { ...state, filterLinks: payload.results };

    case GETFILTERLINKSFAIL:
      showMessage({
        message: payload.msg,
        type: "danger",
        style:{paddingTop:50}
      });

      return state;

    case GETMORELINKS:
      return {
        ...state,
        [payload.key]: [...state[payload.key], ...payload.data.results],
      };

      case RESETLINKS:
        return {...intialState}

    case GETMORELINKSFAIL:
      showMessage({
        message: payload.msg,
        type: "danger",
        style:{paddingTop:50}
      });

      return state;

      case LOADINGLINKS:
       
      return {...state,isLoading:!state.isLoading}

    default:
      return state;
  }
}
