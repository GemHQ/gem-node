import * as debug from 'debug';
export declare const dbg: debug.Debugger;
export declare const GEM_BASE_URL = "https://vgs-sandbox.gem.co";
export declare enum Endpoints {
    users = "/users",
    profiles = "/profiles",
    documents = "/documents",
    institutions = "/institutions",
    institution_users = "/institution_users",
    accounts = "/accounts",
    transactions = "/transactions"
}
