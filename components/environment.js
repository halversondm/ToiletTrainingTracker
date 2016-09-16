/**
 * Created by halversondm on 9/8/16.
 */
"use strict";

export const endpointBuilder = (uri) => {
    if (__DEV__) {
        //return "http://localhost:3000" + uri;
        return "https://toilettracker.halversondm.com" + uri;
    } else {
        return "https://toilettracker.halversondm.com" + uri;
    }
};
