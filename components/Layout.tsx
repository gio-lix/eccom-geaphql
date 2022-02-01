import {FC} from "react"
import Head from 'next/head'
import Navbar from "./Navbar";
import Search from "./Search";

interface ILayout {
    title?: string
    keywords?: string
    description?: string
}

const Layout: FC<ILayout> = ({children, keywords, description, title}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='keywords' content={keywords}/>
                <meta name='description' content={description}/>
            </Head>
            <Navbar/>
            <Search />
            <main>
                {children}
            </main>
        </>
    )
}
export default Layout
Layout.defaultProps = {
    title: 'Graphql',
    keywords: 'Graphql',
    description: 'Graphql Shop'
}