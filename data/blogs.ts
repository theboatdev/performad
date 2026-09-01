export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string[];
    date: string;
    image: string;
    category: string;
    author: {
        name: string;
        photo: string;
    };
}

export const blogs: BlogPost[] = [
    {
        id: "1",
        title: "How To Grow Your Inbound Travel Business Through Digital Marketing",
        excerpt: "I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.",
        content: [
            "I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.",
            "I’m a great place for you to tell a story and let your users know a little more about you.",
            "This is another paragraph. It should be engaging and informative, providing value to your readers who want to learn more about growing their travel business."
        ],
        date: "December 11, 2024",
        image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop",
        category: "Marketing Tips",
        author: {
            name: "Admin",
            photo: "/images/logo.png"
        }
    },
    {
        id: "2",
        title: "How To Grow Your Inbound Travel Business Through Digital Marketing",
        excerpt: "I'm a paragraph. Click here to add your own text and edit me. It's easy.",
        content: ["Content for blog 2..."],
        date: "December 11, 2024",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
        category: "Business Strategies",
        author: {
            name: "Admin",
            photo: "/images/logo.png"
        }
    },
    {
        id: "3",
        title: "How To Grow Your Inbound Travel Business Through Digital Marketing",
        excerpt: "I'm a paragraph. Click here to add your own text and edit me. It's easy.",
        content: ["Content for blog 3..."],
        date: "December 11, 2024",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        category: "Industry Insights",
        author: {
            name: "Admin",
            photo: "/images/logo.png"
        }
    },
    {
        id: "4",
        title: "How To Grow Your Inbound Travel Business Through Digital Marketing",
        excerpt: "I'm a paragraph. Click here to add your own text and edit me. It's easy.",
        content: ["Content for blog 4..."],
        date: "December 11, 2024",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        category: "Client Success",
        author: {
            name: "Admin",
            photo: "/images/logo.png"
        }
    },
    {
        id: "5",
        title: "How To Grow Your Inbound Travel Business Through Digital Marketing",
        excerpt: "I'm a paragraph. Click here to add your own text and edit me. It's easy.",
        content: ["Content for blog 5..."],
        date: "December 11, 2024",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
        category: "Marketing Tips",
        author: {
            name: "Admin",
            photo: "/images/logo.png"
        }
    },
    {
        id: "6",
        title: "How To Grow Your Inbound Travel Business Through Digital Marketing",
        excerpt: "I'm a paragraph. Click here to add your own text and edit me. It's easy.",
        content: ["Content for blog 6..."],
        date: "December 11, 2024",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
        category: "Business Strategies",
        author: {
            name: "Admin",
            photo: "/images/logo.png"
        }
    },
    {
        id: "7",
        title: "How To Grow Your Inbound Travel Business Through Digital Marketing",
        excerpt: "I'm a paragraph. Click here to add your own text and edit me. It's easy.",
        content: ["Content for blog 7..."],
        date: "December 11, 2024",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
        category: "Industry Insights",
        author: {
            name: "Admin",
            photo: "/images/logo.png"
        }
    }
];

export const categories = ["All", "Marketing Tips", "Business Strategies", "Industry Insights", "Client Success"];
