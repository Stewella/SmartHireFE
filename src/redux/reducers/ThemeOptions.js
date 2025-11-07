import sideBar6 from '../../assets/utils/images/sidebar/city1.jpg';
import {themeTypes} from '../types'

export const setEnableBackgroundImage = enableBackgroundImage => ({
    type: themeTypes.SET_ENABLE_BACKGROUND_IMAGE,
    enableBackgroundImage
});

export const setEnableFixedHeader = enableFixedHeader => ({
    type: themeTypes.SET_ENABLE_FIXED_HEADER,
    enableFixedHeader
});

export const setEnableHeaderShadow = enableHeaderShadow => ({
    type: themeTypes.SET_ENABLE_HEADER_SHADOW,
    enableHeaderShadow
});

export const setEnableSidebarShadow = enableSidebarShadow => ({
    type: themeTypes.SET_ENABLE_SIDEBAR_SHADOW,
    enableSidebarShadow
});

export const setEnablePageTitleIcon = enablePageTitleIcon => ({
    type: themeTypes.SET_ENABLE_PAGETITLE_ICON,
    enablePageTitleIcon
});

export const setEnablePageTitleSubheading = enablePageTitleSubheading => ({
    type: themeTypes.SET_ENABLE_PAGETITLE_SUBHEADING,
    enablePageTitleSubheading
});

export const setEnablePageTabsAlt = enablePageTabsAlt => ({
    type: themeTypes.SET_ENABLE_PAGE_TABS_ALT,
    enablePageTabsAlt
});

export const setEnableFixedSidebar = enableFixedSidebar => ({
    type: themeTypes.SET_ENABLE_FIXED_SIDEBAR,
    enableFixedSidebar
});

export const setEnableClosedSidebar = enableClosedSidebar => ({
    type: themeTypes.SET_ENABLE_CLOSED_SIDEBAR,
    enableClosedSidebar
});

export const setEnableMobileMenu = enableMobileMenu => ({
    type: themeTypes.SET_ENABLE_MOBILE_MENU,
    enableMobileMenu
});

export const setEnableMobileMenuSmall = enableMobileMenuSmall => ({
    type: themeTypes.SET_ENABLE_MOBILE_MENU_SMALL,
    enableMobileMenuSmall
});

export const setEnableFixedFooter = enableFixedFooter => ({
    type: themeTypes.SET_ENABLE_FIXED_FOOTER,
    enableFixedFooter
});

export const setBackgroundColor = backgroundColor => ({
    type: themeTypes.SET_BACKGROUND_COLOR,
    backgroundColor
});

export const setHeaderBackgroundColor = headerBackgroundColor => ({
    type: themeTypes.SET_HEADER_BACKGROUND_COLOR,
    headerBackgroundColor
});

export const setColorScheme = colorScheme => ({
    type: themeTypes.SET_COLOR_SCHEME,
    colorScheme
});

export const setBackgroundImageOpacity = backgroundImageOpacity => ({
    type: themeTypes.SET_BACKGROUND_IMAGE_OPACITY,
    backgroundImageOpacity
});

export const setBackgroundImage = backgroundImage  => ({
    type: themeTypes.SET_BACKGROUND_IMAGE,
    backgroundImage
});

export default function reducer(state = {
    backgroundColor: '',
    headerBackgroundColor: '',
    enableMobileMenuSmall: '',
    enableBackgroundImage: false,
    enableClosedSidebar: false,
    enableFixedHeader: true,
    enableHeaderShadow: true,
    enableSidebarShadow: true,
    enableFixedFooter: true,
    enableFixedSidebar: true,
    colorScheme: 'white',
    backgroundImage: sideBar6,
    backgroundImageOpacity: 'opacity-06',
    enablePageTitleIcon: true,
    enablePageTitleSubheading: true,
    enablePageTabsAlt: true,
}, action) {
    switch (action.type) {
        case  themeTypes.SET_ENABLE_BACKGROUND_IMAGE:
            return {
                ...state,
                enableBackgroundImage: action.enableBackgroundImage
            };

        case  themeTypes.SET_ENABLE_FIXED_HEADER:
            return {
                ...state,
                enableFixedHeader: action.enableFixedHeader
            };

        case  themeTypes.SET_ENABLE_HEADER_SHADOW:
            return {
                ...state,
                enableHeaderShadow: action.enableHeaderShadow
            };

        case  themeTypes.SET_ENABLE_SIDEBAR_SHADOW:
            return {
                ...state,
                enableSidebarShadow: action.enableSidebarShadow
            };

        case  themeTypes.SET_ENABLE_PAGETITLE_ICON:
            return {
                ...state,
                enablePageTitleIcon: action.enablePageTitleIcon
            };

        case  themeTypes.SET_ENABLE_PAGETITLE_SUBHEADING:
            return {
                ...state,
                enablePageTitleSubheading: action.enablePageTitleSubheading
            };

        case  themeTypes.SET_ENABLE_PAGE_TABS_ALT:
            return {
                ...state,
                enablePageTabsAlt: action.enablePageTabsAlt
            };

        case  themeTypes.SET_ENABLE_FIXED_SIDEBAR:
            return {
                ...state,
                enableFixedSidebar: action.enableFixedSidebar
            };

        case  themeTypes.SET_ENABLE_MOBILE_MENU:
            return {
                ...state,
                enableMobileMenu: action.enableMobileMenu
            };

        case  themeTypes.SET_ENABLE_MOBILE_MENU_SMALL:
            return {
                ...state,
                enableMobileMenuSmall: action.enableMobileMenuSmall
            };

        case  themeTypes.SET_ENABLE_CLOSED_SIDEBAR:
            return {
                ...state,
                enableClosedSidebar: action.enableClosedSidebar
            };

        case  themeTypes.SET_ENABLE_FIXED_FOOTER:
            return {
                ...state,
                enableFixedFooter: action.enableFixedFooter
            };

        case  themeTypes.SET_BACKGROUND_COLOR:
            return {
                ...state,
                backgroundColor: action.backgroundColor
            };

        case  themeTypes.SET_HEADER_BACKGROUND_COLOR:
            return {
                ...state,
                headerBackgroundColor: action.headerBackgroundColor
            };

        case  themeTypes.SET_COLOR_SCHEME:
            return {
                ...state,
                colorScheme: action.colorScheme
            };

        case  themeTypes.SET_BACKGROUND_IMAGE:
            return {
                ...state,
                backgroundImage: action.backgroundImage
            };

        case  themeTypes.SET_BACKGROUND_IMAGE_OPACITY:
            return {
                ...state,
                backgroundImageOpacity: action.backgroundImageOpacity
            };
            default:
    }
    return state;
}
