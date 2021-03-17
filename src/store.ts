import { createStore } from "vuex";

import { UserProps, ColumnProps, PostProps, Posts, Columns } from "./hooks/testData";

export interface GlobalDataProps {
    user: UserProps;
    columns: ColumnProps[];
    posts: PostProps[];
}

const store = createStore<GlobalDataProps>({
    state: {
        user: {
            isLogin: false,
            name: 'DUING',
            id: 101,
        },
        columns: Columns,
        posts: Posts
    },
    mutations: {
        logIn(state) {
            state.user.isLogin = true
        },
        logOut(state) {
            state.user.isLogin = false
        }
    }
})


export default store