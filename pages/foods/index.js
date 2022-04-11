import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Link from "next/link"

export const getStaticProps = async () => {
    const res = await fetch("https://masak-apa.tomorisakura.vercel.app/api/recipes")
    const data = await res.json()
    return {
        props: { foods: data }
    }
}

const Foods = ({ foods }) => {
    return (
        <>
            <Navbar />
            {/* Breadcrumb */}
            <div className="flex mx-auto justify-center">
                <div className="flex items-center py-4 overflow-y-auto whitespace-nowrap">
                    <a href="#" className="text-gray-600 dark:text-gray-200">
                        Home
                    </a>

                    <span className="mx-5 text-gray-500 dark:text-gray-300">
                        /
                    </span>

                    <a href="#" className="text-gray-600 dark:text-gray-200 hover:underline">
                        Foods
                    </a>
                </div>

            </div>
            <div className="flex mx-auto justify-center mb-16">
                <h1 className="text-7xl font-black text-gray-600">Masak Apa Hari Ini?</h1>
            </div>

            {/* Content */}
            <div className="flex flex-wrap mx-auto justify-center">
                {foods.results.map(value => (
                    <a className="block overflow-hidden border border-gray-100 rounded-lg shadow-sm mx-4 basis-1/4" key={value.key}>
                        <img className="object-cover w-full h-56" src={value.thumb} alt="" />
                        <div className="p-6">
                            <h5 className="text-xl font-bold">
                                {value.title}
                            </h5>
                            <p className="mt-2 text-sm text-gray-500">
                                {value.times} {value.portion} {value.dificulty}
                            </p>
                            <div className="inline-block pb-1 mt-4 font-medium text-blue-600 border-b border-blue-500">
                                <Link href={"/foods/" + value.key}>
                                    <a>Lihat Detail Resep</a>
                                </Link>
                                <span aria-hidden="true">&rarr;</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default Foods;