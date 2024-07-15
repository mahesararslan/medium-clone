import { atom, selector} from "recoil";

export const nameAtom = atom({
    key: "nameAtom",
    default: "",
})

export const userAtom = atom({
    key: "userAtom",
    default: null
})

export const blogAtom = atom({
    key: "blogAtom",
    default: null
})

export const blogsAtom = atom({
    key: "blogsAtom",
    default: []
})

export const searchAtom = atom({
    key: "searchAtom",
    default: ""
})

export const SearchedBlogs = selector({
    key: "searchBlogs",
    get: ({get}) => {
        const blogs = get(blogsAtom);
        const search = get(searchAtom); 
        console.log("Searched Text is", search); //@ts-ignore
        return blogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()));
    }
})

