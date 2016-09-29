/**
 * Created by halversondm on 9/8/16.
 */
"use strict";

export const endpointBuilder = (uri) => {
    if (__DEV__) {
        //return "http://localhost:3000" + uri;
        return "https://toilettracker.halversondm.com" + uri;
        //return "http://172.20.10.8" + uri;
    } else {
        return "https://toilettracker.halversondm.com" + uri;
    }
};
