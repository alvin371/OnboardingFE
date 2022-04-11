import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";


export const getStaticPaths = async () => {
    const res = await fetch("https://masak-apa.tomorisakura.vercel.app/api/recipes")
    const data = await res.json()

    const paths = data.results.map(value => {
        return {
            params: { key: value.key.toString() }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const key = context.params.key
    const res = await fetch(`https://masak-apa.tomorisakura.vercel.app/api/recipe/${key}`)
    const data = await res.json()

    return {
        props: { data: data.results }
    }
}

const Details = ({ data }) => {
    console.log("ini data ngab", data);
    return (
        <>
            <Navbar />
            <div className="flex flex-row mx-auto justify-center">
                <h1>{data.title}</h1>
                <img src={data.thumb} alt="" />
            </div>
            <Footer />
        </>
    );
}

export default Details;