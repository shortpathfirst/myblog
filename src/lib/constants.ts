export const NAVLINKS = [
    { url: "/blog", label: "Blog" },
    { url: "/projects", label: "Projects" },
    { url: "/experience", label: "Experience" },
    { url: "/about", label: "About" },
]
export const basePath = process.env.NODE_ENV === 'production' ? '/myblog' : ''